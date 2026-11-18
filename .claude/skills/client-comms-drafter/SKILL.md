---
name: client-comms-drafter
description: >
  Draft professional client-facing emails, Slack messages, and internal updates for B2B fintech communications. Use this skill whenever the user asks to write, draft, or compose an email, message, or update for a client, bank, or internal stakeholder. Trigger on phrases like "draft an email to", "write to [name]", "send an update on", "prepare a message for", "email about coverage", "migration update", "defect summary", "follow up with", or when any client or colleague name is mentioned alongside communication intent. Also trigger for internal comms about client or product matters.
---

# Client Comms Drafter

## Purpose
Draft ready-to-send client and internal communications that are professional, concise, and contextually accurate for B2B fintech operations. Works for any client, any situation.

## Communication Types

### 1. Coverage & Data Quality Reports
Sharing enrichment stats, coverage breakdowns, or data quality findings.

**Tone:** Factual, confident, solution-oriented
**Structure:**
- Brief context / what was analysed
- Key numbers in a clear table
- What's performing well
- Where gaps exist and what's being done
- Next steps / timeline

### 2. Migration & Integration Updates
Client onboarding, endpoint migrations, key provisioning, scope changes.

**Tone:** Supportive, clear on action items
**Structure:**
- Current status
- What's been completed
- What's needed from the client
- Timeline and next milestone

### 3. Defect / Triage Summaries
Post-triage call summaries for any client.

**Tone:** Transparent, structured, accountable
**Structure:**
- Summary of issues discussed
- Prioritised defect table (ID, description, severity, status, owner)
- Resolution timeline
- Escalation path if needed

### 4. Product / Feature Updates
New capabilities, plan renewals, pricing changes, feature rollouts.

**Tone:** Collaborative, value-focused
**Structure:**
- What's new/changed
- Impact on the client
- Any action required
- Support contact

### 5. Meeting Follow-Up Emails
Post-meeting recap sent to attendees.

**Tone:** Concise, action-oriented
**Structure:**
- Thank you + meeting reference
- Key decisions (2-3 bullets max)
- Action items with owners
- Next meeting / follow-up date

### 6. Internal Updates
Updates to leadership or team on client situations, product status, or blockers.

**Tone:** Direct, efficient
**Structure:**
- Situation summary
- What's been done
- What's needed / blockers
- Recommendation

## Writing Guidelines

- **Keep it short** — Lead with the point. Clients and stakeholders are busy.
- **Use tables** for data, defects, or action items — never bury numbers in paragraphs.
- **Be specific** — "Coverage is 87% on branded transactions" not "coverage is good".
- **End with a clear ask** — What do you need from them? What happens next?
- **Professional but warm** — Senior product lead tone. Not stiff, not casual.
- **Never over-promise** — If timelines are uncertain, say so with a commitment to follow up.

## How to Use

1. Tell me **who** the email is for (client name or internal stakeholder)
2. Tell me **what** it's about (coverage update, defect summary, migration status, etc.)
3. Give me the **key facts** — numbers, decisions, issues, action items
4. I'll draft it — you review and send

If you just paste raw notes from a call, I'll infer the communication type and draft accordingly.

## Output
- Uses the message_compose tool when available for emails
- Falls back to formatted text in chat
- Always includes subject line for emails
