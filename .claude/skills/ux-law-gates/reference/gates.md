# Grading, gates, ledger and report

## The 0 to 4 scale (per law)

| Score | Meaning |
|---|---|
| 4 | Nothing to fix. The Check question gets a clear "yes" (or "no problem") with evidence. |
| 3 | Small issue. A person would not slow down or make a mistake. |
| 2 | Real issue. Some people slow down, hesitate or need a second try. |
| 1 | Serious issue. People make mistakes or give up on this step. |
| 0 | The law is broken in a way that blocks the task. |
| n/a | The law cannot apply to this surface (for example goal-gradient on a one-field sheet). Give one line why. |

Every score needs evidence: a selector, a detector finding, a screenshot, or a measured value. "Feels cluttered" is not evidence. Conditional laws (Miller's number, Zeigarnik memory, Doherty's 400ms, aesthetic-usability) are scored as guidance, never as hard pass/fail.

Total = sum of scored laws / (4 × number scored). Print it as `62/76 (2 n/a)`, never over 80 when some are n/a.

## Baseline (grade)

Fill one row per law, in the loop order from SKILL.md:

| # | Law | Score | Evidence | Concept to try |
|---|---|---|---|---|

Then list the detector findings that fed the scores, and the ones you marked as false positives.

## The gate (one per law)

Before any code changes for law L:

1. **Concept.** One or two sentences: what changes on screen and why it serves L. Name the files and render functions.
2. **Gate check for L.** Answer L's Check question for the concept as if it were built. The concept must reach a score of at least 3 for L, and be higher than the baseline.
3. **Regression check.** For every law already passed in this run, ask: does the concept lower its score? Also check the Ryze house rules. Any drop or house-rule break fails the gate.
4. **Verdict.** `PASS` → apply. `REVISE` → change the concept and run the gate again (at most two revisions). `REJECT` → log the reason and move to the next law.

After applying: screenshot, re-run the detector or page audit, and re-score L. If the built result scores lower than the concept promised, fix it now or revert it. Do not carry a broken change to the next law.

## Ledger (one entry per law)

```
### L<n> <Law name>: <before> → <after>  [PASS | REJECTED | SKIPPED (score 4 / n/a)]
Concept: …
Gate: <score for L as concept> · regressions checked: <laws> · house rules: ok | <conflict>
Change: <files, functions, one line each>
Evidence after: <detector result, screenshot path, measured value>
```

## Final review with impeccable (required)

For each PASS entry in the ledger, in order:

1. Load impeccable's `reference/critique.md` lens (Assessment A only is enough per change; run the full dual-assessment critique once on the whole target at the end if sub-agents are available) and `reference/craft-floor.md`.
2. Look at only that change: its diff and its before/after screenshots.
3. Answer:
   - Does it pass impeccable's absolute bans and the AI slop test?
   - Does it fit the incumbent visual world (tokens, radii, type) or is it a one-off?
   - Which Nielsen heuristics does it help or hurt?
   - Verdict: **keep**, **polish** (name the polish and apply it), or **revert** (revert it and re-score its law).
4. Add a line to that ledger entry: `Impeccable: keep | polish: … | revert: …`.

## Report (chat, and saved next to the flow docs)

1. Target and method (detector ran / page audit per sheet / degraded and why).
2. Scorecard: before and after per law, and the totals.
3. Ledger, as above, with the impeccable verdict on each entry.
4. Open items: rejected concepts and laws still under 3, each with the next step.

Save the report to `docs/initiatives/initiative-001-community-fitness-dubai/planning/prds/prd-001-club-discovery-v1/ux/reviews/ux-laws-<target>.md`.
