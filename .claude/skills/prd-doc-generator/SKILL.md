---
name: prd-doc-generator
description: >
  Generate structured product documents — PRDs, BRDs, API specs, meeting follow-ups, and technical architecture docs — from rough notes, bullet points, or verbal summaries. Use this skill whenever the user asks to write, draft, or create a PRD, BRD, product requirements document, business requirements document, API specification, technical spec, meeting minutes, meeting follow-up, or any product documentation. Also trigger when the user pastes rough notes and says things like "turn this into a PRD", "write this up", "structure this", "make this into a doc", "document this", or "write up the meeting". Covers B2B fintech contexts including transaction enrichment, cashback/CLO platforms, PFM features, analytics dashboards, client integrations, and bank-facing products.
---

# PRD & Product Doc Generator

## Purpose
Transform rough notes, meeting summaries, or product ideas into structured, professional product documents ready for stakeholder review. Works across any product area and any client.

## Supported Document Types

### 1. PRD (Product Requirements Document)
Use for new features or products being scoped.

**Structure:**
```
# [Product/Feature Name] — PRD
**Version:** [x.x]
**Author:** Dennis Jed
**Date:** [date]
**Status:** Draft | In Review | Approved

## 1. Overview
## 2. Problem Statement
## 3. Goals & Success Metrics
## 4. User Stories / Jobs to Be Done
## 5. Scope (In Scope / Out of Scope)
## 6. Functional Requirements
## 7. Non-Functional Requirements
## 8. Technical Considerations
## 9. Dependencies
## 10. Risks & Mitigations
## 11. Timeline & Milestones
## 12. Open Questions
## 13. Appendix
```

### 2. BRD (Business Requirements Document)
Use for client-facing or commercially-driven initiatives.

**Structure:**
```
# [Initiative Name] — BRD
**Version:** [x.x]
**Author:** Dennis Jed
**Date:** [date]

## 1. Executive Summary
## 2. Business Context & Opportunity
## 3. Stakeholders
## 4. Business Requirements (numbered, traceable)
## 5. Functional Requirements
## 6. Integration Requirements
## 7. Regulatory & Compliance
## 8. Commercial Model
## 9. Success Criteria
## 10. Assumptions & Constraints
## 11. Risks
## 12. Appendix
```

### 3. API Specification
Use when defining or documenting API contracts.

**Structure:**
```
# [API Name] — Specification
**Version:** [x.x]
**Base URL:** [url]
**Auth:** [method]

## Overview
## Authentication
## Endpoints (method, path, request/response schemas, error codes, examples)
## Webhooks (if applicable)
## Rate Limits
## Data Dictionary
## Changelog
```

### 4. Meeting Follow-Up / Minutes
Use after calls and discussions.

**Structure:**
```
# Meeting Minutes — [Topic]
**Date:** [date]
**Attendees:** [names]
**Duration:** [time]

## Context
## Key Discussion Points
## Decisions Made
## Action Items (table: action, owner, deadline)
## Open Questions
## Next Steps
```

## How to Use

1. **Paste raw notes** — Can be messy bullet points, voice transcription, or shorthand
2. **Specify document type** — Or let the skill infer from context
3. **Specify the product area or client** — So the doc has the right framing
4. **Review and iterate** — The first draft is meant to be refined

## Domain Context

This skill operates in a B2B fintech environment. Key product areas include:
- Transaction enrichment (branding, categorisation, logos, MCC mapping)
- Analytics portals and dashboards
- Card-linked offers / merchant-funded cashback
- PFM features (subscriptions, cashflow, nudges, segments)
- Client onboarding and integration

Key technical context: ClickHouse, ISO 8583/4217/18245, REST APIs, SFTP, mobile banking SDKs.

## Output Format

- Default: Markdown file (.md)
- If user asks for Word: create .docx
- Always version documents (start at v0.1 for drafts)
- Use clear section numbering for traceability
