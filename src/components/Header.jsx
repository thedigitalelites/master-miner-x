import { useEffect, useState } from 'react';
import { nav } from '../data/content.js';
import Icon from './Icon.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <nav className="navbar" aria-label="Main">
          <a href="#top" className="navbar__logo" aria-label="Master Miner X home">
            <img src="img/logo.png" alt="Master Miner X" width="110" height="41" />
          </a>
          <ul className={`navbar__links ${open ? 'is-open' : ''}`}>
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`navbar__link ${item.active ? 'is-active' : ''}`}
                  aria-current={item.active ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  {item.dropdown && (
                    <Icon name="arrowDiag" size={14} className={item.active ? 'navbar__arrow' : 'navbar__arrow navbar__arrow--down'} />
                  )}
                </a>
              </li>
            ))}
            <li className="navbar__mobile-cta">
              <a href="#contact" className="btn btn--primary" onClick={() => setOpen(false)}>
                Contact Us <Icon name="arrow" size={16} />
              </a>
            </li>
          </ul>
          <a href="#contact" className="navbar__cta">
            Contact Us <Icon name="arrow" size={16} />
          </a>
          <button
            className="navbar__toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </nav>
      </div>
    </header>
  );
}
