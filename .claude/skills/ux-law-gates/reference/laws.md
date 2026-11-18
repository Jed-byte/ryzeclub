# The 20 laws, as build rules and checks

Full set of 30 with origins and evidence grades: https://claude.ai/artifact/1jq9M22EjKSpKJFqkxR1Wg. Conditional laws (Miller, Zeigarnik, Doherty, choice overload, aesthetic-usability) should never be cited as hard rules.

Core laws (use on every screen) are marked ★. Each law has: what it says, **Build** (what to do while making the screen), **Check** (the audit question; a "no" is a finding).

## Choice and attention

### 1. Hick's law ★
More choices take longer to decide between, roughly logarithmically.
- **Build:** one primary action per screen. Group secondary actions behind "More" or a sheet. Default the most common choice. Break long decisions into steps (account type first, then fields for that type).
- **Check:** can a first-time user say in 3 seconds what this screen wants them to do?

### 7. Von Restorff effect (isolation) ★
The item that differs from the rest is the one that gets remembered and noticed.
- **Build:** exactly one visually distinct element per view: the primary action or the key number. Distinct by fill, size and position, within the existing palette.
- **Check:** is the one thing that stands out the thing that matters? Are two things competing (two filled buttons, two highlighted cards, a badge louder than the CTA)?

### 9. Serial position effect
People remember the first and last items in a list best.
- **Build:** put the most important items first and last in nav bars, lists and option sets. Put the primary tab at either end of a tab bar, never buried in the middle.
- **Check:** is anything important stuck in the middle of a long list?

### 20. Pareto principle
About 80% of use comes from about 20% of features.
- **Build:** find the top 1 to 3 tasks and give them the prime real estate. Everything else goes one level down.
- **Check:** does the first screen serve the top tasks, or is it an even spread of everything?

## Effort and reach

### 2. Fitts's law ★
Time to hit a target depends on its distance and size.
- **Build:** primary buttons full width on mobile, at least 48px tall. Tap targets at least 44x44px, with at least 8px between them. Make whole rows tappable, not just the chevron.
- **Check:** are any important targets small, close to a destructive target, or only partly tappable?

### 8. Minimise target distance ★
Put the next action where the hand and eye already are.
- **Build:** the primary action sits directly below the last input, or pinned above the keyboard while typing. Common actions live in the bottom half of a phone screen (thumb zone). Confirm buttons appear next to the thing being confirmed.
- **Check:** after filling the last field, does the user have to dismiss the keyboard or travel to the top of the screen to continue?

### 5. Miller's law ★
People hold only a few items in working memory: about 4 chunks (Cowan, 2001), not the popular 7 ± 2.
- **Build:** chunk content into groups of about 4 to 7 with headings. Format long numbers in chunks (IBAN in groups of 4, sort code 00-00-00, card 4x4). Never ask the user to remember something from a previous screen; show it.
- **Check:** is there a list, form or number long enough that the user loses their place?

### 15. Tesler's law (conservation of complexity) ★
Every system has complexity that cannot be removed, only moved. Move it to the system, not the user.
- **Build:** derive what you can (currency from country, bank name from IBAN or sort code, city from postcode, card type from BIN). Pre-fill from what is already known. Do the calculation, do not ask for it.
- **Check:** is the user typing or choosing anything the system already knows or could work out?

### 16. Postel's law ★
Be liberal in what you accept, strict in what you output.
- **Build:** accept input with spaces, dashes, lowercase, pasted text with stray characters, and normalise it. Accept "+971", "00971" and "05x" for phone numbers. Show the normalised version back.
- **Check:** does any field reject an input a reasonable person would type (a pasted IBAN with spaces, a sort code with dashes)?

### 18. Parkinson's law
Tasks expand to fill the time available.
- **Build:** autofill, smart defaults and one-tap options shorten the task. Give long tasks a visible finish line ("2 minutes", "3 of 4").
- **Check:** is there a step that could be zero steps with a sensible default?

## Speed and feedback

### 6. Doherty threshold ★
Productivity soars when the system responds in under about 400ms.
- **Build:** every tap gives visual feedback in under 100ms (pressed state). Anything slower than 400ms shows a skeleton that matches the real layout, or an optimistic update. Validate fields as the user leaves them, not on submit.
- **Check:** is there any tap with no immediate response, or any wait with a blank screen?

## Familiarity

### 3. Jakob's law ★
Users spend most of their time on other apps and expect yours to work the same way.
- **Build:** use platform conventions: back at top-left, primary action at the bottom on mobile, tab bar at the bottom, pull to refresh, swipe to go back, native pickers for dates. For banking, copy patterns from the apps the customer already uses (their bank, Revolut, Apple Wallet), not novel ones.
- **Check:** is anything placed or behaving differently from how the platform or the category's leading apps do it, without a strong reason?

## Grouping (Gestalt)

### 4. Law of proximity ★
Things that are close together look related.
- **Build:** spacing does the grouping: label close to its field (4 to 8px), fields in a group close (12 to 16px), groups far apart (24 to 32px). The button belongs to the form, so it sits close to the last field, not floating at the bottom of an empty screen.
- **Check:** is any label equidistant between two fields, or any action closer to the wrong group?

### 12. Law of Prägnanz (simplicity)
People read complex shapes as the simplest form they can.
- **Build:** prefer simple, regular shapes and layouts: one grid, consistent radii, aligned edges. Charts: the simplest chart type that answers the question.
- **Check:** is there any decorative shape, gradient or layout break that makes the screen harder to read at a glance?

### 13. Law of similarity
Things that look alike are seen as the same kind of thing.
- **Build:** same function, same look. All tappable rows share one style; all input fields share one style; read-only values look different from editable ones.
- **Check:** does anything look tappable but is not, or look like a field but is a label (or the reverse)?

### 14. Uniform connectedness
Things connected by a visual element (line, box, shared background) are seen as one group. Stronger than proximity.
- **Build:** use a card or shared background for things that belong together (a selector and its value; a transaction and its cashback). Use lines in steppers and timelines.
- **Check:** is any container grouping things that do not belong together, or are related things split across containers?

## Flows and memory

### 10. Peak-end rule
People judge an experience by its most intense moment and its end.
- **Build:** design the end state as carefully as the start: a clear success screen that says what happened, what happens next, and when. Make the hardest step (often verification or payment) the most reassuring.
- **Check:** does the flow end on a clear confirmation, or does it dump the user back on a list?

### 11. Zeigarnik effect (really: resumption)
The popular claim (people remember unfinished tasks better) did not hold up: a 2025 meta-analysis found no memory advantage. What is real is that about two-thirds of people go back to an interrupted task when they can (the Ovsiankina effect).
- **Build:** save drafts automatically and make resuming one tap ("Continue where you left off"). Do not use fake "almost done" bars to pull people back.
- **Check:** if the user leaves mid-flow, is their work kept and is there a visible way back?

### 17. Goal-gradient effect
People speed up as they get closer to a goal.
- **Build:** show progress that starts with some credit (step 1 of 4 already marked once the account type is picked). For rewards, show distance to the next threshold ("AED 40 more to unlock").
- **Check:** in a multi-step flow or reward, can the user see how close they are?

### 19. Occam's razor
Among equal options, choose the one with the fewest assumptions; remove anything that does not earn its place.
- **Build:** after the screen works, remove one element at a time and keep removing while nothing breaks.
- **Check:** is there any element (helper text, icon, divider, badge, second CTA) that nobody would miss?
