# Lune UI components

Two sets ship in `@lune-technologies/lune-ui`:

1. **Lune components** (auto-imported in apps with the `Ui` prefix, for example `<UiAppSidebar>`). They have Storybook stories. Get their exact markup with `scripts/show.py <story>`.
2. **shadcn-vue primitives** (Button, Badge, Card, Table, Tabs, Dialog, Popover, Tooltip, Select, Skeleton and others), imported from `@lune-technologies/lune-ui/shadcn`. They have no stories. Use the recipes below. They take the Lune tokens, so they look right with the compiled CSS.

Markup in stories uses Tailwind 4 classes. All classes in the stories exist in `assets/lune-ui-storybook.css`. Classes that no story uses may be missing (for example `grid-cols-2`, `overflow-x-auto`). Add those as small local CSS rules that use the tokens.

## Lune components (from Storybook)

| Component (app tag) | What it is for | Key props | Stories |
|---|---|---|---|
| App Sidebar (`UiAppSidebar`) | Left navigation of LuneHub and the Merchant Portal. 280px wide (`--sidebar-width: 17.5rem`), collapsed 80px. Header with Lune logo, environment badge (for example "Staging"), sidebar toggle. Items with icon, groups that expand to sub-items, right-aligned sub-item tags ("Locked", "AI"). Footer holds the User Menu. | `items` (`id`, `label`, `to`, `icon`, `children`), `currentPath`, `logoTo`, `user`, `defaultGroupsOpen` | playground, pulse, hub, collapsed, loading |
| User Menu (`UiUserMenu`) | Sidebar footer: avatar initials, name, subtitle (plan or email), opens a menu. Log out always asks to confirm. | `name`, `initials`, `subtitle`, `items`, `isLoading` | playground, expanded, in-sidebar, collapsed, loading, confirmed-logout |
| Metrics Card (`UiMetricsCard`) | KPI tile: small title, big number (`text-metric-semibold`), optional description, optional info tooltip, optional icon chip. Light green gradient fill, `rounded-xl`, `p-3`, border. | `title`, `value`, `description`, `info`, `icon` | playground, variants, with-hint, row, overflow |
| Date Range Preset Select (`UiDateRangePresetSelect`) | Shared analytics date filter. Presets (last 1, 3, 6, 12 months or days) plus a custom range with a 2-month calendar. Default range limit is 12 months back. | `presets`, `defaultPresetId`, `label`, `numberOfMonths`, `minValue`, `maxValue` | playground, months-presets, days-presets, custom-range |
| Empty State (`UiEmptyState`) | Centred icon in a `size-12 rounded-xl bg-primary-50` chip, bold title, muted text, optional main button. Variants: empty, error. | `title`, `description`, `icon`, `variant`, `image` | playground, illustration, error-state, no-action |
| Campaign Phone Preview (`UiCampaignPhonePreview`) | Phone mockup of a cashback offer: cover, brand logo, name, description, how to earn steps, terms. Used next to the campaign wizard and on campaign details. | `campaignName`, `brandName`, `brandLogoUrl`, `coverUrl`, `description`, `steps`, `terms` | playground, minimal, sized-by-parent |
| Navigate Back Button (`UiNavigateBackButton`) | Round ghost back button, `bg-primary/10`, sizes 28 / 36 / 44px. | `size` (sm, md, lg), `to`, `onBack` | playground, sizes, with-link, with-on-back |
| Notification Toast (`UiNotificationToast`) | Sonner toaster. Top centre, 5s, rich colours on. | `richColors`, `closeButton`, `position`, `duration` | playground, rich-colors, with-close-button, bottom-right |
| Lune Logo (`UiLuneLogo`) | Logo link. States: expanded (full wordmark, 28px high), collapsed (mark only). File: `assets/lune-logo.svg`. | `state`, `to` | playground, states, sizing |
| Logo Fetcher (`UiLogoFetcher`) | Merchant logo with fallback URL, then fallback icon, optional mask. | `src`, `fallbackSrc`, `fallbackIcon`, `mask` | valid, fallback, icon-fallback, mask-* |
| Image With Skeleton (`UiImageWithSkeleton`) | Image with a loading placeholder. | `src`, `alt`, `imageClass` | playground, broken-src, sizing |
| Form Field Shell (`UiFormFieldShell`) | Frame for every field: label (`text-body font-medium text-label`), required `*` in destructive, optional marker, hint tooltip, description, error after touch. `gap-1.5`. | `label`, `description`, `hint`, `required`, `optional`, `inline` | playground, anatomy, inline |
| Form Textfield (`UiFormTextfield`) | 36px high (`h-9`), `rounded-lg`, `border-input-border`, `px-3`, green focus border + 3px ring. Prefix and suffix adornments (currency, unit). | `label`, `placeholder`, `type`, `inputmode`, `prefix`, `suffix`, `required`, `optional`, `disabled` | playground, adornments, number-input, label-markers, filled |
| Form Textarea (`UiFormTextarea`) | Multi-line field, grows or fixed rows. | `rows` | playground, growth, rows |
| Form Select (`UiFormSelect`) | Dropdown. Shows saved value at once. Flat or grouped options. | `options`, `placeholder` | playground, grouped, prefilled |
| Form Datepicker (`UiFormDatepicker`) | Date field with calendar popup. Value `YYYY-MM-DD`. Display format `dd MMM yyyy`. | `minValue`, `maxValue`, `numberOfMonths`, `format`, `readonly` | playground, prefilled, read-only, start-and-end, formats |
| Form Checkbox (`UiFormCheckbox`) | Single checkbox with label and description. | `label`, `description`, `required` | playground, states, required, rich-label |
| Form Radio Group (`UiFormRadioGroup`) | Radio options, horizontal (default) or vertical. | `options`, `orientation` | playground, orientation, numeric-values |
| Form Password Input (`UiFormPasswordInput`) | Show and hide, live rules checklist. | `rules` | sign-in, new-password, invalid, custom-policy, disabled |
| Form Otp Input (`UiFormOtpInput`) | One-time code boxes, 6 by default. | `length` | playground, complete, invalid, disabled |

## shadcn-vue primitive recipes

Button "default" and Badge "default" below are captured from stories. The others follow the shadcn-vue (new-york, Tailwind 4) defaults that lune-ui wraps. Check them against LuneHub when it matters.

**Button** (`rounded-md text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all`, focus `ring-3 ring-ring/50`)
- default: `bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2` (captured)
- secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80`
- outline: `border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground`
- ghost: `hover:bg-accent hover:text-accent-foreground`
- destructive: `bg-destructive text-white hover:bg-destructive/90`
- link: `text-primary underline-offset-4 hover:underline`
- sizes: default `h-9 px-4` · sm `h-8 px-3 gap-1.5` · lg `h-10 px-6` · icon `size-9`

**Badge** (`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap gap-1`)
- default: `border-transparent bg-primary text-primary-foreground` (captured; the sidebar env badge adds `px-1.5 py-px text-caption-semibold`)
- secondary: `border-transparent bg-secondary text-secondary-foreground`
- outline: `text-foreground`
- status (Lune use): success `bg-success-minimal text-success-800`, warning `bg-warning-minimal text-warning-800`, error `bg-error-minimal text-error-800`. Always write the status in words.

**Card**: `bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm`. Header `px-6`, title `font-semibold leading-none`, description `text-muted-foreground text-sm`, content `px-6`.

**Table**: wrapper `relative w-full overflow-x-auto`. `table` `w-full caption-bottom text-sm`. Row `border-b transition-colors hover:bg-muted/50`. Head cell `h-10 px-2 text-left align-middle font-medium text-foreground whitespace-nowrap`. Body cell `p-2 align-middle whitespace-nowrap`.

**Tabs**: list `bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]`. Trigger `flex-1 rounded-md px-2 py-1 text-sm font-medium h-[calc(100%-1px)]`, active `bg-background text-foreground shadow-sm`.

**Select trigger** (as in the date range select): `flex items-center justify-between gap-2 border rounded-sm border-input-border-focus/10 bg-input-bg px-3 h-10 text-sm`, chevron in `text-muted-foreground`.

**Skeleton**: `bg-accent animate-pulse rounded-md`.

**Dialog**: overlay `bg-black/50`, content `bg-background rounded-lg border p-6 shadow-lg max-w-lg gap-4`.

**Avatar fallback**: `rounded-full bg-primary text-primary-foreground text-body-sm font-semibold size-8`.

## Sidebar item states (captured)
- Item: `flex items-center gap-2 rounded-md px-3 py-3 text-body leading-5 font-medium text-foreground bg-sidebar hover:bg-muted`
- Sub-item: same but `py-2`, colour `text-sidebar-foreground`
- Active sub-item: `bg-gray-200 text-primary` with `aria-current="page"`
- Group open: chevron rotates. Sub-item tag: `text-caption-semibold text-muted-foreground`
- Header: logo `h-7`, `px-7 pt-6`, bottom border `border-sidebar-border`. Footer: user menu `px-4 py-5`, top border.
