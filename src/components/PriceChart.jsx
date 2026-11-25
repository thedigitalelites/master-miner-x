import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchHistory } from '../data/livePrice.js';

const RANGES = {
  '24H': { points: 260, vol: 0.0045, from: '24 hours ago', seed: 7 },
  '7D': { points: 140, vol: 0.009, from: '7 days ago', seed: 21 },
  '1M': { points: 150, vol: 0.016, from: '30 days ago', seed: 42 },
  '1Y': { points: 160, vol: 0.035, from: '12 months ago', seed: 99 },
};

// Deterministic pseudo-random walk so the chart is stable between renders.
function series({ points, vol, seed }, end) {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647) - 0.5;
  const out = [end];
  for (let i = 1; i < points; i++) out.unshift(out[0] * (1 + rand() * vol * 2));
  return out;
}

export default function PriceChart({ end = 64182 }) {
  const [range, setRange] = useState('24H');
  const [live, setLive] = useState({});
  const [drawKey, setDrawKey] = useState(0);
  const plotRef = useRef(null);

  // Load real history for the selected range; refresh 24H every minute while visible.
  useEffect(() => {
    let alive = true;
    const load = (force) => fetchHistory(range, { force }).then((d) => {
      if (alive && d && d.length > 5) setLive((m) => ({ ...m, [range]: d.map((p) => p[1]) }));
    });
    load(false);
    let timer;
    if (range === '24H') timer = setInterval(() => { if (!document.hidden) load(true); }, 60000);
    return () => { alive = false; clearInterval(timer); };
  }, [range]);

  // Play the draw-in only on first load and on a range change.
  useEffect(() => { setDrawKey((k) => k + 1); }, [range]);
  const W = 640;
  const H = 260;

  const { line, area, max, min, endY } = useMemo(() => {
    const data = live[range] || series(RANGES[range], end);
    const max = Math.max(...data);
    const min = Math.min(...data);
    const pad = (max - min) * 0.12 || 1;
    const y = (v) => H - ((v - (min - pad)) / (max - min + pad * 2)) * H;
    const x = (i) => (i / (data.length - 1)) * W;
    const pts = data.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`);
    return {
      line: `M${pts.join(' L')}`,
      area: `M0,${H} L${pts.join(' L')} L${W},${H} Z`,
      max,
      min,
      endY: y(data[data.length - 1]) / H,
    };
  }, [range, end, live]);

  const k = (v) => `${(v / 1000).toFixed(1)}K`;

  return (
    <div className="chart">
      <div className="chart__top">
        <p className="mono-label">BTC / USD</p>
        <div className="segmented" role="tablist" aria-label="Chart range">
          {Object.keys(RANGES).map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={range === r}
              className={range === r ? 'is-active' : ''}
              onClick={() => setRange(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="chart__plot">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={`Bitcoin price, ${range}`}>
          <defs>
            <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--cyan)" stopOpacity="0.32" />
              <stop offset="1" stopColor="var(--cyan)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} className="chart__grid" />
          ))}
          <path d={area} fill="url(#chartFill)" />
          <path key={drawKey} d={line} className="chart__line chart__line--draw" vectorEffect="non-scaling-stroke" pathLength="1" />
        </svg>
        <span className="chart__ping" style={{ top: `${endY * 100}%` }} aria-hidden="true" />
        <span className="chart__axis chart__axis--max">{k(max)}</span>
        <span className="chart__axis chart__axis--min">{k(min)}</span>
      </div>
      <div className="chart__foot">
        <span>{RANGES[range].from}</span>
        <span>Now</span>
      </div>
    </div>
  );
}
