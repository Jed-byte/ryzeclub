---
title: PRD-001 — Community club discovery and return loop (V1)
status: handoff-ready
created: 2026-10-07
updated: 2026-10-07
parent: ../../../discovery/concept-verdict.md
---

# PRD-001 — Community club discovery and return loop (V1)

Product name: **Ryze Club**. A clean, community-driven health platform for Dubai.

## 1. Source inputs

- `discovery/prfaq.md` — press release, customer FAQ, internal FAQ, claim ledger.
- `discovery/concept-verdict.md` — verdict `proceed`, concept strength medium.
- Opportunity research (in conversation, 2026-10-07): market, regulatory and technical findings with sources.
- Founder statements: clubs build their own websites; The Padel Mob runs on WhatsApp, a website and Instagram.

## 2. Users

| User | Description | What they need |
|---|---|---|
| **Newcomer** (primary) | Someone new to Dubai, or new to a sport, who wants a regular group | Find a suitable club fast, know what to expect, and feel welcome enough to return |
| **Member** | Someone who already attends a club | Know when sessions are, see who's going, share and see photos |
| **Organiser** | The person who runs a community club, usually unpaid | One page that stays current with little effort, and a headcount before each session |
| **Curator** | The platform operator, at first the founder | Add and maintain clubs, handle reports |

## 3. Problem

Dubai's community clubs are spread across Instagram, WhatsApp groups and one-off websites. A newcomer cannot easily see which clubs exist near them, what level they suit, or when the next session is. After a first visit there is nothing that pulls them back, and session details get buried in chat. Organisers rebuild the same website and still manage attendance by hand.

**Evidence:** demand for community sport is well supported (Dubai Fitness Challenge 2025 had over 3 million participants). The discovery pain itself is assumed, not proven. [ASSUMPTION: A1]

## 4. Goals

1. A newcomer can go from landing on the site to an RSVP for a suitable session in one sitting.
2. A member has a reason to return every week.
3. A club page stays current and alive without heavy organiser effort.
4. The pilot answers the unproven claims in section 12.

## 5. Non-goals (not in V1)

- Coaches, personal trainers, dietitians and 1:1 sessions.
- Payments, paid sessions and bookings.
- Supplements, ads and sponsorship.
- A general social feed, comments, direct messaging and following people.
- A native mobile app.
- Licence, permit or credential checks.
- Training plans, and medical or nutrition advice.
- Padel court booking (Playtomic already does this).
- Golf, paid studio classes, and partner-finding ("golf buddies"). Partner-finding is the first candidate after the pilot.
- Rewards with real value for streaks (cashback, diet plans, free 1:1 or coaching sessions). Planned for later; see FR-26.

## 6. Product perimeter

- Mobile-first website.
- Dubai only.
- About 30 hand-picked clubs at launch: running, community padel, and community yoga and pilates groups (free or low-cost groups, not paid studios).
- Each sport has its own level field (pace for running, level for padel), so sports such as golf with a handicap can be added as data.
- The founder is the curator for the pilot.
- Free for everyone.
- The platform lists sessions that clubs run. It does not organise or host sessions.

## 7. Success signals

Measured over a pilot of about 8 weeks:

| Signal | Target |
|---|---|
| Clubs keeping their schedule current without being chased | At least 10 of 30 |
| Newcomers who RSVP once and RSVP again within 14 days | At least 30% |
| Sessions with at least one member photo | At least 50% |
| Quiz completions that lead to an RSVP | Track, no target yet |
| Share of listings confirmed in the last 30 days | At least 80% |

## 8. Value slices and functional requirements

### VS-1 — Find a club that fits

**FR-1 Match quiz.** A visitor answers three questions (sport, area, level or goal) and receives a short ranked list of clubs.
- A visitor gets results without creating an account.
- Each result says why it was suggested, in plain words.
- If no club fits, the visitor sees the nearest alternatives, not an empty page.

**FR-2 Browse and filter.** A visitor can browse all clubs and filter by sport, area, day of the week and level.
- The filtered list is always available, independent of the quiz.

**FR-3 Club page.** Each club has a public page with: name, sport, description, level and pace, usual location, weekly schedule, next session, cost (free, or noted otherwise), links to the club's own Instagram and WhatsApp, and its photo timeline.
- A visitor can tell within a few seconds whether beginners are welcome and when the next session is.
- The page shows when its details were last confirmed.

### VS-2 — Show up

**FR-4 Sessions.** A club has sessions, each with a date, time, location, level note and optional capacity. Recurring weekly sessions are supported.
- A cancelled or changed session is clearly marked, and people who RSVPed are told.

**FR-5 RSVP.** A signed-in person can RSVP to a session and cancel it.
- The session shows how many are going, and first names of attendees to signed-in users.
- Signing up at the moment of RSVP takes one short step: sign in with Google.
- A person can add a phone number to receive WhatsApp reminders. It is optional.

**FR-6 Reminders.** A person who RSVPed receives a reminder before the session by email, and by WhatsApp if they gave a phone number and opted in.
- The reminder includes time, place and a link to the session.
- Sessions starting before 10:00 are reminded at 19:00 the evening before; later sessions three hours before.
- A person can turn reminders off.

### VS-3 — A club page that stays alive

**FR-7 Member photo posts.** A person who RSVPed to or attended a session can post photos with an optional short caption, tagged to that club and session.
- Posting takes under 30 seconds on a phone.
- Posts appear on the session and on the club's timeline.
- A person who did not RSVP or attend cannot post to that session.

**FR-8 Organiser posts and pinning.** An organiser can post to any of their club's sessions and pin posts to the top of the club page.

**FR-9 Tagging people.** A poster can tag other attendees of the same session.
- A tagged person is notified and can remove the tag.

**FR-10 Moderation.** Anyone can report a post. An organiser can hide posts on their club. The curator can remove any post.
- A reported post reaches the curator, and the reporter is told the outcome.
- A hidden or removed post disappears from all public pages.

### VS-4 — Keep coming back

**FR-11 Attendance.** Attendance at a session is recorded. [ASSUMPTION: A3]
- A member can confirm "I went" after a session they RSVPed to, and an organiser can correct the list.
- A member can change their answer for seven days and can dispute an organiser's mark.

**FR-12 Streak and history.** A member sees their sessions attended and their current weekly streak.
- The streak counts weeks with at least one attended session, across any clubs.
- A week also counts when the member's RSVPed session was cancelled by the club and they attended nothing else.

**FR-13 Newcomer nudge.** After a first attended session, the member is prompted about the club's next session.
- The nudge is sent once per upcoming session, and stops if the member opts out.

**FR-14 My clubs.** A member can join a club and sees upcoming sessions from their clubs in one place.

**FR-22 Milestones and badges.** A member earns visible milestones for streak length and sessions attended : first session; streaks of 4, 12, 26, 52 and 104 weeks; and 25, 100, 250 and 500 sessions in total.
- A new milestone is celebrated at the moment it is earned and stays on the member's profile.
- Milestones are earned only from recorded attendance.

**FR-23 Streak protection.** A member's streak survives one missed week, so travel or illness does not wipe it out. A member holds one protection at a time; it is used automatically and returns after four counted weeks in a row.
- The member is told when the protection has been used and when it is available again.
- A member whose streak is at risk this week is reminded before the week ends, with their clubs' remaining sessions.

**FR-24 Club streaks and standings.** Each club page shows its members' collective activity and its most consistent members.
- Standings rank consistency (weeks attended), not speed or ability, so beginners can appear.
- A member can opt out of appearing in standings.

**FR-25 Shareable streak card.** A member can share a milestone or streak as an image to Instagram or WhatsApp, carrying the Ryze Club name and their club.

**FR-26 Rewards-ready record.** The record of streaks, milestones and attendance is kept in a form that can later be exchanged for rewards.
- No rewards are offered in V1.
- Before any reward with real value is offered, attendance must be confirmed by the organiser or another check, not only by the member. [ASSUMPTION: A9]

### VS-5 — Organiser runs the club page

**FR-15 Claim a club.** An organiser can claim a club page that the curator created, or request a new one. The curator approves.

**FR-16 Edit club and schedule.** An organiser can edit club details and add, change or cancel sessions.
- Any edit refreshes the "last confirmed" date.
- More than one organiser can manage a club.

**FR-17 Attendee list.** An organiser sees who RSVPed to each session and the headcount, and afterwards who attended and who RSVPed but did not turn up.

**FR-18 Confirm prompt.** An organiser is periodically asked to confirm that the club details are still correct.
- One tap confirms. A club not confirmed for a set period is flagged as possibly out of date on its page.

### VS-6 — Curation

**FR-19 Curator tools.** The curator can create, edit, hide and remove clubs, approve claims, and see which listings are stale.

**FR-20 Report a listing.** Any visitor can report a wrong or outdated listing.

**FR-21 Pilot measures.** The curator can see the success signals in section 7.

## 9. User journeys

**UJ-1 Newcomer finds a first run.** (VS-1, VS-2; FR-1, FR-3, FR-5, FR-6)
Lands on the site, answers three questions, sees three clubs, opens one, sees Tuesday's session and that beginners are welcome, RSVPs, signs up in one step, gets a reminder the evening before.

**UJ-2 First session to second session.** (VS-3, VS-4; FR-7, FR-9, FR-11, FR-13)
Attends. Afterwards confirms "I went", sees photos from the session, is tagged in one, and is prompted about next week's session. RSVPs again.

**UJ-3 Member posts a photo.** (VS-3; FR-7, FR-9)
Opens the session they just attended, adds two photos, tags a friend, posts. The photos appear on the club page.

**UJ-4 Organiser claims and runs a club.** (VS-5; FR-15, FR-16, FR-17, FR-8)
Finds their club already listed, claims it, corrects the schedule, checks the headcount before Friday, and pins the best photo afterwards.

**UJ-5 Unwanted photo.** (VS-3; FR-9, FR-10)
A member is tagged in a photo they dislike. They remove the tag and report the post. The organiser or curator hides it.

**UJ-6 Stale listing.** (VS-5, VS-6; FR-18, FR-19, FR-20)
A club stops updating. Its page is flagged as possibly out of date. A visitor reports it. The curator contacts the club or hides the listing.

## 10. Cross-cutting requirements

- **Privacy and data.** Collect the minimum: name, contact for reminders, area, sport and level. No health or medical data. Explicit consent at sign-up, and a way to delete an account and its posts, in line with the UAE Personal Data Protection Law.
- **Photo consent.** Untag, report and removal are required at launch. Attendee names are visible to signed-in users only. [ASSUMPTION: A4]
- **AI trust.** The match only ranks existing clubs and explains its reasons. It gives no training, medical or nutrition advice. The filtered list is always available as a fallback.
- **Data freshness.** Every club page shows a "last confirmed" date.
- **Accounts and roles.** Visitor (no account), member, organiser, curator.
- **Devices.** Designed for phones first, and usable on desktop.
- **Language.** English at launch. [ASSUMPTION: A5]
- **Extensibility.** A session must later be able to carry a host who is a coach, a price and a 1:1 capacity without being redesigned.
- **Legal position.** The platform lists and does not organise. Permit and licensing work is deferred by the founder and recorded as an accepted risk.
- **Support.** A visible contact route and the report links are the only support channels in V1.

## 11. Assumptions index

| ID | Assumption | Status |
|---|---|---|
| A1 | Newcomers find it hard to find a suitable club | Unproven; pilot question |
| A2 | Launch covers running, community padel and community yoga/pilates, about 30 clubs, Dubai-wide | Confirmed by founder 2026-10-07 |
| A9 | Self-confirmed attendance is too easy to fake once streaks earn rewards with real value | Assumed; revisit before rewards |
| A10 | Milestones, streak protection and standings increase return visits | Unproven; pilot question |
| A3 | Self-confirmed attendance, correctable by the organiser, is accurate enough | Unproven |
| A4 | Showing first names of attendees to signed-in users is acceptable to members | Unproven |
| A5 | English only is enough for the pilot | Unproven |
| A6 | Members will post photos if it takes under 30 seconds | Unproven; pilot question |
| A7 | Organisers will claim and maintain pages | Unproven; pilot question |
| A8 | An AI match is better than a filtered list | Unproven; compare in pilot |

## 12. Open questions

### Blockers before handoff

None open.

Resolved 2026-10-07: product name is Ryze Club; reminders go by email and WhatsApp, with Google sign-in; launch scope is running, community padel and community yoga/pilates; the founder is the curator.

### Non-blocking follow-ups

- Check that the name "Ryze Club" is free to use and register in the UAE; other businesses use "Ryze".
- Automated WhatsApp reminders need a WhatsApp Business account, approved message templates and opt-in; confirm cost and setup.
- Are Duplays and 10 still active, and what can be learned from them?
- Get legal confirmation that listing club sessions falls outside the Dubai Sports Council permit rule.
- Should clubs be able to set their page or photos to members-only?
- Arabic support after the pilot.
- Timing against the Dubai Fitness Challenge in November.

## 13. Design handoff

- Two primary flows to design first: UJ-1 (newcomer to RSVP) and UJ-3 (photo post).
- The streak is the main retention device. Design the streak, milestone moments, the at-risk reminder and the share card as a set, and keep them encouraging, not punishing.
- The organiser experience must feel lighter than running a website.
- The look should be clean and uncluttered: no ads, no feed, photos as the main visual content.
- States to cover: no matching clubs, no upcoming session, cancelled session, stale listing, empty photo timeline, reported or hidden post.
- The club page is the most important page and is public, so it is also the landing page from Instagram and search.

## 14. Architecture and engineering handoff

Product-facing needs only; technical choices belong to architecture.

- Core things the product talks about: club, session (recurring or one-off), RSVP, attendance, post with photos, tag, report, user with role.
- Public club and session pages must be shareable by link and readable without an account.
- Photo upload from a phone must be fast on mobile data.
- Reminders must be delivered reliably and on time.
- The match can start as simple rules and be improved later; the product only requires ranked results with reasons.
- Sessions must be extensible to hosts, prices and 1:1 (section 10).
- Pilot measures in section 7 must be collectable from day one.
- Account and post deletion must be possible.

## 15. Launch readiness

- About 30 clubs seeded by the curator before launch, each with a confirmed schedule.
- Three to five friendly clubs onboarded with an organiser who has claimed the page.
- Privacy notice and photo policy published.
- Report handling process agreed, with a named person.
