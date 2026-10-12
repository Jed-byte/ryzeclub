# Ryze Club

A clean, community-driven health platform for Dubai. Find a community sports club, turn up, and keep showing up.

This repository holds the planning documents and a clickable prototype. It is not the production app.

## View the prototype

Live at **https://jed-byte.github.io/ryzeclub/**, or open `index.html` in a browser. There is nothing to install or build.

As a member:

1. Answer three questions and see clubs that fit.
2. Open a club page and RSVP to a session.
3. Confirm "I went" after the session.
4. Watch the weekly streak grow and earn milestones.
5. Add photos, remove a tag, report a photo.

As an organiser, open **https://jed-byte.github.io/ryzeclub/#organiser**. This is a separate app with its own look and tabs (This week, Check-in, Photos, Club); it shares the member app's data, so RSVPs made as a member appear in the headcounts.

1. Sign in, pick your club and tap "Claim". Approve it straight away with "Approve my request" (in the real product the curator does this).
2. **This week:** today's session with "Check in", the page checklist (pre-filled; tap "Looks right"), and the weekly summary with "All correct", "Share this week" and "Change or cancel a session".
3. **Check-in:** tap names as people arrive, or "Everyone came". First-timers are at the top.
4. **Club:** details and the "How to find us" note, schedule, invite a co-organiser by link, and "See your public page", which opens the member app.
5. **Photos:** pin or hide photos.

"Member app" in the header switches back. From the member app, "Open organiser app" on a club you manage, or **Demo**, switches over.

Use the **Demo** button at the top to skip ahead in time, become an organiser, or reset.

### What is not real

- The clubs, people and times are examples.
- Photos are stock images loaded from Unsplash. They stand in for members' photos.
- Sign-in is simulated. Type any first name.
- Nothing is sent anywhere. Your progress is kept in your own browser only.
- Reminders, WhatsApp, calendar and sharing are described, not sent.
- Editing session times, adding sessions, pausing a club and co-organisers are not built yet.
- Curator screens are not built yet.
- In the organiser app, sharing, invites and WhatsApp are shown, not sent; pausing a club and editing session times are not built yet.

## Documents

Everything is under `docs/initiatives/initiative-001-community-fitness-dubai/`.

| Document | What it is |
|---|---|
| `discovery/prfaq.md` | Press release and questions used to test the idea |
| `discovery/concept-verdict.md` | The verdict and what the pilot must prove |
| `planning/prds/prd-001-club-discovery-v1/prd.md` | What V1 must do |
| `planning/prds/prd-001-club-discovery-v1/decision-log.md` | Every decision and who made it |
| `planning/prds/prd-001-club-discovery-v1/ux/ux-spec.md` | The six design flows and the visual direction |
| `planning/prds/prd-001-club-discovery-v1/ux/flows/` | Detailed design for each flow |
| `planning/prds/prd-001-club-discovery-v1/ux/explorations/` | Competitor review and the three visual directions |

## Status

- Product requirements: handoff-ready.
- Design: six flows drafted, none reviewed.
- Prototype: member and organiser journeys, with the signifier rules from `ux/ux-spec.md` applied (12 Oct 2026).
- Not started: design system, curator screens, technical design, the real build.
