import Icon from './Icon.jsx';
import Ticker from './Ticker.jsx';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="pill">
            <span className="pill__dot" /> Professional crypto mining
          </p>
          <h1 className="h-display">
            Professional ASIC Mining <br className="br-lg" />
            infrastructure <span className="accent">built for <br className="br-lg" />performance</span>
          </h1>
          <p className="hero__text">
            Master Miner X provides end-to-end cryptocurrency mining solutions, helping individuals, businesses,
            and institutional investors build profitable and scalable mining operations.
          </p>
          <p className="hero__text">
            From ASIC procurement and managed hosting to custom mining farm development, we deliver
            enterprise-grade infrastructure designed to maximize uptime, operational efficiency, and long-term
            performance.
          </p>
          <div className="btn-row">
            <a href="#contact" className="btn btn--primary">
              Book a Consultation <Icon name="arrow" size={18} />
            </a>
            <a href="#miners" className="btn btn--ghost">
              See Packages <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
        <div className="hero__media" aria-hidden="true">
          <img
            src="img/hero-asic.webp"
            srcSet="img/hero-asic-640.webp 640w, img/hero-asic.webp 977w"
            sizes="(max-width: 1024px) 92vw, 52vw"
            alt=""
            width="977"
            height="853"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
      <Ticker />
    </section>
  );
}
