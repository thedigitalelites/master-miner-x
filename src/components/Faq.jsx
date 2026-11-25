import { useState } from 'react';
import { faqs } from '../data/content.js';
import { Hud, Eyebrow } from './Hud.jsx';
import Icon from './Icon.jsx';

// Row frame: small chamfers, and a slanted divider between the icon cell and the question.
const faqShape = (w, h) => ({
  main: [`M0.75 10`, `L10 0.75`, `L${w - 12} 0.75`, `L${w - 0.75} 12`, `L${w - 0.75} ${h - 12}`, `L${w - 12} ${h - 0.75}`, `L10 ${h - 0.75}`, `L0.75 ${h - 10}`, 'Z'].join(' '),
  fill: 'rgba(5, 17, 20, 0.78)',
  hair: [`M${w < 600 ? 54 : 74} 0.75 L${w < 600 ? 64 : 86} 14 L${w < 600 ? 64 : 86} ${h - 14} L${w < 600 ? 54 : 74} ${h - 0.75}`],
});

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section" id="faq">
      <div className="container container--narrow">
        <header className="section-head faq-head">
          <svg className="faq-head__frame" viewBox="0 0 1455 219" preserveAspectRatio="xMinYMin meet" aria-hidden="true">
            <path className="l" d="M248 24 L7 24 L-10 41 L-10 181 L8 201 L1001 201 L1108 203" />
            <path className="g" d="M140 201 L260 201" />
            <path className="g" d="M1008 203 L1108 203" />
            <path className="r" d="M1108 204 L1141 161 L1408 161 L1374 204 Z" />
            <path className="r2" d="M1128 155 L1434 155 L1401 195" />
            <path className="g" d="M1194 161 L1328 161" />
            <circle className="d" cx="-10" cy="28" r="3" />
            <g className="dots">{/* led grid */}<circle cx="1174" cy="181" r="1.3" /><circle cx="1180" cy="181" r="1.3" /><circle cx="1186" cy="181" r="1.3" /><circle cx="1192" cy="181" r="1.3" /><circle cx="1198" cy="181" r="1.3" /><circle cx="1204" cy="181" r="1.3" /><circle cx="1210" cy="181" r="1.3" /><circle cx="1216" cy="181" r="1.3" /><circle cx="1222" cy="181" r="1.3" /><circle cx="1228" cy="181" r="1.3" /><circle cx="1234" cy="181" r="1.3" /><circle cx="1174" cy="187" r="1.3" /><circle cx="1180" cy="187" r="1.3" /><circle cx="1186" cy="187" r="1.3" /><circle cx="1192" cy="187" r="1.3" /><circle cx="1198" cy="187" r="1.3" /><circle cx="1204" cy="187" r="1.3" /><circle cx="1210" cy="187" r="1.3" /><circle cx="1216" cy="187" r="1.3" /><circle cx="1222" cy="187" r="1.3" /><circle cx="1228" cy="187" r="1.3" /><circle cx="1234" cy="187" r="1.3" /></g>
            <g className="hatch"><path d="M1252 177 H1262 L1255 193 H1245 Z" /><path d="M1269 177 H1279 L1272 193 H1262 Z" /><path d="M1286 177 H1296 L1289 193 H1279 Z" /><path d="M1303 177 H1313 L1306 193 H1296 Z" /><path d="M1320 177 H1330 L1323 193 H1313 Z" /><path d="M1337 177 H1347 L1340 193 H1330 Z" /><path d="M1354 177 H1364 L1357 193 H1347 Z" /></g>
          </svg>
          <Eyebrow>FAQ <svg className="faq-head__hatch" viewBox="0 0 40 10" aria-hidden="true"><path d="M5 0 H10 L5 10 H0 Z M15 0 H20 L15 10 H10 Z M25 0 H30 L25 10 H20 Z M35 0 H40 L35 10 H30 Z" /></svg></Eyebrow>
          <h2 className="h-section">Frequently asked questions</h2>
          <p className="lead">
            If you don’t see an answer to your question, reach out to us and we will get back to you as soon as
            possible.
            <br />
            Or read our <a href="#faq">full FAQ here</a>.
          </p>
        </header>
        <div className="faq">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Hud className={`faq__item ${isOpen ? 'is-open' : ''}`} shape={faqShape} key={f.q}>
                <h3>
                  <button
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="faq__icon"><Icon name={f.icon} size={20} /></span>
                    <span className="faq__text">{f.q}</span>
                    <Icon name={isOpen ? 'minus' : 'plus'} size={20} className="faq__toggle" />
                  </button>
                </h3>
                <div className="faq__a" id={`faq-${i}`} hidden={!isOpen}>
                  <p>{f.a}</p>
                </div>
              </Hud>
            );
          })}
        </div>
      </div>
    </section>
  );
}
