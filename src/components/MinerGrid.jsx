import { useState } from 'react';
import { hostingTiers, miners } from '../data/content.js';
import { minerMonthly, usd, num } from '../lib/mining.js';
import { Eyebrow } from './Hud.jsx';
import Icon from './Icon.jsx';

function MinerCard({ miner, rate }) {
  const [variant, setVariant] = useState(0);
  const m = minerMonthly(miner, rate);
  return (
    <article className={`miner-card ${miner.available ? '' : 'is-soon'}`}>
      <div className="miner-card__media">
        {miner.tag && <span className="tag">{miner.tag}</span>}
        {miner.bundles && <span className="ribbon ribbon--corner" aria-hidden="true"><span>Bundles</span></span>}
        {!miner.available && <span className="tag tag--muted">Ships next batch</span>}
        <img src={miner.image} alt={miner.name} loading="lazy" />
      </div>
      <div className="miner-card__body">
        <p className="mono-label mono-label--muted">{miner.brand}</p>
        <h3 className="miner-card__name">{miner.name}</h3>
        <div className="miner-card__meta">
          {miner.variants ? (
            <div className="mini-chips" role="group" aria-label="Hashrate option">
              {miner.variants.map((v, i) => (
                <button key={v} className={i === variant ? 'is-active' : ''} onClick={() => setVariant(i)}>
                  {v}
                </button>
              ))}
            </div>
          ) : (
            <span className="muted">
              {miner.hashrate} {miner.unit}
            </span>
          )}
          {miner.bundles && (
            <a href="#contact" className="pill-btn pill-btn--xs">
              See bundle pricing <Icon name="arrow" size={12} />
            </a>
          )}
        </div>

        <div className="earn-box">
          <p className="mono-label mono-label--muted">
            Estimated net / month <Icon name="info" size={12} />
          </p>
          <p className="earn-box__net">
            {usd(m.net)} <span>after hosting</span>
          </p>
          <dl className="earn-box__grid">
            <div><dt>Revenue</dt><dd>{usd(m.revenue)}</dd></div>
            <div><dt>Costs</dt><dd>{usd(m.costs)}</dd></div>
            <div><dt>Est. payback</dt><dd>{m.payback ? `${m.payback} mo` : 'n/a'}</dd></div>
          </dl>
        </div>

        <div className="miner-card__price">
          <p className="miner-card__total">${num(miner.price)}</p>
          <p className="miner-card__plan">
            <small>Or pay monthly</small>
            <b>${miner.monthly}/mo</b>
            <small>24 mo · 50% down</small>
          </p>
        </div>

        <button className="btn btn--outline btn--block miner-card__cart" disabled={!miner.available}>
          <Icon name="cart" size={18} /> {miner.available ? 'Add to cart' : 'Reserve from next batch'}
        </button>
        <p className="miner-card__links">
          <a href="#calculator">View full specs</a>
          {miner.marketplace && (
            <>
              <span>·</span>
              <a href="#contact">Marketplace</a>
            </>
          )}
        </p>
      </div>
    </article>
  );
}

export default function MinerGrid() {
  const [rate, setRate] = useState(hostingTiers[3].rate);
  const [filter, setFilter] = useState('available');
  const list = filter === 'available' ? miners.filter((m) => m.available) : miners;

  return (
    <section className="section" id="miners">
      <div className="container">
        <div className="miners-head">
          <div>
            <Eyebrow>Order now</Eyebrow>
            <h2 className="h-section">
              Bitcoin Miners
              <br />
              Live by December 31
            </h2>
            <p className="muted">
              Prices use the rate your total load qualifies for. <a href="#hosting">See hosting tier details</a>
            </p>
          </div>
          <div className="miners-head__controls">
            <div className="tier-bar" role="radiogroup" aria-label="Hosting rate">
              {hostingTiers.map((t) => (
                <button
                  key={t.rate}
                  role="radio"
                  aria-checked={rate === t.rate}
                  className={rate === t.rate ? 'is-active' : ''}
                  onClick={() => setRate(t.rate)}
                >
                  <b>${t.rate.toFixed(3)}</b> · {t.label}
                  {rate === t.rate && <Icon name="arrow" size={14} />}
                </button>
              ))}
            </div>
            <a href="#contact" className="trial-btn">
              Free trial details <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>

        <div className="miners-filter">
          <div className="segmented segmented--lg" role="tablist" aria-label="Filter models">
            <button role="tab" aria-selected={filter === 'available'} className={filter === 'available' ? 'is-active' : ''} onClick={() => setFilter('available')}>
              Available to order
            </button>
            <button role="tab" aria-selected={filter === 'all'} className={filter === 'all' ? 'is-active' : ''} onClick={() => setFilter('all')}>
              All models
            </button>
          </div>
          <p className="muted small">
            Showing {list.length} of {miners.length} models
          </p>
        </div>

        <div className="miner-grid">
          {list.map((m) => (
            <MinerCard key={m.id} miner={m} rate={rate} />
          ))}
        </div>
      </div>
    </section>
  );
}
