import { brands } from '../data/content.js';

export default function BrandStrip() {
  const row = [...brands, ...brands];
  return (
    <section className="brand-strip" aria-label="Machines we run">
      <div className="container brand-strip__inner">
        <p className="mono-label mono-label--muted">Machines we run</p>
        <div className="brand-strip__viewport">
          <div className="brand-strip__track">
            {row.map((b, i) => (
              <span className="brand-strip__item" key={i} aria-hidden={i >= brands.length}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
