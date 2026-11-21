// Manufacturer logos, in the reference order.
const logos = [
  { name: 'Canaan', src: 'img/brand-canaan.webp', w: 151, h: 29 },
  { name: 'Bitmain', src: 'img/brand-bitmain.webp', w: 195, h: 21 },
  { name: 'MicroBT', src: 'img/brand-microbt.webp', w: 177, h: 33 },
];

export default function BrandStrip() {
  const row = [...logos, ...logos, ...logos, ...logos];
  return (
    <section className="brand-strip" aria-label="Machines we run">
      <div className="brand-strip__inner">
        <p className="brand-strip__label">Machines we run</p>
        <div className="brand-strip__viewport">
          <div className="brand-strip__track">
            {row.map((b, i) => (
              <span className="brand-strip__item" key={i} aria-hidden={i >= logos.length}>
                <img src={b.src} alt={i < logos.length ? b.name : ''} width={b.w} height={b.h} loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
