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

// Feature card (traced from the reference): straight top edge broken around
// the icon with a short slant into it, small corner cuts, and a dashed rule
// along the bottom.
const featureShape = (w, h) => {
  const t = 30;
  const c = 12;
  const m = w / 2;
  const g = 40;
  return {
    main: [
      `M${m - g} ${t + 4}`, `L${m - g - 10} ${t}`, `L${c} ${t}`, `L0.75 ${t + c}`, `L0.75 ${h - c}`, `L${c} ${h - 0.75}`,
      `L${w - c} ${h - 0.75}`, `L${w - 0.75} ${h - c}`, `L${w - 0.75} ${t + c}`, `L${w - c} ${t}`, `L${m + g + 10} ${t}`, `L${m + g} ${t + 4}`,
    ].join(' '),
    fill: 'rgba(6, 18, 21, 0.62)',
    hair: [`M${w * 0.15} ${h - 14} L${w * 0.15 + 8} ${h - 14} M${w * 0.15 + 14} ${h - 14} L${w * 0.15 + 20} ${h - 14}`, `M${w * 0.24} ${h - 14} L${w * 0.82} ${h - 14}`, `M${w * 0.86} ${h - 14} L${w * 0.89} ${h - 14}`],
    over: (
      <g className="wm-frame__dots">
        <circle cx={m - g - 18} cy={t - 4} r="1.4" />
        <circle cx={m - g - 12} cy={t - 4} r="1.4" />
        <circle cx={m + g + 12} cy={t - 4} r="1.4" />
        <circle cx={m + g + 18} cy={t - 4} r="1.4" />
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
