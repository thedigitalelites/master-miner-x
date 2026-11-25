import { footerCols } from '../data/content.js';
import { Hud } from './Hud.jsx';

// Full-width footer frame: chamfered ends with glowing corner cuts, a raised
// bar along the top right, dotted LED groups and a dipped centre on the bottom
// edge that the X mark sits in.
function footerShape(w, h) {
  const c = 48;
  const m = w / 2;
  const main = [
    `M0.75 ${c + 18}`, `L${c} 18`, `L${w * 0.07} 18`, `L${w * 0.08} 4`, `L${w * 0.21} 4`, `L${w * 0.22} 18`,
    `L${w - c} 18`, `L${w - 0.75} ${c + 18}`, `L${w - 0.75} ${h - c}`, `L${w - c} ${h - 0.75}`,
    `L${m + 240} ${h - 0.75}`, `L${m + 222} ${h + 18}`, `L${m - 222} ${h + 18}`, `L${m - 240} ${h - 0.75}`,
    `L${c} ${h - 0.75}`, `L0.75 ${h - c}`, 'Z',
  ].join(' ');
  const i = 18;
  const inner = [`M${i} ${c + 26}`, `L${c + 8} ${i + 18}`, `L${w - c - 8} ${i + 18}`, `L${w - i} ${c + 26}`, `L${w - i} ${h - c}`, `L${w - c - 6} ${h - i}`, `L${c + 6} ${h - i}`, `L${i} ${h - c}`, 'Z'].join(' ');
  const dots = (x, y, n, gap = 9) => Array.from({ length: n }, (_, k) => <circle key={k} cx={x + k * gap} cy={y} r="1.8" />);
  return {
    main,
    fill: 'rgba(4, 13, 16, 0.82)',
    hair: [inner, `M${c + 30} 6 L${w * 0.07 - 4} 6`, `M${c + 10} ${h + 10} L${m - 250} ${h + 10}`, `M${m + 250} ${h + 10} L${w - c - 10} ${h + 10}`],
    late: [`M${w * 0.86} 4 L${w - 30} 4 L${w - 4} 30`],
    accent: [`M14 ${h - 70} L36 ${h - 48}`, `M${w - 14} ${h - 70} L${w - 36} ${h - 48}`, `M${w - 24} 30 L${w - 10} 40`, `M24 30 L10 40`],
    over: (
      <g className="wm-frame__dots">
        {dots(w * 0.29, 24, 4)}
        {dots(w * 0.04, h - 20, 4)}
        {dots(w * 0.67, h - 22, 7, 10)}
      </g>
    ),
  };
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-wrap">
        <Hud className="footer-panel" shape={footerShape}>
          <div className="footer-panel__brand">
            <img src="img/logo-header.webp" alt="Master Miner X" width="133" height="60" />
            <p className="muted">
              Enterprise AI infrastructure, data centers, and digital asset mining. Headquartered in Dubai.
            </p>
            <p className="mono small muted">[ EMAIL ] · [ PHONE ]</p>
          </div>
          <nav className="footer-panel__cols" aria-label="Footer">
            {footerCols.map((c) => (
              <div key={c.title}>
                <p className="footer-panel__title">{c.title}</p>
                <ul>
                  {c.links.map((l) => (
                    <li key={l}><a href="#">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </Hud>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Master Miner X. All rights reserved.</p>
          <span className="footer-bottom__mark" aria-hidden="true">
            <svg className="footer-bottom__circuit" viewBox="0 0 700 120" aria-hidden="true">
              <path d="M0 52 H170 L200 70 H290" />
              <path d="M60 64 H160 L176 76 H230" />
              <path d="M700 52 H530 L500 70 H410" />
              <path d="M640 64 H540 L524 76 H470" />
              <path d="M230 30 H270 L300 50" />
              <path d="M470 30 H430 L400 50" />
              <path className="b" d="M90 52 H140" />
              <path className="b" d="M560 52 H610" />
              <path className="bar" d="M150 82 H290 M150 90 H290" />
              <path className="bar" d="M410 82 H550 M410 90 H550" />
              <path d="M200 100 H300 L320 112 H380" />
              <path d="M500 100 H400 L380 112 H320" />
            </svg>
            <svg className="footer-bottom__oct" viewBox="0 0 92 92" aria-hidden="true">
              <polygon points="27,2 65,2 90,27 90,65 65,90 27,90 2,65 2,27" />
              <polygon className="i" points="30,10 62,10 82,30 82,62 62,82 30,82 10,62 10,30" />
            </svg>
            <b>X</b>
          </span>
          <p className="footer-bottom__links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
