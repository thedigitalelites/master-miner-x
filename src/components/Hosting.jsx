import { hostingFeatures, hostingIncludes } from '../data/content.js';
import { Hud, OctBadge, Eyebrow, chamfer } from './Hud.jsx';
import Icon from './Icon.jsx';

// Feature tile: chamfered, a raised tab along the top and a glowing foot on the left.
const chipShape = (w, h) => ({
  main: [
    `M0.75 18`, `L10 8`, `L${w * 0.22} 8`, `L${w * 0.22 + 8} 0.75`, `L${w * 0.82} 0.75`, `L${w * 0.82 + 8} 8`,
    `L${w - 10} 8`, `L${w - 0.75} 18`, `L${w - 0.75} ${h - 14}`, `L${w - 14} ${h - 0.75}`, `L14 ${h - 0.75}`, `L0.75 ${h - 14}`, 'Z',
  ].join(' '),
  fill: 'rgba(6, 18, 21, 0.72)',
  late: [`M3 ${h - 1} L${w * 0.25} ${h - 1}`, `M${w - 1} ${h - 30} L${w - 1} ${h - 14}`],
  hair: [`M${w * 0.22 + 14} 5 L${w * 0.5} 5`],
});

// Price card: heavy chamfers, a raised tab across the top, an inset inner
// frame with a step under the label, and glowing bars on the edges.
const priceShape = (w, h) => {
  const c = 44;
  const a = w * 0.3;
  const b = w * 0.76;
  const i = 38;
  const ic = 28;
  return {
    main: [
      `M0.75 ${c + 10}`, `L${c} 10`, `L${a} 10`, `L${a + 10} 0.75`, `L${b} 0.75`, `L${b + 10} 10`, `L${w - c} 10`,
      `L${w - 0.75} ${c + 10}`, `L${w - 0.75} ${h - c}`, `L${w - c} ${h - 0.75}`, `L${c} ${h - 0.75}`, `L0.75 ${h - c}`, 'Z',
    ].join(' '),
    fill: 'rgba(5, 15, 18, 0.78)',
    hair: [
      [
        `M${i} ${i + ic + 14}`, `L${i + ic} ${i + 14}`, `L${w * 0.44} ${i + 14}`, `L${w * 0.44 + 18} ${i + 32}`, `L${w * 0.64} ${i + 32}`,
        `L${w * 0.64 + 18} ${i + 14}`, `L${w - i - ic} ${i + 14}`, `L${w - i} ${i + ic + 14}`, `L${w - i} ${h - i - ic}`,
        `L${w - i - ic} ${h - i}`, `L${w * 0.62} ${h - i}`, `L${w * 0.6} ${h - i + 8}`, `L${w * 0.4} ${h - i + 8}`, `L${w * 0.38} ${h - i}`,
        `L${i + ic} ${h - i}`, `L${i} ${h - i - ic}`, 'Z',
      ].join(' '),
    ],
    late: [`M${w * 0.32} 4 L${w * 0.68} 4`, `M${w * 0.3} ${h - 4} L${w * 0.7} ${h - 4}`],
    accent: [`M${w + 4} ${h * 0.32} L${w + 4} ${h * 0.6}`, `M-4 ${h * 0.25} L-4 ${h * 0.35}`],
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
                  <OctBadge size={56}><Icon name={icon} size={30} strokeWidth={1.3} /></OctBadge>
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
