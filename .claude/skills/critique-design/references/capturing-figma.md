# Reading a Figma design file for review

Verified 2026-10-13 on the Pulse Merchant Analytics review. The first attempt reviewed only what could be reached by clicking the prototype and called eleven designed states "missing" (the campaign page, filtered screens, the dispute answer, the info tips). Those states existed on the canvas. So the rule is: **review the design file, not the prototype.** The prototype only tells you which states are wired; the canvas tells you which are designed.

## Getting in

1. **Figma MCP (`get_metadata`, `get_screenshot`)** needs the desktop app's Dev Mode server. If the user works in Figma in the browser it refuses every time; one call to confirm, then move on.
2. **The in-app browser** works once the user signs in to Figma in that pane. Open the **design** URL (`figma.com/design/<key>/...?node-id=<page-id>`), not the proto URL.
3. **Board export** (the user exports the page as one PNG) is the fallback if no browser route works. You lose the text and the components; say so in the review.

## Reading the canvas (the main route)

The design editor exposes the plugin API as a global `figma` object in the page. Run the snippets in `scripts/figma-inspect.js` with the browser tool's JavaScript action. They only read; never call anything that sets, creates, removes or renames.

1. **Snippet 1, the frame list.** Every section and every frame in it, with ids. This is your inventory. Count the screens and name them in the review's "What I reviewed" section.
2. **Snippet 2, all screen text.** Every visible text layer per frame, in reading order. Labels, copy and numbers come from here, exactly, so quotes in the review are character-accurate (it also tells a real minus sign from a long dash).
3. **Snippet 3, components.** Component sets with their descriptions and each variant's text. Filled detail panels, selected states, empty states and the designer's own notes ("Brand-wide tabs show the filter disabled with a lock note") usually live here. A state that exists only as a component is designed but not placed: report it as "put this on a screen", never as "missing".
4. **Snippet 4, tooltip copy.** Info tips often carry their text as an instance property, which snippet 2 cannot see.

The results come back inline; they can be long. Read them in the main context and take notes as you go, by feature.

## Capturing parts of the design for the PDF

Verified 2026-10-13. Screenshots of the live canvas are unusable (other people's cursors, panels that won't hide), and prototype screenshots cannot show components. Instead, export the exact node and show it full-screen over the editor:

1. Install `scripts/capture-overlay.js` in the design tab with the JavaScript tool.
2. Set the browser viewport to 800 x 880 (screenshots come back 1:1 at that size; a wider viewport is scaled down).
3. Call `__stack([...ids])` with every part you want, in one go. It stacks them on one canvas and returns each part's offset.
4. For each tile, call `__tile(tx, ty)`, wait 1 to 2 seconds, take a **full-size** screenshot (a scaled screenshot is saved small). A tile that repeats the previous one is stale: wait longer and retake it.
5. Stitch the tiles and cut each part out with `scripts/stitch_and_render.py stitch`. Then `__capclose()` and reset the viewport.

Gotchas: a node inside a screen frame exports clipped to the frame's 832px height (a section below the fold comes back 1 x 1). Use the matching component variant instead, for example "MA/Campaigns, Selected = None" for the campaigns table. Filled states usually exist as component variants and make the best "after" images.

## Looking at the screens

Text is not enough for layout, colour and hierarchy. For each screen you need to see, open the prototype at that frame: `figma.com/proto/<key>/...?node-id=<frame-id>&starting-point-node-id=<frame-id>&scaling=contain&hide-ui=1`, wait 5 seconds, screenshot, scroll inside the frame and screenshot again. Frames are often 832px tall with content to about 1,700px, so one screenshot is never the whole screen. Screenshots come back about 800px wide: good for layout and colour families, not for exact hex, font or contrast. Say "unverified" for those.

## Rules learned the hard way

- Never write "missing", "not designed" or "does nothing" until snippets 1 and 3 confirm there is no frame or component for it.
- Hover interactions (info tips, chart tooltips) do not fire on a click. Check the component description before concluding an icon is dead.
- A double-click on a layer name starts renaming it. Press Escape at once; do not type. Other people may be in the file.
- Edge-state and numbered frames ("E.1", "3.5") are the designer's labels. Always describe them in words in the review ("the first-period Overview, frame E.1").
