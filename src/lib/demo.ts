/**
 * The scripted "magic moment" — one conversation that assembles a resume live,
 * including the signature probe → sharpen beat.
 *
 * This is a stand-in for the real per-turn loop (extractor → Career Brain delta
 * → bullet-writer). The shape mirrors what the live engine will emit, so wiring
 * the real LLM later is a swap, not a rewrite.
 */

export type Bullet = { id: string; text: string };

export type ResumeState = {
  name?: string;
  headline?: string;
  location?: string;
  bullets: Bullet[];
};

export type Patch = {
  set?: Partial<Pick<ResumeState, "name" | "headline" | "location">>;
  /** add a new bullet, or replace one by id (the "sharpen" beat) */
  bullet?: { id: string; text: string };
};

export type Turn = {
  /** what the interviewer says — feels like a sharp mentor, not a form */
  ai: string;
  /** what the user says back (voice or chat) */
  user: string;
  /** how the Career Brain / resume changes as a result */
  patch: Patch;
  /** small UI flourish: did this turn *sharpen* an existing line? */
  sharpened?: boolean;
};

export const DEMO_TURNS: Turn[] = [
  {
    ai: "Don't write anything. Just tell me about your work.",
    user:
      "I'm a customer success rep. Been at a SaaS company about three years, here in Austin.",
    patch: {
      set: {
        name: "Aisha Khan",
        headline: "Customer Success",
        location: "Austin, TX",
      },
    },
  },
  {
    ai: "Three years in — nice. Tell me one thing there you're actually proud of.",
    user: "I helped reduce churn for our at-risk accounts.",
    patch: {
      bullet: { id: "churn", text: "Reduced churn for at-risk accounts." },
    },
  },
  {
    ai: "By how much? Over what period — and what did you actually do?",
    user:
      "About 15%, over two quarters. I built a proactive check-in playbook for accounts showing risk signals.",
    patch: {
      bullet: {
        id: "churn",
        text:
          "Cut churn 15% across two quarters by designing a proactive check-in playbook for at-risk accounts.",
      },
    },
    sharpened: true,
  },
  {
    ai: "That's a real bullet now. Did you lead anyone, or work across teams?",
    user:
      "I trained three new reps on the playbook and worked with Product on the feedback loop.",
    patch: {
      bullet: {
        id: "team",
        text:
          "Trained 3 new reps on the playbook and partnered with Product to close the customer-feedback loop.",
      },
    },
  },
];

/** Apply a patch immutably — the reducer the real engine will reuse. */
export function applyPatch(state: ResumeState, patch: Patch): ResumeState {
  const next: ResumeState = {
    ...state,
    ...patch.set,
    bullets: [...state.bullets],
  };
  if (patch.bullet) {
    const idx = next.bullets.findIndex((b) => b.id === patch.bullet!.id);
    if (idx >= 0) next.bullets[idx] = patch.bullet;
    else next.bullets.push(patch.bullet);
  }
  return next;
}

export const EMPTY_RESUME: ResumeState = { bullets: [] };

/** Resume state after the first N turns — handy for the landing teaser. */
export function resumeAfter(n: number): ResumeState {
  return DEMO_TURNS.slice(0, n).reduce(
    (s, t) => applyPatch(s, t.patch),
    EMPTY_RESUME,
  );
}
