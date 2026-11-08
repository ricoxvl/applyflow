# ApplyFlow — Product Brief (v0.1)

**Status:** Discovery hypothesis — not a validated problem or committed feature roadmap  
**Date:** November 7, 2026  
**Budget:** $0 for initial discovery, prototype, and small beta  
**Product type:** Mobile-friendly, student-focused web application

## One-sentence vision
Help students stay on top of an overwhelming internship search by organizing opportunities and surfacing the next useful action.

## Problem hypothesis
Students applying to many internships may lose track of application states, deadlines, recruiter conversations, resume versions, and what they should do next. Existing tools and spreadsheets may be sufficient for some students, so we must verify the severity, frequency, and willingness to switch.

## Initial customer segment
- **Primary hypothesis:** U.S. college students actively applying to 25+ internships in a recruiting season, especially those balancing school and networking.
- **Secondary hypothesis:** Recent graduates in a high-volume early-career job search.
- **Not initially targeted:** Employers, recruiting teams, and professional staffing agencies.

## Jobs to be done (hypotheses)
1. When I apply to many roles, help me know what is in progress without maintaining a messy spreadsheet.
2. When a recruiter or interviewer contacts me, help me retain the context and act at the right time.
3. When deadlines and next steps compete, help me decide what matters today.
4. When my search is progressing slowly, help me understand my funnel without misleading promises or invented predictions.

## Positioning hypothesis
**ApplyFlow is a next-action command center for internship applicants.** Its potential differentiation is a student-specific workflow focused on follow-up and prioritization—not simply a kanban application tracker.

**Alternatives to interview about:** Google Sheets/Excel, Notion, calendars, email, job-platform saved jobs, existing trackers such as Teal, Huntr, and Simplify. Do not assume applicants are unhappy with these.

## Possible MVP — subject to discovery
- Add and update an opportunity manually (company, role, URL, dates, status, notes).
- View a simple application pipeline and sortable table.
- Set explicit deadlines, next-action dates, and user-controlled reminders *inside the app*.
- Link recruiter contact details and interaction notes to opportunities.
- View a prioritized Today / Upcoming list based on dates set by users.
- See simple funnel counts/rates with clear definitions and no small-sample overclaims.

## Explicitly out of scope for v1
- Live job scraping or paid job feeds.
- AI resume rewriting, AI matching, and paid inference APIs.
- Automatic email access or sending messages on a student's behalf.
- Auto-applying, job-board browser extensions, and recruiter marketplace.
- Native iOS/Android apps or paid notification infrastructure.
- Predicting offer likelihood or claiming to know employer hiring decisions.

## $0 delivery constraints
Plan for React/TypeScript, a responsive UI, free static hosting, and optional free-tier authentication/database when multi-device use is justified. Verify current free-tier limits before launch. Build a useful local-data prototype first if needed; do not expose API keys. Never commit actual application records, email addresses, interview transcripts, or personally identifiable user data to this public repository.

## Candidate success metrics (not achieved results)
**Discovery:** Conduct ~15–20 interviews across different search styles and identify repeated high-severity problems.  
**Prototype:** Test 5–8 users on adding an opportunity, recording a follow-up, and finding their next action.  
**Small beta:** Recruit ~20–30 consenting students. Measure activation (% adding first 3 applications and one next action), weekly active users, repeat action completion, and optional 4-week retention when enough time has passed.

No numeric outcome should be claimed until measured. Interview quotas and pilot targets are planning goals, not validation evidence.

## Key uncertainties
- Is the real problem remembering follow-ups, finding roles, tailoring applications, or something else?
- How do students currently track applications and what breaks at high volume?
- Will students manually enter each application, or is that too much friction?
- Do existing tracker tools already solve the 'next action' problem adequately?
- Would students consistently return each week during recruiting?
- What privacy and trust requirements would block adoption?

## Next product gate
Do **not** lock the MVP scope or build full integrations before synthesizing discovery results. Proceed to a low-fidelity prototype once a specific, frequent, high-friction workflow is demonstrated and the relevant user segment is clear.
