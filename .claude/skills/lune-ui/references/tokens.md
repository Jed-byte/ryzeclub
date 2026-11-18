# Lune UI tokens

Source: compiled `theme.css` in Storybook (https://lune-ui.pages.dev, stories under Tokens/*), captured 9 Nov 2026. Re-capture when lune-ui releases a new minor version.

Use the **semantic tokens** in screens. Use a **palette ramp** only when no semantic token fits.

## Font
- `--font-sans`: "Plus Jakarta Sans", ui-sans-serif, sans-serif. Load it from Google Fonts (400, 500, 600, 700).
- `--font-mono`: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace.
- Headings use the same face (`--font-heading: var(--font-sans)`).

## Palette ramps

| Ramp | Steps |
|---|---|
| gray | 0 #fff · 50 #fcfcfc · 100 #f5f5f5 · 300 #e1e1e1 · 400 #ccc · 500 #b3b3b3 · 600 #9e9e9e · 700 #959595 · 800 #656565 · 900 #383838 · 1000 #1d1d1d · 1100 #101010 · 1200 #040404 |
| primary (Lune green) | 100 #cee0db · 300 #6ca194 · 500 #0a634d · 900 #02140f |
| focus | light #10a37f · dark #2bc29e |
| secondary (plum) | 300 #a16c79 · 500 #4f081a |
| success | 50 #effef4 · 100 #d0efdb · 400 #43bd71 · 500 #14ad4d · 800 #08451f · 900 #04230f |
| warning | 50 #fff7eb · 100 #ffeed2 · 400 #ffbc4c · 500 #ffab1f · 800 #66440c · 900 #332206 |
| error | 50 #ffecec · 100 #fdd7d7 · 400 #f75d5d · 500 #f53535 · 800 #621515 · 900 #310b0b |

Brand marks (logo only, not UI tokens): teal #002E2A and sea #469A93.

Values that components hard-code (not in the ramp tokens): `bg-gray-200` = #efefef (active sidebar sub-item), `bg-primary-50` = #e7efed (Empty State icon chip).

## Semantic tokens (light theme)

| Token | Value | Use |
|---|---|---|
| `--background` | gray-0 | page |
| `--foreground` | gray-1100 | main text |
| `--card` / `--card-foreground` | gray-0 / gray-1100 | cards |
| `--surface` | gray-50 | sunken areas |
| `--primary` / `--primary-foreground` | primary-500 / gray-100 | main button, active text |
| `--secondary` / `--secondary-foreground` | primary-100 / primary-500 | soft green button, chips |
| `--muted` / `--muted-foreground` | gray-100 / gray-800 | quiet fills, secondary text |
| `--accent` / `--accent-foreground` | gray-100 / gray-1100 | hover fills |
| `--destructive` | error-500 | delete, errors |
| `--border`, `--input`, `--input-border` | gray-300 | lines, field borders |
| `--input-border-hover` | gray-500 | field hover |
| `--input-border-focus`, `--ring` | focus-light #10a37f | focus border + 3px ring at 50% |
| `--input-placeholder` | gray-600 | placeholder |
| `--input-disabled-bg` / `--input-disabled-text` | gray-100 / gray-400 | disabled fields |
| `--text-label` | gray-900 | field labels |
| `--text-muted` / `--text-subtle` / `--text-disabled` | gray-800 / gray-500 / gray-400 | text levels |
| `--success`, `--success-subtle`, `--success-minimal` | success-500 / 100 / 50 | status |
| `--warning`, `--warning-subtle`, `--warning-minimal` | warning-500 / 100 / 50 | status |
| `--error`, `--error-subtle`, `--error-minimal` | error-500 / 100 / 50 | status |
| `--chart-1..5` | primary-500, success-500, warning-500, error-500, secondary-500 | chart series in this order. Checked 9 Nov 2026 with the dataviz validator: chart-1 vs chart-2 separate well (ΔE 22), but primary-500 is low chroma and success-500 is 2.9:1 on white. Always add a legend and a table view. Raise this with design if charts become a product focus. |
| `--sidebar` | gray-50 | sidebar background |
| `--sidebar-foreground` | gray-800 | sidebar text |
| `--sidebar-accent` / `-foreground` | primary-100 / primary-500 | sidebar highlight |
| `--sidebar-border` | gray-300 | sidebar lines |

A dark theme exists under `.dark`. Lune prototypes are light only, so never set it.

## Radius
`--radius: .5rem`. `rounded-sm` = radius − 4px (4px) · `rounded-md` = radius − 2px (6px) · `rounded-lg` = 8px · `rounded-xl` = 12px · `rounded-2xl` = 16px. Fields use `rounded-lg`. Buttons use `rounded-md`. Cards and metric cards use `rounded-xl`.

## Type scale (utility classes)

| Class | Size / line height | Weight |
|---|---|---|
| `text-heading-2xl` | 40 / 48px | bold (pinned) |
| `text-heading-xl` | 36 / 40px | bold |
| `text-heading-lg` | 32 / 36px | bold |
| `text-heading-md` | 28 / 34px | bold |
| `text-heading-sm` | 24 / 28px | bold |
| `text-heading-xs` | 20 / 24px | bold |
| `text-metric-semibold` / `text-metric-bold` | 30 / 32px | 600 / 700 |
| `text-body-2xl` | 20 / 30px | compose with `font-*` |
| `text-body-xl` | 18 / 27px | compose |
| `text-body-lg` | 16 / 24px | compose |
| `text-body` | 14 / 21px | compose (default UI text) |
| `text-body-sm` | 12 / 16px | compose |
| `text-caption-regular/medium/semibold/bold` | 10 / 14px | in name |

Default UI text is `text-body font-medium`. Labels are `text-body font-medium text-label`. Helper text is `text-body-sm text-muted-foreground`.

## Motion
Default transition 150ms `cubic-bezier(.4,0,.2,1)`. Sidebar width animates over 200ms linear.
