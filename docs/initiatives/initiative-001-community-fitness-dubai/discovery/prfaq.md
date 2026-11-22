---
title: PRFAQ — Community fitness platform for Dubai
status: draft
created: 2026-10-07
updated: 2026-11-22
---

# PRFAQ — Community fitness platform for Dubai

Working name: **Ryze Club**. Tagline: *Find your people, keep showing up.*

This is a discovery input for product authors. Downstream teams should rely on the PRD, not this file.

> **Updated 22 November 2026.** The first version said Ryze Club was free and left payments out. Decisions D39 and D41 made paying per session the business model, so this file now describes it. The money model was checked with the validate-concept skill on 22 November; see "Money model" below and the update in `concept-verdict.md`.

## Press release (V1)

**Dubai, [date]** — Today Ryze Club launched a free home for Dubai's community sports clubs. New to the city, or just new to running or padel? Answer three questions and Ryze Club shows the friendly, regular clubs near you, with the next session, the pace or level, and who's going.

Until now, finding a club meant hunting through Instagram, asking friends and joining WhatsApp groups where a session time gets lost in chat. Clubs ran on three separate tools and each rebuilt the same website.

With Ryze Club, every club gets one page with its schedule, RSVPs and photos from every session, posted by the members who were there. Members get reminders, see who's coming, and keep a streak of sessions attended.

"I moved here knowing nobody. I found my Tuesday run in five minutes and I haven't missed a week since," says *[illustrative quote, to be replaced with a real one]*.

Free clubs stay free. Clubs that charge set their own price, and members pay it in the app in one tap. Start at [site].

### Honesty check on the release

- The benefit is specific: find a club, then keep going.
- Nothing depends on coaches, dietitians, supplements or ads. Payments are now in (D39): members pay the price the host sets, and Ryze keeps 10% of it.
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
Free clubs are free. For clubs that charge, you pay the price on the page and nothing else. The host has set it, and Ryze's fee comes out of their share, not on top.

**What if I pay and then can't go?**
For a club session, cancel 12 hours or more before and you get a full refund. For a private game or event with friends, paid means committed: you get your share back only if someone takes your spot. If the host cancels, everyone gets everything back.

**Who sees my profile when I ask to join something?**
Some clubs, and some private events, ask new members to request a place first. Only that club's organisers, or that event's host, see your request. They see your name, photo, work, area, Instagram, LinkedIn if you added it, and your attendance record. They don't see what other hosts said about you individually.

**Can I see what other members thought of a club or a host?**
Yes. Members who went can review a club or the host of an event. You see the average, how many people reviewed, what they mention most and the host's replies. Hosts can't delete reviews.

**Can people rate me?**
After a private event, the host answers one private question about each guest: would you host them again? Hosts see the answers added up when you ask to join something. Nobody sees star ratings of people, and you can always see your own attendance record.

**Can I find a coach or a dietitian?**
Not in V1. Coaches are a later option, at a 15% fee, once Ryze can check their qualifications and insurance (parked idea 4).

## Internal FAQ

**Who owns the club data?**
One named curator, at first the founder. Without this person the directory goes stale.

**What does it cost to run?**
Low. A web application, a database, a reminder channel and photo storage. No novel technology.

**What's the smallest credible V1?**
About 30 hand-picked run and community padel clubs, Dubai-wide, on a mobile-first website, aimed at newcomers.

**How does the money work?**
Members pay through Ziina straight into the host's account. Ryze keeps 10% of a club's price and never holds session money. Private games and events with friends add a flat AED 3 per guest on top, so the organiser gets their full share back. How Ryze collects its 10% (a split at payment or a monthly invoice) is still open.

**What is explicitly not in V1?**
Coaches, dietitians, 1:1 sessions, supplements, ads, a general social feed, comments, messaging, a native app, credential or licence checks, and medical or nutrition advice.

**What are the legal exposures?**
- Organising sports events in Dubai requires a Dubai Sports Council permit and insurance (Executive Council Resolution 1 of 2020). The platform lists sessions that clubs run; it does not organise them. The founder has deferred licensing work for V1; this is an accepted open risk.
- The UAE Personal Data Protection Law requires explicit consent and breach notification. Profiles shared when asking to join, and hosts' "would host again" answers, are personal data: members must be able to see their own record and have it corrected.
- Private events stay invite-only. Selling tickets to strangers can need an event permit in Dubai (D40).
- Ryze must never hold members' session money, so it stays a listing and payment tool and does not become an organiser or a payment service.
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
| Newcomers to Dubai crave connection, and community is becoming a paid commodity | Weakly supported | Opinion piece: Raisa Malika, "Should Community Have a Cost?", *Half-Light*, p. 53 (read 14 Oct 2026). Describes Dubai as "a forever transient city" of immigrants "craving connection"; paid community events at 300–400 AED; events "ready for the reels". One writer's view, not research |
| Run clubs in Dubai are plentiful, especially at Kite Beach | Weakly supported | Same article ("I swear if I see another one setting off down Kite Beach"). Supports curation over adding more clubs |
| Clubs will keep their pages updated | Unproven | Pilot |
| Members will post photos if it takes under 30 seconds | Unproven | Pilot |
| Photos and streaks drive return visits | Unproven | Pilot |
| An AI match beats a filtered list | Unproven | Compare in pilot |
| Earlier social-sports apps (Duplays, 10) are inactive or weak | Unverified | Check current status |
| Hosts will accept Ryze keeping 10% of their price | Unproven | Ask the 15 pilot hosts before launch; watch for hosts asking members to pay in cash |
| Members prefer paying in the app to cash or a bank transfer | Unproven | Share of bookings paid through Ryze in the pilot |
| Ziina can take Ryze's fee automatically at payment | Unverified | Confirm with Ziina; otherwise invoice hosts monthly |
| Organisers of private games and events pay the venue first and struggle to collect | User-stated | Founder, 22 November 2026. Test with 5 organisers |
| "Paid means committed, unless someone takes your spot" feels fair to guests | Assumed | Watch drop-outs and complaints in the first events |
| Seeing a profile before saying yes makes hosts comfortable letting strangers in | User-stated | Founder, 22 November 2026 |
| A private "would host again" answer and attendance record deter no-shows | Assumed | Compare no-show rates before and after hosts see records |
| Mind and Soul clubs (workshops, sound baths, dance) pay more per booking than sport clubs | Supported (prototype prices) | Example prices AED 25 to 180; check real Dubai prices |
| The three-year take-home figures | Assumed | Every input in the take-home model is a planning guess |
| Reviews from members who went help newcomers choose and push hosts to stay reliable | Assumed | Compare bookings for clubs with and without reviews in the pilot |
