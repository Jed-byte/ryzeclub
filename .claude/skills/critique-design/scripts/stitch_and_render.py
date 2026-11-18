"""Stitch overlay tiles into one image, cut out each part, render the review HTML to PDF,
and screenshot every page for a layout check.

  python3 stitch_and_render.py stitch tiles.json offs.json outdir   # tiles.json: {"tx,ty": "/path/tile.jpg"}, viewport 800x880
  python3 stitch_and_render.py pdf review.html review.pdf
  python3 stitch_and_render.py check review.html checkdir            # one PNG per page at 1123x794
"""
import json, os, re, subprocess, sys
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

def stitch(tiles_json, offs_json, outdir, vw=800, vh=880):
    from PIL import Image
    tiles = json.load(open(tiles_json)); offs = json.load(open(offs_json))  # offs: [[name,x,y,w,h],...]
    W = max(o[1] + o[3] for o in offs) + 16; H = max(o[2] + o[4] for o in offs) + 16
    big = Image.new('RGB', (W, H), 'white')
    for k, f in tiles.items():
        tx, ty = map(int, k.split(',')); big.paste(Image.open(f).convert('RGB'), (tx * vw, ty * vh))
    os.makedirs(outdir, exist_ok=True)
    for name, x, y, w, h in offs:
        big.crop((x - 6, y - 6, x + w + 6, y + h + 6)).save(os.path.join(outdir, name + '.png'))

def pdf(html, out):
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=30000',
                    '--run-all-compositor-stages-before-draw', f'--print-to-pdf={os.path.abspath(out)}', 'file://' + os.path.abspath(html)], capture_output=True)

def check(html, outdir):
    os.makedirs(outdir, exist_ok=True); src = open(html).read(); n = src.count('<section class="page"')
    base = os.path.dirname(os.path.abspath(html))
    for i in range(1, n + 1):
        css = f'<style>.page{{display:none!important}} .page:nth-of-type({i}){{display:flex!important}}</style></head>'
        p = os.path.join(base, f'_check{i}.html'); open(p, 'w').write(src.replace('</head>', css))
        subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=8000', '--window-size=1123,794',
                        f'--screenshot={os.path.abspath(outdir)}/p{i}.png', 'file://' + p], capture_output=True); os.remove(p)

if __name__ == '__main__':
    {'stitch': stitch, 'pdf': pdf, 'check': check}[sys.argv[1]](*sys.argv[2:])
