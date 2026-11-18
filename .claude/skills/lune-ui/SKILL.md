---
name: lune-ui
description: The Lune design system (Lune UI, package @lune-technologies/lune-ui) - tokens, typography, radius, the Lune component set (App Sidebar, User Menu, Metrics Card, Date Range Preset Select, Empty State, Campaign Phone Preview, Form fields, Toast, Logo) and the shadcn-vue primitives it wraps, plus the compiled CSS and captured markup to rebuild them in a single-file HTML prototype. Use this whenever you build, change or review any Lune web screen or prototype (LuneHub, Lunehub Analytics, Merchant Portal, Pulse Admin, bank portal, reports, dashboards, forms), whenever the user mentions the Lune design system, Lune UI, lune-ui, Storybook, design tokens or "our components", and before writing any prototype HTML for Lune. Not for the mobile SDK screens inside a bank app (those follow the SDK and bank theme).
---

# Lune UI

Lune UI is the Lune design system. LuneHub and the Merchant Portal run on it. Prototypes must look like it, so design and engineering reviews talk about the flow, not the visuals.

- Package: `@lune-technologies/lune-ui` (Vue/Nuxt module, shadcn-vue + Tailwind 4, `theme.css`). Private, on GitHub Packages.
- Storybook: https://lune-ui.pages.dev (Cloudflare Access, Google sign-in with a lunedata.io account; the user signs in, never Claude).
- Linear: project "UI Component Library (Lune UI)", P-TECH-188, lead Touha Zohair. New components and fixes are tracked there.
- Captured into this skill on 9 Nov 2026 from Storybook (110 entries, 90 stories).

## Files in this skill

| File | What it holds |
|---|---|
| `references/tokens.md` | Palette ramps, semantic tokens, radius, type scale. Read before choosing any colour or size. |
| `references/components.md` | Every Lune component (purpose, props, stories) and recipes for the shadcn-vue primitives (Button, Badge, Card, Table, Tabs, Select, Dialog). |
| `assets/lune-ui-storybook.css` | Compiled Lune UI CSS: theme tokens, Tailwind preflight, every utility class the stories use. |
| `assets/stories.json` | Rendered markup, props and default args of each story. |
| `assets/lune-logo.svg` | Lune wordmark (28px high). |
| `scripts/show.py` | `show.py --list`, `show.py metrics-card--row`, `show.py form-textfield --props`. Prints markup or props of a story. |
| `scripts/style_block.py` | Prints the font link + `<style>` with the compiled CSS, ready to paste into a prototype. |

## How to build a Lune web prototype

1. **Start from the system.** Read `references/tokens.md` and `references/components.md`. Do not copy tokens from older local prototypes.
2. **Put the CSS in the page.** Artifacts block external stylesheets except Google Fonts, so the CSS must be inline. Preferred set-up: keep the prototype source as `src/<name>.src.html` with the marker `<!-- LUNE-UI-CSS -->` where the CSS goes, `/*LUNE-LOGO*/''` where JS needs the logo string and `<!-- LUNE-LOGO -->` where HTML needs it. A small build script swaps in `scripts/style_block.py` output and `assets/lune-logo.svg` and writes `<name>.html` (example: `~/code/product/src/build.py`). Or paste the `style_block.py` output by hand.
3. **Use Lune components by their real markup.** For each component on the screen, run `show.py <story>` and copy the markup. Keep the classes and `data-slot` attributes. Replace sample text and icons. Strip Vue-only attributes (`data-v-*`, reka ids) if they get in the way.
4. **Use the primitive recipes** for Button, Badge, Card, Table, Tabs, Select. Prefer them over custom widgets.
5. **Fill gaps with tokens.** When a class is missing from the compiled CSS (for example `grid-cols-2`), add a small local rule that uses `var(--…)` tokens. Never add a new colour, font or radius.
6. **Name things as the apps do.** The app shell is `UiAppSidebar` + content. Sidebar 280px, `bg-sidebar`, logo top left, env badge, user menu at the bottom. Page title `text-heading-xs` or `text-heading-sm`. KPI rows use Metrics Cards. Date filters use the Date Range Preset Select presets (last 1, 3, 6, 12 months, custom).
7. **Mind the preflight.** The compiled CSS includes Tailwind preflight: headings lose their size and weight, buttons lose their background, `svg` and `img` become block. Set `font-weight` and `font-size` on every heading class you write, and give icons in text an explicit size.
8. **Light theme only.** Never set `class="dark"`. Set `body` to `var(--background)`, text `var(--foreground)`.
9. **Check.** Run the ux-laws detector on the file. Look at it once in the browser. Then publish.

## When a working demo exists, build on top of it

The Lune demo environment (https://lune-demo-48b.pages.dev, Cloudflare sign-in) holds the current apps: LuneHub bank portal, merchant portal, campaign review, cardholder wallet. Production LuneHub uses its own tokens and classes (primary-500 #0a634d, primary-300 #10a37f, secondary-300 #002e2a, grey-10 to grey-900, `text-h1`, `rounded-xl border-grey-20` cards), which differ from this Storybook. For any screen that exists in the demo, extend the demo itself with an add-on script that reuses the app's own helpers and classes, instead of rebuilding a look-alike from this skill. Use this skill for new surfaces with no demo (for example Pulse Admin).

## Rules the system sets

- One font: Plus Jakarta Sans. UI text is 14px (`text-body`), medium weight. Helper text 12px (`text-body-sm`) in `text-muted-foreground`.
- One main button colour: `bg-primary` (#0a634d) with `text-primary-foreground`. One filled main button for each area. Secondary actions use outline or ghost.
- Focus: green border `--input-border-focus` (#10a37f) and a 3px ring at 50%. Keep it on every control.
- Tap size: Lune controls are 36px (`h-9`). Keep the system size on desktop surfaces. If the ux-laws detector flags a control under 32px, raise it to 32px and keep the rest of the component spec.
- Fields: 36px high, `rounded-lg`, label above with `gap-1.5`, required `*` in destructive, errors only after the user leaves the field.
- Status: success, warning, error tokens in `-minimal` fill with dark text, and always the word next to it.
- Charts: series colours `--chart-1` to `--chart-5` in that order. Text never takes the series colour.
- Radius: buttons `rounded-md`, fields `rounded-lg`, cards and metric cards `rounded-xl`.
- Cards: border `--border` (#e1e1e1), white fill, little or no shadow. Metric cards carry the light green gradient.

## Scope

- **Covered:** LuneHub, Lunehub Analytics, Merchant Portal, and Lune admin surfaces such as Pulse Admin (assume Lune UI unless told otherwise).
- **Not covered:** the customer SDK inside a bank's app. It uses the SDK theme, which each bank configures. Lune UI only gives the Campaign Phone Preview of an offer.
- **Prototype code is not product code.** Prototypes copy the look and behaviour into HTML. The apps use the Vue package.

## Keep it current

When Storybook changes, re-capture with the browser: sign-in by the user, then fetch `/index.json`, load each `iframe.html?id=<story>&viewMode=story`, save `#storybook-root` markup and `__STORYBOOK_PREVIEW__.currentRender.story.argTypes` into `assets/stories.json`, and save the iframe CSS (`/assets/iframe-*.css`) as `assets/lune-ui-storybook.css`. Update the capture date at the top of this file and in `references/tokens.md`.
