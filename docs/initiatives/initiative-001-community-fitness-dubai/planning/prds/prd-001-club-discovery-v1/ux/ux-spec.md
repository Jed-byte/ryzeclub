---
title: UX scope — Ryze Club V1
status: provisional
created: 2026-10-07
updated: 2026-10-12
parent: ../prd.md
---

# UX scope — Ryze Club V1

**Recommendation:** `needs-exploration` (visual direction), then `ready-for-author-ux` for UX-001.

**Readiness override:** the PRD is handoff-ready but PRD review was skipped by the founder. Scope approved by the founder on 2026-10-07. Status stays provisional.

## Slices, in design order

| ID | Slice | Actor | Entry | Exit / success | Surfaces | Key states | PRD IDs |
|---|---|---|---|---|---|---|---|
| UX-001 | Find a club and RSVP | Newcomer | Home quiz, or a club page opened from Instagram or search | RSVP made to a first session | Home, quiz, results, browse and filter, club page, session, sign-in | No match, no upcoming session, stale listing, session full | VS-1, FR-1, FR-2, FR-3, FR-5, UJ-1 |
| UX-003 | Streaks and milestones | Member | After confirming attendance, or profile | Streak seen, milestone earned and shared | Profile, streak, milestone moment, club standings, share card | No streak yet, at risk, protection used, opted out of standings | VS-4, FR-12, FR-22, FR-23, FR-24, FR-25, FR-26, FR-29 |
| UX-002 | Turn up and come back | Member | Reminder, or My clubs | "I went" confirmed and next RSVP made | My clubs, session, reminder messages, attendance confirm, nudge | Cancelled or changed session, reminders off | VS-2, FR-4, FR-6, FR-11, FR-13, FR-14, FR-27, FR-28, UJ-2, UJ-8 |
| UX-004 | Post and manage photos | Member | A session they attended | Photos on the club page; unwanted tag or post removed | Post composer, session photos, club timeline, tag, report | Not eligible to post, upload failure, empty timeline, hidden post | VS-3, FR-7, FR-9, FR-10 (member), UJ-3, UJ-5 |
| UX-005 | Run a club page | Organiser | Their club's listing | Page claimed, schedule correct, headcount visible, posts pinned or hidden | Claim, club editor, session editor, attendee list, confirm prompt, moderation | Claim pending, stale flag, several organisers | VS-5, FR-8, FR-15, FR-16, FR-17, FR-18, FR-10 (hide), FR-27, FR-29 to FR-35, UJ-4, UJ-7 |
| UX-006 | Curate the directory | Curator | Curator area | Clubs added, claims approved, reports handled, pilot numbers visible | Club list, club editor, claims, reports, measures | Stale listings, open reports | VS-6, FR-19, FR-20, FR-21, FR-29, FR-35, UJ-6 |

UX-003 is designed second because the streak is the main retention device and sets the tone for the rest.

## Shared state families

- **Sign-in:** Google sign-in at the moment of RSVP; optional phone number and WhatsApp opt-in.
- **Empty and problem states:** no matching clubs, no upcoming session, cancelled session, possibly out-of-date listing, empty photo timeline, hidden post.
- **Visibility:** visitors see club pages; attendee names and posting need sign-in; organisers see their own club's tools; the curator sees everything.
- **Form factor:** UX-001 to UX-004 are phone-first. UX-005 and UX-006 must work on phones and can be plainer.
- **Organiser effort budget:** a routine organiser week takes under five minutes on a phone, mostly from messages (PRD section 10). UX-005 is designed to it.

## Visual direction (decided 2026-10-07)

The blend from `explorations/explore-001-visual-direction.md`: public club pages lead with members' photos; a session bar with time, place, level and one RSVP button is always visible; the signed-in home leads with the week and the streak. A club page with no photos uses a plain fallback panel.

## Slice files

| ID | File | Status |
|---|---|---|
| UX-001 | `flows/ux-001-find-a-club-and-rsvp.md` | draft |
| UX-003 | `flows/ux-003-streaks-and-milestones.md` | draft |
| UX-002 | `flows/ux-002-turn-up-and-come-back.md` | draft |
| UX-004 | `flows/ux-004-post-and-manage-photos.md` | draft |
| UX-005 | `flows/ux-005-run-a-club-page.md` | draft |
| UX-006 | `flows/ux-006-curate-the-directory.md` | draft |

## Signifiers and wayfinding (added 2026-10-12)

A usability session on the prototype showed people could not always tell what to tap next or how to get back. These rules apply to every slice and override softer styling in the flow files.

**Button hierarchy**
- **Primary:** filled accent, bold, at least 50 px tall (56 px for the main call to action on a screen). One per screen or sheet: the single next step ("Find my club", "I'm in", "Go to my week").
- **Secondary:** 2 px ink outline, bold. Alternatives to the primary ("Browse all clubs", "Can't make it").
- **Tertiary:** soft fill. Close, Cancel and Not now only.
- Forward actions carry an arrow; actions that add carry a plus; confirmations carry a tick. The label always carries the meaning on its own.

**Navigation**
- The bottom navigation shows an icon and a bold label for each tab. The current tab is marked by the accent colour, a filled pill behind the icon and `aria-current`, never by colour alone.
- Every screen that is not a tab root shows a labelled "Back" with an arrow at the top left. During the quiz, Back goes to the previous question.
- The quiz shows a three-part progress bar and "Question 1 of 3".
- Every sheet has a visible close button (top right, 44 px) and a grab handle, as well as its Close button.

**Tappable things look tappable**
- Cards end with a line that says where the tap goes ("View club", "Manage") with an arrow.
- Rows that open something end with a chevron.
- A row's own action is shown as an outlined accent pill ("RSVP"), distinct from status labels ("Going", "Full", "Cancelled").
- In the session bar, the session summary is marked "Session details" so it reads as a link, not a caption.
- In the organiser's attendee list, each name shows the action a tap will take ("Came", "Didn't come").

**Primary action placement**
- In a sheet, the primary action sits directly under the key facts, above any long list (for example, "Who's going").
- On the club page, "I'm in" stays in the fixed session bar.

**Entry points**
- Members: "Find my club" (primary) and "Browse all clubs" (secondary) on Home, with "Three questions. No account needed."
- Organisers: a framed "Run a club?" panel on Home and an "Is this your club?" panel with a "Claim" button on every unclaimed club page. Never a footnote link.
- Managed clubs appear as framed rows with "Manage" on My week and My clubs.
- Signed-out visitors see "Sign in" as a primary button in the header.

**Touch behaviour**
- Hover styles apply only on devices that can hover, so a tapped row does not stay tinted on a phone.
- Pressed buttons and cards move slightly so a tap is felt to land; this is removed when reduced motion is requested.

## Dependencies and gaps

- **Design system:** none exists. Visual direction for Ryze Club must be explored before detailed screens.
- **Photo consent:** untag, report and hide are in scope for UX-004 and UX-005 and must ship with photo posting.
- **Reminder content:** WhatsApp messages need pre-approved templates, which constrains wording in UX-002.
- **Language:** English only; no right-to-left layout in V1.

## Out of scope for UX in V1

Coaches, dietitians, 1:1, payments, rewards redemption, partner-finding, a general feed, comments, messaging, native app.

## Next

1. Competitor UX review and visual direction mock-ups (club page and quiz).
2. Detailed UX for UX-001.

## Changelog

- 2026-10-07: created; six slices approved by the founder.
- 2026-10-07: visual direction decided (the blend); UX-001 drafted.
- 2026-10-12: retention and organiser-ease additions mapped to UX-002, UX-003, UX-005 and UX-006.
- 2026-10-12: signifiers and wayfinding rules added after a usability session; prototype updated to match.
