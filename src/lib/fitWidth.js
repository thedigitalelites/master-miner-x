// Desktop layout is built for a 1920px-wide screen. Between 1280px and 1920px
// the whole page is scaled down proportionally (CSS zoom), so every section
// keeps exactly the reference proportions instead of wrapping and stretching.
// --vw / --vh are the viewport units expressed in the page's own (unzoomed) px.
const DESIGN_WIDTH = 1920;
const MIN_WIDTH = 1280;

export function fitWidth() {
  const root = document.getElementById('root');
  const html = document.documentElement;
  const apply = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const z = w >= MIN_WIDTH && w < DESIGN_WIDTH ? w / DESIGN_WIDTH : 1;
    root.style.zoom = z === 1 ? '' : String(z);
    html.style.setProperty('--z', String(z));
    if (z === 1) {
      html.style.removeProperty('--vw');
      html.style.removeProperty('--vh');
    } else {
      html.style.setProperty('--vw', `${DESIGN_WIDTH / 100}px`);
      html.style.setProperty('--vh', `${h / z / 100}px`);
    }
  };
  apply();
  window.addEventListener('resize', apply, { passive: true });
}
