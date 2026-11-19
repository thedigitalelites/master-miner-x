import { useState } from 'react';
import { faqs } from '../data/content.js';
import { Hud, Eyebrow } from './Hud.jsx';
import Icon from './Icon.jsx';

// Row frame: small chamfers, and a slanted divider between the icon cell and the question.
const faqShape = (w, h) => ({
  main: [`M0.75 10`, `L10 0.75`, `L${w - 12} 0.75`, `L${w - 0.75} 12`, `L${w - 0.75} ${h - 12}`, `L${w - 12} ${h - 0.75}`, `L10 ${h - 0.75}`, `L0.75 ${h - 10}`, 'Z'].join(' '),
  fill: 'rgba(5, 17, 20, 0.78)',
  hair: [`M${w < 600 ? 54 : 74} 0.75 L${w < 600 ? 64 : 86} 14 L${w < 600 ? 64 : 86} 56 L${w < 600 ? 54 : 74} 69.25`],
});

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section" id="faq">
      <div className="container container--narrow">
        <header className="section-head faq-head">
          <svg className="faq-head__frame" viewBox="0 0 1400 200" preserveAspectRatio="none" aria-hidden="true">
            <path className="l" d="M2 30 L2 182 L22 198 L260 198" />
            <path className="t" d="M2 30 L28 4 L250 4" />
            <path className="g" d="M140 198 L260 198" />
            <path className="r" d="M1010 192 L1110 192 L1136 160 L1398 160" />
            <path className="r2" d="M1144 196 L1380 196 L1398 172" />
            <path className="g" d="M1190 160 L1330 160" />
            <circle className="d" cx="2" cy="26" r="3" />
          </svg>
          <Eyebrow>FAQ <span className="faq-head__hatch" aria-hidden="true">////</span></Eyebrow>
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
