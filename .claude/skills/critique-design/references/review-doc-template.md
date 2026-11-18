# Review PDF template

The review is a visual PDF, A4 landscape, one change per page. Each page shows **how it looks now** (a clean capture of the real design, with numbered orange boxes around the problems) beside **what it should look like** (either the designer's own component that already solves it, or an HTML mockup in the design's own fonts and colours). Text is short, plain English, and explains; the pictures carry the argument.

The working example is `assets/example-review.html` (Pulse Merchant Analytics, 13 October 2026). Copy it, keep its CSS, and replace the pages. Its CSS already holds the page frame, the "now / should" labels, the highlight boxes (`.hb`, `.hb.r` for a right-corner badge), the numbered notes, the "Before approval" / "Your call" tags, and a small mock kit (tiles, cards, tables, chips, scope labels, banners) to rebuild parts of a screen.

## Pages, in order

1. **Cover.** Feature, round, date, who it's from, what was reviewed ("all N screens and the components"), a three-sentence verdict, and two boxes: "Before we approve" (numbered, with page numbers) and "Also in this review".
2. **Keep these.** Bullets of what is better than the brief, with one capture of the best part. It tells the designer what not to touch.
3. **One page per change.** Story id and screens in the kicker, a tag (**Before approval**, or **Your call** for things the handoff left to the designer), a one-line title saying the change, two sentences of why, then:
   - Left: "How it looks now (screen number and name)", the capture with boxes, numbered notes matching the boxes.
   - Right: "What it should look like", then the designer's component labelled "your own component", or a mockup, with changed words highlighted (`.hl`) and two or three bullets.
   - Use the side-by-side layout (`.cols`) for panels and the stacked layout (`.stack` with `.row`) for wide strips like card rows.
4. **Terms, states and smaller things.** Three columns: the handoff's terms table checked, the handoff's states checked, short nits.
5. **Numbers that don't add up, and questions.** Sample-data problems in a table marked "ours to fix, not yours", then two or three real questions and the next step.

## Rules

- **One change per page.** If a page needs more than three boxes, it is two pages.
- **Boxes go around the problem, never on top of text.** Pad them; put the badge on the corner with empty space (`.hb.r` for right).
- **Show the designer's own answer when it exists.** "Place this state on 3.1" with their component beats any mockup.
- **Mockups show the idea, not a redesign.** Rebuild only the part that changes, in the file's fonts and colours (read them with `scripts/figma-inspect.js` or a node walk), and highlight the changed words. Say "Mockup" where wording is still ours to confirm.
- **Keep numbers as designed in mockups** unless the page is about the number; wrong sample data goes on the data page.
- **No scores, no severity codes, no personas, no long dashes.** "Before approval" and "Your call" are the only markers.
- **Plain English** per `writing-style.md`. Name screens by number and in words.
- **Check every page as an image before sending** (`scripts/stitch_and_render.py check`). Look for boxes covering text, notes running past the footer, and badges clipped at an edge. One round of fixes, then stop.
