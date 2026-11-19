import { tickerCoins } from '../data/content.js';

export default function Ticker({ reverse = false }) {
  const items = [...tickerCoins, ...tickerCoins];
  return (
    <div className={`ticker ${reverse ? 'ticker--reverse' : ''}`} aria-label="Market prices">
      <div className="ticker__track">
        {items.map((c, i) => (
          <span className="ticker__item" key={i} aria-hidden={i >= tickerCoins.length}>
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
