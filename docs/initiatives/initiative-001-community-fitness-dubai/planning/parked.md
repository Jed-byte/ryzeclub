# Parked ideas

Ideas saved for later. Picked up after the Ziina integration exploration (payment intents, organiser OAuth access, how the 10% fee is taken). Items that need no server were built on 10 November 2026, while the Ziina account is being set up.

Added 10 November 2026, from Instagram posts the founder saved.

## 1. Paywall and pricing ideas

Source: viralapplaunch, "Your paywall is probably converting at…", 26 September 2026.

Ryze Club charges per booking today, not by subscription. These ideas fit later options: a club membership pass sold by organisers, or a paid organiser plan.

| Idea | What it says | How it could apply to Ryze Club |
|---|---|---|
| Make annual the green button | Show the yearly plan as the bright main button and monthly as a plain one. More money comes in up front. | A club's monthly or termly pass as the main button; pay per session as the plain option. |
| Only annual gets the free trial | Offer the 7-day trial on the yearly plan only. | "First session free" only for people who buy a pass. Check with organisers first. |
| Lead with a hook, not a price | Open with a headline and one line on what changes for them. Price at the bottom. | Pay sheet opens with what they get ("15 people running with you on Saturday") before AED. |
| Sell the treehouse | Describe each feature as its result. | "Get paid when members book" rather than "Payments integration". |
| Put a price tag on every line | Show what each benefit would cost on its own, then the total. | Organiser plan: list what they replace (WhatsApp admin, payment chasing, sign-up sheets). |
| Show real faces above the button | A swipeable row of real member reviews with photos, right above the pay button. | Member quotes, with consent, above "Pay AED X and book". Fits the photo consent rules (D37). |
| Split it into three screens | Problem, how the app fixes it, then ask them to commit. | Organiser onboarding: their problem, Ryze Club's answer, connect Ziina. |

Run every idea through validate-concept before building it.

Built on 10 November 2026 (pay sheet and organiser Get paid):
- Lead with a hook: the pay sheet opens with how many people are going and their faces, then what booking gets you, with the price next to the button.
- Sell the treehouse: outcome wording on both sheets.
- Three screens: organiser Get paid is now three steps (the problem, how it works, connect).

Not in the MVP (decision D39, 10 November 2026): no annual or monthly plans, so make annual the green button, trial only on annual and a price tag on every line are dropped for now. Members pay each community per session. Member reviews above the button wait for real reviews.

## 2. What makes an app real

Sources: lukegarvai, "Your vibe coded app is fake", 13 October 2026; lincolndevine, "5 tells your app was vibe coded", parts 1 and 2.

Status is what the prototype does as of 10 November 2026, after this round of changes.

| Item | Status |
|---|---|
| Real login and logout, password reset, email verification | Not started. Sign-in is a local demo; needs a backend. |
| API keys off the front end | Needed for Ziina. Keys must live on a server, not in the GitHub Pages site. |
| Rate limiting, database backups, row-level security | Not started; comes with the backend. |
| Loading states and skeletons | Done for paying (button shows "Opening Ziina…"). Skeletons wait for the backend. |
| Empty states | Partly done. Review every screen. |
| Clear error messages, form validation | Done for sign-in: errors show under the field, and typed values are kept. |
| Taps submit twice | Done: a second tap on the same control within 0.7 seconds is ignored, and Pay is disabled while it works. |
| Buttons wait for the server | Plan optimistic updates when the backend arrives. |
| Missing tap animations | Done: response animations and haptics on follow, I'm in, I went and check-in. |
| Keyboard covers input fields | Done: sheets fit above the keyboard and the field being typed in scrolls into view. Check on a real iPhone. |
| Back deletes forms or user entry | Done: the phone's Back closes the sheet or goes back a screen instead of leaving the app, and Edit profile keeps what was typed unless you tap Cancel. |
| Dark or light mode breaks the UI | Done: the page tells browsers it is light only, so phones in dark mode don't recolour it. |
| Mobile layout | Done. |
| Offline support | Done: the app opens without a connection and shows an offline bar; booking and paying are blocked until it's back. |
| Custom 404 page | Done. |
| Analytics, error tracking | Partly done: the app shows a friendly error screen instead of a blank page, and all errors go through one function ready for a tracker. Choosing the tools is still open (must fit PDPL). |
| Privacy policy page, terms page | Drafts done, linked from sign-in and Profile. Need a UAE lawyer's review, a contact email and the data hosting location before launch. |
| Delete account button | Done in the prototype (clears everything on the phone). The real version must also delete server data. |
| Onboarding flow | Done for members (three-question quiz). Organiser onboarding to review. |
