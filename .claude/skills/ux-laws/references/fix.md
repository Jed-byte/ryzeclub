# fix

Apply UX-law fixes to code we own. Bounded: one batch of fixes, one re-check, stop.

1. **Get the findings.** Use the audit from this conversation if there is one; otherwise run the detector (`detect.mjs <file> --all`) and a quick judgement pass from [laws.md](laws.md) on the main state.
2. **Triage** each finding (see SKILL.md): fix, narrow ignore with evidence, or ask.
3. **Fix in one batch.** Prefer the smallest change that removes the cause:
   - hit area: padding or a `::after` hit box before resizing the visible element
   - primary button: `width: 100%` + `min-height: 48px` in the phone breakpoint, not globally
   - keyboard: add `inputmode`, `autocomplete`, `enterkeyhint`; do not change `type` on fields with existing validation without checking it
   - placeholder labels: add a visible label; keep the placeholder only as an example value
   - label spacing: change the gap tokens for the field group, not each field
   - long numbers: format at render time; keep the raw value in data
   - sideways scroll: fix the widest element (min-width, fixed width, unbroken string); do not hide overflow on body
   - press feedback: one shared `:active` rule for buttons and tappable rows
   House rules still apply (navy-only Pulse buttons, light only).
4. **Re-check once** with the detector on the same states. Report before and after counts per rule and anything left, with the reason it was left.
5. Do not start a second round unless the user asks.
