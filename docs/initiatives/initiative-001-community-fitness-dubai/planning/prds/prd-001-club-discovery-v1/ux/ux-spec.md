---
title: UX scope — Ryze Club V1
status: provisional
created: 2026-10-07
updated: 2026-10-07
parent: ../prd.md
---

# UX scope — Ryze Club V1

**Recommendation:** `needs-exploration` (visual direction), then `ready-for-author-ux` for UX-001.

**Readiness override:** the PRD is handoff-ready but PRD review was skipped by the founder. Scope approved by the founder on 2026-10-07. Status stays provisional.

## Slices, in design order

| ID | Slice | Actor | Entry | Exit / success | Surfaces | Key states | PRD IDs |
|---|---|---|---|---|---|---|---|
| UX-001 | Find a club and RSVP | Newcomer | Home quiz, or a club page opened from Instagram or search | RSVP made to a first session | Home, quiz, results, browse and filter, club page, session, sign-in | No match, no upcoming session, stale listing, session full | VS-1, FR-1, FR-2, FR-3, FR-5, UJ-1 |
| UX-003 | Streaks and milestones | Member | After confirming attendance, or profile | Streak seen, milestone earned and shared | Profile, streak, milestone moment, club standings, share card | No streak yet, at risk, protection used, opted out of standings | VS-4, FR-12, FR-22, FR-23, FR-24, FR-25, FR-26 |
| UX-002 | Turn up and come back | Member | Reminder, or My clubs | "I went" confirmed and next RSVP made | My clubs, session, reminder messages, attendance confirm, nudge | Cancelled or changed session, reminders off | VS-2, FR-4, FR-6, FR-11, FR-13, FR-14, UJ-2 |
| UX-004 | Post and manage photos | Member | A session they attended | Photos on the club page; unwanted tag or post removed | Post composer, session photos, club timeline, tag, report | Not eligible to post, upload failure, empty timeline, hidden post | VS-3, FR-7, FR-9, FR-10 (member), UJ-3, UJ-5 |
| UX-005 | Run a club page | Organiser | Their club's listing | Page claimed, schedule correct, headcount visible, posts pinned or hidden | Claim, club editor, session editor, attendee list, confirm prompt, moderation | Claim pending, stale flag, several organisers | VS-5, FR-8, FR-15, FR-16, FR-17, FR-18, FR-10 (hide), UJ-4 |
| UX-006 | Curate the directory | Curator | Curator area | Clubs added, claims approved, reports handled, pilot numbers visible | Club list, club editor, claims, reports, measures | Stale listings, open reports | VS-6, FR-19, FR-20, FR-21, UJ-6 |

UX-003 is designed second because the streak is the main retention device and sets the tone for the rest.

## Shared state families

- **Sign-in:** Google sign-in at the moment of RSVP; optional phone number and WhatsApp opt-in.
- **Empty and problem states:** no matching clubs, no upcoming session, cancelled session, possibly out-of-date listing, empty photo timeline, hidden post.
- **Visibility:** visitors see club pages; attendee names and posting need sign-in; organisers see their own club's tools; the curator sees everything.
- **Form factor:** UX-001 to UX-004 are phone-first. UX-005 and UX-006 must work on phones and can be plainer.

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
