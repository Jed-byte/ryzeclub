---
title: Explore-001 — Visual direction and what leads
status: decision-captured
created: 2026-10-07
updated: 2026-10-07
parent: ../ux-spec.md
---

# Explore-001 — Visual direction and what leads

**Question:** what should lead the Ryze Club experience: the next session, members' photos, or the streak?
**Mode:** static mock-ups. **Slices affected:** UX-001, UX-003, and the shared club page.
**Assets:** `explore-001-visual-direction/ryze-club-directions.html` (exploratory; not production code). Published at https://claude.ai/artifact/NXQHJWTGCNfNBFPdg1GUJs. Not visually verified before publishing.

## Competitor patterns reviewed

| Product | Relevant pattern | Source |
|---|---|---|
| Heylo | Events, RSVPs, who's going, post-session photos, milestone badges, public directory; app and chat based; US-centred | https://www.heylo.com/running-club |
| Sweatpals | Search by area, activity and price; who's going; check-in by scanning a code; US cities | https://sweatpals.com/l/use-case-clubs-events |
| Strava clubs, Meetup, Spond | Feed-based clubs; paid organisers and stale lists; formal team tool | https://sportlync.com/blog/best-run-club-apps-2026 (vendor blog, treat as biased) |
| Playtomic | Padel booking and level rating | Cited in opportunity research |

Not verified: whether Heylo or Sweatpals have clubs in Dubai. The Padel Mob's website was not found and not reviewed.

## Options

- **A · Timetable:** the next session leads, as a ticket. Fastest to RSVP; works without photos; feels like a utility.
- **B · Album:** members' photos lead; session in a fixed bottom bar. Warm and convincing for newcomers; empty without photos.
- **C · Scoreboard:** the streak and standings lead. Strongest for return visits; empty for first-time visitors; can feel competitive.

## Decision (founder, 2026-10-07): the blend

1. Public club pages follow **Album**: photos first.
2. The session bar borrows **Timetable's** ticket: time, place, pace or level, who's going, one RSVP button, always visible.
3. The signed-in home borrows **Scoreboard's** week and streak view, in Album's lighter look.

Rejected as the base: Timetable (too cold for newcomers) and Scoreboard (lead element empty for new visitors).

## Consequences

- Each club needs a few photos before launch; this adds to curator work. A club page with no photos needs a designed fallback.
- Standings rank by weeks attended and stay secondary in tone.
- Check-in by scanning a code is noted as a later option for trustworthy attendance before rewards.

## Required updates

- `ux-spec.md`: record the direction; add "club page with no photos" to shared states.
- UX-001 flow file: apply the Album club page and the session bar.
- UX-003 flow file: apply the week and streak home.
- A design-system document is still needed for final colours, type and components. The mock-up's palette and typefaces are not locked.
