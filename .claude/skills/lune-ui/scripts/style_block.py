#!/usr/bin/env python3
"""Print the head block a single-file prototype needs to look like Lune UI.

Prints: the Google Fonts link for Plus Jakarta Sans, then one <style> with the
compiled Lune UI CSS (theme tokens, Tailwind preflight and every utility the
Storybook components use). Paste the output at the top of the prototype, or:
  python3 style_block.py > /tmp/lune-head.html
Light theme only: the CSS also holds a .dark block. Never add class="dark".
"""
import os
here = os.path.dirname(os.path.abspath(__file__))
css = open(os.path.join(here, '..', 'assets', 'lune-ui-storybook.css')).read()
print('<link rel="preconnect" href="https://fonts.googleapis.com">')
print('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">')
print('<style>/* Lune UI compiled theme + component utilities (from lune-ui.pages.dev) */')
print(css)
print('</style>')
