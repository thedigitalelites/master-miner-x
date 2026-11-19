// Page-wide motion: scroll reveals with stagger, count-up numbers, cursor
// spotlight on HUD panels, magnetic buttons, hero parallax and a scroll
// progress bar. Everything is skipped when the visitor prefers reduced motion.
import { useEffect } from 'react';

// [selector, reveal variant]. Order matters: first match wins for an element.
const REVEALS = [
  ['.hero .pill', 'up'],
  ['.hero .h-display', 'up'],
  ['.hero .hero__text', 'up'],
  ['.hero .btn-row', 'up'],
  ['.hero__media', 'zoom'],
  ['.section-head, .split-head, .wm-head__main, .bhm-top > *:first-child', 'up'],
  ['.wm-head__aside', 'right'],
  ['.eyebrow', 'line'],
  ['.wm-card, .wm-cta', 'hud'],
  ['.hud', 'hud'],
  ['.miner-card, .token-card, .faq__item, .step', 'up'],
  ['.brand-strip__inner', 'fade'],
  ['.h-section, .h-card, .lead', 'up'],
  ['.check-list li, .compare-list__row, .wm-list__row, .stat-bar__item, .spec-row', 'left'],
  ['.site-footer .footer-panel', 'up'],
];

// Children of these get staggered delays.
const STAGGER_PARENTS = [
  '.wm-grid', '.wm-list', '.grid-2', '.miner-grid', '.feature-grid', '.hosting__features',
  '.steps__grid', '.stat-bar', '.check-list', '.faq', '.hero__copy', '.compare-list', '.chips',
];

const PANELS = '.hud, .wm-card, .wm-cta';

const COUNTERS = '.stat-card__value, .stat-bar__item b, .price-card__value, .stock-card__count, .ledger__total, .fleet-card__value';

function tagReveals(root) {
  const seen = new Set();
  REVEALS.forEach(([sel, variant]) => {
    root.querySelectorAll(sel).forEach((el) => {
      if (seen.has(el) || el.closest('.site-header') || el.hasAttribute('data-reveal')) return;
      // Don't double-animate something whose ancestor is already animating as a block,
      // except for list rows which get their own cascade.
      seen.add(el);
      el.setAttribute('data-reveal', variant);
    });
  });
  STAGGER_PARENTS.forEach((sel) => {
    root.querySelectorAll(sel).forEach((parent) => {
      let i = 0;
      [...parent.children].forEach((child) => {
        const target = child.hasAttribute('data-reveal') ? child : child.querySelector('[data-reveal]');
        if (!target) return;
        target.style.setProperty('--rd', `${Math.min(i, 4) * 50}ms`);
        i += 1;
      });
    });
  });
}

const COUNT_STATE = new WeakMap();

function replay(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth; // restart the CSS animation
  el.classList.add(cls);
}

function inView(el, pad = 0) {
  const r = el.getBoundingClientRect();
  return r.bottom > pad && r.top < innerHeight - pad && r.width > 0;
}

function countUp(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    const n = walker.currentNode;
    if (/\d/.test(n.nodeValue)) nodes.push(n);
  }
  nodes.forEach((node) => {
    // If we last wrote this node, its true value is the one we saved; otherwise React set it.
    const st = COUNT_STATE.get(node);
    const final = st && st.last === node.nodeValue ? st.final : node.nodeValue;
    const state = { final, last: null };
    COUNT_STATE.set(node, state);
    const parts = final.split(/(\d[\d,]*\.?\d*)/);
    const nums = parts.map((p) => (/^\d/.test(p) ? p : null));
    const start = performance.now();
    const dur = 1400;
    let last = null;
    const frame = (t) => {
      if (COUNT_STATE.get(node) !== state) return; // a newer run took over
      if (last !== null && node.nodeValue !== last) return; // React changed it; stop.
      const k = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      const out = parts
        .map((p, i) => {
          if (!nums[i]) return p;
          const decimals = (p.split('.')[1] || '').length;
          const value = parseFloat(p.replace(/,/g, '')) * e;
          let s = value.toFixed(decimals);
          if (p.includes(',')) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
          return s;
        })
        .join('');
      node.nodeValue = k < 1 ? out : final;
      last = node.nodeValue;
      state.last = last;
      if (k < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  });
}

export function useMotion() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.querySelector('main');
    const html = document.documentElement;
    if (!root) return undefined;
    if (reduce) {
      html.classList.add('motion-off');
      return undefined;
    }
    html.classList.add('motion-on');
    tagReveals(document);

    // Elements currently revealed. React rewrites the whole class attribute when a
    // component's className prop changes (e.g. an FAQ item gaining "is-open"), which
    // would silently drop the "is-in" class added here and fade the element out.
    // We remember the state separately and put the class back when that happens.
    const shown = new WeakSet();
    const keep = new MutationObserver((muts) => {
      muts.forEach(({ target: el }) => {
        if (shown.has(el) && !el.classList.contains('is-in')) el.classList.add('is-in');
      });
    });
    keep.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          shown.add(el);
          el.classList.add('is-in');
          if (el.matches(PANELS)) replay(el, 'is-scan');
        });
      },
      { threshold: 0, rootMargin: '15% 0px 15% 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    // Once something has fully left the screen, reset it so it animates in again next time.
    const out = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (!e.isIntersecting) { shown.delete(e.target); e.target.classList.remove('is-in'); } }),
      { threshold: 0, rootMargin: '25% 0px 25% 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => out.observe(el));
    // Safety net: never leave on-screen content hidden if the observer is slow.
    const safety = setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) { shown.add(el); el.classList.add('is-in'); }
      });
    }, 800);

    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          countUp(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll(COUNTERS).forEach((el) => cio.observe(el));

    // Heartbeat: every few seconds, re-run effects on whatever is on screen.
    let beat = 0;
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const heartbeat = setInterval(() => {
      if (document.hidden) return;
      beat += 1;
      [...document.querySelectorAll(PANELS)].filter((el) => inView(el)).forEach((el, i) => later(() => replay(el, 'is-scan'), i * 280));
      [...document.querySelectorAll('.badge-oct, .wm-badge')].filter((el) => inView(el)).forEach((el, i) => later(() => replay(el, 'is-ping'), 600 + i * 110));
      [...document.querySelectorAll('main h2:not(.wm-title), .h-display')].filter((el) => inView(el)).forEach((el) => replay(el, 'is-flash'));
      if (beat % 2 === 0) document.querySelectorAll(COUNTERS).forEach((el) => inView(el, 40) && countUp(el));
      if (beat % 3 === 0) {
        [...document.querySelectorAll('[data-reveal]')]
          .filter((el) => inView(el, 60) && el.matches('.wm-list__row, .compare-list__row, .check-list li, .stat-bar__item, .spec-row'))
          .forEach((el, i) => later(() => replay(el, 'is-nudge'), i * 90));
      }
    }, 5000);

    // Entrances replay on a timer: every 8s, whatever is on screen plays its
    // entrance again (a short rise-and-fade from 55% opacity, never hidden or
    // blurred), staggered top to bottom, so sections keep animating while viewed.
    const replayLoop = setInterval(() => {
      if (document.hidden) return;
      [...document.querySelectorAll('main [data-reveal].is-in, .site-footer [data-reveal].is-in')]
        .filter((el) => !el.parentElement.closest('[data-reveal]') && inView(el, 40))
        .forEach((el, i) => later(() => {
          replay(el, 'is-replay');
          later(() => el.classList.remove('is-replay'), 1300);
        }, Math.min(i, 10) * 70));
    }, 8000);

    // Loops only run while their section is on screen.
    const live = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('is-live', e.isIntersecting)),
      { rootMargin: '10% 0px 10% 0px' }
    );
    document.querySelectorAll('main section, .site-footer').forEach((s) => live.observe(s));

    // Sequenced highlights: within each group, light one item at a time.
    const SEQUENCES = [
      ['.steps', '.step', 2200],
      ['.feature-grid', '.feature-card', 1800],
      ['.chips:not(.chips--soft)', '.chip:not(.chip--input)', 1400],
      ['.faq', '.faq__icon', 1200],
      ['.stat-bar', '.stat-bar__item', 1600],
      ['.hosting__features', ':scope > *', 1700],
    ];
    const seqTimers = SEQUENCES.map(([group, item, ms]) => {
      let i = 0;
      return setInterval(() => {
        if (document.hidden) return;
        document.querySelectorAll(group).forEach((g) => {
          if (!inView(g)) return;
          const items = [...g.querySelectorAll(item)];
          if (!items.length) return;
          items.forEach((el) => el.classList.remove('is-lit'));
          items[i % items.length].classList.add('is-lit');
        });
        i += 1;
      }, ms);
    });

    // Every ~6s: redraw the chart line and re-grow bars that are on screen.
    const regrow = setInterval(() => {
      if (document.hidden) return;
      document.querySelectorAll('.chart__plot').forEach((el) => inView(el) && replay(el, 'is-redraw'));
      document
        .querySelectorAll('.dist-bar, .payback__bar, .feature-card__bar, .tier-bar, .ticker__track')
        .forEach((el) => el.matches('.ticker__track') || (inView(el) && replay(el, 'is-regrow')));
    }, 6000);
    document.querySelectorAll('.chart__plot').forEach((el) => el.classList.add('is-redraw'));

    // Decorative particles in the hero and travelling pulses on the background circuit.
    const deco = [];
    const hero = document.querySelector('.hero');
    if (hero) {
      const box = document.createElement('div');
      box.className = 'particles';
      box.setAttribute('aria-hidden', 'true');
      for (let n = 0; n < 22; n += 1) {
        const p = document.createElement('i');
        p.style.setProperty('--x', `${Math.random() * 100}%`);
        p.style.setProperty('--y', `${40 + Math.random() * 60}%`);
        p.style.setProperty('--d', `${6 + Math.random() * 8}s`);
        p.style.setProperty('--delay', `${-Math.random() * 12}s`);
        p.style.setProperty('--s', `${1 + Math.random() * 2.5}px`);
        box.appendChild(p);
      }
      hero.prepend(box);
      deco.push(box);
    }
    const pulses = document.createElement('div');
    pulses.className = 'bg-pulses';
    pulses.setAttribute('aria-hidden', 'true');
    for (let n = 0; n < 9; n += 1) {
      const p = document.createElement('i');
      const vertical = n % 3 === 0;
      p.className = vertical ? 'v' : 'h';
      // Align with the 320px circuit tile lines.
      p.style.setProperty('--pos', `${(n * 2 + 1) * 160 + (vertical ? 40 : 60)}px`);
      p.style.setProperty('--d', `${5 + (n % 4) * 1.7}s`);
      p.style.setProperty('--delay', `${-n * 1.3}s`);
      pulses.appendChild(p);
    }
    document.body.appendChild(pulses);
    deco.push(pulses);

    // Section headings: light up the active section as it crosses the middle.
    const sio = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('is-active-section', e.isIntersecting)),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    document.querySelectorAll('main section').forEach((s) => sio.observe(s));

    // Scroll progress bar + hero parallax.
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    const heroMedia = document.querySelector('.hero__media');
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = html.scrollHeight - innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
        if (heroMedia) heroMedia.style.setProperty('--py', `${Math.min(scrollY, 900) * 0.12}px`);
        ticking = false;
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Cursor spotlight on panels + tilt on hero image + magnetic buttons.
    const fine = matchMedia('(pointer: fine)').matches;
    const onMove = (ev) => {
      const panel = ev.target.closest?.('.hud, .wm-card, .wm-cta, .miner-card');
      if (panel) {
        const r = panel.getBoundingClientRect();
        panel.style.setProperty('--mx', `${ev.clientX - r.left}px`);
        panel.style.setProperty('--my', `${ev.clientY - r.top}px`);
      }
      const btn = ev.target.closest?.('.btn, .wm-btn');
      if (btn) {
        const r = btn.getBoundingClientRect();
        const dx = (ev.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (ev.clientY - (r.top + r.height / 2)) / r.height;
        btn.style.setProperty('--bx', `${dx * 6}px`);
        btn.style.setProperty('--by', `${dy * 5}px`);
      }
      if (heroMedia) {
        const r = heroMedia.getBoundingClientRect();
        if (ev.clientY < r.bottom + 100) {
          heroMedia.style.setProperty('--rx', `${((ev.clientY / innerHeight) - 0.5) * -6}deg`);
          heroMedia.style.setProperty('--ry', `${((ev.clientX / innerWidth) - 0.5) * 8}deg`);
        }
      }
    };
    const onOut = (ev) => {
      const btn = ev.target.closest?.('.btn, .wm-btn');
      if (btn && !btn.contains(ev.relatedTarget)) {
        btn.style.setProperty('--bx', '0px');
        btn.style.setProperty('--by', '0px');
      }
    };
    if (fine) {
      addEventListener('pointermove', onMove, { passive: true });
      addEventListener('pointerout', onOut, { passive: true });
    }

    // Kick the hero entrance on the next frame so the transition runs.
    requestAnimationFrame(() => html.classList.add('is-loaded'));

    return () => {
      clearTimeout(safety);
      clearInterval(heartbeat);
      clearInterval(regrow);
      clearInterval(replayLoop);
      seqTimers.forEach(clearInterval);
      live.disconnect();
      deco.forEach((d) => d.remove());
      timers.forEach(clearTimeout);
      out.disconnect();
      keep.disconnect();
      io.disconnect();
      cio.disconnect();
      sio.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('pointermove', onMove);
      removeEventListener('pointerout', onOut);
      bar.remove();
      html.classList.remove('motion-on', 'is-loaded');
    };
  }, []);
}
