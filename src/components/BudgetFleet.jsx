import { useMemo, useState } from 'react';
import { market, miners } from '../data/content.js';
import { btcPerDay, minerMonthly, num, DAYS } from '../lib/mining.js';
import { Hud, Eyebrow, rounded } from './Hud.jsx';
import { useSpot } from '../data/livePrice.js';
import Icon from './Icon.jsx';

const PRESETS = [25000, 50000, 100000, 250000, 500000, 1000000];
const MIN = 1000;
const MAX = 1000000;
const RATE = 0.065;
const INSTALL_FEE = 95; // per unit, placeholder
const btcMiners = miners.filter((m) => m.available && !m.scrypt);

// Log-scale slider so small and large budgets are both easy to pick.
// Linear track from $0 to $1M, as in the reference ($100k sits about a tenth of the way along).
const toSlider = (v) => Math.min(100, (v / MAX) * 100);
const fromSlider = (p) => Math.max(MIN, Math.round(((p / 100) * MAX) / 1000) * 1000);
const short = (v) => (v >= 1e6 ? `$${v / 1e6}M` : `$${v / 1000}k`);

function fleetFor(miner, budget) {
  const unit = miner.price + INSTALL_FEE;
  const qty = Math.max(1, Math.floor(budget / unit));
  return { miner, qty, unit };
}

function fleetNumbers({ miner, qty, unit }, btcPrice = market.btcPrice) {
  const btcMonth = btcPerDay({ hashrateTh: miner.hashrate }) * DAYS * qty;
  const { costs } = minerMonthly(miner, RATE);
  return {
    btcMonth,
    atHigh: btcMonth * market.btcHigh12m,
    atSpot: btcMonth * btcPrice,
    hosting: costs * qty,
    total: unit * qty,
    hashrate: miner.hashrate * qty,
  };
}

const liveDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 10);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

// Fleet card outline: big chamfers, a stepped tab across the top centre and a
// second inset outline, as in the reference.
function fleetShape(w, h) {
  const c = 30;
  const a = w * 0.3;
  const b = w * 0.7;
  const main = [
    `M0.75 ${c}`, `L${c} 0.75`, `L${a} 0.75`, `L${a + 12} 12`, `L${b - 12} 12`, `L${b} 0.75`,
    `L${w - c} 0.75`, `L${w - 0.75} ${c}`, `L${w - 0.75} ${h - c}`, `L${w - c} ${h - 0.75}`,
    `L${c} ${h - 0.75}`, `L0.75 ${h - c}`, 'Z',
  ].join(' ');
  const i = 9;
  const inner = [
    `M${i} ${c + 4}`, `L${c + 4} ${i}`, `L${a - 6} ${i}`, `L${a + 8} ${i + 13}`, `L${b - 8} ${i + 13}`, `L${b + 6} ${i}`,
    `L${w - c - 4} ${i}`, `L${w - i} ${c + 4}`, `L${w - i} ${h - c - 4}`, `L${w - c - 4} ${h - i}`,
    `L${c + 4} ${h - i}`, `L${i} ${h - c - 4}`, 'Z',
  ].join(' ');
  return {
    main,
    fill: 'rgba(5, 15, 18, 0.72)',
    hair: [inner],
    late: [`M${a + 20} 5 L${b - 20} 5`],
  };
}

export default function BudgetFleet() {
  const [budget, setBudget] = useState(100000);
  const [custom, setCustom] = useState('');
  const customShown = custom || String(budget);
  const [qtyOverride, setQtyOverride] = useState(null);
  const [showCosts, setShowCosts] = useState(false);

  const ranked = useMemo(
    () =>
      btcMiners
        .map((m) => fleetFor(m, budget))
        .map((f) => ({ ...f, score: minerMonthly(f.miner, RATE).net / f.unit }))
        .sort((a, b) => b.score - a.score),
    [budget]
  );

  const best = { ...ranked[0], qty: qtyOverride ?? ranked[0].qty };
  const spot = useSpot(market.btcPrice);
  const n = fleetNumbers(best, spot);
  const others = ranked.slice(1);

  const pick = (v) => {
    setBudget(Math.min(MAX, Math.max(MIN, v)));
    setQtyOverride(null);
  };

  return (
    <section className="section" id="budget">
      <div className="container budget">
        <div className="budget__left">
          <Eyebrow>Start with your number</Eyebrow>
          <h2 className="h-section h-section--xl budget__title">
            What does <br className="br-lg" />
            <span className="accent">${num(budget)}</span> <br className="br-lg" />
            buy today?
          </h2>

          <label className="field-label" htmlFor="budget-range">Budget (USD)</label>
          <input
            id="budget-range"
            type="range"
            className="range"
            min="0"
            max="100"
            step="0.1"
            value={toSlider(budget)}
            style={{ '--fill': `${toSlider(budget)}%` }}
            onChange={(e) => pick(fromSlider(+e.target.value))}
          />
          <div className="chips">
            {PRESETS.map((p) => (
              <button key={p} className={`chip ${budget === p ? 'is-active' : ''}`} onClick={() => pick(p)}>
                {short(p)}
              </button>
            ))}
            <input
              className="chip chip--input"
              inputMode="numeric"
              placeholder="Custom"
              aria-label="Custom budget"
              value={customShown}
              onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ''))}
              onBlur={() => custom && pick(+custom)}
              onKeyDown={(e) => e.key === 'Enter' && custom && pick(+custom)}
            />
          </div>

          <Hud className="stock-card" shape={(w, h) => ({ main: rounded(w, h, 26, 0.75), fill: 'rgba(5, 16, 18, 0.7)' })}>
            <img src="img/machines-strip.webp" alt="A selection of in-stock ASIC miners" loading="lazy" />
            <div className="stock-card__row">
              <div>
                <p className="stock-card__count">
                  <span className="accent">43</span> models in stock today
                </p>
                <p className="muted small">Bitmain · Bitdeer · MicroBT · from $885</p>
              </div>
              <a href="#miners" className="caps-btn">
                Browse all 43 <Icon name="arrow" size={20} />
              </a>
            </div>
          </Hud>

          <a href="#contact" className="token-card">
            <span className="token-card__badge">S23</span>
            <span>
              <strong>Own hashrate as S23.</strong> Put ${num(budget)} into the token instead, with no machine to <br className="br-lg" />
              buy or look after.
            </span>
            <Icon name="arrow" size={18} />
          </a>
        </div>

        <div className="budget__right">
          <Hud className="fleet-card" shape={fleetShape}>
            <div className="fleet-card__top">
              <p className="mono-label">Best fleet for ${num(budget)}</p>
              <span className="live-pill"><span className="pill__dot" /> Live by {liveDate()}</span>
            </div>
            <p className="fleet-card__value">
              ${num(n.atHigh)} <span>a month</span>
            </p>
            <ul className="fleet-card__notes">
              <li>at the 12-month high of ${num(market.btcHigh12m)} <Icon name="info" size={14} className="fleet-card__info" /></li>
              <li>≈ ${num(n.atSpot)} at today’s ${num(spot)}</li>
              <li>{n.btcMonth.toFixed(4)} BTC a month</li>
            </ul>
            <hr className="rule-dashed" />
            <div className="fleet-line">
              <div className="fleet-line__thumb">
                <img src={best.miner.image} alt="" />
                <span>×{best.qty}</span>
              </div>
              <div className="fleet-line__body">
                <p className="fleet-line__name">
                  {best.qty} × {best.miner.name}
                </p>
                <p className="mono small muted">
                  {num(n.hashrate)} TH/s · ${num(n.total)} to buy and install
                </p>
                <p className="mono small muted">≈ ${num(n.hosting)} a month hosting at {(RATE * 100).toFixed(1)}¢/kWh</p>
              </div>
              <div className="stepper" aria-label="Quantity">
                <button aria-label="Decrease" onClick={() => setQtyOverride(Math.max(1, best.qty - 1))}>
                  <Icon name="minus" size={16} />
                </button>
                <output>{best.qty}</output>
                <button aria-label="Increase" onClick={() => setQtyOverride(best.qty + 1)}>
                  <Icon name="plus" size={16} />
                </button>
              </div>
            </div>
            <div className="btn-row">
              <a href="#contact" className="caps-btn caps-btn--solid">
                <Icon name="whatsapp" size={30} strokeWidth={1.5} /> Reserve on WhatsApp
              </a>
              <a href="#miners" className="caps-btn caps-btn--lg">
                <Icon name="cart" size={26} strokeWidth={1.5} /> Buy now
              </a>
            </div>
          </Hud>

          <div className="fleet-alt">
            <p className="muted small">Also fits your budget:</p>
            <div className="fleet-alt__list">
              {others.map((o) => (
                <span className="mono small fleet-alt__item" key={o.miner.id}>
                  {o.qty} × {o.miner.name} · {fleetNumbers(o).btcMonth.toFixed(4)} BTC
                </span>
              ))}
            </div>
            <button className="link-btn" onClick={() => setShowCosts((v) => !v)} aria-expanded={showCosts}>
              Machines, installation and VAT <Icon name="chevronDown" size={14} />
            </button>
            {showCosts && (
              <dl className="cost-breakdown small">
                <div><dt>Machines</dt><dd>${num(best.miner.price * best.qty)}</dd></div>
                <div><dt>Installation</dt><dd>${num(INSTALL_FEE * best.qty)}</dd></div>
                <div><dt>VAT</dt><dd>Calculated at checkout</dd></div>
              </dl>
            )}
            <p className="muted small fleet-alt__fine">
              Slots open in 9 centres · 95% uptime target · pool fees not included
              <br />
              Ranked by return per dollar of the total price, among machines in stock today.{' '}
              <a href="#calculator">How we calculate</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
