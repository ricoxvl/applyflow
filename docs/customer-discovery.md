# ApplyFlow — Customer Discovery Plan (v0.1)

**Stage:** Problem discovery, before the PRD or coded MVP  
**Goal:** Determine whether internship applicants have a painful, frequent, unsolved workflow problem worth addressing.

## Sampling plan
Aim for 15–20 interviews of 20–25 minutes each:
- Students actively applying to 25+ internships;
- Students applying to fewer roles, as a comparison group;
- Students currently using spreadsheets, Notion, job boards, or dedicated trackers;
- Different majors and recruiting timelines.

Recruit through student clubs, classmates, university communities, and personal introductions. Avoid recruiting only friends who already like the concept. Obtain consent before taking notes or recording.

## Interview opening
"I'm studying how students manage internship applications. I am not selling anything. I'd like to understand what you actually did during your most recent recruiting week. There are no right or wrong answers. You can skip any question."

## Interview questions — focus on recent behavior
1. Walk me through the last internship you applied to, from finding it to submitting.
2. Roughly how many roles have you applied to this season? How do you know?
3. Show or describe how you keep track of applications today.
4. Tell me about the last time your current system made things harder. What happened?
5. Have you missed a deadline, follow-up, or interview step? Tell me about the most recent example.
6. How do you decide which applications or recruiter messages deserve attention first?
7. Where do you keep conversations and contact notes after networking?
8. Have you tried any tracking tools? What did you continue using, abandon, or pay for?
9. What is most time-consuming about maintaining your tracking system?
10. What workarounds have you built? Why do you tolerate them?
11. What part of your process is already working well?
12. If you could remove one recurring friction point, which would it be and why?
13. Can I follow up later to test an early prototype?

**Good follow-ups:** "Can you show me?", "What happened next?", "How often has that happened?", "What did that cost you in time or opportunity?", "Why?"  
**Avoid leading questions:** "Wouldn't it be helpful if an AI dashboard reminded you?" or "Would you use ApplyFlow?"

## Notes template (one interview)
- Anonymous interview ID; date; recruitment channel;
- Participant context: school stage, approximate application volume, existing tools;
- Most recent concrete workflow;
- Friction event with direct evidence or quote;
- Frequency, impact, current workaround;
- What already works;
- Open questions / contradictory evidence.

Store identifiable information and recordings privately with permission. Keep the public GitHub repo to de-identified, aggregated findings only.

## Synthesis method
After every 5 interviews:
1. Cluster recurring problems by user journey stage (discover → apply → track → communicate → interview).
2. Separate observed behavior and quotes from the team's interpretation.
3. Score problem opportunities qualitatively for frequency, severity, and existing-solution satisfaction.
4. Actively record negative evidence (for example, students perfectly happy with spreadsheets).
5. Select *one* core problem for the first prototype; avoid building all requested features.

## Initial testable hypotheses
- H1: High-volume internship applicants regularly struggle to identify the next time-sensitive action.
- H2: Context about recruiters and applications is spread across multiple tools.
- H3: Manual entry friction is a meaningful barrier to adopting another tracker.
- H4: Students would prefer a lightweight prioritized action list to a full career management suite.

These are hypotheses, not established facts.

## Prototype task tests (only after interviews)
- Add an application and specify its next action.
- Find the most urgent task today and explain why it appears there.
- Log a recruiter conversation and schedule a follow-up.
- Identify all interviews scheduled this week.

Observe task success, time, confusion, and corrections. Do not coach users through the tasks.

## Phase 1 deliverables
- An interview guide and recruiting message;
- 15–20 interview notes stored privately;
- An anonymized evidence synthesis;
- A clear primary persona / segment;
- A revised problem statement;
- A decision: proceed, pivot, or pause.

## Next step
Recruit the first five interviewees and conduct exploratory interviews **before** treating the feature list as committed requirements.
