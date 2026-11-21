import { useMemo, useState } from 'react';
import { market, miners } from '../data/content.js';
import { btcPerDay, usd, num, DAYS } from '../lib/mining.js';
import { Hud, OctBadge, chamfer } from './Hud.jsx';
import Icon from './Icon.jsx';

const calcMiners = miners.filter((m) => !m.scrypt);
const PAYBACK_SCALE = 36; // months shown on the payback bar

const marketDefaults = () => ({
  btcPrice: market.btcPrice,
  difficulty: market.difficulty,
});

const setupDefaults = (m = calcMiners[0]) => ({
  minerId: m.id,
  qty: 1,
  unitPrice: m.price,
  hostingRate: 0.07,
  poolFee: 1,
  uptime: 95,
  txFees: 2,
});

function Field({ label, icon, children, hint }) {
  return (
    <label className={`calc-field ${icon ? 'calc-field--icon' : ''}`}>
      {icon && <OctBadge size={40} className="calc-field__badge"><Icon name={icon} size={20} strokeWidth={1.4} /></OctBadge>}
      <span className="calc-field__label">{label}</span>
      <span className="calc-field__control">{children}</span>
      {hint && <span className="calc-field__hint">{hint}</span>}
    </label>
  );
}

// ---- frame shapes ----
// Main input panel: chamfered, with a bright bracket lifting off the top-left corner.
const setupShape = (w, h) => ({
  main: chamfer(w, h, [22, 22, 22, 22], 0.75),
  fill: 'rgba(5, 15, 18, 0.74)',
  hair: [chamfer(w, h, [16, 16, 16, 16], 14)],
  accent: [`M-6 70 L-6 26 L18 2`, `M${w + 5} ${h * 0.42} L${w + 5} ${h * 0.5}`],
  late: [`M${w * 0.62} ${h + 0.5} L${w - 30} ${h + 0.5}`],
});
// Result panels: chamfered with small raised tabs on the top edge and glowing side bars.
const resultShape = (w, h) => ({
  main: [
    `M0.75 22`, `L22 0.75`, `L${w * 0.17} 0.75`, `L${w * 0.17 + 6} -5`, `L${w * 0.35} -5`, `L${w * 0.35 + 6} 0.75`,
    `L${w * 0.75} 0.75`, `L${w * 0.75 + 6} -5`, `L${w * 0.86} -5`, `L${w * 0.86 + 6} 0.75`, `L${w - 22} 0.75`,
    `L${w - 0.75} 22`, `L${w - 0.75} ${h - 22}`, `L${w - 22} ${h - 0.75}`, `L22 ${h - 0.75}`, `L0.75 ${h - 22}`, 'Z',
  ].join(' '),
  fill: 'rgba(5, 15, 18, 0.74)',
  hair: [chamfer(w, h, [16, 16, 16, 16], 12)],
  accent: [`M${w + 5} 50 L${w + 5} 90`, `M${w + 5} ${h * 0.62} L${w + 5} ${h * 0.7}`],
  late: [`M${w * 0.2} ${h + 0.5} L${w * 0.72} ${h + 0.5}`],
});
const btnShape = (w, h) => ({ main: chamfer(w, h, [12, 12, 12, 12], 0.75), fill: 'rgba(6, 20, 23, 0.8)', tracer: false });
const periodShape = (w, h) => ({ main: chamfer(w, h, [10, 10, 10, 10], 0.75), fill: 'rgba(6, 18, 21, 0.8)', tracer: false });

function NumInput({ value, onChange, step = 'any', disabled }) {
  return (
    <input
      type="number"
      inputMode="decimal"
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value === '' ? '' : +e.target.value)}
    />
  );
}

export default function MiningCalculator() {
  const [setup, setSetup] = useState(setupDefaults());
  const [mkt, setMkt] = useState(marketDefaults());
  const [showMath, setShowMath] = useState(false);

  const miner = calcMiners.find((m) => m.id === setup.minerId);
  const set = (k) => (v) => setSetup((s) => ({ ...s, [k]: v }));

  const r = useMemo(() => {
    const qty = Math.max(0, +setup.qty || 0);
    const hashrate = miner.hashrate * qty;
    const power = miner.power * qty;
    const btcDay = btcPerDay({
      hashrateTh: hashrate,
      difficulty: +mkt.difficulty || 1,
      subsidy: market.blockSubsidy,
      txFeePct: +setup.txFees || 0,
      uptimePct: +setup.uptime || 0,
      poolFeePct: 0,
    });
    const revenue = btcDay * (+mkt.btcPrice || 0);
    const poolFees = revenue * ((+setup.poolFee || 0) / 100);
    const hosting = (power / 1000) * 24 * (+setup.hostingRate || 0) * ((+setup.uptime || 0) / 100);
    const profit = revenue - hosting - poolFees;
    const btcNet = btcDay * (1 - (+setup.poolFee || 0) / 100);
    const cost = (+setup.unitPrice || 0) * qty;
    const monthly = profit * DAYS;
    const payback = monthly > 0 ? cost / monthly : Infinity;
    const share = (v) => (revenue > 0 ? (v / revenue) * 100 : 0);
    return {
      hashrate, power, revenue, poolFees, hosting, profit, btcNet, cost,
      payback,
      shares: { hosting: share(hosting), pool: share(poolFees), net: Math.max(0, share(profit)) },
    };
  }, [setup, mkt, miner]);

  const months = (v) => (Number.isFinite(v) ? `${v.toFixed(1)} months` : 'Not profitable at these inputs');
  const signed = (v) => <span className={v >= 0 ? 'pos' : 'neg'}>{usd(v)}</span>;

  return (
    <section className="section" id="calculator">
      <div className="container">
        <header className="section-head section-head--center">
          <h2 className="h-section">Bitcoin Mining Calculator</h2>
          <p className="lead">
            Estimate mining profit and hardware payback using Bitcoin price, network difficulty, and your hosting rate.
          </p>
        </header>

        <div className="calc">
          {/* ---------- Inputs ---------- */}
          <Hud className="calc__panel calc__setup" shape={setupShape}>
            <h3 className="calc__title">Bitcoin mining setup</h3>
            <p className="muted small">Choose your miner and operating costs. Totals update with quantity.</p>

            <div className="calc__group">
              <div className="calc__group-head">
                <h4>Hardware setup</h4>
                <span className="tag tag--outline">Website price</span>
              </div>
              <Field label="Miner or bundle">
                <select
                  value={setup.minerId}
                  onChange={(e) => {
                    const m = calcMiners.find((x) => x.id === e.target.value);
                    setSetup((s) => ({ ...s, minerId: m.id, unitPrice: m.price }));
                  }}
                >
                  {calcMiners.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.hashrate}T)
                    </option>
                  ))}
                </select>
                <Icon name="chevronDown" size={16} className="select-caret" />
              </Field>
              <div className="calc__row">
                <Field label="Quantity">
                  <NumInput value={setup.qty} step="1" onChange={set('qty')} />
                </Field>
                <Field label="Unit price (USD)">
                  <NumInput value={setup.unitPrice} onChange={set('unitPrice')} />
                </Field>
              </div>
              <p className="calc-field__hint">Prefilled from website pricing. You can enter your own price.</p>
            </div>

            <div className="calc__group">
              <div className="calc__row">
                <Field label="Total hashrate (TH/s)" icon="hash">
                  <input value={num(r.hashrate)} disabled />
                </Field>
                <Field label="Total power (W)" icon="bolt">
                  <input value={num(r.power)} disabled />
                </Field>
                <Field label="Hosting rate (USD/kWh)" icon="dollar">
                  <NumInput value={setup.hostingRate} step="0.001" onChange={set('hostingRate')} />
                </Field>
                <Field label="Pool fee (%)" icon="coins">
                  <NumInput value={setup.poolFee} step="0.1" onChange={set('poolFee')} />
                </Field>
                <Field label="Uptime (%)" icon="clock">
                  <NumInput value={setup.uptime} step="1" onChange={set('uptime')} />
                </Field>
                <Field label="Transaction fees earned (%)" icon="receipt">
                  <NumInput value={setup.txFees} step="0.1" onChange={set('txFees')} />
                </Field>
              </div>
            </div>

            <div className="calc__group">
              <div className="calc__group-head">
                <h4><OctBadge size={40}><Icon name="bitcoin" size={20} strokeWidth={1.4} /></OctBadge> Bitcoin market assumptions</h4>
              </div>
              <div className="calc__row">
                <Field label="Bitcoin price (USD)" icon="bitcoin">
                  <NumInput value={mkt.btcPrice} onChange={(v) => setMkt((m) => ({ ...m, btcPrice: v }))} />
                </Field>
                <Field label="Network difficulty" icon="hash">
                  <NumInput value={mkt.difficulty} onChange={(v) => setMkt((m) => ({ ...m, difficulty: v }))} />
                </Field>
                <Field label="Block subsidy (BTC)" icon="coins">
                  <input value={market.blockSubsidy} disabled />
                </Field>
                <p className="calc-field__hint calc__note">
                  Market values are editable assumptions. This snapshot holds market conditions constant.
                </p>
              </div>
            </div>

            <div className="btn-row btn-row--split">
              <Hud as="button" className="calc-btn" shape={btnShape} onClick={() => setMkt(marketDefaults())}>
                <Icon name="refresh" size={20} /> Refresh
              </Hud>
              <Hud
                as="button"
                className="calc-btn"
                shape={btnShape}
                onClick={() => {
                  setSetup(setupDefaults());
                  setMkt(marketDefaults());
                }}
              >
                <Icon name="reset" size={20} /> Reset
              </Hud>
            </div>
          </Hud>

          {/* ---------- Results ---------- */}
          <div className="calc__results">

            <Hud className="calc__panel calc__profit" shape={resultShape}>
              <h3 className="calc__title">
                <Icon name="dollar" size={24} /> Profit breakdown <small>(USD)</small>
              </h3>
              <p className="mono-label mono-label--muted">Daily totals</p>
              <dl className="ledger">
                <div><dt><Icon name="trend" size={16} /> Daily revenue</dt><dd>{usd(r.revenue)}</dd></div>
                <div><dt><Icon name="bolt" size={16} /> Daily hosting cost</dt><dd className="neg">{usd(-r.hosting)}</dd></div>
                <div><dt><Icon name="coins" size={16} /> Daily pool fees</dt><dd className="neg">{usd(-r.poolFees)}</dd></div>
                <div className="ledger__total"><dt><Icon name="arrowDiag" size={16} /> Daily profit</dt><dd>{signed(r.profit)}</dd></div>
              </dl>

              <p className="mono-label mono-label--muted">Revenue distribution</p>
              <div className="dist-bar" aria-hidden="true">
                <span className="dist-bar__hosting" style={{ width: `${Math.min(100, r.shares.hosting)}%` }} />
                <span className="dist-bar__pool" style={{ width: `${r.shares.pool}%` }} />
                <span className="dist-bar__net" style={{ width: `${r.shares.net}%` }} />
              </div>
              <div className="dist-legend">
                <div><span>Hosting cost <b className="neg">{usd(r.hosting)}</b></span><small>{r.shares.hosting.toFixed(1)}% of revenue</small></div>
                <div><span>Pool fees <b>{usd(r.poolFees)}</b></span><small>{r.shares.pool.toFixed(1)}% of revenue</small></div>
                <div><span>Net profit <b className="pos">{usd(r.profit)}</b></span><small>{r.shares.net.toFixed(1)}% of revenue</small></div>
              </div>

              <div className="period-grid">
                {[['Daily', 1], ['Monthly', DAYS], ['Yearly', 365]].map(([label, mult]) => (
                  <Hud className="period" shape={periodShape} key={label}>
                    <small>{label}</small>
                    <b className={r.profit >= 0 ? 'pos' : 'neg'}>{usd(r.profit * mult)}</b>
                    <span className="gold">{(r.btcNet * mult).toFixed(8)} BTC</span>
                  </Hud>
                ))}
              </div>
              <p className="muted small">USD profit is after costs. BTC is mined after pool fees, before hosting sales.</p>

              <div className="payback">
                <p className="mono-label mono-label--muted">Hardware payback snapshot</p>
                <div className="payback__grid">
                  <div className="payback__box">
                    <small>Equipment cost</small>
                    <b>{usd(r.cost)}</b>
                  </div>
                  <div className="payback__box payback__box--wide">
                    <small>
                      <span className="accent">Payback</span> on equipment cost
                    </small>
                    <b>{months(r.payback)}</b>
                    <div className="payback__bar">
                      <span style={{ width: `${Math.min(100, (r.payback / PAYBACK_SCALE) * 100)}%` }} />
                    </div>
                    <div className="payback__scale"><span>0m</span><span>12m</span><span>24m</span><span>36m+</span></div>
                  </div>
                </div>
                <button className="link-btn small" onClick={() => setShowMath((v) => !v)} aria-expanded={showMath}>
                  <Icon name={showMath ? 'chevronDown' : 'chevronRight'} size={14} /> Snapshot assumptions and math
                </button>
                {showMath && (
                  <p className="muted small calc__expand mono">
                    BTC/day = hashrate × 86,400 × subsidy × (1 + tx fees) × uptime ÷ (difficulty × 2³²). Hosting/day =
                    kW × 24 × rate × uptime. Payback = equipment cost ÷ monthly profit.
                  </p>
                )}
              </div>
            </Hud>
          </div>
        </div>
      </div>
    </section>
  );
}
