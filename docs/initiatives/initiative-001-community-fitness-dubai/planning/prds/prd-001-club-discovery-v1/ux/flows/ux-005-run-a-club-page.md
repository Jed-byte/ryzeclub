---
title: UX-005 — Run a club page
status: draft
created: 2026-10-07
updated: 2026-10-12
parent: ../ux-spec.md
---

# UX-005 — Run a club page

## Readiness override

Same as the other slices: PRD handoff-ready, PRD review skipped by the founder, no design system yet.

## Slice

| | |
|---|---|
| **Actor** | Organiser: runs a community club, usually unpaid, usually on a phone |
| **Goal** | Keep one accurate page for the club with less effort than a website and a WhatsApp poll |
| **Entry points** | (1) "Is this your club?" on a club page. (2) "List your club" in the site footer. (3) "Manage" on their own club page. (4) The weekly summary message. (5) A "Session today" notice. (6) A confirm prompt by message |
| **Success** | The page is claimed and correct, sessions are scheduled, the headcount is known before each session, and photos are tidy, all within the organiser effort budget: under five minutes in a routine week |
| **Platforms** | Phone browser first. Tablet and desktop supported |

## Traceability

| PRD ID | Covered by |
|---|---|
| FR-15 Claim a club | Claim, New club request |
| FR-16 Edit club and schedule | Club details, Schedule, Session editor |
| FR-17 Attendee list (including no-shows) | Session attendees |
| FR-18 Confirm prompt | Confirm prompt |
| FR-8 Organiser posts and pinning | Photos |
| FR-10 Moderation (hide) | Photos |
| FR-11 Attendance correction | Session attendees |
| FR-27 First-timer welcome (organiser side) | Session attendees, Weekly summary, Club details ("How to find us") |
| FR-29 Seasons (join) | Weekly summary |
| FR-30 Weekly organiser summary | Weekly summary |
| FR-31 Check-in at the session | Check-in |
| FR-32 Share to the club's group | Share sheet |
| FR-33 Act from a message | Weekly summary, Check-in, Confirm prompt |
| FR-34 Co-organiser invite link | Organisers |
| FR-35 Ready-made page | First visit to Manage |
| UJ-4, UJ-7 | Main flows |

## Organiser effort budget

The PRD caps an organiser's routine week at under five minutes on a phone. This slice is designed to that budget:

| Routine task | Where it happens | Target time |
|---|---|---|
| Read the week and confirm details | Weekly summary, "All correct" | 30 seconds |
| Share the week to the club's WhatsApp group | Weekly summary, "Share this week" | 20 seconds |
| Check people in, per session | "Session today" notice, Check-in | Under 1 minute for 20 people |
| Glance at photos | Optional | 0 |

Everything else (editing details, changing the schedule, moderating photos, adding organisers) is occasional, not weekly. Nothing in Manage needs a desktop.

## Surfaces

1. **Claim** — a short request tied to an existing club page.
2. **New club request** — for a club not yet listed.
3. **Manage** — the organiser's view of their club: this week, then sections.
4. **Club details** — the facts on the public page.
5. **Schedule** — weekly sessions and one-off sessions.
6. **Session editor** — one session.
7. **Session attendees** — who's going, and afterwards who came.
8. **Photos** — pin, hide, post.
9. **Organisers** — who else can manage the club.
10. **Confirm prompt** — "Still correct?"
11. **Weekly summary** — a message every Sunday, and the same view at the top of Manage.
12. **Check-in** — one session's attendee list in tick mode, opened from a "Session today" notice.
13. **Share sheet** — ready-made text for a session or the whole week.

## Main flows

### A. Claim a club (UJ-4)

1. On the club page the organiser taps "Is this your club?" and signs in with Google.
2. **Claim** asks three things: their role in the club, the club's Instagram handle or WhatsApp group link, and a phone number or email for the curator to reach them.
3. They see "Sent. We'll confirm within 2 days." The club page is unchanged meanwhile.
4. When the curator approves, they receive "You now manage Marina Dawn Runners." with a link to **Manage**.

### B. First visit to Manage

1. The page is already filled in by the curator from the club's public channels (FR-35). A short checklist reads: "Check your details", "Check your weekly sessions", "Add a 'How to find us' note". Each item opens the right section with everything pre-filled, and one tap on "Looks right" ticks it. Adding photos is not on the checklist; members do that.
2. Below the checklist, and from then on at the top: **This week** — each session with its count going, and "Share link".

### C. Edit details

Fields: club name, sport, area, one-line summary, "How to find us" (one line, shown to first-timers in their reminder), description, level (with the sport's own scale: pace range for running, level for padel, open or beginner for yoga and pilates), cost, beginners welcome, what to bring, Instagram and WhatsApp links, cover photo. Changes save per field and show on the public page at once. Saving any field refreshes "Last confirmed".

### D. Schedule

1. **Weekly sessions:** each has a day, start time, meeting point, session type, level note and optional capacity.
2. "Add a session" offers "Every week" or "One-off".
3. Editing a weekly session asks "Change just this one, or every week from now?"
4. **Cancel** asks which session and an optional reason, then states the effect: "12 people will be told." with "Cancel session" and "Keep it".
5. **Pause the club** hides upcoming sessions for a chosen period (for summer or Ramadan timings) and shows "Back on 6 Sept" on the public page.

### E. Before and after a session

1. **Session attendees** before the session: the count, first names and initials, and how many are first-timers, marked "First time". Above the list, a line names them: "First time today: Sara, Omar. Say hi."
2. "Share" opens the **Share sheet** with ready-made text: "Tue 05:45 · Marina Walk, by Pier 7 · 14 going. RSVP: [link]". It goes straight to WhatsApp, Instagram, or the phone's share menu. "Share this week" does the same for every session in the week.
3. After the session, the list shows three groups: **Came**, **Didn't turn up**, **Not yet confirmed**. Members' own answers fill these in.
4. **Check-in.** Fifteen minutes before the start, organisers receive a "Session today" notice: "Tue 05:45 · 14 going, 2 first-timers. Check in." It opens the attendee list in tick mode: tap a name as each person arrives, or "Everyone came" and untick anyone missing. Names are large, alphabetical, and first-timers sit at the top. It saves as each name is tapped; there is no submit. Members checked in this way are not asked "Did you go?".
5. After the session, or if check-in was skipped, the organiser can tap any name to change it, or "Mark everyone as came" then adjust. They can add someone who came without an RSVP if that person has an account.
6. A member's "I was there" dispute appears as a line at the top with "Yes, they came" and "No".

### F. Photos

1. All photos for the club, newest first, grouped by session.
2. Each photo offers "Pin to top" (up to 3 pinned) and "Hide".
3. "Hide" asks for nothing more; the photo leaves public pages at once and the poster is told "The club hid your photo."
4. The organiser can post to any of their club's sessions, including before launch to seed the page.

### G. Weekly summary (UJ-7)

1. Every Sunday at 18:00, each organiser receives one message by email, and by WhatsApp if they opted in: "Your week at Marina Dawn Runners: Tue 05:45 · 14 going (2 first time). Thu 05:45 · 9 going. Sat 06:30 · 21 going. Last week: 38 came."
2. Below it, anything waiting: a co-organiser request, an attendance dispute, a reported photo. Each is one line with one link.
3. Four one-tap actions: "All correct", "Share this week", "Cancel a session", and, when a season is running, "Join the season".
4. "All correct" refreshes "Last confirmed" and shows "Thanks. Marina Dawn Runners is up to date." Nothing else is asked.
5. Links act without signing in again on that device, are personal to the organiser, and expire after seven days (FR-33). "Cancel a session" still shows "12 people will be told." before it happens.
6. The same summary sits at the top of Manage as **This week**.
7. If several organisers manage the club, each receives it. The first "All correct" counts for the club.

### H. Confirm prompt

The weekly summary's "All correct" counts as confirmation, so most organisers never see this prompt. Every 30 days without an edit or a confirmation, organisers get "Is Marina Dawn Runners still meeting Tue, Thu and Sat?" with "Yes, all correct" and "Update". One tap on yes refreshes "Last confirmed". After 60 days with no confirmation the public page shows the out-of-date notice, and the curator is alerted.

### I. Organisers

The first organiser can invite others by email, or with "Invite by link", which opens the Share sheet with "Help run Marina Dawn Runners on Ryze Club: [link]". The first person to accept with Google sign-in joins; the link then stops working, and it expires after seven days. Every organiser sees "Omar joined as an organiser" and can remove them. All organisers have the same abilities. An organiser can remove themselves; the last one cannot leave without handing over or contacting the curator.

## States

| State | Where | Behaviour |
|---|---|---|
| Claim pending | Club page (for the claimant) | "Your request is with us." |
| Claim declined | Message | Reason given, with a way to reply |
| Club already managed | Claim | "This club already has an organiser. Ask them to add you, or tell us if that's wrong." |
| New club awaiting approval | Manage | Editable but not public; "Not live yet" |
| No sessions scheduled | Manage, public page | "Add your first session." Public page shows "No session scheduled" |
| Session with RSVPs edited | Session editor | "12 people will be told about this change." before saving |
| Capacity reduced below RSVPs | Session editor | Not allowed; "18 people are already going." |
| Page possibly out of date | Manage | A notice at the top with "Confirm details" |
| Paused | Manage, public page | "Paused until 6 Sept" with "Resume now" |
| Nothing to moderate | Photos | "No photos yet. Add a few so newcomers can see the club." |
| Save failed | Any editor | Field keeps the typed value; "That didn't save. Try again." |
| Offline | Manage | Read-only with "You're offline." |
| Offline during check-in | Check-in | Ticks are kept on the phone and sent when back online, with "Saved on your phone. We'll sync when you're back online." |
| Session today, nobody going | "Session today" notice | Not sent |
| Summary link expired | Weekly summary | "This link has expired." with sign-in, then Manage |
| Invite link already used | Organisers | "This invite has been used. Ask an organiser for a new one." |
| No first-timers | Session attendees, Weekly summary | The first-timer line is left out |

## Who sees what

| | Organiser of this club | Other organisers of other clubs | Members |
|---|---|---|---|
| Attendee first names and initials | Yes | No | Yes, for sessions |
| Who came, who didn't turn up | Yes | No | No |
| Members' email, phone, streaks | No | No | No |
| Who reported a photo | No | No | No |
| Other organisers' contact details | Email of co-organisers only | No | No |

## Interaction rules

- Anything that messages members states how many people will be told before it happens.
- Cancelling a session and removing an organiser ask for confirmation. Nothing else does.
- Edits appear on the public page at once; there is no draft or publish step.
- The organiser never needs to create content for the page to look alive; members' photos do that.
- Organisers cannot delete a club. They can pause it or ask the curator to remove it.
- Organisers cannot message members directly through the site in V1; the club's own WhatsApp group remains the place for chat.
- Organisers receive at most two kinds of routine message: the weekly summary and "Session today" notices. Everything else waits for the summary.
- Every organiser action can start from a message, and every one fits on a single phone screen.
- Nothing is required of an organiser to keep the page alive; skipping check-in, photos or the summary never breaks anything for members.

## Locked wording

| Place | Text |
|---|---|
| Claim entry | Is this your club? |
| Claim sent | Sent. We'll confirm within 2 days. |
| Approved | You now manage Marina Dawn Runners. |
| Checklist | Check your details · Check your weekly sessions · Add a few photos |
| Recurring edit | Change just this one, or every week from now? |
| Cancel confirm | 12 people will be told. · Cancel session · Keep it |
| Attendee groups | Came · Didn't turn up · Not yet confirmed |
| First-timer label | First time |
| Bulk mark | Mark everyone as came |
| Photo actions | Pin to top · Hide |
| Confirm prompt | Is Marina Dawn Runners still meeting Tue, Thu and Sat? · Yes, all correct · Update |
| Pause | Pause the club · Back on 6 Sept |
| Weekly summary | Your week at Marina Dawn Runners |
| Summary actions | All correct · Share this week · Cancel a session · Join the season |
| Summary confirmed | Thanks. Marina Dawn Runners is up to date. |
| Session today notice | Tue 05:45 · 14 going, 2 first-timers. Check in. |
| Check-in actions | Everyone came · tap a name to tick |
| First-timer line | First time today: Sara, Omar. Say hi. |
| Share text | Tue 05:45 · Marina Walk, by Pier 7 · 14 going. RSVP: [link] |
| Invite by link | Help run Marina Dawn Runners on Ryze Club: [link] |
| Checklist pre-filled | Looks right |

## Responsive behaviour

- **Phone:** Manage is a single column: This week, then a list of sections. Editors are full screens with the save state shown beside each field.
- **Tablet and desktop:** sections sit in a side list with the editor beside it. The attendee list becomes a table.

## Accessibility

- Every field has a visible label and plain-language help where the format matters ("Pace, for example 6:30 to 7:00 per km").
- Days and times use standard pickers that work with a keyboard and screen reader.
- Errors appear beside the field and are announced.
- Attendance groups are headed lists; changing a person's status is a labelled control, not a drag.
- Confirmation dialogs focus the safe choice first.

## Measurement the product needs to see

Time spent in Manage per organiser per week (against the five-minute budget); weekly summaries opened and answered; "All correct" taps; share links sent and the RSVPs that come through them; sessions checked in and time taken; invite links used; claims requested and approved; clubs with a schedule kept current unprompted (the PRD signal); confirm prompts answered; sessions edited or cancelled; attendance corrected by organisers; photos pinned and hidden; days since last confirmation per club.

## Feature-specific visual guidance

- Manage is plainer and denser than the public pages. It should feel quicker than a group chat.
- This week's headcounts are the largest items.
- First-timers stand out in the attendee list so the organiser can welcome them.
- Check-in uses the largest names and touch targets in the product; it is used standing up, outdoors, often at dawn.
- The weekly summary reads fully in a notification preview: club, sessions, headcounts.

## Architecture handoff

- A club can have several organisers with equal abilities; the curator can add and remove them.
- Organisers see attendee names and attendance for their own club only, and never members' contact details.
- Edits to a session with RSVPs trigger the change or cancellation messages in UX-002, once per change.
- A change to a weekly session can apply to one occurrence or to all future ones.
- An organiser's attendance mark takes precedence over a member's answer and is recorded as organiser-confirmed.
- "Last confirmed" is updated by any edit or a one-tap confirmation.
- A paused club keeps its page, photos, members and history.
- Hidden photos leave all public pages promptly.
- Organiser message links act without a fresh sign-in on the receiving device, are personal, and expire after seven days.
- Check-in must work with a weak connection and sync ticks later without duplicates.
- The weekly summary is generated per club in Dubai time on Sunday at 18:00; "All correct" from any organiser updates the club once.
- Invite links are single-use and expire after seven days.

## Assumptions

| ID | Assumption |
|---|---|
| O1 | A claim can be checked by the curator from an Instagram handle or WhatsApp link within two days |
| O2 | Organisers will accept equal abilities for all co-organisers |
| O3 | A 30-day confirm prompt is frequent enough without being a nuisance |
| O4 | Organisers do not need to message members through the site in V1 |
| O5 | Sunday at 18:00 is when organisers plan their week and will read a summary |
| O6 | Fifteen minutes before the start is early enough to open check-in and late enough to be relevant |
| O7 | Organisers will share a Ryze Club link in their WhatsApp group rather than run their own poll |

## Open questions

- Should organisers be able to export an attendee list, for example for a permit or insurance?
- Should an organiser be able to add someone who came without an account?

## Self-review

All in-scope PRD IDs are mapped. Not reviewed by anyone else. Status stays `draft`.

## Changelog

- 2026-10-07: created.
- 2026-10-12: organiser effort budget; weekly summary, check-in, share sheet, invite by link, pre-filled page and "How to find us" added (PRD FR-27, FR-29 to FR-35).
