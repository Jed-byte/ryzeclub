---
title: UX-004 — Post and manage photos
status: draft
created: 2026-10-07
updated: 2026-10-07
parent: ../ux-spec.md
---

# UX-004 — Post and manage photos

## Readiness override

Same as the other slices: PRD handoff-ready, PRD review skipped by the founder, no design system yet.

## Slice

| | |
|---|---|
| **Actor** | Member who RSVPed to or attended a session |
| **Goal** | Share photos from a session, and control photos they appear in |
| **Entry points** | (1) "Add yours" on the Attendance result. (2) "Add photos" on a session they attended. (3) A "You were tagged" message. (4) Any photo on a club page |
| **Success** | Photos appear on the session and the club page; an unwanted tag or post is removed |
| **Platforms** | Phone browser first, using the phone's photo library or camera. Tablet and desktop supported |

## Traceability

| PRD ID | Covered by |
|---|---|
| FR-7 Member photo posts | Add photos, Session photos, Club timeline |
| FR-9 Tagging people | Tag step, Tagged notice, Remove tag |
| FR-10 Moderation (member side) | Report, Delete own post |
| UJ-3, UJ-5 | Main flows |

Organiser pinning and hiding are in UX-005. Curator removal is in UX-006.

## Rules

- A member can post to a session they RSVPed to or attended, from its start time until 14 days after. [ASSUMPTION: P1]
- Up to 6 photos per post, and a caption of up to 140 characters. [ASSUMPTION: P2]
- Photos only. No video, no links in captions.
- Only people who attended or RSVPed to the same session can be tagged.
- Posts appear at once. They are not held for approval. [ASSUMPTION: P3]
- A member can delete their own post at any time.
- A tagged person can remove their tag at any time, and can turn off being tagged at all.

## Surfaces

1. **Add photos** — pick, caption, tag, post.
2. **Session photos** — all posts for one session.
3. **Club timeline** — sessions in date order, each with its photo strip (on the club page).
4. **Photo view** — one photo full-screen with its details and actions.
5. **Report** — reasons and send.
6. **Tagged notice** — a message and a line on Home.

## Main flows

### A. Post photos (UJ-3)

1. The member taps "Add yours". The phone's photo picker opens straight away.
2. They choose up to 6 photos. **Add photos** shows them as a row with the session named above: "Thursday's run · Marina Dawn Runners".
3. Optional: a caption. Optional: "Tag people", which lists the session's attendees by first name and initial.
4. They tap "Post". Photos show at once in the session's photos, marked "Posting" until done.
5. A short message confirms: "Posted to Marina Dawn Runners."

### B. Being tagged

1. The tagged member gets one message: "Layla tagged you in a photo from Thursday's run." At most one tagged message per session.
2. The link opens the **Photo view** with "Remove my tag" clearly visible.
3. A tagged photo shows on the member's own Profile under "Photos of you", visible only to them.

### C. Remove a tag or report (UJ-5)

1. From the Photo view, "Remove my tag" removes it in one tap, with "Undo".
2. "Report" opens three reasons: "I'm in this and want it removed", "It's not from this session", "It's inappropriate". An optional note. "Send report".
3. "I'm in this and want it removed" hides the photo from public pages at once, pending review. The other reasons leave it visible until reviewed. [ASSUMPTION: P4]
4. The reporter sees "Sent. We'll tell you what happens." and later receives the outcome.

### D. Delete own post

From the Photo view, the poster sees "Delete". A confirmation asks "Delete this photo? This can't be undone." with "Delete" and "Keep".

## States

| State | Where | Behaviour |
|---|---|---|
| Not eligible | Session | No "Add photos". Tapping a prompt elsewhere explains "Only people who came can post to this session." |
| Posting window closed | Session | "Photos for this session are closed." |
| Uploading | Add photos, Session photos | Each photo shows progress; the member can leave the page |
| Upload failed | Session photos | "1 photo didn't upload." with "Try again" and "Remove" |
| File too large or not a photo | Add photos | "That file can't be used. Choose a photo." |
| More than 6 chosen | Add photos | The first 6 are kept, with "You can add 6 at a time." |
| No one to tag | Tag step | Step is hidden |
| Empty session | Session photos | "No photos yet. Be the first." for eligible members; nothing for others |
| Empty club timeline | Club page | The fallback panel from UX-001 |
| Hidden pending review | Photo view | Visible only to the poster, marked "Hidden while we review a report" |
| Removed | Poster's Profile | "A photo of yours was removed" with the reason |
| Tagging turned off | Tag step | The person does not appear in the list |
| Offline | Add photos | "You're offline. Your photos will post when you're connected." |

## Who sees what

| | Visitor | Member | Poster | Tagged person | Organiser |
|---|---|---|---|---|---|
| Photos on club and session pages | Yes | Yes | Yes | Yes | Yes |
| Poster's first name | No | Yes | Yes | Yes | Yes |
| Names of tagged people | No | Yes | Yes | Yes | Yes |
| Who reported a photo | No | No | No | No | No, the curator only |

## Interaction rules

- The photo picker opens on the first tap; the caption and tags come after, and both can be skipped.
- "Remove my tag" and "Report" are never more than one tap from any photo.
- Deleting a post is the only action in this slice that asks for confirmation.
- A member is never told who reported their photo.
- Posting never interrupts the Attendance result's next-session offer.

## Locked wording

| Place | Text |
|---|---|
| Entry | Add yours · Add photos |
| Post button | Post |
| Posted | Posted to Marina Dawn Runners. |
| Tagged message | Layla tagged you in a photo from Thursday's run. |
| Tag actions | Remove my tag · Report |
| Report reasons | I'm in this and want it removed · It's not from this session · It's inappropriate |
| Report sent | Sent. We'll tell you what happens. |
| Delete confirm | Delete this photo? This can't be undone. · Delete · Keep |
| Tagging setting | Let people tag me in photos |
| First post notice | Photos here are public. Only post people who are happy to be seen. |

## Responsive behaviour

- **Phone:** Add photos is a full screen. Photo view is full-screen with actions in a bar at the bottom.
- **Tablet and desktop:** photos are chosen from files or dragged in. Photo view is a large dialog with details beside the photo.

## Accessibility

- Each photo's caption is its text description; without one, "Photo from Thursday's run by Layla".
- Upload progress and results are announced.
- The tag list is a searchable list with checkboxes, not a tap-on-the-photo interaction.
- All Photo view actions are reachable by keyboard; closing returns focus to the photo that was opened.
- Delete confirmation focuses "Keep" first.

## Measurement the product needs to see

Sessions with at least one member photo (the PRD signal); posts per session; share of attendees who post; tags added and removed; reports by reason and time to outcome; posts deleted by their poster.

## Feature-specific visual guidance

- Photos are shown uncropped in the Photo view and as a tidy grid elsewhere.
- The newest session's photos lead the club page.
- Actions on a photo are quiet until needed; the photo is the content.

## Architecture handoff

- Photos must upload quickly and reliably on mobile data, and continue if the member leaves the page.
- Location and other hidden details in photo files must be removed before a photo is shown.
- Only eligible members can post to a session; this is enforced, not just hidden.
- A photo hidden or removed must disappear from every public page promptly, including shared links to it.
- Tag removal and the tagging-off setting must take effect at once.
- Deleting an account removes the member's posts and tags.
- Reports record who reported, never shown to the poster or organiser.

## Assumptions

| ID | Assumption |
|---|---|
| P1 | 14 days is long enough to post after a session |
| P2 | 6 photos and 140 characters keep posts light |
| P3 | Posting without approval is acceptable because only attendees can post and removal is fast |
| P4 | A photo should hide at once when a person in it asks, before review |

## Open questions

- Should a club be able to make its photos visible to members only?
- Should members be able to react to photos (a single "like")? Left out of V1 with comments.

## Self-review

All in-scope PRD IDs are mapped. Consent paths (untag, report, hide, delete) are covered. Not reviewed by anyone else. Status stays `draft`.

## Changelog

- 2026-10-07: created.
