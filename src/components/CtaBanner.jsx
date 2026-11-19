import { Hud } from './Hud.jsx';
import Icon from './Icon.jsx';

// Wide banner frame: heavy chamfers, the middle of the top and bottom edges
// raised past the corners, an inset second outline, glowing side bars, tick
// groups near each corner and hatched runs along the top and bottom.
function ctaShape(w, h) {
  const c = 46;
  const s = 12;
  const a = w * 0.17;
  const b = w * 0.83;
  const main = [
    `M0.75 ${c + s}`, `L${c} ${s}`, `L${a} ${s}`, `L${a + s} 0.75`, `L${b - s} 0.75`, `L${b} ${s}`, `L${w - c} ${s}`,
    `L${w - 0.75} ${c + s}`, `L${w - 0.75} ${h - c - s}`, `L${w - c} ${h - s}`, `L${b} ${h - s}`, `L${b - s} ${h - 0.75}`,
    `L${a + s} ${h - 0.75}`, `L${a} ${h - s}`, `L${c} ${h - s}`, `L0.75 ${h - c - s}`, 'Z',
  ].join(' ');
  const i = 22;
  const inner = [
    `M${i} ${c + i}`, `L${c + 4} ${i + 8}`, `L${a + 6} ${i + 8}`, `L${a + 20} ${i}`, `L${b - 20} ${i}`, `L${b - 6} ${i + 8}`,
    `L${w - c - 4} ${i + 8}`, `L${w - i} ${c + i}`, `L${w - i} ${h - c - i}`, `L${w - c - 4} ${h - i - 8}`, `L${b - 6} ${h - i - 8}`,
    `L${b - 20} ${h - i}`, `L${a + 20} ${h - i}`, `L${a + 6} ${h - i - 8}`, `L${c + 4} ${h - i - 8}`, `L${i} ${h - c - i}`, 'Z',
  ].join(' ');
  const ticks = (x, y) => `M${x} ${y} v6 M${x + 7} ${y} v6 M${x + 14} ${y} v6`;
  const hatch = (x, y, n) => Array.from({ length: n }, (_, k) => `M${x + k * 6} ${y + 6} L${x + k * 6 + 4} ${y}`).join(' ');
  return {
    main,
    fill: 'rgba(3, 10, 12, 0.82)',
    hair: [inner, ticks(c + 40, s + 6), ticks(w - c - 54, s + 6), ticks(c + 40, h - s - 12), ticks(w - c - 54, h - s - 12)],
    late: [`M${w * 0.5} 5 L${w * 0.62} 5`, `M${w * 0.68} 5 L${w * 0.72} 5`, `M${w * 0.66} ${h - 5} L${w * 0.72} ${h - 5}`],
    accent: [`M-5 ${h * 0.28} L-5 ${h * 0.72}`, `M${w + 5} ${h * 0.28} L${w + 5} ${h * 0.72}`],
    over: (
      <g className="cta-hatch">
        <path d={hatch(w * 0.56, 2, 14)} />
        <path d={hatch(w * 0.56, h - 8, 12)} />
        <path d={`M${w * 0.27} 6 L${w * 0.4} 6`} strokeDasharray="1 2" />
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
