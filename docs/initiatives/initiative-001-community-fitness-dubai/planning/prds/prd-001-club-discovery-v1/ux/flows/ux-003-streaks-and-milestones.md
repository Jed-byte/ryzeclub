---
title: UX-003 — Streaks and milestones
status: draft
created: 2026-10-07
updated: 2026-10-07
parent: ../ux-spec.md
---

# UX-003 — Streaks and milestones

## Readiness override

Same as UX-001: PRD handoff-ready, PRD review skipped by the founder, no design system yet. Visual direction is the blend: the signed-in home leads with the week and the streak, in the lighter photo-led look.

## Slice

| | |
|---|---|
| **Actor** | Member: signed in, has RSVPed to or attended at least one session |
| **Goal** | See that showing up counts, and feel a reason to show up again this week |
| **Entry points** | (1) Opening the site while signed in. (2) Confirming "I went" after a session. (3) An at-risk reminder. (4) A club page's standings |
| **Success** | The member knows their streak, what keeps it alive this week, and has shared or been celebrated for a milestone |
| **Platforms** | Phone browser first. Tablet and desktop supported |

## Traceability

| PRD ID | Covered by |
|---|---|
| FR-12 Streak and history | Home, Profile |
| FR-22 Milestones and badges | Milestone moment, Profile |
| FR-23 Streak protection and at-risk reminder | Home status line, At-risk reminder, Protection used |
| FR-24 Club streaks and standings | Club page standings |
| FR-25 Shareable streak card | Share card |
| FR-26 Rewards-ready record | Rules below; nothing shown to members in V1 |

Confirming attendance ("I went") is designed in UX-002. This slice starts from the result.

## Rules of the streak

- A **week** runs Monday to Sunday, Dubai time.
- A week **counts** when the member has at least one attended session in it, at any club and in any sport.
- A week also counts when the member had RSVPed to a session that the club then cancelled, and attended nothing else. This keeps the streak and does not add to total sessions. The RSVP must have been made before the cancellation.
- The **streak** is the number of counted weeks in a row, including the current week once it counts.
- The current week does not break the streak until it ends on Sunday night.
- **Protection:** a member holds at most one. If a week ends without a session, the protection is used automatically and the streak continues. It returns after four counted weeks in a row. A new member starts with one. [ASSUMPTION: S1]
- If a week is missed with no protection, the streak returns to zero. The **longest streak** and **total sessions** are kept for good.
- Attendance confirmed late still counts for the week the session took place, for up to seven days afterwards. [ASSUMPTION: S2]
- Milestones, once earned, are never removed.

## Milestones

| Milestone | Earned when |
|---|---|
| First session | 1 session attended |
| 4 weeks | 4-week streak |
| 12 weeks | 12-week streak |
| 26 weeks | 26-week streak (half a year) |
| 52 weeks | 52-week streak (a full year) |
| 104 weeks | 104-week streak (two years) |
| 25 sessions | 25 sessions in total |
| 100 sessions | 100 sessions in total |
| 250 sessions | 250 sessions in total |
| 500 sessions | 500 sessions in total |

The 52-week milestone is the headline one: its celebration and share card are the most distinctive of the set.

## Surfaces

1. **Home (signed in)** — the week view.
2. **Milestone moment** — full-screen celebration.
3. **Share card** — the image and the ways to share it.
4. **Profile** — history, milestones, settings for standings.
5. **Club page standings** — the "Most consistent" section.
6. **At-risk reminder** — a message by email or WhatsApp.

## Main flows

### A. Opening the site during the week

1. **Home** shows, top to bottom: the streak number with "week streak"; seven day markers (Monday to Sunday) with attended days filled and today outlined; one **status line**; "Coming up" with sessions from the member's clubs and their RSVP state; then recent photos from their clubs.
2. The status line says one of:
   - "This week is safe. One session done."
   - "One session keeps your streak. 3 left this week."
   - "Your protection will cover this week if you can't make it."
   - "No sessions left this week in your clubs." with a link to find another.
3. Tapping the streak number opens **Profile**.

### B. After a session

1. The member confirms "I went" (UX-002).
2. If the week now counts for the first time, Home updates and a short message says "Week 7 done."
3. If a milestone is earned, the **Milestone moment** opens: the badge, a line of praise, the club's name, and two buttons: "Share" and "Done".
4. "Share" opens the **Share card**.

### C. Sharing

1. The card shows the Ryze Club name, the number, "weeks in a row" or the milestone name, the club, and the member's first name. A photo from the member's latest session is the background when one exists; otherwise a plain coloured card.
2. The member can turn their name off before sharing.
3. Buttons: "Share" (the phone's own share menu, which includes Instagram and WhatsApp) and "Save image".

### D. At risk

1. On Thursday at 18:00, a member with a streak of two weeks or more, no attended session and no RSVP for the rest of the week receives one reminder. [ASSUMPTION: S3]
2. The reminder lists up to three remaining sessions from their clubs, each with a link straight to its RSVP.
3. No second reminder is sent that week.

### E. Week ends without a session

- **With protection:** on Monday, Home shows "Your protection covered last week. Streak safe at 6. It returns after 4 weeks in a row." The missed week is marked differently from attended weeks.
- **Without protection:** on Monday, Home shows "Your streak ended at 6 weeks. That's your longest yet. A new one starts with your next session." The number shows 0 and "Coming up" moves to the top.

### F. Club standings

1. Each club page has a "Most consistent" section below the schedule: the top five members by weeks attended at that club in the last 12 weeks.
2. Ties are shown as ties, in alphabetical order.
3. A signed-in member who is not in the top five sees their own line beneath: "You · 3 weeks".
4. Above the list, one line for the whole club: "41 members showed up in the last 4 weeks."

## States

| State | Where | Behaviour |
|---|---|---|
| No sessions attended yet | Home | No zero is shown. "Your streak starts with your first session." and the next RSVPed session |
| RSVPed, not yet confirmed | Home | A card: "Did you go to Thursday's run?" with "I went" and "I missed it" |
| Week counted | Home | Status line "This week is safe." |
| At risk | Home, reminder | Status line names how many sessions are left |
| Protection available / used | Home, Profile | Shown as a small labelled marker, in words |
| Streak ended | Home | Message in flow E; never the word "lost" or "failed" |
| No clubs followed | Home | "Follow a club to see your week." with "Find my club" |
| Fewer than five members with attendance | Club standings | Show those there are; with none, hide the section |
| Opted out of standings | Club standings, Profile | Member is absent from all lists; their own line still shows to them with "Hidden from others" |
| Loading | Home | The streak number and day markers appear first |
| Share not available on the device | Share card | Only "Save image" is shown |
| Image could not be made | Share card | "We couldn't make your card. Try again." |
| Offline | Home | Last known streak is shown with "Last updated" time |

Destructive confirmation and permission-denied do not apply.

## Who sees what

| | Visitor | Member | The member themself |
|---|---|---|---|
| Club's collective activity line | Yes | Yes | Yes |
| "Most consistent" names (first name and initial) | No | Yes | Yes |
| A member's streak, milestones and history | No | No | Yes |
| Share card | Only if the member shares it | | |

## Interaction rules

- The tone is encouraging. A missed week is stated plainly, followed at once by what comes next.
- Standings rank weeks attended only. Speed, distance and ability are never ranked.
- The celebration appears once per milestone and can be dismissed with one tap.
- No more than one streak message per week is sent outside the site.
- Members appear in standings by default and can opt out in Profile with one switch. [ASSUMPTION: S4]
- Nothing in V1 mentions rewards, points or cashback.

## Locked wording

| Place | Text |
|---|---|
| Home label | week streak |
| Safe | This week is safe. One session done. |
| At risk | One session keeps your streak. 3 left this week. |
| First time | Your streak starts with your first session. |
| Week done | Week 7 done. |
| Milestone | 12 weeks in a row. That's a habit. |
| First session milestone | First session done. Welcome to the club. |
| Protection used | Your protection covered last week. Streak safe at 6. |
| Streak ended | Your streak ended at 6 weeks. A new one starts with your next session. |
| Reminder subject | One session keeps your 6-week streak |
| Standings heading | Most consistent |
| Opt-out switch | Show me in club standings |
| Share buttons | Share · Save image |

## Responsive behaviour

- **Phone:** Home is a single column with the streak at the top. The milestone moment fills the screen. The share card is shown at the proportions of an Instagram story.
- **Tablet and desktop:** Home uses two columns: streak and week on the left, "Coming up" and photos on the right. The milestone moment is a centred dialog.

## Accessibility

- The streak is announced as a sentence: "6 week streak. This week is safe."
- Day markers have text equivalents ("Monday, attended").
- Attended, missed and protected weeks differ by shape or label, not only by colour.
- The celebration's animation is removed when the device asks for reduced motion, and never flashes.
- Focus moves into the milestone dialog and returns to Home on close.
- The share image carries a text description.
- Contrast and sizes are owed by the design system.

## Measurement the product needs to see

Members with a streak of 2, 4 and 12 weeks; at-risk reminders sent and the RSVPs that follow; protections used; streaks ended and whether the member returns within two weeks; milestone moments shown and shared; standings opt-outs.

## Feature-specific visual guidance

- The streak number is the largest element on the signed-in home.
- Day markers sit directly under it and read left to right, Monday first.
- Badges are simple and consistent in shape; earned ones are solid, unearned ones are outlined.
- The share card must be recognisable as Ryze Club at thumbnail size.

## Architecture handoff

- Streak, longest streak, total sessions and milestones must be derived from recorded attendance and be recalculated when attendance is confirmed late or corrected by an organiser.
- Weeks are counted in Dubai time, whatever the member's device says.
- Each attendance record must keep how it was confirmed (by the member, or by the organiser), so rewards can later require the stronger kind (FR-26).
- Standings must exclude members who opt out, including from counts shown to others.
- The at-risk reminder must be sent once per member per week at most, and not to members who turned reminders off.
- The share card is an image the member can save; it must not expose anything they chose to hide.
- A member's streak is private to them.

## Assumptions

| ID | Assumption |
|---|---|
| S1 | One protection, returning after four counted weeks, is generous enough to keep people and strict enough to mean something |
| S2 | Seven days is long enough to confirm attendance late |
| S3 | Thursday 18:00 is the right moment for the at-risk reminder, ahead of the weekend's sessions |
| S4 | Appearing in standings by default is acceptable when opting out is one switch |

## Open questions

- Should a member be able to see a friend's streak? Not in V1 as drafted.

Resolved by the founder on 2026-10-07:
- Members appear in standings by default, with a one-switch opt-out (S4 confirmed).
- One protection, returning after four counted weeks (S1 confirmed).
- Longer milestones added: 26, 52 and 104 weeks; 250 and 500 sessions.

## Recommended PRD changes

Applied to the PRD on 2026-10-07: FR-22 milestone list and FR-23 protection rule.

## Self-review

All in-scope PRD IDs are mapped. States, visibility, platforms, accessibility and handoff are covered. Not reviewed by anyone else. Status stays `draft`.

## Changelog

- 2026-10-07: created.
- 2026-10-07: standings default, protection rule and longer milestones confirmed by the founder.
