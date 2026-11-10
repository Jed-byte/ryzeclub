# Parked ideas

Ideas saved for later. Picked up after the Ziina integration exploration (payment intents, organiser OAuth access, how the 10% fee is taken).

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

## 2. What makes an app real

Sources: lukegarvai, "Your vibe coded app is fake", 13 October 2026; lincolndevine, "5 tells your app was vibe coded", parts 1 and 2.

Status is what the prototype does as of 10 November 2026.

| Item | Status |
|---|---|
| Real login and logout, password reset, email verification | Not started. Sign-in is a local demo; needs a backend. |
| API keys off the front end | Needed for Ziina. Keys must live on a server, not in the GitHub Pages site. |
| Rate limiting, database backups, row-level security | Not started; comes with the backend. |
| Loading states and skeletons | Not needed yet (no server); needed once data loads over the network. |
| Empty states | Partly done. Review every screen. |
| Clear error messages, form validation | Partly done (age check, required name). Review. |
| Taps submit twice | To check: guard Pay and I'm in against double taps, especially once real payments exist. |
| Buttons wait for the server | Plan optimistic updates when the backend arrives. |
| Missing tap animations | Done: response animations and haptics on follow, I'm in, I went and check-in. |
| Keyboard covers input fields | To check on iPhone. |
| Back deletes forms or user entry | To check: sheets and the profile form. |
| Dark or light mode breaks the UI | Light mode only by design. Check the page still looks right when the phone is in dark mode. |
| Mobile layout | Done. |
| Offline support | Not started. Consider caching the week's sessions. |
| Custom 404 page | Not started (GitHub Pages supports a 404.html). |
| Analytics, error tracking | Not started. Choose tools that fit UAE data law (PDPL). |
| Privacy policy page, terms page | Not started. Needed before real users or payments. |
| Delete account button | Not started. Expected under PDPL. |
| Onboarding flow | Done for members (three-question quiz). Organiser onboarding to review. |
