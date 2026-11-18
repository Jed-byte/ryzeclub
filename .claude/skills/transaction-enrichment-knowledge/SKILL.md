---
name: transaction-enrichment-knowledge
description: >
  Understand and communicate transaction enrichment concepts — coverage metrics, brandable vs generic classification, category mapping, MCC logic, and data quality. Use this skill whenever the user discusses enrichment coverage, brandable transactions, generic transactions, MCC codes, merchant mapping, category rules, logo coverage, transaction classification, or needs help structuring coverage reports, writing up analysis results, explaining enrichment logic to clients, or formatting data findings into tables and narratives. This skill does NOT process raw transaction data — it helps structure, communicate, and reason about enrichment results the user has already gathered.
---

# Transaction Enrichment Knowledge & Communication

## Purpose
Help structure, communicate, and reason about transaction enrichment data — without processing raw client data. This skill understands enrichment logic deeply and helps turn findings into clear reports, tables, emails, and internal summaries.

## What This Skill Does

- **Formats your findings** — You give the numbers, it structures them into coverage tables, client-ready reports, and internal summaries
- **Explains enrichment logic** — Articulates why certain transactions are brandable vs generic, how coverage % should be calculated, what MCC mapping means
- **Drafts coverage narratives** — Turns raw stats into clear explanations for any client or stakeholder
- **Reasons about edge cases** — "Should transfers count in the brandable universe?", "How do we handle dual-MCC merchants?", "Is this category mapping correct?"
- **Structures comparison tables** — Period-over-period, client-by-client, category-by-category

## What This Skill Does NOT Do

- Does not process, store, or analyse raw transaction data
- Does not require data uploads
- You bring the numbers, it brings the structure and communication

## Core Enrichment Concepts

### Brandable vs Generic Classification

**Brandable** — Identifiable merchant that can be mapped to a brand:
- POS purchases at named merchants
- E-commerce transactions
- Subscription payments
- Named utility payments

**Generic / Unbrandable** — No meaningful merchant identity possible:
- ATM withdrawals
- Bank fees and service charges
- Transfers (internal, IBFT, wire)
- Salary credits and payroll
- Government payments, taxes, fines
- Unidentified POS with no merchant descriptor

**Grey area** — Requires human judgment:
- Aggregated payment platforms (the platform is brandable but the underlying merchant isn't visible)
- Government-adjacent digital services
- Generic descriptions that might resolve with better parsing

### Coverage Metrics

```
Brand Coverage % = Branded transactions / Brandable universe × 100
Logo Coverage %  = Transactions with logo / Branded transactions × 100
Category Coverage % = Transactions with category / Total transactions × 100
```

**Critical distinction:** Coverage should always be calculated against the **brandable universe** (total minus generic/unbrandable), not total transactions. A bank with 60% brandable and 95% coverage within that universe tells a very different story than one with 90% brandable and 70% coverage.

### Enrichment Fields
| Field | Description | Source |
|-------|-------------|--------|
| Brand name | Mapped merchant identity | Matching engine |
| Logo | Brand logo asset/URL | Brand database |
| Category | Top-level classification | MCC + rules |
| Sub-category | Granular classification | MCC + custom rules |
| MCC | Merchant Category Code (ISO 18245) | Acquirer / card network |
| Location | Geo-enriched merchant location | Descriptor parsing + geo DB |

### MCC Logic
- 4-digit code assigned by the acquirer at merchant onboarding
- Same merchant can have different MCCs across acquirers
- MCC drives default category but additional rules can override
- Some MCCs are broad (5411 = Grocery Stores), others specific (5812 = Restaurants)
- Brand-specific data can give better categorisation accuracy than MCC alone

### ISO Standards Reference
- **ISO 8583** — Financial transaction messaging format
- **ISO 4217** — Currency codes
- **ISO 18245** — Merchant Category Codes

## Report Templates

### Coverage Summary Table
```
| Metric | Count | % of Total | % of Brandable |
|--------|-------|------------|----------------|
| Total transactions | — | 100% | — |
| Brandable universe | — | —% | 100% |
| ├─ Branded | — | — | —% |
| └─ Unbranded (brandable) | — | — | —% |
| Generic (unbrandable) | — | —% | — |
| With logo | — | — | —% |
| With category | — | —% | — |
```

### Category Breakdown
```
| Category | Transaction Count | % | Branded | Coverage % |
|----------|-------------------|---|---------|------------|
```

### Multi-Client Comparison
```
| Client | Total Txns | Brandable % | Brand Coverage | Logo Coverage | Notes |
|--------|-----------|-------------|----------------|---------------|-------|
```

### Period Comparison
```
| Metric | Previous | Current | Delta | Trend |
|--------|----------|---------|-------|-------|
```

## How to Use

**"Here are the coverage numbers, format them"**
→ Give the numbers in any format. It'll produce a structured coverage table and narrative.

**"How should I explain to the client why coverage is 72%?"**
→ Helps frame it: brandable universe definition, what's driving the gap, what's actionable.

**"Should we count transfers in the brandable universe?"**
→ Reasons through the tradeoffs and helps decide.

**"I need to write up coverage findings for [stakeholder]"**
→ Give the key stats and it drafts the summary with tables (pairs with client-comms-drafter skill).
