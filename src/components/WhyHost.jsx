import { whyHost } from '../data/content.js';
import { Hud, chamfer } from './Hud.jsx';
import Icon from './Icon.jsx';

// All shapes below are traced from the reference at 1971px wide; the section
// scales them with the page, so these numbers are reference pixels.

// "Run the numbers" bar: thin outline with 15px corner cuts.
const barShape = (w, h) => ({
  main: chamfer(w, h, [15, 15, 15, 15], 0.75),
  fill: 'rgba(3, 13, 16, 0.55)',
});

// Calculator button: bright outline with 20px corner cuts.
const btnShape = (w, h) => ({ main: chamfer(w, h, [18, 18, 18, 18], 1), fill: 'rgba(4, 16, 19, 0.85)', tracer: false });

// Feature card: small corner cuts, a 12px-deep notch in the top edge under the
// icon, and a dashed rule 15px above the bottom edge.
const cardShape = (w, h) => {
  const s = w / 405;
  const a = 71 * s;
  const b = 80 * s;
  const c = 293 * s;
  const d = 303 * s;
  const y = h - 15;
  return {
    main: [
      `M0.75 16`, `L15 0.75`, `L${a} 0.75`, `L${b} 12`, `L${c} 12`, `L${d} 0.75`, `L${w - 15} 0.75`, `L${w - 0.75} 16`,
      `L${w - 0.75} ${h - 20}`, `L${w - 18} ${h - 0.75}`, `L15 ${h - 0.75}`, `L0.75 ${h - 17}`, 'Z',
    ].join(' '),
    fill: 'rgba(3, 14, 17, 0.72)',
    hair: [
      `M${64 * s} ${y} L${72 * s} ${y} M${81 * s} ${y} L${86 * s} ${y}`,
      `M${100 * s} ${y - 2} L${323 * s} ${y - 2} M${100 * s} ${y + 2} L${323 * s} ${y + 2}`,
      `M${337 * s} ${y} L${349 * s} ${y}`,
    ],
    over: (
      <g className="wm-frame__dots">
        <circle cx={140 * s} cy={-3} r="1.3" /><circle cx={146 * s} cy={-3} r="1.3" /><circle cx={150 * s} cy={1} r="1.1" />
        <circle cx={232 * s} cy={-3} r="1.3" /><circle cx={238 * s} cy={-3} r="1.3" /><circle cx={232 * s} cy={1} r="1.1" />
      </g>
    ),
  };
};

export default function WhyHost() {
  return (
    <section className="section" id="why-host">
      <div className="wh">
        <Hud className="wh-bar" shape={barShape}>
          <span className="wh-bar__icon"><Icon name="calculator" size={30} strokeWidth={1.5} /></span>
          <div className="wh-bar__text">
            <p className="wh-bar__title">Run the numbers on any machine</p>
            <p className="wh-bar__body">
              The figures above use today’s hashprice and the hosting rate you selected. Change the machine, the
              <br />
              rate or the fleet size and see exactly what it does to your monthly net.
            </p>
          </div>
          <Hud as="a" href="#calculator" className="wh-btn" shape={btnShape}>
            Bitcoin Mining Calculator <Icon name="arrow" size={20} strokeWidth={1.8} />
          </Hud>
        </Hud>

        <header className="wh-head">
          <p className="wh-eyebrow">Why Master Miner X</p>
          <h2 className="h-section">
            Why Buy and Host
            <br />
            With Master Miner X
          </h2>
          <p className="wh-lead">Every rig you buy is deployed, powered and maintained by our team in Iowa.</p>
          <span className="wh-rule" aria-hidden="true" />
        </header>

        <div className="wh-cards">
          {whyHost.map((f) => (
            <Hud className="wh-card feature-card" shape={cardShape} key={f.title}>
              <span className="wh-card__icon">
                <svg viewBox="0 0 66 63" preserveAspectRatio="none" aria-hidden="true">
                  <polygon points="10,0.75 56,0.75 65.25,10 65.25,53 56,62.25 10,62.25 0.75,53 0.75,10" />
                </svg>
                <Icon name={f.icon} size={36} strokeWidth={1.7} />
              </span>
              <h3 className="wh-card__title">{f.title}</h3>
              <p className="wh-card__body">
                {f.lines.map((l, i) => (
                  <span key={i}>{l}<br /></span>
                ))}
              </p>
            </Hud>
          ))}
        </div>
      </div>
    </section>
  );
}
