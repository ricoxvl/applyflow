# ApplyFlow — Initial Figma Prototype Brief (v0.1)

**Basis:** Reddit-based secondary discovery, not interviews.  
**State:** Figma prototype created November 7, 2026, with four editable mobile screens, a responsive desktop overview, and 18 clickable mobile navigation links. These are design mockups, not a coded application.  
**Budget:** $0. Mobile-first web application concept.\n**Figma design:** https://www.figma.com/design/AKLLIxOhHKBs8qdTUhKX2t?node-id=1-18

## Product direction
**ApplyFlow: Internship search, minus the admin.**

**Primary user job:** "When I'm searching for many internships, let me capture an opportunity quickly, avoid duplicates, and immediately know which real action requires my attention."

## Design principles
1. **Action-first:** What needs attention, not arbitrary scoring or AI-generated advice.
2. **Low-friction:** Two required entry fields, optional enrichment later.
3. **Trustworthy:** Never invent company statuses, application deadlines, recruiter response windows, or predictions.
4. **Supportive:** Don't guilt users for rejections or long silences.
5. **Accessible:** Keyboard navigation, descriptive labels, contrast, responsive layout; don't rely solely on color for status.
6. **Privacy-conscious:** Demo with fictional data only; no real application/contact information in public mocks or GitHub.

## Proposed mobile screens (4)
### 1. Today — home / next actions
**Header:** ApplyFlow / Today; primary **+ Add application** button.  
**Priority content:** Urgent (deadline set by user), Due today, Upcoming actions; empty state: "You're all caught up. Save an internship or set a next action."  
**Secondary:** small overview of saved/applied/interviewing opportunities (counts only).  
**Quick action:** Mark action done or reschedule; no assumed automatic follow-up based on elapsed time.

### 2. Quick Add — primary creation flow
**Required:** Company, Role.  
**Optional:** Job link, Stage (Saved/Applied/Interviewing/Offer/Closed), Deadline, Next action, Next action date.  
**Behavior:** Save immediately; optional "Add details" step; show possible duplicates with clear links; permit creating a second requisition.  
**Usability target:** under 20 seconds for the simplest add case, to be tested.

### 3. Applications — searchable history
Simple list with company, role, stage, next-action date (when supplied).  
Search and filter by stage, plus toggle for archived/closed items.  
Do not force a heavy Kanban view as default.

### 4. Opportunity Detail — lightweight timeline
Company, role, application URL, current stage, date, notes, optional resume-version label.  
**Timeline items:** Applied, recruiter message, OA, interview, follow-up, offer/closed.  
**Contact:** recruiter name/contact (optional and private).  
**Next action:** explicit date and short note.  
**Duplicate indicator:** possible match, with an option to dismiss.

## Suggested desktop composition
- Left slim nav: Today / Applications.
- Center: Today's actions or application table.
- Right contextual panel: selected opportunity, next action, or quick-add form.
- Maintain same flows on mobile without requiring horizontal scrolling.

## Example demo scenario (entirely fictional)
- "Northstar Labs — Product Intern": saved; application closes Nov 15 (manually entered).
- "Riverstone — Business Analyst Intern": applied; user set a recruiter follow-up for Nov 10.
- "Harbor Tech — Software Intern": interviewing; user set interview prep for Nov 12.
- User pastes another Riverstone job link; app flags a possible match (no automatic merging).

## Four usability tasks
1. **Quick capture:** Add a new internship; assess speed and field confusion.
2. **Duplicate awareness:** Add a role from a second job board that resembles an existing one; assess whether the alert helps.
3. **Next action:** Find the task with the nearest user-set date, reschedule, and complete it.
4. **Recruiter context:** Record an interview update, add the contact, and schedule a user-selected next step.

Record completion, time, errors, questions, and subjective burden. Observe 5–8 real students; do not interpret task completion in a clickable prototype as evidence of retention.

## Out of scope now
- AI-based priority / offer probability.
- Job scraping, automated resume extraction or mail scanning.
- Native push, third-party job feeds, LinkedIn integration.
- Complex graphs, social features, and job recommendations.

## Figma build sequence
1. Make mobile low-fidelity frames at ~390px, plus desktop at ~1440px.
2. Make components: application card, action row, status badge, minimal input, modal/sheet, duplicate warning.
3. Connect flows: Today → Quick Add → Applications → Detail → Today.
4. Run the four moderated tasks above, revise based on evidence.
5. Move to visual design and a coded MVP **only after** the core flow proves useful.


## Prototype implementation status — November 7, 2026

The Figma file now contains editable **Today, Quick Add, Applications, Opportunity Detail** mobile layouts and a **Desktop Overview** frame. The mobile frames have 18 click-through links for the main paths: Today → Quick Add → Applications → Opportunity Detail → back, plus bottom navigation. Long mobile content scrolls beneath the bottom navigation.

**Design direction:** Quiet productivity software. Warm off-white canvas, crisp typography, single blue accent, thin borders, restrained status pills. No AI chatbot interface, artificial predictive scores, neon gradients, or automated claims.

**Demo data:** All company names, users, job stages, dates, and counts are fictional and illustrative. The Figma buttons and form inputs simulate navigation only; they do not save data, run validation, contact recruiters, or access job listings.

**Deliberately postponed:** Duplicate-warning overlay, real editable form states, detailed edge cases, authentication, actual data persistence, and UX validation. These should follow first-hand student tests, not be presented as shipped product capabilities.
