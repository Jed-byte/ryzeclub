---
name: plan-roadmap
description: >-
  Create, update, or review product roadmaps from an approved PRD. Use for
  release plans, launch plans, phased rollouts, V1/V2 splits, milestone
  sequencing, scope deferral, post-estimate updates, or requirement-to-release
  traceability. Produces release slices for design, architecture, launch, and
  operations handoff. Not for raw ideas, discovery artifacts, implementation
  plans, epics, stories, tickets, or code.
---

# Plan Roadmap

Convert an approved PRD into release slices and sequencing without writing
implementation tasks.

This skill is a planning-phase handoff. It tells downstream Design,
Architecture, and launch stakeholders what must be solved now versus later. It
does not create UX specs, architecture decisions, implementation plans, epics,
stories, issues, QA artifacts, or code.

## Writing: ASD-STE100 for all output

Everything this skill writes for a person (documents, reports, findings, briefs, messages, summaries, chat replies) uses ASD-STE100 (Simplified Technical English) at about 80%. Readers include people who do not speak English as a first language.

- Write sentences of 20 words or fewer. A list of conditions can have 25. Write one idea in each sentence.
- Use a full stop, not a semicolon. Do not use em dashes or en dashes. Use a colon, a hyphen or a new sentence.
- Use the active voice and the present tense. "Lune sends the file", not "The file is sent".
- Write instructions as commands. "Add the end date."
- Use one term for one concept in the whole output. Do not change words for variety.
- Do not use idioms, metaphors or writerly phrases. Say what happens: "The item stays on the list", not "the item ages honestly".
- Use plain, common words. Explain an abbreviation the first time you use it.
- The 20% that stays: product names, API and field names, code, regulatory names and domain words such as "cashback" or "accrual".
- Before you deliver a long document, check it: list each sentence over 20 words and shorten it.

This section applies to the language only. It does not change the structure, templates or steps of this skill.

## Operating Principles

1. Inspect the PRD package before asking questions: `prd.md`, `prd-review.md`,
   `decision-log.md`, `addendum.md`, existing `roadmap.md`, linked discovery
   artifacts, and user-supplied estimate/design/engineering inputs.
2. Require a final or approved PRD plus a passing PRD review before writing a
   roadmap. Stop unless the user explicitly overrides missing or failed gates.
3. Draft from artifacts first, then ask targeted questions only for conflicts,
   unresolved scope splits, or high-impact sequencing decisions.
4. Ask one question at a time. Provide 2-4 plausible options and a recommended
   answer when context supports one.
5. Map every stable requirement, feature, or user-story ID to exactly one
   release slice. If an item spans slices, route back to PRD revision so the
   requirement can be split.
6. Keep release slices product-level: user value, rollout stage, dependency
   order, risk burn-down, validation learning, design inputs, architecture
   inputs, operational readiness, and exit criteria.
7. Do not invent target dates, estimates, owners, or approvals. Include them
   only when present in source material or supplied by the user.
8. Show a concise synthesis preview before writing or overwriting durable
   files, unless the user explicitly requested headless write/update and all
   gates pass cleanly.
9. Use current external research only when PRD/review artifacts flag volatile
   assumptions that materially affect sequencing, launch readiness, or
   dependencies. Cite sources when external research is used.
10. Use `.context/plan-roadmap-notes.md` only for long-run resume notes. Never
   treat `.context` notes as durable artifacts or source of truth.

## Inputs And Gates

Default PRD package shape:

```text
docs/initiatives/initiative-###-slug/planning/prds/prd-###-slug/
  prd.md
  prd-review.md
  decision-log.md
  addendum.md, optional
  roadmap.md, optional
```

Use existing repo conventions when they differ. If a short reference like
`initiative-001/prd-002` is provided, resolve it by inspecting matching folders.
Use `organize-docs` for routing decisions when that skill is available.

Before creating or updating `roadmap.md`, check:

- `prd.md` exists.
- PRD status is final, approved, or an equivalent non-draft state. Flag missing,
  draft, or obviously in-progress status.
- `prd-review.md` exists.
- PRD review recommendation is `ready-for-design-and-architecture`, or an
  equivalent passing repo-local recommendation.
- Requirement/story/feature IDs are stable, atomic, and traceable. Accept IDs
  such as `REQ-01`, `FR-03`, or `US-05`; exact prefixes do not matter.
- Open questions in the PRD/review do not block design, architecture, or
  release sequencing.

Blocking recommendations include `needs-product-revision`,
`needs-more-discovery`, `needs-design-input`, `needs-architecture-input`,
`needs-scope-cut`, `park`, and `reject`, unless the review explicitly says a
roadmap is still safe.

If a gate fails, stop and explain the missing prerequisite. Offer two paths:

1. route back to PRD revision/review
2. proceed only with an explicit readiness override

When an override is used, record a `Readiness Override` section in the roadmap
with reason, missing gate, unresolved risks, authorizing user/source, date, and
follow-up needed.

## Modes

### Create

Use when no `roadmap.md` exists.

1. Read the PRD package and source inputs.
2. Run the readiness gates.
3. Detect whether the PRD is larger than one obvious release.
4. If the PRD is one obvious release, return a compact inline single-slice
   handoff by default. Save `roadmap.md` only if the user explicitly wants a
   durable one-slice roadmap.
5. Group requirements into release slices by user value, dependency order,
   risk, validation learning, launch stage, and operational readiness.
6. If V1/deferred scope is not explicit, infer a proposed split and ask the
   user to confirm before writing.
7. Show a synthesis preview and ask for save confirmation unless the user
   explicitly requested a headless write and all gates are clean.

### Update

Use when `roadmap.md` exists or the user provides estimate, design,
architecture, launch, or stakeholder input after roadmap creation.

1. Read the existing roadmap before proposing edits.
2. Preserve prior roadmap decisions, changelog entries, overrides, and explicit
   scope boundaries.
3. Re-run readiness gates against the current PRD/review.
4. Reconcile new inputs against the current PRD and roadmap.
5. If the PRD and roadmap conflict, stop and resolve one conflict at a time.
   Recommend whether the PRD should win, the roadmap should remain, or PRD
   revision is needed.
6. Update `roadmap.md` only. Do not edit `prd.md`; when scope changes are
   needed, add `Recommended PRD Changes`.
7. Append a `Roadmap Changelog` entry for major sequencing, scope, override,
   estimate, or stakeholder-alignment changes.

### Review

Use when the user asks to review an existing roadmap.

Return inline findings by default. Update the file only if the user explicitly
asks. Check:

- readiness gates and overrides
- PRD alignment and stale assumptions
- exact-one-slice requirement traceability
- missing or weak exit criteria
- dependency order and unresolved external dependencies
- design and architecture handoff quality
- operational checklist relevance
- estimate status and post-estimate update needs
- changelog completeness
- drift into implementation tasks, epics, stories, tickets, file paths, or code

### Headless Drafting

Use only when the user explicitly asks for an autonomous draft, headless pass,
or direct write/update.

Proceed without questions only when gates pass, requirement IDs are stable, and
there are no unresolved scope or sequencing conflicts. Otherwise return blockers
or the highest-impact questions. Skip save confirmation only when the user
explicitly asked to write, save, or update the roadmap.

## Release Slice Rules

Use `Release Slice` as the core unit. A slice may be named with neutral labels
such as `V1`, `V2`, or `V3`, or with launch-stage labels such as `Pilot`,
`Beta`, `Early Access`, `Launch`, and `Post-launch / V2` when those fit a
customer-facing rollout.

Each slice should include:

- status: `proposed`, `committed`, `deferred`, `out-of-scope`, or
  `needs-revision`
- goal: observable outcome, not an estimate
- included requirement IDs
- scope summary
- explicit exclusions or deferred scope
- blocking prior slices
- external dependencies
- decision dependencies
- validation dependencies
- risks and risk burn-down
- design inputs needed
- architecture inputs needed
- operational or launch-readiness inputs, when relevant
- exit criteria
- target date or launch window, only when source-supplied
- estimate status
- confidence, when useful

Do not include implementation tasks, epics, stories, tickets, file paths,
module names, code snippets, test commands, or engineering task breakdowns.

Compact slice example:

```markdown
### Release Slice 1: Pilot

- **Status:** committed
- **Goal:** A controlled internal cohort can complete the core workflow and
  expose the highest-risk trust and operational assumptions.
- **Included IDs:** FR-01, FR-02, NFR-01
- **Depends on:** None
- **Exit criteria:** No blocking launch risks remain for the pilot cohort;
  target users complete the core workflow with source-linked evidence.
- **Design inputs needed:** Empty/error/loading states for the core workflow.
- **Architecture inputs needed:** Source-system access and auditability model.
- **Estimate status:** pending design, pending engineering
- **Confidence:** medium
```

## Roadmap Template

Use this fixed section order. Omit optional sections only when they are not
relevant. Keep frontmatter minimal:

```markdown
---
title: [Product/PRD Name] Roadmap
status: draft
parent: ./prd.md
confidence: medium
updated: YYYY-MM-DD
---

# [Product/PRD Name] Roadmap

## Summary
[What this roadmap sequences, why the order matters, and the current confidence.]

## Source Inputs
- [prd.md]
- [prd-review.md]
- [decision-log.md, if used]
- [addendum.md or other source, if used]

## Readiness Gate
- **PRD status:** [final/approved/etc.]
- **PRD review recommendation:** [ready-for-design-and-architecture]
- **Requirement ID status:** [stable/blocked]
- **Override:** [none or link to Readiness Override section]

## Readiness Override
[Only when applicable: reason, missing gate, unresolved risks, authorizing
user/source, date, follow-up needed.]

## Scope Split
- **Committed V1 / first release:** [summary]
- **Deferred scope:** [summary]
- **Out of scope:** [summary]
- **Split rationale:** [user value, dependencies, risk, validation learning]

## Release Slices
### Release Slice 1: [Name]
- **Status:** proposed|committed|deferred|out-of-scope|needs-revision
- **Goal:** [observable outcome]
- **Included IDs:** [REQ/FR/US IDs]
- **Scope:** [included capability/product scope]
- **Deferred / excluded:** [scope not in this slice]
- **Dependencies:** [prior slices, external, decision, validation]
- **Risks:** [slice-specific risks]
- **Design inputs needed:** [questions/inputs]
- **Architecture inputs needed:** [questions/inputs]
- **Operational inputs needed:** [if relevant]
- **Exit criteria:** [observable criteria to move forward]
- **Target date/window:** [only if source-supplied; omit otherwise]
- **Estimate status:** not requested|pending design|pending engineering|received
- **Confidence:** high|medium|low

## Requirement Traceability
| ID | Release slice | Status | Notes |
| --- | --- | --- | --- |
| FR-01 | Pilot | committed | First slice where this must be satisfied. |

## Dependencies
[Product-level dependency graph or table. Include prior-slice, external,
decision, and validation dependencies. Exclude file/module/task dependencies.]

## Cross-Cutting Requirements
[For NFRs and ongoing obligations such as security, privacy, reliability,
accessibility, observability, AI trust, support, or compliance. Map each item to
the first slice where it must be satisfied, then summarize ongoing obligations.]

## Design Handoff
[Consolidated inputs Design needs across all slices.]

## Architecture Handoff
[Consolidated inputs Architecture needs across all slices.]

## Operational Checklist
| Area | Prompt | Needed? | Owner / next action | Release slice | Notes |
| --- | --- | --- | --- | --- | --- |
| Analytics | Is additional tracking needed? | Yes/No/Unknown | [owner/action] | [slice] | [notes] |

## Estimate Status
[Design and engineering estimate state, source/date if received, and
post-estimate update needed. Do not invent target dates or estimate bands.]

## Recommended PRD Changes
[Only when needed. List proposed PRD edits discovered by roadmap conflicts,
estimates, or downstream input. Do not apply them here.]

## Stakeholder Alignment
| Stakeholder | Role/team | Status | Notes |
| --- | --- | --- | --- |
| Product | [role/name] | aligned|pending|blocked | [notes] |

## Roadmap Changelog
| Date | Change | Source |
| --- | --- | --- |
| YYYY-MM-DD | Initial roadmap draft. | [source/user] |

## Self-Review
- [ ] Readiness gates checked or override recorded.
- [ ] Every stable requirement/story/feature ID maps to exactly one release slice.
- [ ] Cross-cutting requirements are visible.
- [ ] Release slices have observable goals and exit criteria.
- [ ] Dependencies are product-level, not implementation-level.
- [ ] Design and architecture handoffs are present.
- [ ] Operational checklist is included only when relevant.
- [ ] Estimate status is accurate and no dates/estimates were invented.
- [ ] Recommended PRD changes are listed when scope changes are needed.
- [ ] Changelog records major sequencing, scope, estimate, or override changes.
- [ ] No implementation tasks, epics, stories, tickets, file paths, or code were added.
```

## Operational Checklist Candidates

Start from this candidate set and include only relevant rows:

- Analytics
- Sales
- Marketing
- Customer Success
- Product Marketing
- Partners
- Globalization
- Risk
- Legal
- Support
- Security / Privacy
- Finance / Billing
- Developer Relations

Use owners only for stakeholder alignment and operational follow-up actions,
unless the PRD or source material already names release-slice owners.

## Estimate Handling

Before design and engineering estimates are received, do not add target dates,
duration estimates, or estimate bands. Instead record:

- `Estimate status: not requested`
- `Estimate status: pending design`
- `Estimate status: pending engineering`
- `Estimate status: received`

If source material already includes target dates or launch windows, include
them as source-supplied dates. Otherwise omit dates entirely rather than writing
`TBD`.

When estimates arrive, update `roadmap.md` and the changelog. If estimates
change product scope, sequencing, or launch commitment, add `Recommended PRD
Changes` and route the user to the PRD update flow. Do not edit `prd.md`.

## Status Values

Use roadmap artifact statuses only in frontmatter:

- `draft`
- `aligned`
- `updated-after-estimates`
- `superseded`

Keep launch/release status inside release slices. Stakeholder alignment rows
may be `aligned`, `pending`, or `blocked`; missing alignment should not block
creating a draft roadmap.

## External Research Boundary

Most roadmap work should come from PRD artifacts. Use current external research
only when volatile facts materially affect sequencing, dependencies, launch
readiness, or operational risk. Examples include current regulatory deadlines,
platform/API availability, integration pricing or rate limits, competitor launch
timing, or market/partner constraints. Cite source links when used. Do not turn
roadmapping into general market research.

## Single-Slice Handoff

When the PRD is one obvious release, return an inline summary by default:

- source PRD and review
- committed scope
- deferred/out-of-scope items
- key dependencies
- design inputs
- architecture inputs
- operational inputs, if relevant
- estimate status
- exit criteria
- confidence

Then say that a durable `roadmap.md` is not necessary unless the user wants one.

## Self-Check

Before final response or file creation, verify:

- readiness gates passed or override is recorded
- the PRD has stable atomic IDs, or the skill blocked for PRD revision
- each ID maps to exactly one release slice
- V1/deferred/out-of-scope split is explicit or user-confirmed
- cross-cutting requirements are mapped and summarized
- exit criteria are observable and not detailed acceptance criteria
- dependencies are product-level only
- target dates and estimates were not invented
- design and architecture handoffs are clear
- operational checklist rows are relevant and not task breakdowns
- update conflicts were resolved explicitly
- recommended PRD changes are listed but not applied
- stakeholder alignment and changelog are present when writing a roadmap
- the artifact has not drifted into implementation planning
