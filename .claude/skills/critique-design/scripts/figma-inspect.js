// Read-only snippets for reading a Figma design file from its own page.
// Run each one with the browser tool's JavaScript action on an open
// figma.com/design/... tab where the user is signed in. They only read; they never
// change the file. The `figma` global is the plugin API the editor exposes.

// 1. Sections and every frame in them, with ids and sizes.
figma.currentPage.children.filter(n => n.type === 'SECTION').map(s =>
  '## ' + s.name + '\n' + s.children.map(f =>
    '- ' + f.type + ' | ' + f.name + ' | ' + f.id + ' | ' + Math.round(f.width) + 'x' + Math.round(f.height)
  ).join('\n')).join('\n\n');

// 2. All visible text of every screen frame, in reading order, with x,y inside the frame.
//    Skip the components section here; read it with snippet 3.
(() => {
  const vis = n => { let p = n; while (p && p.type !== 'PAGE') { if (p.visible === false) return false; p = p.parent; } return true; };
  const secs = figma.currentPage.children.filter(n => n.type === 'SECTION' && !/component/i.test(n.name));
  const out = [];
  for (const s of secs) for (const f of s.children) {
    if (f.type !== 'FRAME') continue;
    const fx = f.absoluteTransform[0][2], fy = f.absoluteTransform[1][2];
    const t = f.findAll(n => n.type === 'TEXT' && vis(n)).map(n => ({
      x: Math.round(n.absoluteTransform[0][2] - fx), y: Math.round(n.absoluteTransform[1][2] - fy),
      s: n.characters.replace(/\n/g, ' / ') }));
    t.sort((a, b) => (Math.round(a.y / 8) - Math.round(b.y / 8)) || (a.x - b.x));
    out.push('=== ' + f.name + ' [' + f.id + ']\n' + t.map(e => `(${e.x},${e.y}) ${e.s}`).join('\n'));
  }
  return out.join('\n\n');
})();

// 3. Component sets: name, description, and the text of every variant.
//    This is where detail panels, filled states and tooltips usually live.
(() => {
  const out = [];
  for (const c of figma.currentPage.findAll(n => n.type === 'COMPONENT_SET' || (n.type === 'COMPONENT' && n.parent.type !== 'COMPONENT_SET'))) {
    const variants = c.type === 'COMPONENT_SET' ? c.children : [c];
    out.push('## ' + c.name + (c.description ? ' :: ' + c.description : ''));
    for (const v of variants) out.push('### ' + v.name + '\n' + v.findAll(n => n.type === 'TEXT' && n.visible).map(n => n.characters).join(' | '));
  }
  return out.join('\n');
})();

// 4. Tooltip and info-icon copy carried in instance properties (text props are invisible in snippet 2).
(async () => {
  const seen = new Set(), out = [];
  for (const i of figma.currentPage.findAll(n => n.type === 'INSTANCE' && /tip|tooltip|info/i.test(n.name))) {
    const p = i.componentProperties || {};
    for (const k of Object.keys(p)) if (p[k].type === 'TEXT' && !seen.has(p[k].value)) { seen.add(p[k].value); out.push(i.name + ': ' + p[k].value); }
  }
  return out.length + ' distinct tips\n' + out.join('\n');
})();
