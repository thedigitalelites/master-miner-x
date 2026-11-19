import { useState } from 'react';
import { repairParts } from '../data/content.js';
import { SectionHead } from './Hud.jsx';

export default function RepairExplorer() {
  const [activeId, setActiveId] = useState(repairParts[0].id);
  const active = repairParts.find((p) => p.id === activeId);

  return (
    <section className="section" id="repair">
      <div className="container">
        <SectionHead
          eyebrow="Certified in-house repair"
          title="What we fix, and where"
          lead="Tap a part. Fans, power supplies and control boards are swapped at the site; hashboards go to the lab."
        />

        <figure className="repair__figure">
          <img src="img/repair-illustration.jpg" alt="Exploded view of an ASIC miner: fans, chassis, hashboards, control board and power supply" loading="lazy" />
          {repairParts.map((p) => (
            <button
              key={p.id}
              className={`hotspot ${p.id === activeId ? 'is-active' : ''}`}
              style={{ left: `${p.pos.x}%`, top: `${p.pos.y}%` }}
              onClick={() => setActiveId(p.id)}
              aria-label={p.label}
            >
              <span className="hotspot__dot" />
              <span className="hotspot__label">{p.label}</span>
            </button>
          ))}
          <figcaption className="mono-label mono-label--muted">Illustration</figcaption>
        </figure>

        <div className="repair__panel">
          <div className="chips chips--soft" role="tablist" aria-label="Miner parts">
            {repairParts.map((p) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={p.id === activeId}
                className={`chip chip--pill ${p.id === activeId ? 'is-active' : ''}`}
                onClick={() => setActiveId(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="repair__detail" role="tabpanel" key={active.id}>
            <p className="mono-label">{active.where}</p>
            <h3 className="h-card h-card--lg">{active.label}</h3>
            <p className="muted">{active.text}</p>
            <p className="mono-label mono-label--muted repair__faults-label">Common faults</p>
            <ul className="dash-list">
              {active.faults.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
