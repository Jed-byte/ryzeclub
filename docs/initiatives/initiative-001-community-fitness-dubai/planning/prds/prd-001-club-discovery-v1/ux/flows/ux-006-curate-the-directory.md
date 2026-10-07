---
title: UX-006 — Curate the directory
status: draft
created: 2026-10-07
updated: 2026-10-07
parent: ../ux-spec.md
---

# UX-006 — Curate the directory

## Readiness override

Same as the other slices: PRD handoff-ready, PRD review skipped by the founder, no design system yet.

## Slice

| | |
|---|---|
| **Actor** | Curator: the founder during the pilot |
| **Goal** | Keep the directory accurate and safe in a few hours a week, and see whether the pilot is working |
| **Entry points** | (1) "Curator" in the signed-in menu. (2) An alert message about a report, a claim or a stale club |
| **Success** | Every listed club is current or flagged, claims and reports are cleared, and the pilot numbers are visible |
| **Platforms** | Desktop and phone. Adding clubs is easier on desktop; clearing alerts must work on a phone |

## Traceability

| PRD ID | Covered by |
|---|---|
| FR-19 Curator tools | To do, Clubs, Club editor, Claims |
| FR-20 Report a listing | Reports |
| FR-10 Moderation (remove) | Reports |
| FR-21 Pilot measures | Pilot numbers |
| UJ-6 | Main flow |

## Surfaces

1. **To do** — everything waiting for the curator, in one list.
2. **Clubs** — every club with its health.
3. **Club editor** — the same editor organisers use, plus curator-only controls.
4. **Claims** — requests to manage a club, and new club requests.
5. **Reports** — reported listings and photos.
6. **Pilot numbers** — the PRD's success signals.

## Main flows

### A. The weekly routine

1. **To do** opens with counts: "3 reports · 2 claims · 4 clubs going stale".
2. Items are ordered by urgency: photo reports where a person asked for removal, other reports, claims, stale clubs.
3. Each item opens in place, is resolved, and the list moves on to the next.

### B. Add a club before launch

1. "Add a club" opens the **Club editor** with the same fields as UX-005, plus "Source" (where the details came from, such as the club's Instagram) and "Organiser contact".
2. The curator adds weekly sessions and a cover photo.
3. "Save as hidden" or "Make live". A live club with no organiser shows "Is this your club?" on its page.
4. The club's "Last confirmed" date is set to today, with "Confirmed by Ryze Club" until an organiser takes over.

### C. Approve a claim

1. A claim shows the person's name and email, their stated role, the Instagram handle or WhatsApp link they gave, and the club page.
2. The curator checks it outside the site, then chooses "Approve" or "Decline" with a short reason.
3. A new club request opens the proposed page in the editor with "Make live" and "Decline".

### D. Handle a report (UJ-6)

1. A **listing report** shows the club, what the visitor said, and "Last confirmed". Actions: "Edit club", "Message organiser", "Hide club", "No action needed".
2. A **photo report** shows the photo, the reason, the session and whether it is already hidden. Actions: "Remove photo", "Keep photo".
3. Every outcome is sent to the reporter. Removal tells the poster the reason, never who reported.
4. Removing a photo that a person asked to have removed is the default; "Keep photo" asks for a reason.

### E. Stale clubs

1. A club is **going stale** at 30 days without confirmation and **stale** at 60 days.
2. The **Clubs** list shows each club's health in words: "Current", "Going stale", "Stale", "Paused", "Hidden", "No organiser".
3. For a stale club the curator can "Message organiser", "Confirm on their behalf" after checking, or "Hide club".
4. A club with no session in 60 days and no reply is hidden, with its page and history kept.

### F. Pilot numbers

One page with the PRD's signals against their targets, for the last 7 days, the last 28 days and since launch:

- Clubs kept current without being chased (target: 10 of 30)
- Newcomers who RSVP again within 14 days (target: 30%)
- Sessions with at least one member photo (target: 50%)
- Listings confirmed in the last 30 days (target: 80%)
- Quiz completions leading to an RSVP (no target yet)

Each number can be opened to see the clubs or sessions behind it. No member's personal details are shown here.

## States

| State | Where | Behaviour |
|---|---|---|
| Nothing to do | To do | "All clear. 28 of 30 clubs are current." |
| Not enough data yet | Pilot numbers | "Too early to say. 6 RSVPs so far." in place of a percentage |
| Club has upcoming RSVPs | Hide club | "9 people are going to upcoming sessions and will be told." before confirming |
| Duplicate club | Club editor | "A club with a similar name exists in Marina." with a link |
| Report already resolved | Reports | Shown as closed with the outcome and date |
| Organiser not reachable | Stale clubs | The message history shows attempts and dates |
| Save failed | Any | Values kept; "That didn't save. Try again." |

## Who sees what

The curator sees everything an organiser sees for every club, plus: organisers' contact details, claim details, who reported an item, and the pilot numbers. The curator does not see members' streaks or message settings.

## Interaction rules

- Hiding a club, removing a photo and declining a claim ask for confirmation and a reason. Nothing else does.
- Hiding is reversible; a hidden club or photo can be restored.
- A club is never deleted from this screen; removal for good is a separate request, to protect history and streaks.
- Every curator action on a club is listed in that club's history with the date.

## Locked wording

| Place | Text |
|---|---|
| To do summary | 3 reports · 2 claims · 4 clubs going stale |
| All clear | All clear. 28 of 30 clubs are current. |
| Club health | Current · Going stale · Stale · Paused · Hidden · No organiser |
| Claim actions | Approve · Decline |
| Listing report actions | Edit club · Message organiser · Hide club · No action needed |
| Photo report actions | Remove photo · Keep photo |
| Confirmed by curator | Confirmed by Ryze Club on 3 Oct |
| To poster on removal | Your photo from Thursday's run was removed because someone in it asked. |
| To reporter | Thanks. The photo has been removed. |

## Responsive behaviour

- **Desktop:** Clubs is a table that can be sorted by health and last confirmed. The editor sits beside the list.
- **Phone:** To do is a single list of cards with the actions on each card. Tables become lists. Adding a club works but is not optimised.

## Accessibility

- Health and report status are words, not colours alone.
- Tables have proper headers and can be used by keyboard.
- Photos under report have a text description of the reason beside them.
- Confirmation dialogs focus the safe choice first.

## Measurement the product needs to see

Time from report to outcome; time from claim to decision; clubs by health over time; curator hours are not measured by the product.

## Feature-specific visual guidance

- Plain and dense. This is a working tool for one person.
- Counts on To do are the largest items; urgent photo reports are at the top and labelled as urgent in words.

## Architecture handoff

- Curator abilities are limited to named curator accounts.
- Hidden clubs and removed photos must leave all public pages promptly and be restorable.
- Reports keep who reported, shown to the curator only.
- A photo reported by a person in it is hidden at once, before review.
- Staleness is calculated from the last confirmation or edit.
- Pilot numbers must be available from launch day and use the definitions in the PRD.
- Every curator action is recorded with who and when.

## Assumptions

| ID | Assumption |
|---|---|
| C1 | One curator can keep about 30 clubs current in a few hours a week |
| C2 | Claims can be verified outside the site from an Instagram handle or WhatsApp link |
| C3 | 30 and 60 days are the right thresholds for going stale and stale |

## Open questions

- Should a second person be able to act as curator, for cover?
- How quickly should a photo removal request be handled? Suggested: within 24 hours, with the photo hidden meanwhile.

## Self-review

All in-scope PRD IDs are mapped. Not reviewed by anyone else. Status stays `draft`.

## Changelog

- 2026-10-07: created.
