---
name: ux-laws
description: Build, audit and fix interfaces against the laws of UX (Hick, Fitts, Jakob, proximity, Miller, Doherty, Von Restorff, target distance, serial position, peak-end, resumption, Prägnanz, similarity, common region, uniform connectedness, Tesler, Postel, goal-gradient, Parkinson, Occam, Pareto) plus a mobile form playbook. Has a deterministic phone-width detector (tap targets, primary button size, wrong keyboards, placeholder labels, label proximity, autocomplete, CTA distance, unchunked numbers, sideways scroll) and an on-save hook. Use whenever building or changing any UI, screen, prototype, demo, form, onboarding, checkout, settings page, dashboard or mobile flow; whenever the user asks to audit, check, review or fix UX or usability; and whenever a "[ux-laws]" hook finding appears. Use alongside impeccable and critique-design; it does not replace them. Especially use for forms (bank details, sign-up, payment, KYC, campaign setup).
user-invocable: true
argument-hint: "[build · audit · fix · hooks] [target]"
---

# UX laws

Turns the laws of UX into decisions on the screen and checks after it is built. Two kinds of check work together:

- **Detector** (`scripts/detect.mjs`): renders the page in headless Chrome at 375px and measures what can be measured. Same result every run. Rules and their plain-English "why" and "fix" are in `scripts/rules.mjs`.
- **Judgement** (`references/laws.md`): the laws a script cannot judge (one job per screen, what stands out, the end of a flow, what could be derived). Each law has a **Build** rule and a **Check** question.

## Writing: ASD-STE100 for all output

Every finding, report, hook reply and summary from this skill uses ASD-STE100 (Simplified Technical English) at about 80%. Readers include people who do not speak English as a first language. Do not copy impeccable's style (scores, "P0", design-director voice, terms like "affordance", "hierarchy", "cognitive load", "heuristic").

- Write sentences of 20 words or fewer. Write one idea in each sentence. Use a full stop, not a semicolon.
- Use the active voice and the present tense. "The button is too small", not "Tap targets have been undersized".
- Write instructions as commands. "Add a label above the field."
- Use one term for one concept, always:
  - **control**: anything a person taps (button, link, tab, chip, toggle)
  - **main button**: the primary action of a form, sheet or screen
  - **field** and **label**: a text input, and its visible name
  - **tap area**: the area that accepts a tap
  - **screen**: one state of the page as the user sees it
- Do not use idioms, metaphors or jargon. Say what happens to the person: "People miss the button", not "The CTA lacks salience".
- Give the law name in brackets at the end, if at all: "(Fitts's law)".
- Code names (inputmode, autocomplete, :active) stay as they are. This is the 20% that STE allows.
- No em dashes or en dashes.

Each finding has three parts: **Problem** (what is wrong and where, one sentence), **Result** (what happens to the person, one or two sentences), **Fix** (one change, as a command).

House rules always win over a law: light mode only, one button colour per product (Pulse customer = navy), no italic display type, no em dashes in docs, merchants only see what they control. If a law suggests something a house rule forbids, follow the house rule.

## Commands

| Command | When | Playbook |
|---|---|---|
| `build [feature]` | Before and while making a new screen or flow | [references/build.md](references/build.md) |
| `audit [target]` | Check an existing page or prototype; report what fails | [references/audit.md](references/audit.md) |
| `fix [target]` | Apply the audit's fixes to code we own, then re-check once | [references/fix.md](references/fix.md) |
| `hooks [on · off · status · ignore]` | Manage the on-save scan for this project | [references/hooks.md](references/hooks.md) |

Routing:
- **No argument:** say in two lines what each command does and ask which; never auto-run one.
- **Explicit or clearly implied command:** load its playbook and follow it.
- **General UI work with no command:** follow `build` while making it, then run the detector once at the end (`fix` rules apply to what it finds).
- **A designer's Figma file or screens:** this skill supplies the checks; the review itself is critique-design's job (it runs this audit in its Step 3).
- **Any screen with input fields:** also read [references/forms.md](references/forms.md).

## Detector

```bash
node ~/.claude/skills/ux-laws/scripts/detect.mjs <file.html|url> [--all] [--json] [--width 375]
```

- `--all` adds advisory rules (heuristics such as competing primary buttons or borderline 32 to 44px targets). Advisory findings never count as failures.
- Exit 0 = clean, 2 = findings, 1 = could not run (say so; do not claim a clean scan).
- It checks only what is **visible** at load. For multi-screen prototypes, open each state in the browser and run `scripts/page-audit.js` there (see audit.md). Set `window.__UX_W = 375` first.
- Mark a confident false positive on the element with `data-ux-ignore="rule-id"`, and say so in the reply. Project-wide ignores live in `.ux-laws/config.json` (see hooks.md); add those only when the user agrees.

## Triage every finding

- **Real problem:** fix it (in our code) or report it (someone else's design). Never add an ignore to make a finding go away.
- **Confident false positive or deliberate choice:** add the narrowest `data-ux-ignore`, with the evidence in your reply ("compact filter chips, 8px apart, secondary action").
- **Unsure:** leave it standing and ask the user in one line.

## Where the laws pull against each other

- **Hick vs Pareto/Tesler:** fewer choices is better, but do not hide the one option 20% of people need for 80% of their use. Default the common path, keep the rare path one tap away.
- **Miller vs density in dashboards:** chunk into groups of about 4, but analysts expect dense tables. Chunk with headings and spacing, not with more pages.
- **Von Restorff vs one button colour:** make the primary action stand out by size, position and fill, never by inventing a second accent colour.
- **Doherty vs honesty:** show progress within 400ms, but never fake it. A skeleton that matches the real layout is fine; a spinner that lies about completion is not.
- **Peak-end vs no performance claims:** the end of a flow should feel good, but in client material the "peak" is clarity (what happens next, who controls what), never invented numbers.
- **Fitts vs compact UI:** 44px is the target for anything important or frequent; well-spaced secondary chips at 32 to 40px are acceptable (the detector marks them advisory).

Evidence for each law (strong, conditional, rule of thumb) is on the research page: https://claude.ai/artifact/1jq9M22EjKSpKJFqkxR1Wg. Never cite a conditional law (Miller's 7, Zeigarnik memory, choice overload, aesthetic-usability) as a hard rule.
