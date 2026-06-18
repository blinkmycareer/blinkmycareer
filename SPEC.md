# BlinkMyCareer — Product & Build Specification

> Source of truth for what we build. Read alongside `VISION.md`. Detailed enough to hand to implementation ("code mode") with minimal further decisions.

---

## 1. Product in one paragraph

BlinkMyCareer is a conversation-first career tool. Instead of filling a resume template, the user *talks* (voice or chat) and an AI interviews them about their work. From that single conversation it (a) builds a polished, ATS-clean resume live, (b) maintains a structured record of the user's real career stories as one source of truth, (c) tailors the resume to any target job, (d) flips into an interviewer that drills the user on their *own* stories for that job, and (e) tracks two readiness scores over time — **Paper-ready** and **Room-ready** — keeping resume bullets and spoken answers in sync. The resume export is always free; we monetize tailoring, testing, simulation, and tracking.

## 2. The defensible system (what makes us ≠ ChatGPT)

These are the parts we must build deliberately — they are the moat, not the chat:

1. **Structured Career Brain** — a persistent, versioned, structured store of the user's stories (role, accomplishment, metric, skill, STAR components). The single source of truth that powers both resume and interview. *Not a transcript.*
2. **Living Resume** — polished, ATS-clean, exportable (PDF/DOCX), that re-tailors to any JD at one click, generated from the Career Brain.
3. **Readiness Engine** — consistent, objective scoring (Paper-ready + Room-ready) per target job, longitudinal tracking, weak-area detection, and targeted drilling of past failures.
4. **Sync Loop** — when a spoken answer improves, the matching resume bullet updates, and vice versa, because both derive from the Career Brain.
5. **Realism Layer** — company/role-aware mock interviews and a full "gauntlet" simulation with time pressure and follow-ups based on the user's own stories.
6. **Orchestration** — the product runs the whole journey; the user never has to know the steps or how to prompt.

## 3. Core features

### 3.1 The Conversation (input is reinvented)
- Voice-first (speech-to-text) with chat fallback. Feels like a sharp mentor, not a form.
- Guided but natural: it knows what to ask to (a) complete the resume and (b) extract STAR-shaped stories.
- Works for low-confidence writers (non-native speakers, career changers, tradespeople, students) — talking, not writing.

### 3.2 Live Resume Build (the magic moment)
- Resume assembles in real time on screen as the user talks. No template selection required to start.
- AI bullet sharpening: vague statements → quantified, action-verb, result-oriented bullets, with the AI asking for missing metrics.
- ATS-clean templates; free PDF/DOCX export, no watermark, no signup required to download.

### 3.3 Target a Job
- Paste JD text or a job URL (fetch + parse).
- Resume re-tailors to the JD from the Career Brain; surfaces relevant stories/skills.
- **Paper-ready** readout: structure, evidence, keyword/skill fit + gaps.

### 3.4 The Flip — Interviewer Mode
- One tap turns the tool into the interviewer *for that specific job*.
- Questions are drawn from the user's **own stories** + the JD ("walk me through a time X failed"), not generic internet questions.
- Open-answer scoring (voice or text): structure, relevance, specificity, confidence + concrete feedback + a model answer.
- **Room-ready** score updates; weak competencies generate targeted follow-ups.

### 3.5 The Sync Loop
- Improving a spoken answer tightens the matching resume bullet; editing a bullet updates the story used in practice. One source of truth.

### 3.6 The Gauntlet (full simulation)
- Simulates the real hiring funnel for a role: recruiter screen → hiring-manager round → curveball/scenario.
- Time pressure + follow-ups; shows exactly where the user would get cut; offers reps until they pass.

### 3.7 Career Brain + History
- Every target job becomes a lightweight card: JD, tailored resume version, Paper/Room scores, interview history.
- Returning for a new job reuses the Career Brain — the user never starts from zero.

## 4. Key user flows

**A. First run (acquisition + the magic):** Land → "Don't write anything — just talk" → conversation → resume builds live → free download → soft prompt to save & test for a specific job.

**B. The hook (free → engaged):** Has resume → paste JD → 1 free Interview Readiness session → see Room-ready + weak spots → paywall for unlimited tests/tracking/gauntlet.

**C. Returning (retention/monetization):** New job → pick JD → re-tailor + drill from Career Brain → track score improvement → apply.

## 5. Information architecture / screens

1. **Landing** — "just talk" promise, live-build demo, honest free-download promise. (SEO-critical.)
2. **Conversation screen** — voice/chat on one side, resume building live on the other.
3. **Dashboard** — Career Brain + list of target-job cards.
4. **Target-job view** — JD, tailored resume, Paper-ready, interview history.
5. **Interviewer / practice screen** — question, answer (voice/text), scoring + feedback.
6. **Gauntlet** — staged simulation + results.
7. **Readiness over time** — Paper-ready & Room-ready trends.
8. **Account / billing.**
9. **Auth** — email + Google; anonymous→account merge.

## 6. Data model (initial)

- **User**: id, email, auth, plan, created_at.
- **CareerBrain**: id, user_id, structured stories (JSON: role, org, dates, accomplishment, metric, skills, STAR fields), updated_at, version.
- **Resume**: id, user_id, derived-from CareerBrain, template_id, content (JSON).
- **TargetRole**: id, user_id, company, title, jd_text, jd_url.
- **TailoredResume**: id, target_role_id, resume_id, overrides, paper_ready_score.
- **InterviewSession**: id, target_role_id, questions (JSON: text, source_story_id, competency, difficulty), created_at.
- **AnswerAttempt**: id, interview_session_id, transcript, scores (JSON per dimension), room_ready_delta.
- **GauntletRun**: id, target_role_id, stages (JSON), outcome, weak_points.
- **Subscription/Payment**: id, user_id, provider_ref, type, status.

## 7. Tech approach

- **Frontend:** Next.js + TypeScript + Tailwind. SSR/SSG for SEO pages.
- **Voice:** speech-to-text (STT) for input; optional text-to-speech for the interviewer. Chat fallback always available.
- **AI engine:** LLM API (treated as a swappable engine). Centralized, versioned prompt modules:
  1. *Interviewer/extractor* — conversation → structured Career Brain stories + follow-up probes.
  2. *Bullet writer* — story → quantified, ATS-clean bullets.
  3. *JD parser* — JD → required skills, seniority, responsibilities, keywords.
  4. *Tailor + Paper-ready* — Career Brain + JD → tailored resume + fit score + gaps.
  5. *Mock interviewer* — Career Brain + JD → questions grounded in the user's own stories.
  6. *Answer scorer* — question + rubric + answer → dimensional scores + feedback + model answer.
  7. *Readiness aggregator* — attempts → Room-ready score + weak areas.
  8. *Gauntlet director* — orchestrates multi-stage simulation.
- **Resume export:** render HTML/CSS → client-side PDF where feasible (privacy + free promise); DOCX via lightweight service.
- **Backend/data:** Postgres (Prisma) as system of record. Stripe for billing.
- **Privacy:** minimize what's sent to the LLM; clear data policy; secure handling of uploads/audio.

### Deployment (concluded)
- **Platform:** Google Cloud, consumed via **Firebase** — chosen for whole-product flexibility (voice STT streaming + the Gauntlet's long multi-stage runs are first-class here rather than fighting serverless limits).
- **App hosting:** **Firebase App Hosting** (Next.js SSR; serves the SEO-critical landing).
- **Database:** **Postgres** via Cloud SQL / Firebase Data Connect (keeps the relational moat features — readiness engine, longitudinal tracking, sync loop — intact; *not* Firestore).
- **Auth:** **Firebase Auth**, using **Anonymous Auth → account linking** to serve the free-first "download with no signup, merge later" promise (North-star #3). *(Supersedes the earlier Auth.js note above.)*
- **Storage:** **Cloud Storage** (resume exports now; audio later).
- **Heavy compute:** voice STT / Gauntlet can run on Cloud Run workers if/when needed, on the same platform.

## 8. Free vs. paid (monetization)

**Rule:** the resume is always free to create *and* download. Monetize tailoring, testing, simulation, tracking.

| Capability | Free | Pro | Sprint pass |
|---|---|---|---|
| Conversation → live resume build | Yes | Yes | Yes |
| Export PDF/DOCX, no watermark | Yes | Yes | Yes |
| Career Brain (saved stories) | Basic | Full | Full |
| Tailor to a job + Paper-ready | 1 trial | Unlimited | Unlimited |
| Interview Readiness (Room-ready) | 1 free session | Unlimited | Unlimited |
| The Gauntlet simulation | — | Yes | Yes |
| Readiness tracking over time | — | Yes | Yes |

- **Pro:** ~$9/mo or ~$49/yr.
- **Sprint pass:** ~$15 for 2 weeks unlimited — matches the bursty reality of job hunting (search hard for weeks, then stop). Differentiator vs. subscription-only rivals.
- No per-seat pricing. Never paywall the resume download.

## 9. MVP phases

**Phase 1 — The magic (acquisition):** voice/chat conversation → live resume build → free PDF/DOCX export → Career Brain (save) → accounts → landing page. *Goal: the first-run "it built itself" moment.*

**Phase 2 — The hook:** target jobs (JD paste + URL) → Paper-ready → the flip into Interviewer Mode → Room-ready + the sync loop → Stripe (Pro + Sprint). *Goal: the unification nobody else has.*

**Phase 3 — Depth & moat:** the Gauntlet simulation → readiness tracking over time → company/role research → deeper Career Brain → programmatic SEO ("interview questions for {role}").

## 10. Guardrails & risks

- **Moat discipline:** prioritize the *system* (Career Brain, Readiness Engine, sync loop, realism) — not just the chat. The chat alone is commoditized.
- **AI-cannibalization risk:** base models adding memory/projects. Counter with durable artifacts, longitudinal data, company-specific realism, distribution/brand, and being *the* job tool.
- **Honesty in claims:** position as practice/preparation; never "guarantee" a job or that an answer is "correct." Avoid dark patterns; the free download is the trust anchor.
- **Privacy:** personal career data + voice; handle carefully, minimize LLM exposure, clear policy.
- **Cost control:** cache JD parses; cap free AI usage; batch where possible.

## 11. Open decisions

1. Launch template count/styles.
2. Voice in MVP vs. chat-only first (voice is the wow, but chat is simpler/cheaper).
3. LLM provider/model + per-feature cost ceilings.
4. PDF export library (client fidelity vs. server).
5. Sprint-pass price/duration (2 weeks / $15 hypothesis — validate).
6. How aggressively to fetch JDs from major boards vs. paste-only at launch.

## 12. Success metrics

- **Acquisition:** free resumes built/downloaded; organic traffic.
- **Activation:** % who run the first (free) Readiness session; % who reach the "magic" live-build moment.
- **Monetization:** free→Pro/Sprint conversion after first session; ARPU.
- **Retention:** returning users adding a new target job; Room-ready improvement over time.

---

*Next step: switch to code mode and build Phase 1 — the conversation → live resume → free export "magic moment."*
