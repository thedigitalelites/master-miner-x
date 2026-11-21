import { Hud } from './Hud.jsx';
import Icon from './Icon.jsx';

// Wide banner frame traced from the reference: chamfered corners with a raised
// tab ("|||" ticks) near each corner, the middle of the top and bottom edges set
// in, an inward notch on each side, an inset second outline, glowing side bars,
// and hatched / dashed runs along the top and bottom.
function ctaShape(w, h) {
  const m = w / 2;
  const outer = [
    `M0.75 70`, `L42 20`, `L137 20`, `L150 0.75`, `L225 0.75`, `L238 20`, `L363 20`, `L385 36`,
    `L${w - 385} 36`, `L${w - 363} 20`, `L${w - 238} 20`, `L${w - 225} 0.75`, `L${w - 150} 0.75`, `L${w - 137} 20`,
    `L${w - 42} 20`, `L${w - 0.75} 70`, `L${w - 0.75} 132`, `L${w - 34} 160`, `L${w - 34} ${h - 160}`, `L${w - 0.75} ${h - 132}`,
    `L${w - 0.75} ${h - 70}`, `L${w - 42} ${h - 20}`, `L${w - 137} ${h - 20}`, `L${w - 150} ${h - 0.75}`, `L${w - 225} ${h - 0.75}`,
    `L${w - 238} ${h - 20}`, `L${w - 363} ${h - 20}`, `L${w - 385} ${h - 36}`, `L385 ${h - 36}`, `L363 ${h - 20}`, `L238 ${h - 20}`,
    `L225 ${h - 0.75}`, `L150 ${h - 0.75}`, `L137 ${h - 20}`, `L42 ${h - 20}`, `L0.75 ${h - 70}`, `L0.75 ${h - 132}`,
    `L34 ${h - 160}`, `L34 160`, `L0.75 132`, 'Z',
  ].join(' ');
  const i = 14;
  const inner = [
    `M${i} 78`, `L50 ${20 + i}`, `L360 ${20 + i}`, `L382 ${36 + i}`, `L${w - 382} ${36 + i}`, `L${w - 360} ${20 + i}`,
    `L${w - 50} ${20 + i}`, `L${w - i} 78`, `L${w - i} 138`, `L${w - 46} 166`, `L${w - 46} ${h - 166}`, `L${w - i} ${h - 138}`,
    `L${w - i} ${h - 78}`, `L${w - 50} ${h - 20 - i}`, `L${w - 360} ${h - 20 - i}`, `L${w - 382} ${h - 36 - i}`,
    `L382 ${h - 36 - i}`, `L360 ${h - 20 - i}`, `L50 ${h - 20 - i}`, `L${i} ${h - 78}`, `L${i} ${h - 138}`, `L46 ${h - 166}`,
    `L46 166`, `L${i} 138`, 'Z',
  ].join(' ');
  const ticks = (x, y) => `M${x} ${y} v6 M${x + 8} ${y} v6 M${x + 16} ${y} v6`;
  const hatch = (x, y, n) => Array.from({ length: n }, (_, k) => `M${x + k * 6} ${y + 5} L${x + k * 6 + 4} ${y}`).join(' ');
  return {
    main: outer,
    fill: 'rgba(3, 10, 12, 0.86)',
    hair: [
      inner,
      ticks(180, 7), ticks(w - 196, 7), ticks(180, h - 13), ticks(w - 196, h - 13),
      `M22 168 L22 ${h - 168}`, `M${w - 22} 168 L${w - 22} ${h - 168}`,
    ],
    late: [`M${m + 273} 16 L${m + 353} 16`, `M${m + 303} ${h - 16} L${m + 368} ${h - 16}`],
    accent: [`M-3 74 L-3 128`, `M-3 ${h - 128} L-3 ${h - 74}`, `M${w + 3} 74 L${w + 3} 128`, `M${w + 3} ${h - 128} L${w + 3} ${h - 74}`],
    over: (
      <g className="cta-hatch">
        <path d={`M400 16 L${m - 30} 16`} className="dots" />
        <path d={hatch(m + 28, 13, 20)} />
        <path d={`M${m + 228} 16 L${m + 253} 16 M${m + 383} 16 L${m + 398} 16`} className="dash" />
        <path d={hatch(m + 28, h - 19, 20)} />
        <path d={`M${m + 243} ${h - 16} L${m + 258} ${h - 16} M${m + 273} ${h - 16} L${m + 283} ${h - 16} M${m + 383} ${h - 16} L${m + 398} ${h - 16}`} className="dash" />
        <path d={`M22 168 L22 ${h - 168} M${w - 22} 168 L${w - 22} ${h - 168}`} className="dots" />
      </g>
    ),
  };
}

const btnShape = (w, h) => ({ main: `M8 0.75 H${w - 8} Q${w - 0.75} 0.75 ${w - 0.75} 8 V${h - 8} Q${w - 0.75} ${h - 0.75} ${w - 8} ${h - 0.75} H8 Q0.75 ${h - 0.75} 0.75 ${h - 8} V8 Q0.75 0.75 8 0.75 Z`, fill: 'rgba(6, 16, 18, 0.9)', tracer: false });

export default function CtaBanner() {
  return (
    <section className="section section--tight" id="contact">
      <div className="container">
        <Hud className="cta" shape={ctaShape}>
          <span className="cta__circuit cta__circuit--l" aria-hidden="true" />
          <span className="cta__circuit cta__circuit--r" aria-hidden="true" />
          <h2 className="h-section">Ready to build with us?</h2>
          <p className="lead">
            Whether you’re deploying AI infrastructure, expanding a mining operation, or looking for enterprise
            hosting, Master Miner X provides the expertise and infrastructure to support your next stage of growth.
          </p>
          <Hud as="a" href="#contact" className="cta__btn" shape={btnShape}>
            Book a Consultation <Icon name="arrow" size={20} />
          </Hud>
        </Hud>
      </div>
    </section>
  );
}
