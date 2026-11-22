import { market, stats, miners } from '../data/content.js';
import { num } from '../lib/mining.js';
import { Hud, Eyebrow, chamfer, rounded } from './Hud.jsx';
import Icon from './Icon.jsx';
import PriceChart from './PriceChart.jsx';

const featured = miners[0];

// Line icons for the stat bar: chip in a square, the rest in a ring.
export function StatIcon({ name }) {
  return (
    <span className={`stat-icon stat-icon--${name === 'chip' ? 'square' : name === 'shield' ? 'bare' : 'ring'}`} aria-hidden="true">
      <Icon name={name} size={name === 'shield' ? 50 : 32} strokeWidth={1.3} />
    </span>
  );
}

// ---- frame shapes (fixed-size corners at any width) ----
const roundShape = (r, fill) => (w, h) => ({ main: rounded(w, h, r, 0.75), fill });
const stepsShape = (w, h) => ({
  main: rounded(w, h, 14, 0.75),
  fill: 'rgba(7, 20, 23, 0.55)',
});
const minerShape = (w, h) => ({
  main: chamfer(w, h, [14, 0, 14, 14], 0.75),
  fill: 'rgba(8, 20, 23, 0.7)',
  late: [`M28 ${h + 6} L${w * 0.5} ${h + 6}`],
});
const photoShape = (w, h) => {
  const k = 26;
  const c = 10;
  return {
    main: chamfer(w, h, [c, c, c, c], 6),
    fill: 'rgba(6, 16, 19, 0.6)',
    late: [
      `M1.5 ${k + c} L1.5 ${c} L${c} 1.5 L${k + c} 1.5`,
      `M${w - k - c} 1.5 L${w - c} 1.5 L${w - 1.5} ${c} L${w - 1.5} ${k + c}`,
      `M${w - 1.5} ${h - k - c} L${w - 1.5} ${h - c} L${w - c} ${h - 1.5} L${w - k - c} ${h - 1.5}`,
      `M${k + c} ${h - 1.5} L${c} ${h - 1.5} L1.5 ${h - c} L1.5 ${h - k - c}`,
    ],
    over: (
      <g className="bhm-photo__progress" transform={`translate(${w * 0.12} ${h + 12})`}>
        <rect x="0" y="0" width={w * 0.17} height="3.5" rx="1" />
        {[0, 1, 2].map((i) => <rect key={i} x={w * 0.17 + 18 + i * 12} y="0" width="6" height="3.5" rx="1" />)}
      </g>
    ),
  };
};
const dashShape = (w, h) => ({
  main: chamfer(w, h, [14, 14, 14, 14], 0.75),
  fill: 'rgba(6, 16, 19, 0.8)',
  over: (
    <g className="wm-frame__dots">
      {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={w + 9} cy={h * 0.33 + i * 10} r="1.8" />)}
    </g>
  ),
});

function DashboardMock() {
  const tiles = [
    ['Running miners', '101'],
    ['Offline miners', '0'],
    ['Curtailed miners', '0'],
    ['Paused miners', '0'],
    ['In repair', '0'],
    ['Open repair tickets', '0 tickets'],
  ];
  return (
    <div className="dash" aria-hidden="true">
      <div className="dash__crumbs">
        <span>Dashboard</span> <span>›</span> <span>Client dashboard</span>
      </div>
      <div className="dash__bar">
        <span>Welcome to your mining dashboard</span>
        <span className="dash__chip">Health report</span>
      </div>
      <div className="dash__row">
        <div className="dash__tile dash__tile--wide">
          <small>Bitcoin price</small>
          <b>$64,182.00</b>
        </div>
        <div className="dash__tile dash__tile--wide">
          <small>Current hashrate</small>
          <b>1.00 PH/s <em>100%</em></b>
        </div>
      </div>
      <div className="dash__row dash__row--6">
        {tiles.map(([l, v]) => (
          <div className="dash__tile" key={l}>
            <small>{l}</small>
            <b>{v}</b>
          </div>
        ))}
      </div>
      <div className="dash__row dash__row--split">
        <div className="dash__tile dash__perf">
          <small>Hashrate performance</small>
          <div className="dash__bars">
            {[78, 80, 79, 82, 81, 84].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="dash__tile dash__earn">
          <small>Mining pool earnings</small>
          <b>₿ 0.21000000</b>
          <small>Est. earnings per day</small>
          <b>₿ 0.00080000</b>
        </div>
      </div>
    </div>
  );
}

export default function BuyHostMine() {
  return (
    <section className="section" id="buy-host-mine">
      <div className="container">
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <linearGradient id="bhm-stat-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0d2a2e" stopOpacity="0.75" />
              <stop offset="1" stopColor="#071518" stopOpacity="0.75" />
            </linearGradient>
          </defs>
        </svg>
        <div className="bhm-top">
          <div className="bhm-top__copy">
            <Eyebrow>Buy · Host · Mine</Eyebrow>
            <h2 className="h-section">
              Don’t just buy Bitcoin.
              <br />
              <span className="accent">Mine it.</span>
            </h2>
            <p className="lead">The number that makes mining worth doing, and the three steps that get you there.</p>
            <div className="grid-2 grid-2--tight">
              <Hud className="stat-card" shape={roundShape(14, 'url(#bhm-stat-fill)')}>
                <p className="stat-card__label">
                  Estimated production cost per BTC <Icon name="info" size={14} />
                </p>
                <p className="stat-card__value accent">${num(market.productionCost)}</p>
                <p className="stat-card__note">Antminer S23 Hydro at $0.065/kWh, for reference only.</p>
              </Hud>
              <Hud className="stat-card" shape={roundShape(14, 'url(#bhm-stat-fill)')}>
                <p className="stat-card__label">Spot Bitcoin price</p>
                <p className="stat-card__value">${num(market.spotPrice)}</p>
                <p className="stat-card__note">Live market price, updated on every load.</p>
              </Hud>
            </div>
          </div>
          <Hud className="bhm-top__chart" shape={roundShape(16, 'rgba(6, 17, 20, 0.72)')}>
            <PriceChart end={market.spotPrice} />
          </Hud>
        </div>

        <Hud className="steps" shape={stepsShape}>
          <ol className="steps__grid">
            <li className="step">
              <div className="step__head">
                <span className="step__num">01</span>
                <div>
                  <h3 className="h-card">Choose your miner</h3>
                  <p className="muted">Buy new, or browse client-listed machines that never leave the facility. No minimum quantity.</p>
                </div>
              </div>
              <Hud className="step__media featured-miner" shape={minerShape}>
                <span className="ribbon" aria-hidden="true"><span>Bundles</span></span>
                <div className="featured-miner__img">
                  <span className="tag">Featured miner</span>
                  <img src="img/miner-hydro-featured.webp" alt={featured.name} width="560" height="500" loading="lazy" decoding="async" />
                </div>
                <div className="featured-miner__body">
                  <p className="mono-label mono-label--muted">{featured.brand}</p>
                  <p className="featured-miner__name">{featured.name}</p>
                  <dl className="spec-row">
                    <div><dt>{featured.hashrate} TH/s</dt><dd>Hashrate</dd></div>
                    <div><dt>{Math.round(featured.power / featured.hashrate)} J/TH</dt><dd>Efficiency</dd></div>
                    <div><dt>{featured.cooling}</dt><dd>Cooling</dd></div>
                  </dl>
                  <div className="featured-miner__btns">
                    <a href="#miners" className="pill-btn pill-btn--solid">See bundle pricing</a>
                    <a href="#miners" className="pill-btn">View all miners</a>
                  </div>
                </div>
              </Hud>
            </li>
            <li className="step">
              <div className="step__head">
                <span className="step__num">02</span>
                <div>
                  <h3 className="h-card">We deploy and run it</h3>
                  <p className="muted">Racked in our own Iowa facilities. Power, cooling, networking, firmware and monitoring handled.</p>
                </div>
              </div>
              <Hud className="step__media step__photo" shape={photoShape}>
                <img src="img/deploy.webp" alt="Pallet of miners being moved into the facility" loading="lazy" />
              </Hud>
            </li>
            <li className="step">
              <div className="step__head">
                <span className="step__num">03</span>
                <div>
                  <h3 className="h-card">You monitor performance</h3>
                  <p className="muted">Track hashrate, uptime and rewards on the real dashboard. Rewards go to the wallet you choose.</p>
                </div>
              </div>
              <Hud className="step__media step__dash" shape={dashShape}>
                <DashboardMock />
              </Hud>
            </li>
          </ol>
        </Hud>

        <Hud className="stat-bar" shape={roundShape(14, 'rgba(7, 21, 24, 0.7)')}>
          {stats.map((s) => (
            <div className="stat-bar__item" key={s.label}>
              <StatIcon name={s.icon} />
              <div>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            </div>
          ))}
        </Hud>
      </div>
    </section>
  );
}
