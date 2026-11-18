#!/usr/bin/env python3
"""Print the rendered Lune UI markup of a Storybook story.

Usage:
  show.py --list                      list every story id
  show.py <id-or-fragment> [--svg]    print markup (SVG bodies hidden unless --svg)
  show.py <id-or-fragment> --props    print props (argTypes) and default args
Markup comes from assets/stories.json, captured from https://lune-ui.pages.dev.
"""
import json, os, re, sys
here = os.path.dirname(os.path.abspath(__file__))
data = json.load(open(os.path.join(here, '..', 'assets', 'stories.json')))
args = [a for a in sys.argv[1:] if not a.startswith('--')]
flags = [a for a in sys.argv[1:] if a.startswith('--')]
if '--list' in flags or not args:
    for s in data:
        print(f"{s['id']:60} {s['title']} / {s['name']}")
    sys.exit(0)
q = args[0].lower()
hits = [s for s in data if s['id'] == q] or [s for s in data if q in s['id'] or q in (s['title'] + ' ' + s['name']).lower()]
if not hits:
    sys.exit('No story matches ' + q + '. Run show.py --list.')
for s in hits[:3]:
    print(f"===== {s['id']} ({s['title']} / {s['name']})")
    if '--props' in flags:
        print(json.dumps({'argTypes': s.get('argTypes'), 'args': s.get('args')}, indent=1)[:4000])
        continue
    h = s['html']
    if '--svg' not in flags:
        h = re.sub(r'<svg[\s\S]*?</svg>', '<svg data-icon/>', h)
    print(h)
    print()
if len(hits) > 3:
    print(f"... {len(hits) - 3} more matches: " + ', '.join(s['id'] for s in hits[3:]))
