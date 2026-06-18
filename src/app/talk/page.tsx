"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Aurora from "@/components/Aurora";
import Wordmark from "@/components/Wordmark";
import VoiceOrb from "@/components/VoiceOrb";
import LiveResume from "@/components/LiveResume";
import { useDemoConversation } from "@/components/useDemoConversation";

export default function TalkPage() {
  const { messages, resume, sharpenedId, orb, step, reset, done } =
    useDemoConversation();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="grain relative flex h-dvh flex-col overflow-hidden">
      <Aurora />

      {/* top bar */}
      <header className="relative z-10 flex shrink-0 items-center justify-between px-5 py-4 sm:px-8">
        <Wordmark />
        <span className="hidden items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          Preview · voice &amp; live AI coming online
        </span>
      </header>

      {/* split: mobile = resume on top / talk below; desktop = side by side */}
      <main className="relative z-10 flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* RESUME — order-1 on mobile (top), order-2 on desktop (right) */}
        <section className="order-1 flex max-h-[42dvh] min-h-0 items-start justify-center overflow-y-auto border-b border-white/5 bg-ink-2/30 px-5 py-5 sm:px-8 lg:order-2 lg:max-h-none lg:flex-1 lg:items-center lg:border-b-0 lg:border-l">
          <div className="w-full">
            <LiveResume resume={resume} sharpenedId={sharpenedId} />

            <AnimatePresence>
              {done && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center"
                >
                  <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-ink transition hover:opacity-90">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Download free
                  </button>
                  <Link
                    href="/"
                    className="text-sm text-muted underline-offset-4 transition hover:text-foreground hover:underline"
                  >
                    This is a preview — see the vision
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* CONVERSATION — order-2 on mobile (bottom, orb in thumb reach) */}
        <section className="order-2 flex min-h-0 flex-1 flex-col px-5 sm:px-8 lg:order-1 lg:flex-initial lg:w-1/2">
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto py-4 pr-1"
          >
            {messages.length === 0 && (
              <div className="grid h-full place-items-center text-center">
                <div className="max-w-sm">
                  <p className="text-xl font-medium text-foreground">
                    Don&apos;t write anything.
                  </p>
                  <p className="text-xl text-muted">
                    Just tell me about your work.
                  </p>
                  <p className="mt-4 text-sm text-faint">
                    Tap the orb below to begin.
                  </p>
                </div>
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.key}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet to-indigo px-4 py-2.5 text-sm text-white"
                      : "max-w-[85%] rounded-2xl rounded-tl-sm glass px-4 py-2.5 text-sm text-foreground"
                  }
                >
                  {m.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* orb dock — bottom of the conversation column */}
          <div className="shrink-0 border-t border-white/5 pt-5 pb-11">
            <div className="flex items-center justify-center">
              <VoiceOrb
                state={orb}
                size={100}
                onClick={done ? undefined : step}
                label={
                  orb === "listening"
                    ? "Listening…"
                    : orb === "thinking"
                      ? "Building…"
                      : done
                        ? "All done"
                        : "Tap to talk"
                }
              />
            </div>
            {done && (
              <button
                onClick={reset}
                className="mx-auto mt-9 block text-xs text-faint underline-offset-4 transition hover:text-muted hover:underline"
              >
                Replay the demo
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
