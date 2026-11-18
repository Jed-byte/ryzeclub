# audit

Check an existing page or prototype and report what fails. Two independent assessments, then one merged report.

## Setup

1. **Resolve the target** to a file path or URL. Prefer the source file.
2. **List the states to check.** Prototypes in this repo are often many screens in one file (hidden screens, sheets, tabs). Read the code to list the screens and how to reach each (a function call, a hash, a button). Cap at about 8 representative states; say which you skipped.

## Assessment A: judgement (sub-agent, no detector output)

Run in a sub-agent when the Agent tool exists, so the detector's list does not anchor it. Brief it with the target, the states list, and this:

> Open the target in the browser at 375 x 812. For each state, walk it as the user would, in order. Read ~/.claude/skills/ux-laws/references/laws.md (and forms.md if there are fields) and answer every **Check** question that needs judgement: one job and one primary action (Hick, Von Restorff), what stands out, order of items (serial position), grouping (proximity, similarity, common region, connectedness), anything asked that could be derived (Tesler), messy input such as a pasted IBAN with spaces (Postel: actually type it), loading and pressed feedback (Doherty), conventions (Jakob), progress and resuming (goal-gradient, resumption), the end of the flow (peak-end), anything nobody would miss (Occam). Skip pure measurement (sizes, attributes); another check covers it. Return only failures, each as: screen, element, Problem (one sentence), Result (what happens to the person), Fix (one command), law in brackets. Write in ASD-STE100: sentences of 20 words or fewer, active voice, no jargon, and the terms control, main button, field, label, tap area, screen.

If no sub-agent tool exists, do A yourself first and write it down before running B. Start the report with `Single-context audit` so the reader knows.

## Assessment B: detector

1. Whole file at load:
   ```bash
   node ~/.claude/skills/ux-laws/scripts/detect.mjs <file> --all --json
   ```
2. Each other state: open it in the browser at 375px wide (resize the window), reach the state, then run `window.__UX_W = 375;` followed by the contents of `scripts/page-audit.js` through the browser's JavaScript tool. Map ids to `scripts/rules.mjs` for the why and fix.
3. Exit code 1 or a script error means the scan did not run for that state. Say so; never report it as clean.

## Synthesis

Merge A and B, remove duplicates, drop false positives (say which and why). Order by what stops the user finishing their task first, then what slows them, then polish. Write the report in ASD-STE100 (see SKILL.md). Report in chat:

```
## <screen>
1. **Problem:** The Continue button is 31px high.
   **Result:** People miss it with one hand.
   **Fix:** Make the button the full width of the column and 48px high. (Fitts's law)
...
Advice only: <one line each, or "None.">
Not checked: <screens that the check did not open, checks that did not run>
```

No scores, ratings or severity codes. End with one question: "Do you want me to fix these now, or send them to the designer?"

If the work is a designer's, hand the findings to critique-design's format instead of fixing.
