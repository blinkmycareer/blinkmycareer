"use client";

import { AnimatePresence, motion } from "motion/react";
import VoiceOrb from "@/components/VoiceOrb";
import LiveResume from "@/components/LiveResume";
import { useDemoConversation } from "@/components/useDemoConversation";

/** The self-playing hero demo: the orb listens, a line is spoken, the resume builds. */
export default function LandingTeaser() {
  const { messages, resume, sharpenedId, orb } = useDemoConversation({
    autoPlay: true,
    loop: true,
  });

  const lastAi = [...messages].reverse().find((m) => m.role === "ai");
  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  return (
    <div className="glass relative grid gap-6 rounded-[2rem] p-6 sm:p-7 md:grid-cols-[1fr_1.05fr] md:items-center">
      {/* conversation side */}
      <div className="flex min-h-[19rem] flex-col">
        <div className="flex items-center gap-3">
          <VoiceOrb state={orb} size={92} />
          <div>
            <p className="text-sm font-medium text-foreground">
              {orb === "listening"
                ? "Listening…"
                : orb === "thinking"
                  ? "Building…"
                  : "Tap and talk"}
            </p>
            <p className="text-xs text-muted">No template. No typing.</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <AnimatePresence mode="popLayout">
            {lastAi && (
              <motion.div
                key={lastAi.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="max-w-[88%] rounded-2xl rounded-tl-sm glass px-4 py-2.5 text-sm text-foreground"
              >
                {lastAi.text}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence mode="popLayout">
            {lastUser && (
              <motion.div
                key={lastUser.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet to-indigo px-4 py-2.5 text-sm text-white"
              >
                {lastUser.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* resume side */}
      <div className="md:scale-[0.96]">
        <LiveResume resume={resume} sharpenedId={sharpenedId} />
      </div>
    </div>
  );
}
