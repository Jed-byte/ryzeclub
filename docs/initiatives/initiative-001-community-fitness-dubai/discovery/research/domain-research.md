---
title: Domain research — Organisers' week and where AI helps
status: draft
created: 2026-10-14
updated: 2026-10-14
parent: ../prfaq.md
depth: level-2-standard
lanes: domain, market, technical-feasibility
recommendation: needs-customer-validation
confidence: medium
---

# Organisers' week and where AI helps

**Question:** what do community club organisers in Dubai spend their week on, what hurts, and where would AI genuinely help them rather than add noise?

**Answer in one line:** AI earns its place in Ryze Club as a drafting and curation assistant that the organiser always approves (the weekly post, the "we missed you" note, building the club page, picking photos). It should not make decisions about people, answer members on its own, or replace rules that plain statistics handle.

**Confidence:** medium overall. Public sources describe organiser work and tools well; nothing here comes from Dubai organisers themselves. Every pain below is a hypothesis until five organiser interviews confirm it.

## Domain: the organiser's week

### Observed

| Finding | Source | Confidence |
|---|---|---|
| Dubai clubs coordinate through WhatsApp groups and Instagram; joining usually means a WhatsApp group | Platinumlist guide, April 2026 ([link](https://platinumlist.net/guide/4-running-clubs-in-dubai-you-can-join-for-free-in-april-2026/)); see also `../prfaq.md` claim ledger | high |
| Running one or more WhatsApp groups is real admin work; clubs are advised to appoint at least two admins "to provide resilience, load sharing" | White Horse Harriers WhatsApp guidance, January 2026 ([PDF](https://whitehorseharriers.uk/wp-content/uploads/2026/01/WHH-WhatsApp-Group-guidance-Jan-26.pdf)); WhatsApp's own admin guidance ([link](https://www.whatsapp.com/communities/learning/rolesformultiadmincommunities?lang=de)) | high |
| Volunteer burnout is a recognised problem in sports clubs | Orienteering New Zealand ([link](https://www.orienteering.org.nz/news/addressing-volunteer-burnout/)) | medium |
| Run club guides stress welcoming newcomers personally and spreading admin across members | "How to start a run club" ([link](https://benalexander.substack.com/p/how-to-start-a-run-club)) | medium |
| Free events have the highest no-show rates; one roundup puts free-event no-shows at 40–50% | EventX ([link](https://eventx.io/blog/reduce-event-registration-no-shows)), Nunify ([link](https://nunify.com/blogs/event-attendance-rate)); vendor content | low–medium |
| Attendance drops usually point to friction; people return when they feel "welcome, needed and excited" | GroupFlow ([link](https://www.groupflow.app/blog/events/improving-attendance)); vendor content | low |
| Summer heat changes Dubai's sporting calendar: official advice is to move strenuous exercise to cooler hours, and in August 2025 nine malls opened for an indoor "Mallathon" | Khaleej Times ([link](https://www.khaleejtimes.com/uae/summer-tips-prevent-heat-exhaustion-soaring-temperatures)), Arab News ([link](https://www.arabnews.com/node/2611233/amp)) | high |
| Dubai Sports Council sanctions large events; no public process for small club sessions was found | Gulf News and others (see Sources) | medium (absence of evidence) |

### Interpretation: the organiser's jobs, by how often they happen

| Job | How often | Where it happens today | AI could help? |
|---|---|---|---|
| Post the week's sessions and changes | Weekly, plus ad hoc | WhatsApp, Instagram | **Yes**: draft the post |
| Answer the same questions ("beginner-friendly?", "where exactly?") | Daily | Instagram DMs, WhatsApp | Partly; the club page answers most |
| Get a headcount | Before each session | WhatsApp polls, thumbs-up | No, RSVPs and simple statistics do it |
| Welcome and spot newcomers | Each session | In person | No, a "first time" flag does it |
| Notice who has drifted away and bring them back | Rarely done | Nowhere | **Yes**: draft a personal note (detection is a rule) |
| Photos and reputation | After each session | Instagram | **Yes**: pick the best photos and flag unsafe ones |
| Keep the club page or website current | Monthly | Linktree, a website, highlights | **Yes**: build and refresh the page from the club's own posts |
| Adjust for heat, Ramadan and holidays | Seasonal | Head, WhatsApp | Rules and a forecast, not AI |
| Share the load | Ongoing | Informal | No |

## Market: what tools already offer

| Tool | What it does for organisers | AI | Source |
|---|---|---|---|
| WhatsApp groups and communities | Chat, polls, group events, admin roles | **Meta Business Agent**, available globally since 3 June 2026 on WhatsApp Business and Instagram DMs, answers questions and books, with handoff to a person | TechCrunch ([link](https://www.techcrunch.com/2026/06/03/metas-ai-agent-for-whatsapp-business-is-now-available-globally/)) |
| Heylo | Events, RSVPs, attendance, caps with automatic waiting lists, waivers, reminders, payments (service fee) | None found | Heylo ([link](https://heylo.com/), [waitlists](https://www.heylo.com/blog/event-caps-and-waitlists)) |
| Spond | Events, reminders, payments, messaging, members | None found | Aggregator pages only (weak) |
| Strava | Club events with RSVP caps, Events tab (July 2026), rebuilt Club Organiser Hub | AI training plans for athletes, not organisers | endurance.biz ([link](https://endurance.biz/2026/industry-news/strava-introduces-race-and-club-event-discovery-features/)), TechRadar ([link](https://www.techradar.com/features/3-exciting-features-coming-to-strava-this-year-including-ai-route-creation)) |
| Event platforms (Splash and others) | Attendance prediction for paid events | Turnout forecasts; accuracy claims unverified | Splash ([link](https://splashthat.com/platform/attendance-insights)) |

**Implication:** waiting lists, reminders and RSVPs are table stakes (Heylo has them free). Answering members' questions with AI is already free inside WhatsApp and Instagram through Meta. No tool found uses AI for the organiser's own admin: drafting posts, retention and keeping a public page current. That is the opening.

## Technical feasibility and rules

| Finding | Implication | Source | Confidence |
|---|---|---|---|
| WhatsApp Business Platform charges per delivered template message; marketing templates are the most expensive and always charged; pricing changes again from 1 October 2026 (sources disagree on details) | A "we missed you" message sent by Ryze Club over WhatsApp is likely a paid marketing template needing opt-in. Cheaper: let the organiser send it from their own WhatsApp via a share link, or use email or push | Meta pricing docs ([link](https://developers.facebook.com/docs/whatsapp/pricing)), Yournotify ([link](https://yournotify.com/blog/whatsapp-pricing-update-2026/)) | medium |
| UAE PDPL (Federal Decree-Law 45 of 2021): consent is the default basis; people can contest decisions made solely by automated processing with significant effects; profiling with sensitive data can trigger a DPO and impact assessment | Keep AI to drafts a person approves. Avoid face recognition (biometric, sensitive). Ranking clubs is about clubs, not people | Baker McKenzie ([link](https://resourcehub.bakermckenzie.com/en/resources/global-data-and-cyber-handbook/emea/uae/topics/artificial-intelligence-profiling-and-automated-decision-making)), Modulos ([link](https://docs.modulos.ai/frameworks/uae-pdpl/lawful-processing-and-data-subject-rights)) | medium (secondary sources) |
| Instagram's personal-account API ended in December 2024; only Business and Creator accounts connect | Building a club page from Instagram works only if the club connects a Business or Creator account, or the organiser pastes a few captions. Many clubs run Creator accounts (assumed) | Behold ([link](https://behold.so/updates/basic-display-api-deprecated)) | medium |
| Large language models reliably extract schedules from text and draft short messages in English and Arabic; vision models can rank photo quality and flag unsafe images | Feasible with today's models; human approval covers errors | Model capability, not externally sourced here | medium |

## Concept check for each AI idea

Each idea was put through the validate-concept questions (customer, problem, smallest V1, trust and failure model, success signal, weakest claim, verdict). These are headless drafts: confirm or correct them before any becomes a PRD requirement.

| # | Idea | Customer and problem | Smallest credible V1 | Trust and failure model | Success signal | Weakest claim | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | **Club page from Instagram** | Ryze Club's curator and new organisers: typing a page is the first reason organisers give up | Organiser connects a Business or Creator account, or pastes 3 captions; AI fills details, schedule and "how to find us"; organiser confirms each part | Every field is shown as "From your Instagram, check this"; nothing goes live unconfirmed | 70% of claimed pages confirmed with no more than 2 edits | Clubs will connect Instagram, or paste captions | **prototype** |
| 2 | **Weekly post writer** | Organisers: the Sunday post every week | One tap drafts the week's WhatsApp or Instagram post from the schedule, headcounts and a heat note; the organiser edits and shares through the phone's share menu | Draft only; shared from the organiser's own account | Used in half of active weeks; organiser time stays under 5 minutes | Organisers prefer a draft to typing their own | **proceed** |
| 3 | **"We missed you" note** | Organisers: nobody notices regulars drifting | Detection is a rule (2+ missed weeks after 4+ visits). AI drafts a short note that mentions the person's history and next session; the organiser sends it from their own WhatsApp | Organiser reads and sends; members can opt out of being messaged | 25% of messaged regulars come back within 3 weeks | A personal note beats a generic one | **narrow**: rules for detection, AI only for the wording |
| 4 | **Photo picks and safety** | Organisers and members: dozens of photos, some unflattering or unsafe | AI suggests the 3 best photos for the club page and flags nudity or unsafe content for the organiser; no face recognition | Suggestions only; flagged photos are held for the organiser | Organisers accept 2 of 3 picks | Organisers care which photos lead the page | **narrow**: quality and safety only, never identify faces |
| 5 | **Headcount forecast** | Padel, basketball and indoor football organisers who pay for courts and pitches | Show "usually 80% of RSVPs come" from the club's own history; no AI | Plain statistics people can check | Fewer courts paid for and left empty | Forecasts change bookings | **park** as AI; build as simple statistics |
| 6 | **Heat and season adviser** | All outdoor clubs in summer | Forecast plus rules: warn the organiser when a session's heat index passes a limit and suggest an earlier time or an indoor option | Advice only | Fewer heat cancellations on the day | Organisers act on a warning | **proceed** as rules, not AI |
| 7 | **Newcomer question bot** | Newcomers with questions | — | Wrong answers about meeting points or safety are costly | — | Members need a bot when the page already answers | **reject**: Meta Business Agent already does this free where the questions arrive |
| 8 | **Monthly club recap** | Organisers wanting shareable content | AI drafts a monthly recap ("12 new faces, our 100th session") for the organiser to post | Draft only | Recaps shared by a third of clubs | Organisers want more content to post | **park**: after V1; risk of the "performance" the Half-Light article criticises |

## Recommendation

`needs-customer-validation`. Before a PRD commits to any AI feature:

1. Run five organiser interviews (run and padel), testing which of the week's jobs hurt most and showing ideas 1, 2 and 3 as sketches.
2. Prototype idea 1 (page from Instagram) against 5 real public club accounts, because it lowers Ryze Club's own curation cost as well as the organiser's.
3. Write ideas 2 and 3 into the PRD as optional drafts, with sending always done by the organiser.

## Open questions

- Do Dubai organisers mainly run Instagram Business or Creator accounts, or personal ones?
- Will organisers send "we missed you" notes from their own WhatsApp, or expect Ryze Club to send them?
- Does any Dubai authority expect small free clubs to hold a permit? (Accepted risk in the PRFAQ; unresolved.)
- What is the actual no-show rate for free club sessions in Dubai?

## Sources

- [Platinumlist: free running clubs in Dubai, April 2026](https://platinumlist.net/guide/4-running-clubs-in-dubai-you-can-join-for-free-in-april-2026/)
- [White Horse Harriers: WhatsApp group guidance, January 2026](https://whitehorseharriers.uk/wp-content/uploads/2026/01/WHH-WhatsApp-Group-guidance-Jan-26.pdf)
- [WhatsApp: roles for multi-admin communities](https://www.whatsapp.com/communities/learning/rolesformultiadmincommunities?lang=de)
- [Orienteering New Zealand: addressing volunteer burnout](https://www.orienteering.org.nz/news/addressing-volunteer-burnout/)
- [How to start a run club](https://benalexander.substack.com/p/how-to-start-a-run-club)
- [GroupFlow: getting people to show up](https://www.groupflow.app/blog/events/improving-attendance)
- [EventX: reducing registration no-shows](https://eventx.io/blog/reduce-event-registration-no-shows)
- [Nunify: event attendance rate](https://nunify.com/blogs/event-attendance-rate)
- [Khaleej Times: preventing heat exhaustion](https://www.khaleejtimes.com/uae/summer-tips-prevent-heat-exhaustion-soaring-temperatures)
- [Arab News: Dubai runners turn to indoor marathon](https://www.arabnews.com/node/2611233/amp)
- [TechCrunch: Meta's AI agent for WhatsApp Business available globally](https://www.techcrunch.com/2026/06/03/metas-ai-agent-for-whatsapp-business-is-now-available-globally/)
- [Heylo](https://heylo.com/) and [Heylo: event caps and waitlists](https://www.heylo.com/blog/event-caps-and-waitlists)
- [endurance.biz: Strava race and club event discovery](https://endurance.biz/2026/industry-news/strava-introduces-race-and-club-event-discovery-features/)
- [TechRadar: features coming to Strava](https://www.techradar.com/features/3-exciting-features-coming-to-strava-this-year-including-ai-route-creation)
- [Splash: attendance insights](https://splashthat.com/platform/attendance-insights)
- [Meta: WhatsApp Business Platform pricing](https://developers.facebook.com/docs/whatsapp/pricing)
- [Yournotify: WhatsApp pricing update, October 2026](https://yournotify.com/blog/whatsapp-pricing-update-2026/)
- [Baker McKenzie: UAE AI, profiling and automated decision-making](https://resourcehub.bakermckenzie.com/en/resources/global-data-and-cyber-handbook/emea/uae/topics/artificial-intelligence-profiling-and-automated-decision-making)
- [Modulos: UAE PDPL lawful processing and data subject rights](https://docs.modulos.ai/frameworks/uae-pdpl/lawful-processing-and-data-subject-rights)
- [Behold: Instagram Basic Display API deprecated](https://behold.so/updates/basic-display-api-deprecated)
- [Gulf News: Dubai Sports Council and community runs](https://gulfnews.com/sport/athletics/dubai-to-host-first-colour-run-in-middle-east-1.1267329)
