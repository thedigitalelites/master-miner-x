import { whyHost } from '../data/content.js';
import { Hud, OctBadge, Eyebrow, chamfer } from './Hud.jsx';
import Icon from './Icon.jsx';

// "Run the numbers" strip: long chamfered bar, soft corners.
const ctaShape = (w, h) => ({
  main: chamfer(w, h, [22, 22, 22, 22], 0.75),
  fill: 'rgba(4, 11, 13, 0.75)',
});

// Calculator button: angled octagon outline.
const btnShape = (w, h) => ({ main: chamfer(w, h, [16, 16, 16, 16], 0.75), fill: 'rgba(5, 16, 18, 0.9)', tracer: false });

// Feature card: chamfered body, a recessed tab under the icon on the top
// edge, and a dashed rule along the bottom.
const featureShape = (w, h) => {
  const t = 30;
  const c = 16;
  const m = w / 2;
  return {
    main: [
      `M0.75 ${t + c}`, `L${c} ${t}`, `L${m - 118} ${t}`, `L${m - 104} ${t + 12}`, `L${m - 44} ${t + 12}`,
      `M${m + 44} ${t + 12}`, `L${m + 104} ${t + 12}`, `L${m + 118} ${t}`, `L${w - c} ${t}`, `L${w - 0.75} ${t + c}`,
      `L${w - 0.75} ${h - c}`, `L${w - c} ${h - 0.75}`, `L${c} ${h - 0.75}`, `L0.75 ${h - c}`, `L0.75 ${t + c}`,
    ].join(' '),
    fill: 'rgba(6, 18, 21, 0.62)',
    late: [`M${m - 118} ${t} L${m - 44} ${t}`, `M${m + 44} ${t} L${m + 118} ${t}`],
    hair: [`M${w * 0.15} ${h - 14} L${w * 0.15 + 10} ${h - 14} M${w * 0.15 + 18} ${h - 14} L${w * 0.15 + 24} ${h - 14}`, `M${w * 0.24} ${h - 14} L${w * 0.82} ${h - 14}`, `M${w * 0.86} ${h - 14} L${w * 0.89} ${h - 14}`],
    over: (
      <g className="wm-frame__dots">
        <circle cx={m - 52} cy={t - 4} r="1.6" />
        <circle cx={m - 58} cy={t + 2} r="1.2" />
        <circle cx={m + 52} cy={t - 4} r="1.6" />
        <circle cx={m + 58} cy={t + 2} r="1.2" />
      </g>
    ),
  };
};

export default function WhyHost() {
  return (
    <section className="section section--circuit" id="why-host">
      <div className="container">
        <Hud className="inline-cta inline-cta--wide" shape={ctaShape}>
          <span className="sq-icon"><Icon name="calculator" size={30} strokeWidth={1.4} /></span>
          <p>
            <strong>Run the numbers on any machine</strong>
            The figures above use today’s hashprice and the hosting rate you selected. Change the machine, the rate
            or the fleet size and see exactly what it does to your monthly net.
          </p>
          <Hud as="a" href="#calculator" className="hex-btn" shape={btnShape}>
            Bitcoin Mining Calculator <Icon name="arrow" size={20} />
          </Hud>
        </Hud>

        <header className="section-head why-host__head">
          <Eyebrow>Why Master Miner X</Eyebrow>
          <h2 className="h-section">
            Why Buy and Host
            <br />
            With Master Miner X
          </h2>
          <p className="lead">Every rig you buy is deployed, powered and maintained by our team in Iowa.</p>
          <span className="why-host__rule" aria-hidden="true" />
        </header>

        <div className="feature-grid">
          {whyHost.map((f) => (
            <Hud className="feature-card" shape={featureShape} key={f.title}>
              <span className="feature-card__icon">
                <OctBadge size={66}><Icon name={f.icon} size={34} strokeWidth={1.3} /></OctBadge>
              </span>
              <h3 className="h-card">{f.title}</h3>
              <p className="muted">{f.text}</p>
              <span className="feature-card__bar" aria-hidden="true" />
            </Hud>
          ))}
        </div>

        <p className="footnote">
          <strong>New to mining hardware?</strong> See how the current models compare in our{' '}
          <a href="#miners">guide to the best Bitcoin miners</a>, or start with{' '}
          <a href="#faq">how to buy Bitcoin mining hardware</a>.
        </p>
      </div>
    </section>
  );
}
