import { useEffect, useState } from 'react';
import { tickerCoins } from '../data/content.js';
import { fetchTicker } from '../data/livePrice.js';

const fmt = (v) => '$' + (v >= 1000 ? Math.round(v).toLocaleString('en-US') : v >= 1 ? v.toFixed(2) : v.toFixed(4));

export default function Ticker({ reverse = false }) {
  const [live, setLive] = useState(null);
  useEffect(() => {
    let alive = true;
    fetchTicker().then((d) => alive && d && setLive(d));
    return () => { alive = false; };
  }, []);
  const coins = tickerCoins.map((c) => {
    const l = live && live[c.sym];
    if (!l) return c;
    const ch = l.change == null ? c.change : (l.change >= 0 ? '+' : '') + l.change.toFixed(2) + '%';
    return { ...c, price: fmt(l.usd), change: ch };
  });
  const items = [...coins, ...coins];
  return (
    <div className={`ticker ${reverse ? 'ticker--reverse' : ''}`} aria-label="Market prices">
      <div className="ticker__track">
        {items.map((c, i) => (
          <span className="ticker__item" key={i} aria-hidden={i >= coins.length}>
            <span className="ticker__dot" style={{ background: c.color }} />
            <span className="ticker__sym">{c.sym}</span>
            <span className="ticker__price">{c.price}</span>
            <span className={`ticker__chg ${c.change.startsWith('-') ? 'is-down' : ''}`}>{c.change}</span>
            <span className="ticker__sep">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
