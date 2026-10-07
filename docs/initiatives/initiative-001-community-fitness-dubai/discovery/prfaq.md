---
title: PRFAQ — Community fitness platform for Dubai
status: draft
created: 2026-10-07
updated: 2026-10-07
---

# PRFAQ — Community fitness platform for Dubai

Working name: **Ryze Club**. Tagline: *Find your people, keep showing up.*

This is a discovery input for product authors. Downstream teams should rely on the PRD, not this file.

## Press release (V1)

**Dubai, [date]** — Today Ryze Club launched a free home for Dubai's community sports clubs. New to the city, or just new to running or padel? Answer three questions and Ryze Club shows the friendly, regular clubs near you, with the next session, the pace or level, and who's going.

Until now, finding a club meant hunting through Instagram, asking friends and joining WhatsApp groups where a session time gets lost in chat. Clubs ran on three separate tools and each rebuilt the same website.

With Ryze Club, every club gets one page with its schedule, RSVPs and photos from every session, posted by the members who were there. Members get reminders, see who's coming, and keep a streak of sessions attended.

"I moved here knowing nobody. I found my Tuesday run in five minutes and I haven't missed a week since," says *[illustrative quote, to be replaced with a real one]*.

Ryze Club is free for members and clubs. Start at [site].

### Honesty check on the release

- The benefit is specific: find a club, then keep going.
- Nothing depends on coaches, dietitians, supplements, ads or payments.
- "Five minutes" and "haven't missed a week" are unproven and must be replaced with real pilot evidence before any public use.

## Customer FAQ

**Why not just use Instagram or ask a friend?**
Instagram shows one club at a time and rarely says the level, the next session or whether beginners are welcome. Ryze Club gives a filtered, maintained list. Whether people prefer this to their current habit is unproven.

**Why would my club bother with another site?**
It replaces the website clubs are already building for themselves, and adds RSVPs and a photo timeline that a WhatsApp group can't provide. Members supply most of the photos, so the organiser's job is light. Organiser adoption is unproven.

**Is this just another app I'll forget?**
The value is in the session loop: a reminder, who's going, photos afterwards and a streak. Browsing is only the first step. Retention is a hypothesis the pilot must test.

**Will the listings be accurate?**
Clubs update their own page and the platform curates by hand at the start. Every listing shows when it was last confirmed. Data freshness is the biggest operational risk.

**Who can post photos, and can I remove one of me?**
Only people who RSVPed to or attended a session can post to it. Anyone can untag themselves or report a photo, and club organisers can hide posts.

**Is my data safe?**
V1 collects the minimum: name, contact for reminders, area, sport and level. No health or medical data.

**Is it free?**
Yes, for members and clubs in V1.

**Can I find a coach or a dietitian?**
Not in V1.

## Internal FAQ

**Who owns the club data?**
One named curator, at first the founder. Without this person the directory goes stale.

**What does it cost to run?**
Low. A web application, a database, a reminder channel and photo storage. No novel technology.

**What's the smallest credible V1?**
About 30 hand-picked run and community padel clubs, Dubai-wide, on a mobile-first website, aimed at newcomers.

**What is explicitly not in V1?**
Coaches, dietitians, 1:1 sessions, payments, supplements, ads, a general social feed, comments, messaging, a native app, credential or licence checks, and medical or nutrition advice.

**What are the legal exposures?**
- Organising sports events in Dubai requires a Dubai Sports Council permit and insurance (Executive Council Resolution 1 of 2020). The platform lists sessions that clubs run; it does not organise them. The founder has deferred licensing work for V1; this is an accepted open risk.
- The UAE Personal Data Protection Law requires explicit consent and breach notification.
- Photos of identifiable people are sensitive. Untag, report and removal are requirements, not extras.

**How does it fail?**
A wrong schedule, a cancelled session, a poor match, an unwanted photo, or a club that stops updating. Mitigations: "last confirmed" dates, a report link on every listing and post, organiser moderation, and a plain filtered list as the fallback if the AI match is weak.

**Where does AI appear?**
Only in the three-question match. It ranks existing clubs. It gives no training, medical or nutrition advice.

**How will we know it works?**
See the success signals in `concept-verdict.md`.

## Claim ledger

| Claim | Status | Evidence or need |
|---|---|---|
| Demand for community sport in Dubai is large | Supported | Dubai Fitness Challenge 2025: 3M+ participants (WAM); Dubai Run: 307K (The National); padel growth (Redline Sports Club guide) |
| Padel court booking is solved by Playtomic | Supported | 73 of 91 Dubai clubs use it (Redline Sports Club guide, July 2026) |
| Clubs stitch together WhatsApp, a website and Instagram | User-stated | One example: The Padel Mob. Need more examples |
| Newcomers struggle to find a club | Assumed | Anecdotal press (GQ Middle East). No interviews |
| Clubs will keep their pages updated | Unproven | Pilot |
| Members will post photos if it takes under 30 seconds | Unproven | Pilot |
| Photos and streaks drive return visits | Unproven | Pilot |
| An AI match beats a filtered list | Unproven | Compare in pilot |
| Earlier social-sports apps (Duplays, 10) are inactive or weak | Unverified | Check current status |
