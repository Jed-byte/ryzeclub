---
name: ux-law-gates
description: Change a Ryze Club screen, form or flow one UX law at a time. Grades the surface against the 20 laws of UX (Hick, Fitts, Jakob, proximity, Miller, Doherty, Von Restorff, target distance, serial position, peak-end, resumption, Prägnanz, similarity, uniform connectedness, Tesler, Postel, goal-gradient, Parkinson, Occam, Pareto), passes each proposed change through a gate for its law before the next law starts, then has impeccable review every law change at the end. Use when the user asks to improve, redesign, audit or "run the UX laws" on any prototype screen, sheet, form or flow in this repo, or names this skill.
user-invocable: true
argument-hint: "[grade · gate · review] [target screen, sheet or flow]"
---

# UX law gates

Impeccable is the framework. The 20 laws of UX are the grading method. Every change is tied to one law, checked against that law before it is kept, and checked again so it does not break a law that already passed. At the end, impeccable reviews each change on its own.

```
setup (impeccable) → grade all 20 → for each law: concept → GATE → apply → re-grade → next law → impeccable review per change → report
```

## Setup

1. Load the `impeccable` skill's setup (its SKILL.md, Setup steps 1 to 3). Run its context launcher once. If the launcher cannot run here, say so in one line and read `README.md`, `ux-spec.md` and `styles.css` directly. Mode for this repo is **Operate** (app UI) unless the target is a landing or share card.
2. Read [reference/laws.md](reference/laws.md): each law with its **Build** rule and **Check** question.
3. Read [reference/gates.md](reference/gates.md): the 0 to 4 scale, the gate, the ledger and the report format.
4. If the target has any input field, also read [reference/forms.md](reference/forms.md) (the Revolut field pattern as built in this repo).
5. Resolve the target to concrete render functions in `app.js` (for example `O.edit`, `O.claim`) and the CSS that styles them.

## Ryze house rules (they win over any law)

From `docs/initiatives/initiative-001-community-fitness-dubai/planning/prds/prd-001-club-discovery-v1/ux/ux-spec.md`:

- Light theme. One accent (`--acc`, blue) for the main button. Danger red only for destructive actions.
- Forward actions carry an arrow, adding actions a plus, confirmations a tick. The label carries the meaning on its own.
- Every non-root screen has a labelled Back at top left. Sheets close with the round X.
- Tap targets at least 44px. Focus ring is the 3px ink outline; never remove it.
- Plain British English, no jargon, no em dashes in UI copy.
- The prototype has no build step: plain `app.js`, `styles.css`, `index.html`. Bump the `?v=` cache keys in `index.html` when CSS or JS changes.

If a law suggests something a house rule forbids, follow the house rule and record the conflict in the ledger.

## Commands

| Command | What it does |
|---|---|
| `grade [target]` | Score the target against all 20 laws and stop. No edits. |
| `gate [target]` (default) | Full run: grade, then the law-by-law loop with a gate per law, then the impeccable review, then the report. |
| `review [target]` | Only the final step: impeccable reviews each change already in the ledger. |

No argument: say what the three commands do in three lines and ask for the target. Never start editing without a target.

## Order of the law loop

Work structure first, surface last. A later law may not undo an earlier one.

1. **What the screen asks for:** Jakob → Pareto → Hick → Tesler → Occam
2. **How it is grouped:** Miller → Proximity → Similarity → Uniform connectedness → Prägnanz → Von Restorff → Serial position
3. **How hands and eyes reach it:** Fitts → Target distance → Postel
4. **How it responds and ends:** Doherty → Goal-gradient → Resumption (Zeigarnik) → Parkinson → Peak-end

Skip a law only when the baseline gives it 4 or `n/a`, and say so in the ledger.

## Detector

```bash
node .claude/skills/ux-law-gates/scripts/detect.mjs index.html --all
```

It renders the page at 375px in headless Chromium and measures what can be measured (tap areas, keyboards, label distance, placeholder labels, CTA distance, sideways scroll). It only sees what is visible at load. This app opens forms in sheets, so for a sheet, open it in a browser at 375px and evaluate `scripts/page-audit.js` in the page (set `window.__UX_W = 375` first). Detector findings are evidence for a law's score, not the score itself. Mark a confident false positive on the element with `data-ux-ignore="rule-id"` and give the reason in the ledger.

## Hard rules

- One law per change. If a change serves two laws, log it under the law it was made for and note the other.
- A concept that fails its gate is not applied. Revise it (at most twice) or log it as "rejected" with the reason.
- A regression on an earlier law fails the gate, even if the current law improves.
- Verify by looking: screenshot the target at 375px at rest and while typing (for forms) before and after each applied change.
- Never invent product facts or copy claims. Copy changes keep the meaning; ask before changing what a screen promises.
- The impeccable review at the end is required. A run without it is incomplete; say so if it was skipped.
