# build

Use while making a new screen, flow or prototype.

## Before writing UI

1. Name the **one job** of the screen and the **one primary action**. If you cannot, the screen is two screens. (Hick, Occam, Von Restorff)
2. List the states the screen needs: empty, loading (over 400ms), filled, error, success/end. The end state gets as much care as the start. (Doherty, peak-end)
3. List what the system already knows or can work out (country → currency, IBAN → bank name, card number → card type, profile → name and phone). Pre-fill it; do not ask for it. (Tesler)
4. Run the **Build** rule of every ★ law in [laws.md](laws.md). Add the others the screen type calls for:
   - lists and navigation: serial position, Hick
   - multi-step flows: goal-gradient, resumption (Zeigarnik), peak-end
   - dashboards: Pareto, Prägnanz, similarity, common region
5. If there is any input field, follow [forms.md](forms.md) in full.

## While building

Default measurements, so the detector has nothing to find:

| Thing | Rule |
|---|---|
| Primary button on phone | Full column width, 48 to 56px tall, 16 to 24px below the last field |
| Any tap target | 44 x 44px hit area; never under 32px |
| Label to its field | 4 to 8px; field group to next label: at least twice that |
| Numeric fields | `inputmode="numeric"` / `"decimal"` / `type="tel"`, `enterkeyhint` on each |
| Personal fields | `autocomplete` (given-name, family-name, email, tel, cc-number, one-time-code, postal-code) |
| Long numbers on screen | Grouped (IBAN and card in 4s, sort code 00-00-00) |
| Pressed state | `:active` style on buttons and tappable rows |
| Page at 375px | No sideways scroll |
| Filled buttons per area | One |

## After building

Run the detector once on the file, fix everything real in one batch, re-run once, stop. Then walk the screen at 375px for the judgement checks in [laws.md](laws.md) (one pass). Do not loop.

```bash
node ~/.claude/skills/ux-laws/scripts/detect.mjs <file> --all
```
