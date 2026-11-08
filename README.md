# ApplyFlow

**Discover internships your major doesn't tell you to search for.**

ApplyFlow is an early-stage, student-focused concept exploring how to connect coursework and project experience to unfamiliar internship roles. The aim is to help students discover relevant paths, understand what a job actually requires, and decide whether to apply—without opaque match scores, mandatory resume uploads, or migration from existing tracking tools.

## Current stage
**Phase 3 — First coded React + TypeScript MVP.** The v0.2 skills-first workflow is now implemented as a responsive web app. It includes a sample career catalog, editable profile, explainable skill connections, local saved roles, and user-set next actions. It is **not yet a live internship search engine**, and no automated matching algorithm has been validated. The research remains exploratory rather than proof of product-market fit.

## Design prototypes
- [**v0.2: Skills-First Discovery — mobile**](https://www.figma.com/design/AKLLIxOhHKBs8qdTUhKX2t?node-id=8-136) — redesigned clickable flow: Skills → Discover → Understand Fit → Saved.
- [**v0.2: Skills-First Discovery — desktop**](https://www.figma.com/design/AKLLIxOhHKBs8qdTUhKX2t?node-id=9-87) — wider role-discovery workspace.
- [v0.1: Internship Tracker — archived original concept](https://www.figma.com/design/AKLLIxOhHKBs8qdTUhKX2t?node-id=1-18) — preserved to document product iteration.

Figma opportunities and employers are **fictional demo examples**. The coded MVP stores editable profiles and saved role archetypes **locally in the browser**, not on a server.

## Product and research documentation
- [Product direction v0.2](docs/product-direction-v02.md) — current problem hypothesis, interview themes, concept-test caveats, MVP direction, and validation plan.
- [Original product brief v0.1](docs/product-brief.md) — initial tracking-first hypothesis, kept for change history.
- [Interview guide](docs/customer-discovery.md) — neutral prompts and field note template.
- [Reddit exploratory research](docs/reddit-discovery.md) — public secondary research, not original interviews.
- [Original v0.1 Figma brief](docs/figma-prototype-brief.md) — archived first design rationale and flows.

## Run the working MVP

**Stack:** React 19, TypeScript, Vite, Lucide icons, browser localStorage. No backend, API keys, account, or paid services.

```bash
git clone https://github.com/ricoxvl/applyflow.git
cd applyflow
npm install
npm run dev
```

Open the address Vite prints (typically http://localhost:5173). To check the app locally: `npm test`, `npm run build`, and `npm run preview`.

**Try this flow:** Edit your major and project under **My experience** → select skills you've actually used → visit **Discover** → open an unfamiliar role to inspect experience-to-responsibility explanations → save it → add a next action and reminder under **Saved**.

**Current boundaries:** The 10 roles in `src/catalog.ts` are educational archetypes, **not active openings**. Required/preferred examples are fictitious and clearly labeled. Any real employer eligibility rules must be checked on the original posting. This app does not automatically apply or predict recruiter decisions. Notes and saved roles are retained in browser localStorage and can be exported to JSON; they are not synced between devices. The initial sample profile is demo content, not real user data.

**CI:** [GitHub Actions build](https://github.com/ricoxvl/applyflow/actions) runs tests and TypeScript/Vite checks on pushes and PRs.

## Design principles
- Start with transferable experiences and skills, not just a major or familiar job title.
- Distinguish required vs preferred qualifications with source-grounded evidence.
- Show which experience supports which responsibility; be clear about missing evidence.
- No unjustified AI match percentages or fabricated job listings.
- Keep onboarding useful without resume uploads, account connection, or application migration.
- Stay within a **$0 prototype budget** and protect participant privacy.

## Next steps
1. Run an independent usability and relevance test with 10 additional students.
2. Test eligibility comprehension and compare against normal job search behavior.
3. Validate a repeatable, low-cost supply of current internship opportunities.
4. Write the v0.2 MVP PRD, then build only the experimentally supported workflow.
