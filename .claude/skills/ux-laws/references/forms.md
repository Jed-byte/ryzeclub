# Mobile form playbook

Source: a Revolut "Bank account details" form (reel by zanderwhitehurst / revolutinsider, "Stop designing UI forms like this", seen 2026-10-20). The reel shows one form in two states: **at rest** and **while typing**. The lesson is that a good mobile form is designed for both, and changes shape between them.

## What the reference does

**At rest:**
- Back button (circle, top-left), then a large page title ("Bank account details").
- A two-option segmented control right under the title (Business / Individual). The choice that changes which fields appear comes first.
- Stacked, filled, full-width fields with generous radius and equal gaps.
- Selects show a small label above the chosen value ("Recipient's bank country / United Kingdom") with a chevron. Empty text fields show the label as the placeholder.
- Currency is pre-filled from the country (United Kingdom -> British Pound).
- One full-width primary button ("Continue") directly under the last field, not pinned to the bottom of an empty screen.

**While typing:**
- The large title collapses into the header row next to the back button, and the segmented control slides away. The fields move up so the active field and the next ones stay visible above the keyboard.
- The keyboard matches the field: a numeric keypad for account number and sort code.
- The primary action shrinks into a compact arrow button that sits beside the active field, so "next" is always under the thumb without closing the keyboard. When typing ends, it grows back into the full-width Continue.

## Rules to apply

1. **Branching choice first.** Put the choice that changes the rest of the form (account type, personal vs business, country) at the top, as a segmented control when there are 2 or 3 options. (Hick)
2. **Derive, do not ask.** Pre-fill anything that follows from an earlier answer: currency from country, the bank-code field type from country (sort code for GB, IBAN for AE and SA, routing number for US), bank name from IBAN. (Tesler)
3. **Fields for the country, not a generic set.** The field list changes with the country. Never show "Sort code" to a UAE recipient.
4. **Right keyboard per field.** `inputmode="numeric"` for account numbers, sort codes, OTPs, card numbers; `inputmode="decimal"` for amounts; `type="email"`, `type="tel"`; `autocomplete` attributes on every field (`given-name`, `family-name`, `cc-number`, `one-time-code`). Turn off autocorrect and auto-capitalisation on codes.
5. **Format as they type, accept anything.** Auto-insert dashes in sort codes (00-00-00) and spaces in IBANs (groups of 4). Accept pasted values with spaces, dashes or lowercase and normalise them. (Postel, Miller)
6. **Keyboard-aware layout.** When a field is focused: collapse the big title into the header, keep the active field and the next field visible, and keep a "next" action reachable above the keyboard. On the web, use `visualViewport` resize or `interactive-widget=resizes-content` in the viewport meta, and `scrollIntoView({block: "center"})` on focus. (Target distance)
7. **Primary action next to the last field.** Full width, at least 48px tall, close to the form (proximity), not floating at the screen bottom with a gap above it.
8. **The keyboard's return key moves forward.** `enterkeyhint="next"` on every field except the last, `enterkeyhint="done"` or `"go"` on the last. Return moves focus to the next field.
9. **Validate on leave, not on submit.** Check each field when the user leaves it, show the message under that field in plain words ("Sort codes have 6 digits"), and never clear what they typed. (Doherty)
10. **Labels stay visible.** Use a label above the value (as in the selects) or a floating label. A placeholder that vanishes on typing is not a label.
11. **Disabled is not a dead end.** If Continue is disabled, the reason must be visible (which field is missing). Better: keep it enabled and point to the first problem on tap.
12. **End clearly.** The screen after submit says what happened and what happens next (a review screen for money movement, then a confirmation). (Peak-end)

## Adapting to Lune

- The reference is dark. Lune pages are **light only**: keep the structure (filled fields, generous radius, stacked layout, morphing CTA), not the colours.
- Pulse customer buttons are **navy only**; the compact arrow button and the full Continue are both navy.
- GCC context: country first, then IBAN (AE/SA/BH/KW/QA/OM all use IBAN), with the bank name derived and shown under the field once the IBAN is valid. Phone numbers accept +971 / 00971 / 05x and normalise. Support Arabic numerals in numeric fields and RTL layout if the client is Arabic-first.

## Quick audit for any form

- [ ] Does the first field decide the rest? Is it first?
- [ ] Is anything asked that could be derived?
- [ ] Does every field open the right keyboard?
- [ ] With the keyboard open, can the user see the active field and reach "next" without dismissing it?
- [ ] Is the primary button directly under the last field and full width?
- [ ] Does pasting a messy value work?
- [ ] Are errors shown per field, on leave, in plain words?
- [ ] Is it obvious why Continue is disabled, if it is?
