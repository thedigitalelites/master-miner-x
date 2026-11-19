import { useEffect, useRef, useState } from 'react';

// Measures an element so its SVG frame can keep fixed-size corners at any width.
export function useSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setSize({ w: el.offsetWidth, h: el.offsetHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
}

// ---- shape helpers (all return SVG path strings) ----

// Plain octagon-ish chamfer: [tl, tr, br, bl] corner cuts.
export function chamfer(w, h, [tl, tr, br, bl] = [16, 16, 16, 16], inset = 0) {
  const i = inset;
  return [
    `M${i} ${tl + i}`, `L${tl + i} ${i}`, `L${w - tr - i} ${i}`, `L${w - i} ${tr + i}`,
    `L${w - i} ${h - br - i}`, `L${w - br - i} ${h - i}`, `L${bl + i} ${h - i}`, `L${i} ${h - bl - i}`, 'Z',
  ].join(' ');
}

// Rounded rectangle path (used where the reference has soft corners).
export function rounded(w, h, r = 12, inset = 0) {
  const i = inset;
  return `M${i + r} ${i} H${w - r - i} Q${w - i} ${i} ${w - i} ${r + i} V${h - r - i} Q${w - i} ${h - i} ${w - r - i} ${h - i} H${r + i} Q${i} ${h - i} ${i} ${h - r - i} V${r + i} Q${i} ${i} ${r + i} ${i} Z`;
}

// Generic measured SVG frame. `shape(w, h)` returns
// { main, fill, late: [], hair: [], accent: [], bars: [x, y] | null, glow }.
// It reuses the Why-mine frame classes, so the lines draw themselves in on
// reveal, a light pulse runs around the outline, and the frame re-draws on a timer.
export function SvgFrame({ w, h, shape, className = '' }) {
  if (!w || !h) return null;
  const s = shape(w, h);
  return (
    <svg className={`wm-frame ${className}`} width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      {s.defs}
      {s.main && <path d={s.main} fill={s.fill || 'rgba(8, 22, 26, 0.55)'} />}
      {s.under}
      <g className="wm-frame__lines">
        {s.main && <path d={s.main} pathLength="1" />}
        {s.main && s.tracer !== false && <path d={s.main} pathLength="1" className="wm-frame__tracer" />}
        {(s.late || []).map((d, i) => <path key={`l${i}`} d={d} pathLength="1" className="wm-frame__late" />)}
        {(s.accent || []).map((d, i) => <path key={`a${i}`} d={d} className="wm-frame__accent" />)}
      </g>
      {(s.hair || []).map((d, i) => <path key={`h${i}`} d={d} className="wm-frame__hair" />)}
      {s.bars && (
        <g className="wm-frame__bars" transform={`translate(${s.bars[0]} ${s.bars[1]})`}>
          <path d="M5 0 H14 L9 9 H0 Z" opacity="0.45" />
          <path d="M19 0 H28 L23 9 H14 Z" opacity="0.65" />
          <path d="M33 0 H47 L42 9 H28 Z" opacity="1" />
        </g>
      )}
      {s.over}
    </svg>
  );
}

// HUD panel. With `shape`, the outline is a measured SVG (custom notches,
// tabs and brackets). Without it, the old clipped chamfer is used.
export function Hud({ as: Tag = 'div', className = '', cut = 'md', glow = true, ticks = false, shape, frameClass, children, ...rest }) {
  const [ref, size] = useSize();
  if (shape) {
    return (
      <Tag ref={ref} className={`hud hud--svg ${className}`} {...rest}>
        <SvgFrame w={size.w} h={size.h} shape={shape} className={frameClass} />
        {children}
      </Tag>
    );
  }
  return (
    <Tag ref={ref} className={`hud hud--${cut} ${glow ? 'hud--glow' : ''} ${className}`} {...rest}>
      <span className="hud__frame" aria-hidden="true" />
      {ticks && (
        <span className="hud__ticks" aria-hidden="true">
          <i /><i /><i />
        </span>
      )}
      {children}
    </Tag>
  );
}

// Octagonal icon badge drawn as an SVG, matching the Why-mine badges.
export function OctBadge({ size = 40, className = '', children }) {
  const s = size;
  const k = s * 0.29;
  const pts = `${k},0.75 ${s - k},0.75 ${s - 0.75},${k} ${s - 0.75},${s - k} ${s - k},${s - 0.75} ${k},${s - 0.75} 0.75,${s - k} 0.75,${k}`;
  return (
    <span className={`wm-badge ${className}`} style={{ width: s, height: s }}>
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden="true">
        <polygon points={pts} />
      </svg>
      {children}
    </span>
  );
}

// Kept for older call sites: now renders the SVG octagon.
export function IconBadge({ children, size = 'md' }) {
  return <OctBadge size={size === 'sm' ? 36 : 48}>{children}</OctBadge>;
}

export function Eyebrow({ index, className = '', children }) {
  return (
    <p className={`eyebrow ${className}`}>
      {index && <span className="eyebrow__index">{index}</span>}
      {children}
    </p>
  );
}

export function SectionHead({ eyebrow, index, title, lead, align = 'left', children }) {
  return (
    <header className={`section-head section-head--${align}`}>
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <h2 className="h-section">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </header>
  );
}
