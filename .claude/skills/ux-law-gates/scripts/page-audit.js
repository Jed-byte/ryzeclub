// UX-law page audit. Runs inside a rendered page (phone width) and returns
// { findings: [{ id, selector, snippet }], meta }.
// Pure browser JS, no dependencies: detect.mjs injects it through Chrome, and it can
// also be pasted into any browser tool (javascript_tool / browser_evaluate).
// Only visible elements are checked, so multi-screen prototypes must be audited per state.
// Ignore a rule on one element (and its children) with data-ux-ignore="rule-id rule-id".
(() => {
  const findings = [];
  const W = window.__UX_W || window.innerWidth; // requested width; mobile Chrome widens the layout viewport to fit overflowing pages

  const visible = el => {
    if (!el || !el.getBoundingClientRect) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return false;
    const s = getComputedStyle(el);
    if (s.visibility === 'hidden' || s.display === 'none' || +s.opacity === 0) return false;
    return !el.closest('[hidden],[aria-hidden="true"],[inert]');
  };
  const ignored = (el, id) => {
    for (let n = el; n && n.getAttribute; n = n.parentElement) {
      const v = n.getAttribute('data-ux-ignore');
      if (v && (v.split(/\s+/).includes(id) || v === 'all')) return true;
    }
    return false;
  };
  const sel = el => {
    if (el.id) return `#${el.id}`;
    const parts = [];
    for (let n = el; n && n.nodeType === 1 && parts.length < 3; n = n.parentElement) {
      let p = n.tagName.toLowerCase();
      const cls = [...n.classList].slice(0, 2).join('.');
      if (cls) p += '.' + cls;
      parts.unshift(p);
      if (n.id) { parts[0] = `#${n.id}`; break; }
    }
    return parts.join(' > ');
  };
  const text = el => (el.innerText || el.value || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 60);
  const add = (id, el, snippet) => { if (!el || !ignored(el, id)) findings.push({ id, selector: el ? sel(el) : 'page', snippet }); };

  const labelFor = input => {
    if (input.labels && input.labels.length) return input.labels[0];
    const by = input.getAttribute('aria-labelledby');
    if (by) return document.getElementById(by.split(/\s+/)[0]);
    return null;
  };
  const describe = input => [
    labelFor(input)?.innerText, input.getAttribute('aria-label'), input.name, input.id,
    input.placeholder, input.getAttribute('autocomplete'),
  ].filter(Boolean).join(' ').toLowerCase();

  const rgb = c => (c.match(/[\d.]+/g) || []).map(Number);
  const isFilled = el => {
    const s = getComputedStyle(el);
    const [r, g, b, a = 1] = rgb(s.backgroundColor);
    if (a < 0.6) return false;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return sat > 0.35 || lum < 0.35; // a coloured or dark solid fill, not a grey/white surface
  };

  // ── Interactive targets ──────────────────────────────────────────
  const interactive = [...document.querySelectorAll(
    'a[href], button, [role="button"], [role="tab"], [role="link"], [role="switch"], [role="checkbox"], [role="radio"], input:not([type="hidden"]), select, textarea, summary, [onclick]'
  )].filter(visible);

  const small = [];
  for (const el of interactive) {
    if (el.matches('input, select, textarea') && !el.matches('[type="checkbox"], [type="radio"]')) continue;
    // WCAG exception: links inside running text
    if (el.tagName === 'A' && el.closest('p, li, td, dd, figcaption') && el.parentElement.innerText.trim().length > text(el).length + 15) continue;
    // a checkbox/radio inside a label: the label is the target
    if (el.matches('[type="checkbox"], [type="radio"]') && el.closest('label') && visible(el.closest('label'))) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 44 || r.height < 44) {
      const tooSmall = r.width < 32 || r.height < 32;
      // hit area may be extended by a tappable parent row
      const parent = el.parentElement?.closest('a[href], button, [role="button"], [onclick], label');
      if (parent && visible(parent)) { const pr = parent.getBoundingClientRect(); if (pr.width >= 44 && pr.height >= 44) continue; }
      small.push([el, `${Math.round(r.width)}x${Math.round(r.height)}px "${text(el) || el.tagName.toLowerCase()}"`, tooSmall]);
    }
  }
  small.forEach(([el, s, bad]) => add(bad ? 'tap-target-small' : 'tap-target-borderline', el, s));

  // ── Primary buttons ──────────────────────────────────────────────
  const buttons = interactive.filter(el => el.matches('button, [role="button"], a[href], input[type="submit"]'));
  const primaries = buttons.filter(el => {
    const r = el.getBoundingClientRect();
    return isFilled(el) && r.width >= 60 && r.height >= 24 && text(el).length > 1;
  });
  for (const el of primaries) {
    const r = el.getBoundingClientRect();
    const box = (el.closest('form, section, article, main, [class*="sheet"], [class*="card"], [class*="screen"]') || document.body).getBoundingClientRect();
    // only the main action of a form, dialog or sheet; section-level buttons are not judged here
    const inFlow = el.closest('form, [role="dialog"], dialog, [class*="sheet"], [class*="modal"], [class*="footer"], [class*="cta"]');
    const isSubmit = el.matches('[type="submit"]') || !!el.closest('form') || (inFlow && /continue|next|confirm|submit|pay|send|save|activate|done|sign|create|review/i.test(text(el)));
    if (isSubmit && W <= 480 && (r.height < 48 || r.width < box.width * 0.8)) {
      add('primary-button-short', el, `${Math.round(r.width)}x${Math.round(r.height)}px in a ${Math.round(box.width)}px column: "${text(el)}"`);
    }
  }
  // competing primaries: same container, two or more filled buttons
  const groups = new Map();
  for (const el of primaries) {
    const c = el.closest('form, section, article, [role="dialog"], [class*="sheet"], [class*="card"], [class*="screen"]') || document.body;
    groups.set(c, [...(groups.get(c) || []), el]);
  }
  for (const [c, els] of groups) {
    // only buttons close enough to be read as one decision (within 160px vertically)
    const near = els.filter(a => els.some(b => b !== a && Math.abs(a.getBoundingClientRect().top - b.getBoundingClientRect().top) < 160));
    if (near.length >= 2) add('competing-primaries', near[1], `${near.length} filled buttons close together in ${sel(c)}: ${near.map(e => `"${text(e)}"`).join(', ')}`);
  }

  // ── Form fields ──────────────────────────────────────────────────
  const fields = [...document.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select')].filter(visible);
  const NUMERIC = /\b(account( number| no)?|acct|sort ?code|card( number)?|cvv|cvc|otp|one.?time|verification code|pin|passcode|amount|price|budget|cap|quantity|qty|zip|routing|mobile|phone|telephone)\b/;
  const PERSONAL = [
    [/\b(first|given) ?name\b/, 'given-name'], [/\b(last|family|sur) ?name\b/, 'family-name'],
    [/\bfull ?name\b|^name$/, 'name'], [/\be-?mail\b/, 'email'], [/\b(mobile|phone|telephone)\b/, 'tel'],
    [/\bcard ?number\b/, 'cc-number'], [/\b(otp|one.?time|verification code)\b/, 'one-time-code'],
    [/\b(post ?code|zip)\b/, 'postal-code'],
  ];
  for (const f of fields) {
    if (f.tagName === 'SELECT') continue;
    const d = describe(f);
    const type = (f.getAttribute('type') || 'text').toLowerCase();
    const im = (f.getAttribute('inputmode') || '').toLowerCase();
    if (type === 'text' && NUMERIC.test(d) && !/numeric|decimal|tel/.test(im) && !/\biban\b/.test(d)) {
      add('input-wrong-keyboard', f, `"${d.slice(0, 40)}" type=${type}${im ? ` inputmode=${im}` : ''}`);
    }
    if (!f.getAttribute('autocomplete')) {
      const hit = PERSONAL.find(([re]) => re.test(d));
      if (hit) add('input-no-autocomplete', f, `"${d.slice(0, 40)}" → autocomplete="${hit[1]}"`);
    }
    const lab = labelFor(f);
    const wrapped = f.closest('label');
    const hasLabel = (lab && visible(lab) && lab.innerText.trim()) || (wrapped && wrapped.innerText.trim()) || f.getAttribute('aria-label');
    if (f.placeholder && !hasLabel) {
      // a visible text element right above the field also counts as a label (div-based designs)
      const r = f.getBoundingClientRect();
      const prev = f.previousElementSibling;
      const prevOk = prev && visible(prev) && prev.innerText.trim() && r.top - prev.getBoundingClientRect().bottom < 16;
      if (!prevOk) add('placeholder-as-label', f, `placeholder "${f.placeholder}" with no visible label`);
    }
  }
  // label proximity: gap label→own field must be clearly smaller than gap previous field→label
  const ordered = fields.map(f => [f, labelFor(f)]).filter(([, l]) => l && visible(l))
    .sort((a, b) => a[0].getBoundingClientRect().top - b[0].getBoundingClientRect().top);
  for (let i = 1; i < ordered.length; i++) {
    const [f, l] = ordered[i], prevF = ordered[i - 1][0];
    const lr = l.getBoundingClientRect(), fr = f.getBoundingClientRect(), pr = prevF.getBoundingClientRect();
    if (l.contains(f) || lr.bottom > fr.top + 2) continue; // floating/inside labels
    if (Math.abs(pr.left - fr.left) > 40) continue; // different columns
    const own = fr.top - lr.bottom, above = lr.top - pr.bottom;
    if (above >= 0 && own >= 0 && own * 1.5 > above) add('label-far-from-field', l, `label→field ${Math.round(own)}px vs previous field→label ${Math.round(above)}px`);
  }
  // enterkeyhint in multi-field forms; disabled submit; CTA distance
  for (const form of [...document.querySelectorAll('form')].filter(visible)) {
    const tf = fields.filter(f => form.contains(f) && f.tagName !== 'SELECT');
    if (tf.length >= 3 && tf.some(f => !f.getAttribute('enterkeyhint'))) add('no-enterkeyhint', form, `${tf.length} text fields, ${tf.filter(f => !f.getAttribute('enterkeyhint')).length} without enterkeyhint`);
  }
  for (const b of [...document.querySelectorAll('button[disabled], [aria-disabled="true"], input[type="submit"][disabled]')].filter(visible)) {
    add('disabled-submit', b, `"${text(b)}" is disabled`);
  }
  if (fields.length >= 2) {
    const lastField = fields.reduce((a, f) => (f.getBoundingClientRect().bottom > a.getBoundingClientRect().bottom ? f : a));
    const lb = lastField.getBoundingClientRect().bottom;
    const below = primaries.filter(p => p.getBoundingClientRect().top >= lb - 2)
      .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];
    if (below) {
      const gap = below.getBoundingClientRect().top - lb;
      if (gap > 120) add('cta-far-from-form', below, `"${text(below)}" sits ${Math.round(gap)}px below the last field`);
    }
  }

  // ── Navigation size ──────────────────────────────────────────────
  for (const nav of [...document.querySelectorAll('nav, [role="tablist"], [role="radiogroup"], [class*="tabbar"], [class*="tab-bar"], [class*="bottom-nav"]')].filter(visible)) {
    const items = [...nav.querySelectorAll('a[href], button, [role="tab"], [role="radio"]')].filter(visible);
    const r = nav.getBoundingClientRect();
    const isBar = r.width >= W * 0.8 && r.height < 120;
    if (isBar && items.length > 5) add('too-many-nav-options', nav, `${items.length} items: ${items.slice(0, 8).map(text).join(' | ')}`);
  }

  // ── Long numbers ─────────────────────────────────────────────────
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  for (let n; (n = walker.nextNode());) {
    const m = n.textContent.match(/\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b|\b\d{10,}\b/);
    if (!m || seen.has(m[0])) continue;
    const el = n.parentElement;
    if (!visible(el) || el.closest('script, style, code, pre, svg')) continue;
    seen.add(m[0]);
    add('long-number-unchunked', el, m[0]);
  }

  // ── Page level ───────────────────────────────────────────────────
  const sw = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth, window.innerWidth);
  if (sw > W + 1) {
    let culprit = null;
    for (const el of document.body.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.right > W + 1 && visible(el) && getComputedStyle(el).position !== 'fixed') {
        let clipped = false;
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          const ox = getComputedStyle(p).overflowX;
          if (ox !== 'visible') { clipped = true; break; }
        }
        if (!clipped) { culprit = el; break; }
      }
    }
    if (culprit) add('page-scrolls-sideways', culprit, `page is ${sw}px wide at ${W}px; first overflowing element ${Math.round(culprit.getBoundingClientRect().right)}px`);
  }
  if (buttons.length) {
    let hasActive = false;
    for (const sheet of document.styleSheets) {
      let rules; try { rules = sheet.cssRules; } catch { continue; }
      const scan = rs => { for (const r of rs) { if (r.selectorText && /:active/.test(r.selectorText)) return true; if (r.cssRules && scan(r.cssRules)) return true; } return false; };
      if (rules && scan(rules)) { hasActive = true; break; }
    }
    if (!hasActive) add('no-press-feedback', null, `${buttons.length} buttons, no :active styles in any stylesheet`);
  }

  return { findings, meta: { width: W, height: window.innerHeight, title: document.title, interactive: interactive.length, fields: fields.length } };
})()
