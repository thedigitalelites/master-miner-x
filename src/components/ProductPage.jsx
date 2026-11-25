import { useMemo, useState } from 'react';
import { miners, market, hostingTiers, productInfo } from '../data/content.js';
import { usd, num } from '../lib/mining.js';
import Icon from './Icon.jsx';

const POOL_FEE = 0.01;

function getMiner() {
  const id = new URLSearchParams(window.location.search).get('miner');
  return miners.find((m) => m.id === id) || miners[0];
}

function Accordion({ title, children, open, onToggle }) {
  return (
    <div className={`pp-acc ${open ? 'is-open' : ''}`}>
      <button className="pp-acc__head" onClick={onToggle} aria-expanded={open}>
        <span>{title}</span>
        <Icon name={open ? 'minus' : 'plus'} size={18} />
      </button>
      {open && <div className="pp-acc__body">{children}</div>}
    </div>
  );
}

export default function ProductPage() {
  const miner = useMemo(getMiner, []);
  const short = miner.name.replace('Antminer ', '');
  const [qty, setQty] = useState(1);
  const [slide, setSlide] = useState(0);
  const [spin, setSpin] = useState(false);
  const [open, setOpen] = useState(null);
  const [units, setUnits] = useState(1);
  const [rate, setRate] = useState(0.08);

  const photo = miner.id === 's21j-xp-hydro' ? 'img/product-s21j-xp-hydro.webp' : miner.cooling === 'Hydro' ? 'img/card-hydro.webp' : 'img/card-air.webp';
  const isExact = miner.id === 's21j-xp-hydro';

  // Earnings for the chosen units at today's hashprice (pool fee taken first),
  // hosting billed per kWh for the hours the machine runs.
  const e = useMemo(() => {
    const u = Math.max(0, +units || 0);
    const revenue = miner.scrypt ? miner.revenuePerDay * u : miner.hashrate * market.hashprice * (1 - POOL_FEE) * u;
    const hosting = (miner.power / 1000) * 24 * rate * u;
    return [1, 30, 365].map((d) => ({ revenue: revenue * d, hosting: -hosting * d, net: (revenue - hosting) * d }));
  }, [miner, units, rate]);

  const toggle = (k) => setOpen((o) => (o === k ? null : k));
  const unit = miner.unit || 'TH/s';

  return (
    <section className="pp" id="product">
      <nav className="pp-crumbs" aria-label="Breadcrumb">
        <a href="./">Home</a>
        <Icon name="chevronRight" size={12} />
        <a href="./#miners">Bitcoin Miners</a>
        <Icon name="chevronRight" size={12} />
        <span aria-current="page">{miner.name}</span>
      </nav>

      <div className="pp-gallery">
        <div className="pp-rail" role="tablist" aria-label="Product images">
          {[0, 1, 2, 3, 4].map((i) => (
            <button key={i} role="tab" aria-selected={slide === i} aria-label={`Image ${i + 1}`} className={`pp-rail__item ${i === 0 ? 'pp-rail__item--sq' : ''}`} onClick={() => setSlide(i % 3)} />
          ))}
        </div>
        <div className={`pp-photo ${isExact ? 'is-exact' : ''} ${spin ? 'is-spinning' : ''} slide-${slide}`}>
          <img src={photo} alt={miner.name} width="420" height="405" decoding="async" fetchPriority="high" />
        </div>
        <button className="pp-360" aria-pressed={spin} aria-label="Rotate view" onClick={() => setSpin((v) => !v)} />
        <div className="pp-dots" role="tablist" aria-label="Slides">
          {[0, 1, 2].map((i) => (
            <button key={i} role="tab" aria-selected={slide === i} aria-label={`Slide ${i + 1}`} className={slide === i ? 'is-active' : ''} onClick={() => setSlide(i)} />
          ))}
        </div>
      </div>

      <div className="pp-info">
        <p className="pp-brand">{miner.brand}</p>
        <h1 className="pp-title">{miner.name} ({miner.hashrate} {unit})</h1>
        <p className="pp-desc">{productInfo.description(miner)}</p>
        <p className="pp-price">{usd(miner.price)}</p>
        <p className="pp-plan">
          or as low as <a href="#contact">${miner.monthly}/mo</a> on a payment plan through our sales team
        </p>
        <div className="pp-buy">
          <div className="pp-qty" aria-label="Quantity">
            <button aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))}>–</button>
            <output>{qty}</output>
            <button aria-label="Increase" onClick={() => setQty((q) => q + 1)}>+</button>
          </div>
          <a className="pp-btn pp-btn--solid" href="#contact">Add to cart</a>
          <a className="pp-btn" href="#contact">Talk to sales</a>
        </div>
        <p className="pp-trial">
          Not ready to buy? <a href="#contact">Try a miner free for 7 days</a>
        </p>
      </div>

      <div className="pp-accs">
        <Accordion title="Bundle pricing" open={open === 'b'} onToggle={() => toggle('b')}>
          <table className="pp-table">
            <tbody>
              {productInfo.bundles.map(([label, f]) => (
                <tr key={label}><td>{label}</td><td>{usd(miner.price * f)} each</td></tr>
              ))}
            </tbody>
          </table>
          <p className="pp-note">Sample bundle pricing. Ask our sales team for a written quote.</p>
        </Accordion>
        <Accordion title="Specs" open={open === 's'} onToggle={() => toggle('s')}>
          <table className="pp-table">
            <tbody>
              <tr><td>Hashrate</td><td>{miner.hashrate} {unit}</td></tr>
              <tr><td>Power</td><td>{num(miner.power)} W</td></tr>
              {!miner.scrypt && <tr><td>Efficiency</td><td>{(miner.power / miner.hashrate).toFixed(1)} J/TH</td></tr>}
              <tr><td>Cooling</td><td>{miner.cooling}</td></tr>
              <tr><td>Algorithm</td><td>{miner.scrypt ? 'Scrypt' : 'SHA-256'}</td></tr>
            </tbody>
          </table>
        </Accordion>
        <Accordion title="How it works" open={open === 'h'} onToggle={() => toggle('h')}>
          <ol className="pp-list">{productInfo.howItWorks.map((t) => <li key={t}>{t}</li>)}</ol>
        </Accordion>
        <Accordion title="Repairs & protection" open={open === 'r'} onToggle={() => toggle('r')}>
          <ul className="pp-list">{productInfo.repairs.map((t) => <li key={t}>{t}</li>)}</ul>
        </Accordion>
      </div>

      <div className="pp-earn">
        <p className="pp-earn__eyebrow">Estimated earnings</p>
        <h2 className="pp-earn__title">What the {short} earns today.</h2>
        <label className="pp-field pp-field--units">
          <span>Units</span>
          <input type="text" inputMode="numeric" value={units} onChange={(ev) => setUnits(ev.target.value.replace(/[^\d]/g, ''))} />
        </label>
        <label className="pp-field pp-field--rate">
          <span>Hosting rate</span>
          <select value={rate} onChange={(ev) => setRate(+ev.target.value)}>
            {[0.08, ...hostingTiers.map((t) => t.rate)].filter((v, i, a) => a.indexOf(v) === i).map((r) => (
              <option key={r} value={r}>${r.toFixed(r === 0.08 ? 2 : 3)}/kWh</option>
            ))}
          </select>
          <Icon name="chevronDown" size={16} />
        </label>
        <p className="pp-links">
          <a href="./#calculator">Run your own numbers in the mining calculator</a>
          <a href="./#miners">Compare ASIC miner profitability</a>
        </p>
        <p className="pp-fine">
          Estimates only. Uses today's hashprice of ${market.hashprice} per TH per day, less the 1% pool fee the pool takes
          before paying out, and a ${rate.toFixed(2)} per kWh hosting fee billed only for the hours the machine is hashing.
          Revenue moves with Bitcoin's price, network difficulty and hashprice.
        </p>
      </div>

      <div className="pp-table-card">
        <p className="pp-table-card__label">{units || 0} unit{+units === 1 ? '' : 's'} · Today's hashprice</p>
        <table className="pp-earn-table">
          <thead>
            <tr><th /><th>Day</th><th>Month</th><th>Year</th></tr>
          </thead>
          <tbody>
            <tr><td>Revenue</td>{e.map((c, i) => <td key={i}>{usd(c.revenue)}</td>)}</tr>
            <tr className="is-fee"><td>Hosting fee</td>{e.map((c, i) => <td key={i}>{usd(c.hosting)}</td>)}</tr>
            <tr className="is-net"><td>Net earnings</td>{e.map((c, i) => <td key={i}>{usd(c.net)}</td>)}</tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
