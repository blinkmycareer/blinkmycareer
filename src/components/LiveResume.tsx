"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ResumeState } from "@/lib/demo";

/**
 * The Living Resume — rendered as literal bright paper against the dark app,
 * reinforcing the "your story, on paper" idea. Lines rise in as they're spoken;
 * a sharpened line gets a brief highlight.
 */
export default function LiveResume({
  resume,
  sharpenedId,
}: {
  resume: ResumeState;
  sharpenedId?: string | null;
}) {
  const hasContent = resume.name || resume.bullets.length > 0;

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* paper */}
      <div className="relative overflow-hidden rounded-2xl bg-paper text-paper-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-black/5">
        {/* top sheen */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        <div className="px-8 py-9">
          {!hasContent ? (
            <Placeholder />
          ) : (
            <>
              <header className="mb-5">
                <AnimatedLine show={!!resume.name}>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {resume.name}
                  </h3>
                </AnimatedLine>
                <AnimatedLine show={!!resume.headline}>
                  <p className="mt-0.5 text-sm font-medium text-violet">
                    {resume.headline}
                    {resume.location && (
                      <span className="text-paper-muted">
                        {"  ·  "}
                        {resume.location}
                      </span>
                    )}
                  </p>
                </AnimatedLine>
              </header>

              {resume.bullets.length > 0 && (
                <section>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper-muted">
                      Experience
                    </span>
                    <span className="h-px flex-1 bg-black/10" />
                  </div>
                  <ul className="space-y-2.5">
                    <AnimatePresence initial={false}>
                      {resume.bullets.map((b) => (
                        <motion.li
                          key={b.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: "spring", stiffness: 320, damping: 30 }}
                          className="relative flex gap-2.5 text-[13.5px] leading-relaxed"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-coral to-violet" />
                          <span className="relative">
                            {b.text}
                            {sharpenedId === b.id && (
                              <motion.span
                                aria-hidden
                                className="absolute -inset-x-1.5 -inset-y-1 rounded-md bg-violet/15"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.6 }}
                              />
                            )}
                          </span>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </section>
              )}
            </>
          )}
        </div>
      </div>

      {/* floating caption */}
      <p className="mt-3 text-center text-xs text-faint">
        Assembling live · ATS-clean · always free to download
      </p>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="grid h-64 place-items-center text-center">
      <div>
        <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-dashed border-black/15" />
        <p className="text-sm text-paper-muted">
          Your resume appears here
          <span className="caret" />
        </p>
        <p className="mt-1 text-xs text-paper-muted/70">
          No template. No blank boxes. Just talk.
        </p>
      </div>
    </div>
  );
}

function AnimatedLine({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.div>
  );
}
