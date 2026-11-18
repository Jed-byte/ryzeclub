# Forms: the Revolut field pattern, as built in Ryze Club

Source: Revolut "Bank account details" form (reel by zanderwhitehurst / revolutinsider, "Stop designing UI forms like this"). The same reference is in the account-level `ux-laws` skill's `forms.md`; this file is how it lands in this repo.

## The field

The label sits **inside** the field, not above it. There is no separate title line per field.

- **Empty, at rest:** the label shows at full size in the middle of the field, like a placeholder.
- **Focused or filled:** the label shrinks and moves to the top edge of the field, still inside the box. The value sits under it. The example text (if any) appears only now, under the small label.
- **Selects:** always show the small label above the chosen value (they always have a value), with the chevron on the right.
- The label never disappears completely. A label that vanishes on typing leaves people unsure what the field was for once they look back (Miller; the detector rule `placeholder-as-label`).

This removes a text line per field, so the form is shorter and the label is joined to its field by the box itself (uniform connectedness beats proximity).

## Markup (use the `fld()` helper in `app.js`)

```js
fld({ id: 'ed-level', label: 'Level or pace', value: c.level, max: 80 })
fld({ id: 'ed-price', label: 'Price per session (AED)', type: 'number', mode: 'numeric', hint: 'Members see exactly this. Use 0 for free.' })
fld({ id: 'ed-desc', label: 'Description', area: 4, value: c.desc, max: 300 })
fsel({ id: 'ed-venue', label: 'Indoor or outdoor', options: VENUES, value: c.venue })
```

Produces:

```html
<div class="fl">
  <input id="ed-level" placeholder=" " …>
  <label for="ed-level">Level or pace</label>
</div>
<p class="fl-hint" id="ed-level-hint">…</p>   <!-- only with hint; linked by aria-describedby -->
```

The input comes before the label so CSS can float the label with `:focus` and `:not(:placeholder-shown)`. The `placeholder` is a single space unless there is example text; example text is transparent until the field has focus.

## Rules that go with it

1. Right keyboard per field: `inputmode="numeric"` for prices and codes, `type="email"` / `type="tel"`, `autocomplete` on personal fields, `autocapitalize="off"` on handles and links. (Fitts, Postel)
2. Return key moves forward: `enterkeyhint="next"` on all but the last field, `done` on the last.
3. Helper text that people need while typing goes under the field as `.fl-hint`, never inside the label.
4. Main button directly under the last field, full width (sheets already do this). (Target distance, proximity)
5. Accept messy input and normalise it (a leading `@` on handles, spaces in numbers). (Postel)
6. Validate on leave, message under the field, keep what they typed.
7. Light theme only here. Keep Revolut's structure (filled fields, label inside, stacked), not its dark colours.
