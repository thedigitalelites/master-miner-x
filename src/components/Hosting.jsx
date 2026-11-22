import { hostingFeatures, hostingIncludes } from '../data/content.js';
import { Hud, OctBadge, Eyebrow, chamfer } from './Hud.jsx';
import Icon from './Icon.jsx';

// Feature tile (traced from the reference): the top edge is highest on the
// left third, dips across the middle and steps half way back up on the right;
// glowing segments on the top-left, bottom-left and lower right side.
const chipShape = (w, h) => {
  const c = 15;
  const a = w * 0.31;
  const b = w * 0.8;
  return {
    main: [
      `M0.75 ${c}`, `L${c} 0.75`, `L${a} 0.75`, `L${a + 14} 12`, `L${b} 12`, `L${b + 6} 7`, `L${w - 9} 7`, `L${w - 0.75} ${c}`,
      `L${w - 0.75} ${h - c}`, `L${w - c} ${h - 0.75}`, `L${c} ${h - 0.75}`, `L0.75 ${h - c}`, 'Z',
    ].join(' '),
    fill: 'rgba(6, 18, 21, 0.72)',
    late: [`M${c + 2} 2 L${a - 2} 2`, `M${c} ${h - 1.5} L${w * 0.3} ${h - 1.5}`, `M${w - 1.5} ${h * 0.6} L${w - 1.5} ${h - c - 2}`],
  };
};

// Price card (traced from the reference): high corners with the middle of the
// top and bottom edges set in, a glowing bar in each dip, an inset second
// outline, and glowing bars on the sides.
const priceShape = (w, h) => {
  const c = 44;
  const a = w * 0.34;
  const b = w * 0.74;
  const d = 12;
  const i = 30;
  return {
    main: [
      `M0.75 ${c}`, `L${c} 0.75`, `L${a} 0.75`, `L${a + d} ${d}`, `L${b - d} ${d}`, `L${b} 0.75`, `L${w - c} 0.75`, `L${w - 0.75} ${c}`,
      `L${w - 0.75} ${h - c}`, `L${w - c} ${h - 0.75}`, `L${b} ${h - 0.75}`, `L${b - d} ${h - d}`, `L${a + d} ${h - d}`, `L${a} ${h - 0.75}`,
      `L${c} ${h - 0.75}`, `L0.75 ${h - c}`, 'Z',
    ].join(' '),
    fill: 'rgba(5, 15, 18, 0.78)',
    hair: [chamfer(w, h, [c - 12, c - 12, c - 12, c - 12], i)],
    late: [`M${w * 0.36} ${d + 4} L${w * 0.61} ${d + 4}`, `M${w * 0.32} ${h - d - 4} L${w * 0.58} ${h - d - 4}`],
    accent: [`M${w + 4} ${h * 0.3} L${w + 4} ${h * 0.62}`, `M-4 ${h * 0.3} L-4 ${h * 0.4}`],
  };
};

const quoteShape = (w, h) => ({
  main: chamfer(w, h, [22, 22, 22, 22], 0.75),
  fill: 'rgba(6, 22, 25, 0.75)',
  hair: [chamfer(w, h, [18, 18, 18, 18], 7)],
  tracer: false,
});

export default function Hosting() {
  return (
    <section className="section" id="hosting">
      <div className="container hosting">
        <div className="hosting__left">
          <header className="section-head">
            <Eyebrow>ASIC hosting</Eyebrow>
            <h2 className="h-section">
              Enterprise hosting <br />
              <span className="accent">built for performance</span>
            </h2>
            <p className="lead">
              Host your miners in secure enterprise facilities while our engineers manage installation, monitoring,
              maintenance, and infrastructure.
            </p>
          </header>
          <ul className="hosting__features">
            {hostingFeatures.map(([icon, label]) => (
              <li key={label}>
                <Hud className="feature-chip" shape={chipShape}>
                  <OctBadge size={60}><Icon name={icon} size={34} strokeWidth={1.4} /></OctBadge>
                  <span>{label}</span>
                </Hud>
              </li>
            ))}
          </ul>
        </div>

        <Hud className="price-card" shape={priceShape}>
          <p className="mono-label price-card__label">
            Hosting pricing <span className="price-card__line" aria-hidden="true" />
          </p>
          <p className="muted">Starting from</p>
          <p className="price-card__value">
            $0.066 <span>/kWh</span>
          </p>
          <hr className="rule-dot" />
          <p className="muted">Package includes</p>
          <ul className="check-list">
            {hostingIncludes.map((i) => (
              <li key={i}>
                <Icon name="checkCircle" size={26} strokeWidth={1.4} /> {i}
              </li>
            ))}
          </ul>
          <Hud as="a" href="#contact" className="quote-btn" shape={quoteShape}>
            Request a Mining Quote <Icon name="arrow" size={30} strokeWidth={1.6} />
          </Hud>
        </Hud>
      </div>
    </section>
  );
}
