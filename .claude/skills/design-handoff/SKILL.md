---
name: design-handoff
description: Hand a feature from product to design and drive it to "designs approved and handed to engineering". Produces the design brief (works with or without a prototype), the kickoff agenda, the PM–designer pairing rhythm, the split between generative crits and decision reviews, the approval definition, and the Linear milestone updates. Use this whenever the user wants to brief a designer, write a design spec, hand off a prototype or PRD to design, prepare a design kickoff, run or prepare a design crit or design review, decide whether designs are "done", or move a feature from the PRD milestone into UX/UI Design, even if they just say "send this to design", "put the brief in Google Docs" or "what does the designer need from me". Not for authoring the designs themselves, for engineering handoff, or for design-system work.
---

# Design handoff

You are helping a Head of Product hand a feature to a designer and steer it to approval. The PM owns the **why**; the designer owns the **how**. When the why is clear, designers make good decisions locally, which is the only way to scale past specs that tabulate every error state. Defer to the designer on the user experience; that is their area of expertise, and a PM who over-specifies UI gets a designer who stops thinking.

The handoff takes one of two forms. Say which one you are producing:

- **Prototype handoff**: a working prototype plus its handoff note (from the `prototype-feature` skill) plus the design brief below.
- **Spec handoff**: the design brief below with sketches or wireframes attached, no working prototype. Words alone are not a spec; every spec carries visuals, even paper sketches.

Both forms use the same brief. The brief is short because its job is to transmit context and constraints, not solutions.

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

## Step 1. Gather inputs, and say what is missing

You need: the PRD (problem, goals, success metrics, non-goals, constraints, numbered user stories with acceptance criteria), the prototype and its handoff note if one exists, the design system the designer will use, the Linear project with its milestone dates, and the designer's name and availability. If the user gives you a rough idea instead of a PRD, write the brief anyway, mark every inferred field with `(assumed)`, and list what the designer will have to ask for.

## Step 2. Write the design brief

Fill every line. Short answers are fine; blank lines are not.

```
# <Feature> — Design brief
PRD: <link>   Linear project: <link>   Designer: <name>   Design target date: <date>
Handoff form: prototype / spec

Why (one paragraph): the problem, the customer in plain language, the business tie-in.
Goals and success metrics: copied from the PRD, not paraphrased.
User stories in scope, by ID: Must stories first, then Should. Each frame the designer
  produces will be labelled with the story IDs it serves so engineering and QA can trace it.
Current failure modes: what users hit today that this must fix.
Constraints: platforms, compliance, design-system components, performance, data available.
Principles for this feature (2–3): e.g. "fast is better than complete", "never hide a fee".
States to resolve: empty, loading, error, partial data, permissions. Mark any state that can
  only be judged on real data (AI output) as deferred to real-data testing, with an owner.
Data model / entities: fields and relationships the UI must expose.
Sketches / wireframes: attached. Nav-bar test: what are the four or five things?
Prototype (if any): link, tool, fidelity, and what it is and is NOT a statement about.
Explicitly open for the designer to decide: say this, so the prototype is not read as a mandate.
Phase: learning / converging / polishing.
```

Five use cases done well beat fifteen done adequately. If the story list is long, the brief says which five matter.

Close every brief with the Linear actions it triggers: set the design target date on the UX/UI Design milestone now, and note that FE ERD / System Design and BE ERD / System Design will get the same target date at approval, so engineering can see when their phase starts. If the user gave no PRD, success metric or dates, say so in the assumptions rather than inventing them; a brief that presents a guessed metric as "from the PRD" sends the designer after the wrong target.

## Step 3. Kickoff (45 minutes)

Agenda, in order: walk the brief; walk the prototype **with fidelity stated first** and framed as one point in the option space; explain the reasoning behind choices so the designer extracts principles rather than verdicts; agree the design target date and put it on the UX/UI Design milestone; agree the pairing rhythm.

## Step 4. Pair during design

A standing PM–designer sync two or three times a week, 30 minutes; a daily hour during an intense 0-to-1 push. Protect the designer's maker time between syncs. Build one shared artifact rather than a research readout, a crit deck and a review deck as separate deliverables. Bring engineers into the syncs early so proposals are feasibility-informed and the later handoff is a pairing session, not a document drop.

## Step 5. Crits and reviews are different meetings

**Design crit**: generative, designer-led, explicitly not for decisions. 10–15 minutes present, 5 minutes questions, 5 minutes silent written comments. Engineers welcome.

**Design review**: a decision meeting, PM-facilitated, 45 minutes. Two types, never mixed: align on the *problem*, or align on the *solution*. Use a silent vote or alignment widget so the loudest voice does not decide. Alternative format: a multidisciplinary "walk the store" with engineer, PM and designer scoring usability, utility and desirability. Outcome is one of: approved / revise / "almost, but no". Someone with editorial courage has to say the last one when it is true.

When asked to prepare either, produce the agenda, the attendee list, the pre-read, and the decision(s) being sought.

## Step 6. Define "approved and handed to engineering"

Designs are approved only when all of these hold:

- A decision-type review has happened, not just a crit.
- Every deterministic state is designed; non-deterministic states are explicitly deferred with an owner.
- Frames reference design-system components in code, because AI-written implementation code does not reliably pick them up otherwise.
- Every frame carries the user story IDs it serves.
- The prototype, if any, travels with its handoff note as a communication aid only.
- The design lead has commented approval in the design file; the PM has confirmed in the Linear project.

Then in Linear: mark UX/UI Design complete; give FE ERD and BE ERD the same target date; create any design follow-ups as issues under FE Implementation with Team and label set; notify the FE and BE leads in writing.

## Output format

Write in the Head of Product's voice: plain English, jargon defined inline, no narration about documents, no mechanism decisions dressed as requirements. `references/writing-style.md` has the rules, each backed by one of his own edits.

Write for the reader, not for yourself. The user cannot see this skill, so never refer to "Step 6", "the template above" or "the prototype-feature skill"; say what to do in plain words. Match length to the ask: a full brief when a brief is requested, a checklist when a check is requested, a few paragraphs when the question is small.

Depending on what was asked, produce one of: the design brief (template above); a kickoff agenda; a crit or review plan; an approval checklist with the Linear updates listed. Always end with a short "What I assumed" list if anything was inferred.

## Publishing to Google Docs

When the user wants the brief, agenda or checklist in Google Docs or Drive, or wants it sent to the designer, convert the finished markdown to HTML and create a native Google Doc with the Drive connector, share it with the named person as commenter, and return the link. Read `references/google-docs.md` for the exact steps and what not to do.

## Anti-patterns to catch

- Spec as contract: every state tabulated, so the designer executes instead of designs.
- Overriding the designer on taste. Saying "my designer".
- Presenting the prototype as the answer instead of one point in the option space.
- Waterfall handoff with designers excluded from shaping, or engineers excluded until the end.
- Framing "design goals" against "business goals".
- Closing the milestone on verbal approval with nothing written in the file or in Linear.

For the sourced reasoning behind each rule, read `references/sources.md`.
