// Read-only capture helper for a figma.com/design tab (browser JavaScript tool).
// Exports the given node ids as PNG at scale 1, stacks them on one canvas,
// and shows it full-screen over the editor so a screenshot is clean (no cursors, no panels).
// Nodes inside a clipped screen frame export clipped; use the matching component
// variant from the components section instead (it is not clipped).
// Usage: await __stack(['id1','id2',...])  -> {W,H,tilesX,tilesY,offs:[[id,x,y,w,h],...]}
//        __tile(tx,ty) then wait 1-2 s and take a full-size screenshot per tile.
//        __capclose() when done.
window.__stack = async (ids, gap = 16) => {
  const bmps = [];
  for (const id of ids) {
    const n = await figma.getNodeByIdAsync(id);
    const b = await n.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 1 } });
    bmps.push(await createImageBitmap(new Blob([b], { type: 'image/png' })));
  }
  const W = Math.max(...bmps.map(b => b.width)) + 2 * gap;
  const H = bmps.reduce((s, b) => s + b.height, 0) + gap * (bmps.length + 1);
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d'); x.fillStyle = '#ffffff'; x.fillRect(0, 0, W, H);
  let y = gap; const offs = [];
  bmps.forEach((b, i) => { x.drawImage(b, gap, y); offs.push([ids[i], gap, y, b.width, b.height]); y += b.height + gap; });
  let o = document.getElementById('__capov');
  if (!o) { o = document.createElement('div'); o.id = '__capov'; o.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#fff;overflow:hidden'; document.body.appendChild(o); }
  o.innerHTML = ''; c.style.cssText = `position:absolute;left:0;top:0;width:${W}px;height:${H}px`; o.appendChild(c); window.__capc = c;
  return { W, H, tilesX: Math.ceil(W / innerWidth), tilesY: Math.ceil(H / innerHeight), offs };
};
window.__tile = (tx, ty) => { window.__capc.style.transform = `translate(${-tx * innerWidth}px,${-ty * innerHeight}px)`; return 'ok'; };
window.__capclose = () => { const o = document.getElementById('__capov'); if (o) o.remove(); return 'closed'; };
