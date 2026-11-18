# Lune product writing style

How the Head of Product writes product documents, and what Lune's engineers need from them. Derived on 2026-09-30 by comparing a generated Pulse Merchant Analytics PRD (2,444 words) with Dennis's edited version (1,769 words). Every rule below is backed by an edit he made; the comparison is in `prd-comparison-merchant-analytics.md`.

The one-line version: **a PRD is written by product for engineers who will build it. It describes the product in plain English, keeps the engine's own vocabulary where precision matters, and leaves out everything that is not a requirement.**

## 1. What a PRD is not

- **Not a project record.** No header block of initiative, approver, appetite, target launch. Those live in Linear. The document starts with its title and the TL;DR.
- **Not a commentary on the document set.** Never write "ERD-3 is unwritten; this PRD is its input" or "the engine (ERD-2, in build)". Describe what the product does. Cite an engineering doc only when naming a specific decision or open question (ERD-2 Q-1, ERD-1 Q-6 are fine).
- **Not a solution design.** Where a page lives in the portal, how state resets when a selector changes, that a stage list is monotonic, that a feature "needs no new data": these are engineering and design decisions. If a story only exists to specify a mechanism (a brand selector with reload behaviour), cut the story.
- **Not a pilot plan.** Customer names, pilot cohorts, hostnames and currency-precision flourishes ("to the fils", SNB Neo, pulse.lunedata.io) date the document and distract engineers. In the press release use one well-known illustrative brand.
- **Not a link hub.** The body carries the prototype link and nothing else. Data contracts, design handoffs and other documents are linked from Linear or the appendix.

## 2. Plain English, defined jargon

- Everyday verbs: "sends" not "dispatches"; "the cashback logic" not "the engine" when the reader is not the engine team.
- Define a term inline the first time it matters to the reader: "cross-foot (a check that the row totals and the column totals add up to the same number)". Expand abbreviations: "Average Order Value", not "AOV". Say what a control does: "metric toggle (GMV and Transactions)".
- Keep the system's own vocabulary where engineers need precision: ledger states (accrued, reversed, balance, payable, on hold), gate names, story IDs. Plain English is about removing narration and ambiguity, not technical terms.
- Success is stated as something a person would recognise: "merchants understanding how the campaign drove sales and zero ambiguity between bank and merchant", not "self-serving disputes" or "reconciliation complaints".

## 3. Shape and length

- Aim for the shorter version. The edit removed 28% of the words and lost no requirement.
- Goals are ordered by what the user experiences first (engagement), then correctness, then operational effects. No measurement meta in the goal line ("input metric; checked at pilot + 60 days").
- Non-goals name only the exclusions an engineer might otherwise build. Two precise items beat a list of seven.
- Constraints are short labelled lines, not a paragraph: `Platform:`, `Design:`, then numbered `Tradeoff rules the team may use without asking`. Two rules the team can apply beat three.
- Risks list open decisions with owners, cold-start reality, and named-and-closed rabbit holes. Ownership questions and dependencies that belong to another team's doc are left out.

## 4. User stories, the way engineers read them

```
**US-04 | Must:**
As a merchant, I want to see why transactions from my activated customers did not earn, so that I can fix settings instead of raising tickets.

* Given rejections exist, then the panel lists only reasons the merchant can act on - each one maps to a campaign setting they control: minimum spend, per-customer cap, card ranges, budget.
* States: zero rejections (positive empty state).
* Out of scope: campaign editing.
```

- Header is bold, `**US-nn | Must:**`, priority spelled as Must / Should / Could, then the story on its own line, then bullets. "Out of scope" is a bullet, not a trailing line. One blank line between stories. This renders cleanly in Google Docs, which is where the team reads it.
- Acceptance criteria state the **check**, not the implementation values. "Value-band customers and GMV sum to the page totals, and repeat purchase rate equals customers with 2 or more purchases over all transacting customers" replaced three bullets of AED brackets and frequency buckets. The bands are the designer's and the engineer's to choose; the invariant is product's.
- Every number an engineer will render gets its reconciliation rule (what it must equal, what it must sum to). That is the part of the PRD engineers rely on most.
- Priority discipline: Must is what V1 does not ship without. A second workflow, however valuable, is a Could. The dispute lookup moved from Must to Could in the edit.
- Precise engine terms are welcome in criteria when they remove ambiguity ("the failing gate", "a plain-English verdict states the gate comparison in the customer's terms").

## 5. Checklist before sending

- [ ] Starts with the title and TL;DR; no metadata header.
- [ ] No sentence about which documents exist, are in build, or are unwritten.
- [ ] No story or bullet that specifies a mechanism engineering or design should choose.
- [ ] No customer, pilot or hostname specifics; one illustrative brand in the press release.
- [ ] Every abbreviation expanded on first use; every term of art defined once, inline.
- [ ] Goals ordered user-first; non-goals limited to what could otherwise be built.
- [ ] Constraints as labelled lines; at most two or three tradeoff rules.
- [ ] Stories in the bold `US-nn | Priority:` format with Out of scope as a bullet.
- [ ] Acceptance criteria state checks and reconciliation rules, not example values.
- [ ] Only the prototype is linked in the body.
- [ ] Shorter than the draft you started with.
