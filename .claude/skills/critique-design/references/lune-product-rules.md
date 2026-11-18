# Lune product rules to check in every design review

These are product decisions that hold across Lune surfaces. Check the design against each one that applies, even when the feature's brief is silent or out of date. If the brief contradicts a rule here, the rule wins; flag the brief as needing an update and say the change is ours, not the designer's.

## Merchant-facing surfaces (Pulse merchant portal, merchant analytics)

**1. Merchants only see what they control.** (Dennis, 2026-10-13)
On anything about which purchases qualified or were rejected, show only reasons that map to a campaign setting the merchant can change: minimum spend, per-customer cap, budget. Card ranges are NOT merchant-controlled: the bank selects the cards (Dennis, 2026-10-21), so "card not eligible" stays out of the rejection panel and its totals; it may appear in the dispute lookup only, worded as the bank's choice ("This offer at [Bank] covers only selected cards"). Never show:
- Purchases that could not be checked because bank data was missing ("data quality", "couldn't be assessed", "card BIN missing", missing timestamp, currency or terminal id). That data travels from the bank to Lune; the merchant can't act on it, and showing it suggests their data is inaccurate. Not as a group, not in counts, not in a dispute or lookup list.
- The merchant's own targeting as a failure (outlets, terminals or dates they chose not to cover).
- "Outlet not recorded" or "missing from bank feed" rows: every terminal carries an outlet tag, so every purchase has an outlet (Dennis, 2026-10-21).
- "Customer not activated" or "outside the target audience" as rejection reasons; that story belongs in the funnel.

How to review it: search every screen's text and every component variant for words like "data quality", "assessed", "BIN", "feed", "missing", and for rejection lists with more than the controllable reasons. Each hit is a "before approval" change.

**2. Rejections are a resolution view, not an issue list.** (Dennis, 2026-10-13)
The area exists to help the merchant answer a customer and decide whether to adjust a setting. It must not look like an error report: no red, no warning icons, no amber or red alert badges on tabs, no "problem" or "failed" wording. Prefer neutral design-system shades, plain counts, and copy framed as settings ("148 purchases were below the AED 150 minimum spend").

How to review it: look at colours, icons, badges and wording in the rejection panel, its tab, and the dispute lookup rows. Red or alert styling is a "before approval" change.

## All surfaces

- Writing: plain English, no long dashes, terms exactly as the brief's terms table (see `writing-style.md`).
- Client material: no internal mechanics or engine codes on screen ("BIN", gate names), no competitor names, no bad or blurry logos in demo data, no public hosting of client-branded work.
