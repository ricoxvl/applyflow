# ApplyFlow — Reddit Exploratory Discovery (v0.1)

**Researched:** November 7, 2026  
**Method:** Qualitative, publicly available Reddit posts/comments published before this date; opportunistic sampling, not representative.  
**IMPORTANT:** These are **not interviews**, observed user testing, verified identity, market-size data, or validation of product-market fit. We have not contacted or interviewed the posters. Reddit posts can be selectively reported, biased, or promotional.

## Five internship applicant case studies (proxy evidence, not interviews)

| Case | Public first-person account | Indicated frustration | ApplyFlow hypothesis |
|---|---|---|---|
| A — 26 internship applications | Aug 14, 2026, r/internships. The poster has a spreadsheet but cannot tell if they applied to the same position from different websites. | Duplicate listings and fragmented application history. | Surface potential duplicates when adding a job, while allowing distinct requisitions. |
| B — 82 internship applications | Mar 31, 2025, r/internships. The poster reported many hours spent tailoring applications, largely unanswered submissions, and difficulty balancing school and recruiting. | Application effort and emotional burnout; unclear progress. | Reduce administrative workload; show useful actions, not vanity counts or guilt-inducing nudges. |
| C — College student SWE job search | Oct 14, 2026, r/jobsearch. The poster described juggling applications, assessments, interviews, rejections, and recruiter emails; spreadsheet updates became annoying. | Too many fragmented stages and high manual-entry cost. | Minimal-input capture, one place for later-stage details. This post concerns college job search broadly, not necessarily internships. |
| D — Internship final-round scheduling | Apr 14, 2026, r/internships. A cancelled final interview was not rescheduled after the applicant provided availability; the applicant was unsure when to follow up. | Uncertain next steps after recruiter communication. | Store last contact, an explicitly chosen next follow-up date, and interview stage context. |
| E — 100+ internship applications and career fair | Apr 29, 2026, r/internships. A student received an offer after a career fair interaction they had forgotten about; they had applied before meeting the company. | Offline interactions can get detached from online applications. | Log events/contact interactions on the opportunity timeline; prioritize later-stage relationships. |

### Primary source links
- Case A: https://www.reddit.com/r/internships/comments/1vnw0p6/how_do_you_keep_the_internships_you_applied_to/
- Case B: https://www.reddit.com/r/internships/comments/1joc7tj/
- Case C: https://www.reddit.com/r/jobsearch/comments/1x60zm2/how_is_everyone_keeping_track_of_their_job/
- Case D: https://www.reddit.com/r/internships/comments/1slk2fe/ghosted_before_final_round_interview_advice/
- Case E: https://www.reddit.com/r/internships/comments/1syli8a/dont_give_up/

## Supplemental signals and disconfirming evidence

**Manual work is a major hazard:** An October 22, 2026 r/jobsearchhacks post described 10–20 applications a day after graduating, spreadsheet update fatigue and forgotten saved-role deadlines. This is a **recent graduate, not confirmed intern applicant**.
https://www.reddit.com/r/jobsearchhacks/comments/1xccfq3/how_do_you_track_a_high_volume_of_job/

**Resume-version context matters to some:** A September 16, 2026 r/JobSearchAndResumes post describes forgetting which resume version went to which application and wanting useful funnel information. This is **broader job search**, not an internship-only account.
https://www.reddit.com/r/JobSearchAndResumes/comments/1wi3n9l/i_tracked_100_job_applications_in_a_spreadsheet/

**Strong negative evidence:** In replies to Case A, some students argued that tracking apps consume valuable application time and that they prefer tracking only meaningful conversations or interviews. Another poster advocated keeping a straightforward spreadsheet. This cautions against assuming everyone wants a dashboard.
https://www.reddit.com/r/internships/comments/1vnw0p6/how_do_you_keep_the_internships_you_applied_to/

**Additional direct counterpoint:** Apr 12, 2026 r/cscareeradvice discussion: commenters said spreadsheets are adequate and requested rapid entry / reminders more than feature-heavy apps.
https://www.reddit.com/r/cscareeradvice/comments/1sj4dwv/job_tracking_application/

**Existing substitutes and competing projects:** An Aug 3, 2026 r/internships post advertises a free auto-populating internship tracker (Intern Dock). This is vendor self-promotion, *not independent evidence of adoption or satisfaction*. Another May 2025 student builder was asked why existing Simplify did not already solve the problem. This further raises the differentiation bar.
https://www.reddit.com/r/internships/comments/1veoa1i/i_made_an_automatic_free_internship_application/
https://www.reddit.com/r/internships/comments/1keuzfw

## Synthesized opportunity areas (judgment, not statistically ranked)

1. **Data-entry friction and tracker abandonment** — strongest risk to any product in this category; test before committing.
2. **Duplicate application uncertainty** — especially same listing surfaced by multiple sites.
3. **Deadline / next-action ambiguity** — saved roles, interviews, outreach, recruiter follow-up.
4. **Fragmented opportunity context** — resume version, conversations, interviews, career-fair interactions.
5. **Search fatigue / low perceived control** — avoid pretending dashboards can change employer behavior.

No prevalence percentages can be inferred from these anecdotes. Posts and comment vote totals are not denominators; some material is promotional.

## Revised working problem statement
Students juggling high-volume internship searches may lose track of where they applied, the context of active opportunities, and what needs attention soon; existing tracking workarounds can become burdensome. We hypothesize they would value an *ultra-lightweight, action-first* workflow more than another elaborate application spreadsheet.

## Design hypotheses for initial prototype
- First interaction should be **save an opportunity in seconds** (company + role + optional URL), not fill 12 fields.
- The homepage should prioritize **Today / Upcoming** actions and explicit user-set dates.
- Potential duplicate detection should alert, not silently block distinct openings.
- Recruiter follow-up scheduling must be **user-controlled**, not claim a universal optimal time.
- Screens should support interview-stage notes and context without requiring those fields for every application.
- Provide simple pipeline viewing, but postpone fancy analytics, automatic scraping, auto-apply, and AI.

## Major validation risks
- Many students prefer spreadsheets or no tracker.
- Users may not bother entering application data, however well designed the screen.
- Users may not have reliable deadlines for internships; do not invent deadlines or employer statuses.
- Remembering next steps may be a niche problem restricted to advanced candidates, while high-volume applicants may value auto-entry more.
- Differentiation from free established trackers is unproven.

## Next field validation
Interview 5 real students representing high-volume spreadsheet users, no-tracker users, active interview candidates, and students who tried a specialized app. Ask about the *last actual application*, show the prototype, and observe whether they can:
1. Add a job in under 20 seconds without coaching (proposed benchmark, not achieved).
2. Detect a possible duplicate.
3. Find a due item or next action.
4. Record a recruiter response.

Decide whether to proceed based on observed frustration and repeat use, not hypothetical interest alone.
