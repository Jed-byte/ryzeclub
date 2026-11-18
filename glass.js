/* Liquid glass for Ryze Club's floating controls: header, tab bar, session bar and labels on photos.
   Chromium bends the backdrop at each panel's edge with an SVG displacement map sized to the panel;
   other browsers keep the frosted CSS fallback, and "reduce transparency" turns the glass solid. */
(() => {
  const SEL = '.top, .nav, .bar, .hero .tag';
  const root = document.documentElement;
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-transparency: reduce)').matches;
  if (reduce) { root.classList.add('glass-solid'); return; }
  root.classList.add('glass');
  const chromium = !!window.chrome && /Chrome\//.test(navigator.userAgent);
  if (!chromium) return;
  root.classList.add('glass-lens');

  const svgNS = 'http://www.w3.org/2000/svg';
  const defs = document.createElementNS(svgNS, 'svg');
  defs.setAttribute('aria-hidden', 'true');
  defs.setAttribute('width', '0');
  defs.setAttribute('height', '0');
  defs.style.position = 'absolute';
  document.body.appendChild(defs);
  const made = new Set();

  // A displacement map the size of the panel: neutral in the middle, pulling inwards in a band at each edge.
  function lens(w, h, radius) {
    const id = `lg-${w}-${h}`;
    if (made.has(id)) return id;
    const band = Math.min(18, Math.floor(Math.min(w, h) / 2));
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d'); const img = g.createImageData(w, h); const d = img.data;
    const ramp = (dist) => { const t = Math.max(0, 1 - dist / band); return t * t; };
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        // distance to the nearest straight edge, softened at the corners by the panel's radius
        const dx = Math.min(x, w - 1 - x), dy = Math.min(y, h - 1 - y);
        const ex = ramp(dx) * (x < w / 2 ? 1 : -1), ey = ramp(dy) * (y < h / 2 ? 1 : -1);
        const corner = dx < radius && dy < radius ? 0.7 : 1;
        const i = (y * w + x) * 4;
        d[i] = 128 + ex * 127 * corner; d[i + 1] = 128 + ey * 127 * corner; d[i + 2] = 128; d[i + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
    const f = document.createElementNS(svgNS, 'filter');
    f.setAttribute('id', id); f.setAttribute('x', '0'); f.setAttribute('y', '0');
    f.setAttribute('width', w); f.setAttribute('height', h);
    f.setAttribute('filterUnits', 'userSpaceOnUse'); f.setAttribute('color-interpolation-filters', 'sRGB');
    const fi = document.createElementNS(svgNS, 'feImage');
    fi.setAttribute('href', c.toDataURL()); fi.setAttribute('x', '0'); fi.setAttribute('y', '0');
    fi.setAttribute('width', w); fi.setAttribute('height', h); fi.setAttribute('result', 'map');
    const dm = document.createElementNS(svgNS, 'feDisplacementMap');
    dm.setAttribute('in', 'SourceGraphic'); dm.setAttribute('in2', 'map'); dm.setAttribute('scale', '26');
    dm.setAttribute('xChannelSelector', 'R'); dm.setAttribute('yChannelSelector', 'G');
    f.append(fi, dm); defs.appendChild(f); made.add(id);
    return id;
  }

  function apply() {
    document.querySelectorAll(SEL).forEach((el) => {
      const r = el.getBoundingClientRect(); const w = Math.round(r.width), h = Math.round(r.height);
      if (!w || !h || el.dataset.lg === `${w}x${h}`) return;
      const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
      el.style.setProperty('--lens', `url(#${lens(w, h, radius)})`);
      el.dataset.lg = `${w}x${h}`;
    });
  }
  // The app redraws by replacing its HTML, so re-apply after every change and on resize.
  let queued = false;
  const later = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; apply(); }); } };
  new MutationObserver(later).observe(document.getElementById('app') || document.body, { childList: true, subtree: true });
  window.addEventListener('resize', later);
  later();
})();
