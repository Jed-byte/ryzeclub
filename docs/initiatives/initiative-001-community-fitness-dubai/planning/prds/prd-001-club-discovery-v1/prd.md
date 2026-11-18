# Ryze Club: PRD

## 1. TL;DR

We will build the first release of Ryze Club. A person in Dubai picks Mind, Body or Soul, answers three questions, finds a community club and books a session in one sitting. Paid sessions are paid in the app. The host runs the club from a phone: claim a page that is already filled in, manage sessions, check people in and get paid. Success is a newcomer who books in one sitting, a host who spends under five minutes a week, and money that always agrees with the headcount. The prototype is the source of truth for this PRD.

## 2. Situation

Dubai's community clubs run on Instagram, WhatsApp groups and one-off websites. Hosts collect session fees by bank transfer and screenshots. The first release covers about 15 hosts in three Dubai areas (D41). Streaks, photos, standings and full profiles come in later phases.

## 3. Problem

A newcomer cannot see which clubs are near them, which level fits, or when the next session is. A host is usually an unpaid volunteer. They rebuild a website, chase payments and count heads by hand. Newcomers do not turn up, and hosts stop.

Evidence: demand for community sport is strong (Dubai Fitness Challenge 2025 had over 3 million participants). The discovery and payment pain is assumed, and we did not interview customers (D6). The pilot tests it (A1, A7).

## 4. Future press release

"Run clubs, padel nights and pottery evenings in one place." Like Nike Run Club for every community in Dubai, Ryze Club lets people pick what they are into. They see who is going and book in a minute. Hosts get paid when members book. "I stopped chasing transfers on WhatsApp," says one host. "I open the app, check people in and that is my week."

## 5. Goals and success metrics

1. A newcomer goes from the home screen to a booked session in one sitting. At least 30% of newcomers who book once book again within 14 days. We check this at the end of the pilot.
2. A host runs a routine week in under five minutes on a phone. The median is checked each week of the pilot.
3. Every money and headcount figure agrees. Booked equals paid plus free. What the host receives equals booked minus the Ryze Club fee. There are zero exceptions from the first paid booking.
4. At least 80% of listings were confirmed by the host in the last 30 days.

## 6. Non-goals and anti-goals

- Streaks, milestones, standings, photos, tagging, full profiles, win-back messages and the host members view are later phases (D41). The prototype shows them only in Demo. Do not build them now.
- No subscriptions or passes (D39). No one-off friend events (D40). No coaches, 1:1 sessions, ads or supplements. No waiting list (D23).
- Anti-goal: Ryze Club never holds a member's money. Payment goes to the host's own account.

## 7. Constraints and principles

Money moves from the member to the host through the host's own payment account (Ziina or Stripe). Ryze Club takes a fee per booking and stores no card details. Members and hosts must be 18 or older. Personal data stays in a UAE cloud region (D38).

Platform: Expo app for iPhone, Android and web, phone first (D38).

Design: Seal theme with Big Shoulders Display and Figtree (D44), plain English.

Tradeoff rules the team may use without asking:
(1) Any new task that a host does every week must state its time cost. If it breaks the five-minute budget, cut it.
(2) If a money figure cannot reconcile to the payments, do not show it.

## 8. Proposed approach (directional)

Nine pieces. A home screen with the three pillars and a "Find my club" quiz. A browse screen with search and filters. A club page with a fixed session bar. A booking sheet that takes payment for paid sessions. A My week screen with the next session and a week plan. A separate host app at `#organiser` with three tabs: This week, Check-in and Club. A Get paid flow in three steps. An invite link and QR code to bring existing members over. A curator who approves claims. Prototype: https://jed-byte.github.io/ryzeclub/ (host app: add `#organiser`). Craft and layout are the designer's.

## 9. User stories and acceptance criteria

**US-01 | Must:**
As a newcomer, I want to answer three questions and see clubs that fit, so that I find a club without searching.

* Given the three answers (what I am into, where I am based, my level), then the top three exact matches show, each with one plain reason why it fits.
* Given fewer than three exact matches, then the nearest clubs fill the list and each says how it differs. The list is never empty.
* Given a thin result, then more clubs in the same pillar and city show below it.
* States: no account needed to get results.

**US-02 | Must:**
As a visitor, I want to browse and filter all clubs, so that I find one on my own terms.

* Given the list, then I can search by name, category or area.
* I can filter by pillar, category, area (with a city-wide option), day, level, price, indoor or outdoor, and Ladies only.
* Given any filter state, then the count of clubs and the count of free clubs match the clubs listed.
* States: no match (offers "Clear filters").

**US-03 | Must:**
As a visitor, I want a club page that answers "is this for me", so that I decide quickly.

* Given a club, then the page shows what it is, area, level, indoor or outdoor, and Ladies only if set.
* It shows the price per session with what it covers, and how I pay ("Pay in the app" or "Pay at the session").
* It shows the weekly schedule, the next session and when the host last confirmed the details.
* Given the club has no session scheduled, then the page says so instead of showing a stale time.
* Out of scope: photo timeline (later phase).

**US-04 | Must:**
As a member, I want to book a free session with one sign-in step, so that I secure a spot.

* Given I am signed out, when I tap to book, then I sign in with Google at that moment and confirm I am 18 or older. The booking then completes.
* Given a session at capacity, then it shows "Full" and cannot be booked.
* Given a booking, then I can cancel it and the host headcount drops by one.

**US-05 | Must:**
As a member, I want to pay for a paid session in the app, so that I do not need cash or a transfer.

* Given a paid session with the host connected, then the booking sheet shows how many people are going, the price and what it covers.
* The sheet states that cancelling up to 12 hours before gives a full refund.
* Given I pay, then I book only after the payment provider confirms. A second tap does nothing while payment is in progress.
* Given I am offline, then payment is blocked with a clear message.
* Given a host that is not connected, then the session says "Pay at the session" and booking needs no payment.

**US-06 | Must:**
As a member, I want a full refund when I cancel in time, so that I book without fear.

* Given I cancel a paid booking at least 12 hours before the start, then I get a full refund and the host sees the booking removed.
* Given I cancel later than that, then no refund is promised on screen. The rule is stated before I pay.
* Out of scope: partial refunds.

**US-07 | Must:**
As a member, I want a My week screen, so that I see what I booked and where to go.

* Given bookings, then the next session shows first with time, place and a way to add it to my calendar. The week plan lists the rest.
* Given no bookings, then the screen offers "Find my club".
* Given a session changed or cancelled by the host, then it is marked and I am told.

**US-08 | Should:**
As a member, I want a reminder before a session, so that I do not forget.

* Given a booking, then I get a reminder by email, and by WhatsApp if I opted in. Sessions before 10:00 get it at 19:00 the day before. Later sessions get it three hours before.
* Given I turn reminders off, then none are sent.
* A first session with a club also carries the club's "How to find us" line.

**US-09 | Should:**
As a visitor, I want Home to show good clubs this week, so that I have somewhere to start.

* Given Home, then it shows one club each for Mind, Body and Soul. Each is the club with the soonest session that still has spots, in my area or in the city (Dubai by default).
* Given two clubs tie, then the choice rotates daily. No paid placement exists.

**US-10 | Must:**
As a member, I want to delete my account, so that I control my data.

* Given I confirm, then my profile, bookings and settings are deleted, and hosts no longer see me.
* Terms and privacy pages are linked from sign-in and Profile.

**US-11 | Must:**
As a host, I want to claim my club's page, so that I control what members see.

* Given I sign in and choose my club, then I state my role, the club's Instagram or WhatsApp link and a contact. I see "Sent. We'll confirm within 2 days."
* Given the curator approves, then I see "You now manage" and open the host app. The curator can decline with a reason.
* Given a club that is not listed, then I can ask the curator to add it. The curator fills in the page.
* States: pending, declined, club already has a host.

**US-12 | Must:**
As a host, I want a page that is already filled in, so that I check and confirm instead of typing.

* Given a first visit, then a checklist shows Club details, Weekly sessions and "How to find us" note. "Looks right" ticks the first two in one tap.
* Given any edit or a tap on "Yes, still meeting", then "Last confirmed" shows today.
* Given 60 days without a confirmation, then the public page shows a notice that details may be out of date. The curator is told.

**US-13 | Must:**
As a host, I want to add, change and cancel sessions, so that the page is right.

* Given a weekly or one-off session, then I set day or date, time, name, level note, meeting point and optional spots.
* Given I cancel one date, then the sheet states how many people will be told before it happens. A reason is optional. A paid booking is refunded.
* Given I change a session that has bookings, then the sheet states how many people will be told.
* Given I lower spots below the people already booked, then the change is blocked and says how many are booked.
* Out of scope: pause the club (not built).

**US-14 | Must:**
As a host, I want to see this week at a glance, so that I know who is coming.

* Given the next session, then the first screen shows when, how many are going, how many are first-timers and where. Within 18 hours the main button is "Check people in". Otherwise it is "See who's coming".
* Given a session list, then each row shows the headcount and the first-timers. The headcount equals the people booked, paid and free.
* Given first-timers, then they show by first name with the label "First time".

**US-15 | Must:**
As a host, I want to check people in at the session, so that attendance is true.

* Given the list, then I tap a name as each person arrives, or tap "Everyone came" and untick anyone missing. First-timers sit at the top.
* Given each tap, then it saves at once. There is no submit.
* Given the session ended, then I can change any name between "Came" and "Didn't turn up". "Mark everyone as came" is available.
* Given weak signal, then ticks stay on the phone and sync later without duplicates.

**US-16 | Must:**
As a host, I want to get paid when members book, so that I stop chasing transfers.

* Given a paid club, then a three-step flow shows the problem, how it works and the fee, then lets me connect Ziina or Stripe.
* Given I am connected, then This week shows the amount booked and what I receive after the Ryze Club fee. Booked equals the sum of paid bookings. Received equals booked minus the fee.
* Given I disconnect, then members see "Pay at the session".

**US-17 | Should:**
As a host, I want to bring my members over, so that my existing group books with me.

* Given the Club tab or first screen, then I get one personal link with Copy, a ready-made WhatsApp message and a QR code.
* Given a person opens the link, then the club page opens with a "You're invited" panel and a full-width "Join the club" button. Sign-in happens at that moment.
* Given joins, then I see how many people joined from the link.

**US-18 | Should:**
As a host, I want to edit my club's details, so that members find me in the right filters.

* Given the editor, then I set category, area, levels, Ladies only, description, price and what it covers, "How to find us" and my cover photo.
* Given a cover photo, then I choose it from the club's photos. Until I choose, the first photo is used. Only photos of people who agreed show.
* Given any save, then it shows on the public page at once.

**US-19 | Could:**
As a host, I want to share the week to my group, so that people book from the link.

* Given a session or the whole week, then ready-made text with day, time, place, how many are going and a link goes to WhatsApp or Instagram.
* The link opens the session for anyone. Sign-in is needed only to book.

**US-20 | Should:**
As a host, I want to invite a co-organiser by link, so that I share the work.

* Given the invite, then the first person who signs in with Google joins. The link works once and expires after seven days.
* Given co-hosts, then every host sees who joined and can remove them. The last host cannot leave without a handover.
* Out of scope: roles. All hosts have the same abilities. Not built in the prototype.

## 10. Risks, rabbit holes, open questions

Open decisions

- Refunds (Founder, Engineering): the pay sheet promises a full refund up to 12 hours before. The prototype only sends a refund request to the host. Who pays it back, and what happens to the Ryze Club fee, depends on the Ziina exploration.
- Fee (Founder): the prototype says "10% per booking, and 0% for your first 3 months". Only the 10% is a decision (D39). The three free months need a decision. The host sees "you receive" at 90%. The provider's own fees are not included. Decide what the host receives.
- Stripe (Founder): the Get paid flow shows Ziina and Stripe. D41 moves Stripe to a later phase. Decide whether the first release shows it.
- Launch areas (Founder): D41 says three Dubai areas. The prototype lists seven Dubai areas and five Abu Dhabi areas as sample data.
- Legal position (Founder): charging fees through the platform may change "we list, we do not organise". The UAE lawyer must confirm before launch. Permit risk stays accepted (D4).
- No-show rule (Product): decide when an unticked name becomes "Didn't turn up", and whether a no-show earns a refund.
- Messages (Engineering): reminders, "Session today" notices and a weekly host summary are described in the prototype but not sent. WhatsApp needs approved templates.

Cold start

- Each of the 15 hosts must open a Ziina or Stripe account. Ziina needs an Emirates ID. Without it, a paid club shows "Pay at the session" and the money loop does not work.
- The curator screens are not in the prototype. Claims, reports and stale clubs need a plain internal tool before launch.

Rabbit holes closed

- No host-to-member messaging (the club's WhatsApp group stays the place for chat).
- No waiting list, no subscriptions, no public ticketed events.
