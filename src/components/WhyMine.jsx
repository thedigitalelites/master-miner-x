import { useEffect, useRef, useState } from 'react';
import { whyMine } from '../data/content.js';
import Icon from './Icon.jsx';

// Measures an element so its SVG frame can keep fixed-size corners at any width.
function useSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.offsetWidth, h: el.offsetHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
}

// Card outline: small TL/BL chamfers, a stepped-down top-right notch with a
// raised bracket sitting in it, and a bottom-right tab holding three bars.
function CardFrame({ w, h }) {
  if (!w || !h) return null;
  const c = 22;
  const main = [
    `M0 ${c}`, `L${c} 0`, `L${w - 150} 0`, `L${w - 117} 33`, `L${w - 12} 33`, `L${w} 45`,
    `L${w} ${h - 40}`, `L${w - 40} ${h}`, `L${c} ${h}`, `L0 ${h - c}`, 'Z',
  ].join(' ');
  const bracket = `M${w - 139} 0 L${w - 1} 0 L${w + 11} 23 L${w + 11} 104 L${w + 5} 111`;
  const tab = `M${w - 108} ${h} L${w - 88} ${h - 20} L${w - 20} ${h - 20}`;
  return (
    <svg className="wm-frame" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <defs>
        <linearGradient id="wm-card-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1f23" stopOpacity="0.5" />
          <stop offset="1" stopColor="#061215" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path d={main} fill="url(#wm-card-fill)" />
      <path d={main} className="wm-frame__halo" />
      <g className="wm-frame__lines">
        <path d={main} pathLength="1" />
        <path d={bracket} pathLength="1" className="wm-frame__late" />
        <path d={tab} pathLength="1" className="wm-frame__late" />
        <path d={`M-5 ${c + 36} L-5 ${c + 96}`} className="wm-frame__accent" />
      </g>
      <g className="wm-frame__run">
        <path d={main} pathLength="1" className="wm-frame__tracer wm-frame__tracer--halo" />
        <path d={main} pathLength="1" className="wm-frame__tracer" />
      </g>
      <path d="M37 16 L173 16" className="wm-frame__hair" />
      <g className="wm-frame__bars" transform={`translate(${w - 80} ${h - 15})`}>
        <path d="M5 0 H14 L9 9 H0 Z" opacity="0.45" />
        <path d="M19 0 H28 L23 9 H14 Z" opacity="0.65" />
        <path d="M33 0 H47 L42 9 H28 Z" opacity="1" />
      </g>
    </svg>
  );
}

function CtaFrame({ w, h }) {
  if (!w || !h) return null;
  const c = 18;
  const d = `M${c} 0 L${w - c} 0 L${w} ${c} L${w} ${h - c} L${w - c} ${h} L${c} ${h} L0 ${h - c} L0 ${c} Z`;
  return (
    <svg className="wm-frame" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <path d={d} fill="rgba(8, 24, 28, 0.55)" />
      <path d={d} className="wm-frame__halo" />
      <g className="wm-frame__lines">
        <path d={d} pathLength="1" />
      </g>
      <g className="wm-frame__run">
        <path d={d} pathLength="1" className="wm-frame__tracer wm-frame__tracer--halo" />
        <path d={d} pathLength="1" className="wm-frame__tracer" />
      </g>
    </svg>
  );
}

function OctBadge({ size = 40, children }) {
  const s = size;
  const k = s * 0.29;
  const pts = `${k},0.75 ${s - k},0.75 ${s - 0.75},${k} ${s - 0.75},${s - k} ${s - k},${s - 0.75} ${k},${s - 0.75} 0.75,${s - k} 0.75,${k}`;
  return (
    <span className="wm-badge" style={{ width: s, height: s }}>
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden="true">
        <polygon points={pts} />
      </svg>
      {children}
    </span>
  );
}

function OptionCard({ data }) {
  const [ref, size] = useSize();
  return (
    <article className="wm-card" ref={ref}>
      <CardFrame w={size.w} h={size.h} />
      <p className="wm-card__label">
        {data.label}
        <span className="wm-card__tag" aria-hidden="true" />
      </p>
      <h3 className="wm-card__title">{data.title}</h3>
      <p className="wm-card__intro">{data.introLines ? data.introLines.map((l, i) => <span key={i} className="wm-line">{l}</span>) : data.intro}</p>
      <dl className="wm-list">
        {data.rows.map(([icon, term, desc]) => (
          <div className="wm-list__row" key={term}>
            <OctBadge size={40}><Icon name={icon} size={20} /></OctBadge>
            <dt>{term}</dt>
            <dd>{desc}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function TradeOff() {
  const [ref, size] = useSize();
  return (
    <div className="wm-cta" ref={ref}>
      <CtaFrame w={size.w} h={size.h} />
      <OctBadge size={56}><Icon name="calculator" size={26} /></OctBadge>
      <p>
        <strong>The trade-off is real.</strong> Hardware, difficulty and downtime risk – and a mine-vs-hold
        <br className="br-lg" />
        calculator that pushes all three against each other.
      </p>
      <a href="#calculator" className="wm-btn">
        Learn more <Icon name="chevronRight" size={18} />
      </a>
    </div>
  );
}

export default function WhyMine() {
  return (
    <section className="section wm" id="why-mine">
      <div className="container">
        <div className="wm-head">
          <div className="wm-head__main">
            <p className="wm-eyebrow">
              <span>01</span> The case for mining
            </p>
            <div className="wm-title-wrap">
              <svg className="wm-title-bracket" viewBox="0 0 400 140" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 34 L22 4 L400 4" />
                <path d="M0 34 L0 140" />
              </svg>
              <h2 className="wm-title">
                <span>Why mine it,</span>
                <span>instead of buying it.</span>
              </h2>
              <svg className="wm-title-bars" width="300" height="12" viewBox="0 0 300 12" aria-hidden="true">
                <path className="f" d="M8 2 H40 L34 10 H2 Z" />
                <path className="o" d="M46 2 H126 L120 10 H40" />
                <path className="l" d="M120 10 H160 M166 10 L172 2" />
                <path className="b" d="M200 8 H300" />
              </svg>
            </div>
          </div>
          <div className="wm-head__aside">
            <svg className="wm-divider" width="8" height="112" viewBox="0 0 8 112" aria-hidden="true">
              <circle cx="4" cy="4" r="2.5" />
              <path d="M4 7 V105" />
              <circle cx="4" cy="108" r="2.5" />
            </svg>
            <p>
              <span className="wm-line">Spend $50,000 on Bitcoin and you own $50,000 of Bitcoin –</span>
              <span className="wm-line">for ever, exactly. Spend it on machines and you are buying the</span>
              <span className="wm-line"><em>production</em> of Bitcoin at a cost below spot, every day, plus</span>
              <span className="wm-line">hardware you can still sell at the end.</span>
            </p>
          </div>
        </div>

        <div className="wm-grid">
          <OptionCard data={whyMine.optionA} />
          <OptionCard data={whyMine.optionB} />
        </div>

        <TradeOff />
      </div>
    </section>
  );
}
