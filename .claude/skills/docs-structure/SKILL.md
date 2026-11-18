---
name: docs-structure
description: Routes durable product docs to where they belong: initiatives, PRDs, epics, stories, context, architecture, standards, QA, readiness. Use to decide where an artifact goes; routes only, never drafts.
---

# Repository Docs Structure

Determine where durable repository docs belong and how they relate.

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

1. Inspect repo docs first; adapt to compatible existing conventions.
2. Use this file as the routing map when no compatible convention exists.
3. Route only: do not create files/folders or draft body content unless explicitly requested.
4. Artifact-specific skills or repo-local templates own artifact body content, acceptance detail, implementation guidance, review findings, validation detail, and lifecycle values.

## Output Behavior

When asked where an artifact should go, return:

- resolved or proposed path
- parent artifact/path
- next ID rationale
- required links and lightweight metadata
- assumptions, conflicts, or repo conventions used

## Routes

Prefer existing conventions. Otherwise, use these default locations when creation is explicitly requested:

| Need | Default location |
| --- | --- |
| Context/glossary/personas/assumptions | `docs/context/` |
| Architecture/system context | `docs/architecture/` |
| Standards/checklists | `docs/standards/` |
| Canonical design system | `docs/standards/design/DESIGN.md` |
| Initiative control plane | `docs/initiatives/initiative-###-short-slug/README.md` |
| Initiative planning / discovery / delivery / QA | `.../planning/`, `.../discovery/`, `.../delivery/`, `.../qa/` |
| PRD package | `.../planning/prds/prd-###-short-slug/prd.md` |
| PRD UX / engineering | `.../prd-###-short-slug/ux/`, `.../engineering/` |
| Epic under PRD | `.../epics/epic-###-short-slug/epic.md` |
| Story under epic | `.../epic-###-short-slug/stories/story-###-short-slug/story.md` |
| Story directly under PRD | `.../prd-###-short-slug/stories/story-###-short-slug/story.md` |
| Story QA review | story folder `qa-review.md` |
| PRD acceptance verification | `.../prd-###-short-slug/qa/acceptance-verification.md` |
| Initiative/multi-PRD acceptance verification | `docs/initiatives/initiative-###-short-slug/qa/acceptance-verification.md` |
| Readiness review | `docs/initiatives/initiative-###-short-slug/qa/readiness-review.md` |

## Lookup Patterns

Resolve short refs within parent scope:

- `initiative-001` → `docs/initiatives/initiative-001-*`
- `initiative-001/prd-002` → `.../initiative-001-*/planning/prds/prd-002-*`
- `initiative-001/prd-002/epic-001` → `.../prd-002-*/epics/epic-001-*`
- `initiative-001/prd-002/story-003` → check PRD `stories/` and all epic `stories/`
- Full repo paths are authoritative.

## Core Rules

- Durable feature/product work must start with an initiative and at least one PRD, even for small durable features.
- Do not route durable stories, epics, QA reviews, or readiness artifacts outside an initiative/PRD structure unless the repo has an explicit conflicting convention and the user confirms it.
- Small PRDs may contain stories directly. Large PRDs may use epics; stories then live under epics.
- Use epics only for multiple meaningful delivery slices, not by default.
- PRD packages own PRD-specific UX, engineering, QA, epics, and stories.
- Initiatives are self-contained; promote shared knowledge to `context/`, `architecture/`, or `standards/`.
- QA artifacts are just-in-time.
- Do not create ADRs or `docs/decisions/` by default; record decisions in affected artifacts unless repo/user says otherwise.
- Use relative links; every artifact below initiative level links to its parent.
- IDs: lowercase kebab + scoped three digits; inspect siblings, choose max existing numeric ID + 1, preserve gaps, never renumber, ask on conflicts.
- Do not migrate, rename, delete, or reorganize existing docs unless explicitly asked. If existing docs conflict with this structure, map concepts onto the existing convention and ask before large changes.
- Keep current useful truth; flag stale contradictions and propose cleanup rather than deleting or rewriting stale docs unless asked.

## Examples

```text
# New durable feature with no existing initiative
docs/initiatives/initiative-001-short-slug/README.md
docs/initiatives/initiative-001-short-slug/planning/prds/prd-001-short-slug/prd.md

# Story under a small PRD
docs/initiatives/initiative-001-short-slug/planning/prds/prd-001-short-slug/stories/story-001-short-slug/story.md

# Story under an epic for a larger PRD
docs/initiatives/initiative-001-short-slug/planning/prds/prd-001-short-slug/epics/epic-001-short-slug/stories/story-001-short-slug/story.md
```

## Metadata Convention

Use lightweight frontmatter for navigation and state when the repo convention supports it. This skill may recommend field names, but artifact-specific skills or repo-local templates own allowed values and lifecycle semantics.

Common fields:

```yaml
---
title: Short Title
status: draft
parent: ../README.md
---
```

Use `result` for QA/review artifacts that record evaluation outcomes:

```yaml
---
title: Acceptance Verification
result: not-started
parent: ../prd.md
---
```

Use `recommendation` for readiness go/no-go guidance:

```yaml
---
title: Readiness Review
result: not-started
recommendation: TBD
parent: ../README.md
---
```

Do not invent, normalize, or enforce lifecycle values unless the user, repo-local template, or artifact-specific skill provides them. `DESIGN.md` may use Google DESIGN.md token frontmatter when required by the repo/user.

## Self-Check

Correct route, parent, ID, relative links, lightweight metadata, no unnecessary files/folders, no unsupported content or lifecycle assumptions.
