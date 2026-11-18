---
name: critique-design
description: Review a designer's work (a Figma file or prototype link, or a set of screens) the way a Head of Product does, and hand the designer a visual PDF they can act on: one change per page, a clean capture of the real screen with the problems boxed and numbered, next to what it should look like (the designer's own component where it exists, otherwise a mockup in the design's fonts and colours). Reads the whole design file (every frame, component and tooltip, not just what the prototype clicks through to), checks each user story against the brief's terms, principles and states, and separates design problems from sample-data problems. Use this whenever the user wants to critique, review, give feedback on, or "take a look at" a design, a Figma link, a prototype, mockups or screens, prepare a design review, check designs against a PRD or brief, or decide whether designs are ready to approve, even if they just paste a figma.com link and say "thoughts?". Not for building or changing the design, for briefing the designer before design starts (that is design-handoff), or for reviewing built code.
---

# Critique design

You are helping a Head of Product review a designer's work and send the designer a review they can act on. The PM owns the **why**; the designer owns the **how**. So the review says what works, what to change and why it matters to the merchant or the business, and offers at most one way to fix each thing. It never redesigns, never changes the design file, and leaves the choices the handoff left open to the designer.

This is the sister of the design-handoff skill. That one briefs the designer going in; this one answers it. The review uses the handoff's own structure (story ids, terms table, principles, states to resolve), so the designer can hold the two side by side.

The output is a PDF, not a text document: designers act on pictures. Each page shows one change, "how it looks now" beside "what it should look like", with a few lines of plain English. No scores, no ratings, no severity codes, no personas section, no reviewer jargon. "Before approval" and "Your call" are the only markers.

## Writing: ASD-STE100 for all output

Everything this skill writes for a person (documents, reports, findings, briefs, messages, summaries, chat replies) uses ASD-STE100 (Simplified Technical English) at about 80%. Readers include people who do not speak English as a first language.

- Write sentences of 20 words or fewer. A list of conditions can have 25. Write one idea in each sentence.
- Use a full stop, not a semicolon. Do not use em dashes or en dashes. Use a colon, a hyphen or a new sentence.
- Use the active voice and the present tense. "Lune sends the file", not "The file is sent".
- Write instructions as commands. "Add the end date."
- Use one term for one concept in the whole output. Do not change words for variety.
- Do not use idioms, metaphors or writerly phrases. Say what happens: "The item stays on the list", not "the item ages honestly".
- Use plain, common words. Explain an abbreviation the first time you use it.
- The 20% that stays: product names, API and field names, code, regulatory names and domain words such as "cashback" or "accrual".
- Before you deliver a long document, check it: list each sentence over 20 words and shorten it.

This section applies to the language only. It does not change the structure, templates or steps of this skill.

## Step 1. Gather the inputs, and say what is missing

You need: the design file link, the PRD with numbered stories and acceptance criteria, and the design brief or handoff note the designer worked from (its terms table, principles and "states to resolve"). Look in the repo's `docs/` for these first; they are usually named after the feature. If the brief is missing, review against the PRD and say so in the summary.

You also need the designer's name and email before sharing. Never guess an email; ask at the end.

## Step 2. Read the whole design file

Read `references/capturing-figma.md` before touching a Figma link. The short version:

- **Review the design file, not the prototype.** A prototype only shows what has been wired. A state that is designed but not wired is not missing. The first Pulse review got this wrong and called eleven designed states missing.
- In the browser, open the design URL and run the read-only snippets in `scripts/figma-inspect.js`: the frame list, every screen's text, every component's variants and description, and the tooltip copy.
- Then look at the screens you need to judge visually, via the prototype at each frame id, scrolling inside each frame.
- Never write "missing" or "does nothing" until the frame list and the components confirm it. A state that exists only as a component is reported as "put this on a screen".

## Step 3. Check it, feature by feature

Work through the PRD's stories in order. For each one, find the screens and components that serve it and note:

- **Works:** specific things done well, quoted from the design, with why they work. These protect the good parts while the rest is fixed.
- **Change:** what, where and why, then one possible fix. Mark the items that must land before sign-off as **before approval**: a story that cannot be completed, a fixed term changed, a principle broken, a state the brief asked for that is not designed.
- **Questions:** only where the choice is genuinely the designer's.

Then check the three lists from the handoff: every term in its terms table, every principle, every state to resolve.

Then check `references/lune-product-rules.md`, which holds decisions that apply even when a brief is silent or out of date. For merchant-facing work the two that matter most: merchants only see what they control (never "data quality" or "couldn't be assessed" purchases, never their own targeting as a failure), and rejections are a resolution view, not an issue list (no red, no warning icons, no alert badges). A breach is a "before approval" change. If the brief itself asked for the breach, say the change is ours and update the brief. Check the numbers on screen add up (totals that should sum, ratios that should divide, dates that should agree). Wrong sample numbers are product's problem, not the designer's; collect them separately.

Then run the audit from the `ux-laws` skill (`~/.claude/skills/ux-laws/references/laws.md`, plus `forms.md` for any screen with input fields) on each screen at phone width. Each failure becomes a "Change" item written as a consequence for the user ("the Continue button is out of reach once the keyboard is open, so people have to close it to carry on"), never as a law name. Only mark it "before approval" when it stops a story being completed.

Respect what the handoff left open (layout, module order, drill-down pattern, chart treatment, icons, empty-state craft, tooltips). Comment on those as suggestions and say "your call".

## Step 4. Capture the screens and build the mockups

- Capture every "now" image and every "should" component with the overlay method in `references/capturing-figma.md` (`scripts/capture-overlay.js`, then `scripts/stitch_and_render.py stitch`). This gives clean, full-resolution crops of exactly the part that matters, including components the prototype cannot show.
- Read the design's fonts, colours, radii and spacing from the file (a node walk with the `figma` global) and use them for the mockups.
- Where the designer already designed the answer (a filled panel, a locked filter state), use their component as the "should" image and say so. Mock up only what does not exist yet.

## Step 5. Build the PDF

Follow `references/review-doc-template.md` and start from `assets/example-review.html`: cover, keep-these, one page per change (now with numbered boxes, should with highlighted changes), terms and states, data problems and questions. Write in the voice in `references/writing-style.md`:

- Short sentences, plain words a non-native speaker reads easily. Quote the design's own words.
- Name screens by number and in words ("the day-one Overview (1.1)"). Never use frame codes alone, internal engine terms, or reviewer jargon.
- No long dashes anywhere.
- When the brief itself was unclear, say product owns it ("this one is on us to confirm").

Render with `scripts/stitch_and_render.py pdf`, then screenshot every page with `check` and look at each one: boxes must frame text, not cover it; nothing may run past the footer. Fix once, re-render, stop. Save the PDF next to the feature's docs in the repo and send it to the user.

## Step 6. Share

Show the user the PDF before it goes to the designer. They usually share it themselves. If they want it in Drive, upload it there; never share with anyone the user did not name. If a correction is needed after sending, make a new version ("round 1b") rather than overwriting what the designer already has.

## What this skill is not

- Not a redesign. Never change the design file. If you mis-click in Figma (a double-click starts a rename), press Escape and say so.
- Not a spec. List the states the brief asked for; do not invent a full state matrix.
- Not the design-handoff skill. If there is no design yet, switch to that one.
- Not a code review or a design-quality score. If the user wants a scored audit of a built page, that is a different job.

## Chat reply

Send the PDF as a file, then one or two lines: how many "before approval" changes, and anything you could not check. Anything you could not check also goes on the cover.
