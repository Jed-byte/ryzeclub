---
name: write-prd
description: 'Write, tighten or review a Lune product requirements document the way the Head of Product writes them: title then TL;DR, situation, problem with evidence, a one-paragraph future press release, two to four goals, non-goals, constraints as labelled lines with tradeoff rules, a directional approach, numbered user stories in the bold "US-nn | Must:" format with acceptance criteria that state checks and reconciliation rules, and open risks. Plain English for engineers, jargon defined inline, no metadata header, no document-lineage narration, no mechanism decisions dressed as stories, and shorter than the draft. Use this whenever the user asks to write, draft, redraft, tighten, "make this a PRD", turn notes, a prototype, a data contract or an ERD into requirements, add or fix user stories, or review a PRD for engineering readiness, even if they do not say "PRD". Also use it to push the finished PRD to Google Docs. Not for engineering design docs, UX specs, roadmaps or sprint tickets.'
---

# Write a PRD

You are writing for engineers who will build the feature and for a CEO who will approve it. The document is written by product, so it says what must be true and why, and leaves how to engineering and design. It closes the PRD milestone in Linear, which opens design and system design, so it must be complete enough that a senior engineer says "I know what to go build".

Two things govern the voice. Read `references/writing-style.md` before drafting: it was derived from the Head of Product's own edits and every rule in it is backed by one. Then read `references/example-prd.md`, a PRD he finished, and match its register, density and formatting. When in doubt between more and less, choose less; his edit removed a quarter of the words and lost no requirement.

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

## Step 1. Gather what exists, and say what is missing

Ask for, or find in what the user gave you: the problem and who has it, customer evidence (numbers or quotes), the strategic goal it serves, the data contract or engineering docs that bound what can be shown, a prototype if one exists, and the shaping notes from any session with an engineer. If some of this is missing, write the PRD anyway, mark every inferred fact `(assumed)`, and list the gaps at the end. Do not invent metrics, customers or dates.

## Step 2. Draft, answer first

Use the template below in this order. Write the TL;DR last but place it first. Keep the body to about two pages; depth goes to an appendix or stays in the linked prototype.

```
# <Feature>: PRD

## 1. TL;DR
What we will build, for whom, why now, and what success looks like in words a person
would recognise. Five sentences at most.

## 2. Situation
The state of affairs today, in two or three plain sentences. No commentary on which
documents exist or are in progress.

## 3. Problem
Who exactly has the problem, what it costs them and us, the evidence, and any decision or
open question already recorded in an engineering doc, cited by its id (ERD-2 Q-1).

## 4. Future press release
One paragraph. One well-known illustrative brand. A headline sentence, what the customer
now gets, and a quote.

## 5. Goals and success metrics
Two to four, numbered, ordered by what the user experiences first, then correctness, then
operational effect. Each carries the number that means done and when it is checked.

## 6. Non-goals and anti-goals
Only the exclusions an engineer might otherwise build, plus one anti-goal if there is a
line the product must never cross.

## 7. Constraints and principles
The data boundary in one paragraph, using the system's own vocabulary.
Platform: <one line>.
Design: <one line, usually "Lune DS, plain English">.
Tradeoff rules the team may use without asking:
(1) <rule, with any term of art defined inline>.
(2) <rule>.

## 8. Proposed approach (directional)
The moving pieces, under ten, in one paragraph. Say what each control does in words.
Link the prototype. End with "Craft and layout are the designer's."

## 9. User stories and acceptance criteria
See Step 3.

## 10. Risks, rabbit holes, open questions
Open decisions with owners; cold-start reality; rabbit holes named and closed.
```

## Step 3. Write the stories the way engineers read them

Every requirement is a story; no story, no requirement. Format, exactly:

```
**US-04 | Must:**
As a merchant, I want to see why transactions from my activated customers did not earn, so that I can fix settings instead of raising tickets.

* Given rejections exist, then the panel lists only reasons the merchant can act on - each one maps to a campaign setting they control: minimum spend, per-customer cap, card ranges, budget.
* States: zero rejections (positive empty state).
* Out of scope: campaign editing.
```

- Number them US-01 upward. Priority is Must (V1 does not ship without it), Should (expected but cuttable), Could (first to drop). A second workflow, however valuable, is a Could.
- Acceptance criteria state the check and the reconciliation rule: what a figure must equal, what it must sum to, which state shows what. Never example values the designer or engineer should choose (no fixed price brackets, no bucket boundaries).
- Precise system terms are welcome when they remove ambiguity ("the failing gate", "as of the latest nightly run"). Narrated feasibility is not ("this needs no new data").
- Each story fits a two-week sprint and can be demoed on its own. Split it if it cannot.
- A story that only specifies a mechanism (a selector, a reload, a state reset) is not a product story. Cut it; the requirement it served usually lives in another story's criteria.

## Step 4. Edit against the checklist

Run the checklist in `references/writing-style.md` §5. Then read the document once as the FE lead and once as the CEO. If the FE lead would ask "so what do I build for this bullet", the bullet needs a check. If the CEO would ask "why are we doing this", the TL;DR needs the outcome.

## Step 5. Review mode

When asked to review or tighten an existing PRD rather than write one, return the same document with the edits applied and a short list of what changed and why, grouped as: removed (narration, mechanisms, specifics), reworded (plain English, defined terms), restructured (format, order, priorities). Do not add sections the author left out unless a requirement is missing.

## Publishing to Google Docs

When the user wants the PRD in Google Docs or Drive, convert the finished markdown with `scripts/md_to_gdoc_html.py`, create a native Google Doc with the Drive connector, and return the link. Read `references/google-docs.md` for the steps and what not to do.

## Output

Write for the reader; never mention this skill, its steps or its references in the document. Deliver the PRD as one markdown document, then a short "What I assumed" list if anything was inferred. If the source material was thin, say which sections are placeholders.
