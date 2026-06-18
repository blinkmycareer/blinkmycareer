"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEMO_TURNS,
  EMPTY_RESUME,
  applyPatch,
  type ResumeState,
} from "@/lib/demo";

export type ChatMessage = { role: "ai" | "user"; text: string; key: string };
export type OrbState = "idle" | "listening" | "thinking";

/**
 * Drives the scripted conversation: reveals turns one beat at a time, advancing
 * the resume and tracking the transient "sharpen" highlight. Stands in for the
 * real streaming loop; same surface the live engine will expose.
 */
export function useDemoConversation({
  autoPlay = false,
  loop = false,
}: { autoPlay?: boolean; loop?: boolean } = {}) {
  const [revealed, setRevealed] = useState(0); // turns fully shown
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [resume, setResume] = useState<ResumeState>(EMPTY_RESUME);
  const [sharpenedId, setSharpenedId] = useState<string | null>(null);
  const [orb, setOrb] = useState<OrbState>("idle");
  const busy = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const wait = (ms: number) =>
    new Promise<void>((res) => {
      const t = setTimeout(res, ms);
      timers.current.push(t);
    });

  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRevealed(0);
    setMessages([]);
    setResume(EMPTY_RESUME);
    setSharpenedId(null);
    setOrb("idle");
    busy.current = false;
  }, []);

  const step = useCallback(async () => {
    if (busy.current) return;
    const i = revealed;
    if (i >= DEMO_TURNS.length) return;
    busy.current = true;
    const turn = DEMO_TURNS[i];

    // AI asks
    setOrb("thinking");
    await wait(420);
    setMessages((m) => [...m, { role: "ai", text: turn.ai, key: `ai-${i}` }]);

    // user "talks"
    setOrb("listening");
    await wait(900);
    setMessages((m) => [
      ...m,
      { role: "user", text: turn.user, key: `user-${i}` },
    ]);

    // engine updates the resume
    setOrb("thinking");
    await wait(520);
    setResume((r) => applyPatch(r, turn.patch));
    if (turn.sharpened && turn.patch.bullet) {
      setSharpenedId(turn.patch.bullet.id);
      const t = setTimeout(() => setSharpenedId(null), 1800);
      timers.current.push(t);
    }

    setOrb("idle");
    setRevealed(i + 1);
    busy.current = false;
  }, [revealed]);

  // auto-play loop for the landing teaser
  useEffect(() => {
    if (!autoPlay) return;
    if (revealed >= DEMO_TURNS.length) {
      if (!loop) return;
      const t = setTimeout(reset, 4200);
      timers.current.push(t);
      return;
    }
    const t = setTimeout(step, revealed === 0 ? 700 : 2100);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [autoPlay, loop, revealed, step, reset]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return {
    messages,
    resume,
    sharpenedId,
    orb,
    step,
    reset,
    done: revealed >= DEMO_TURNS.length,
    progress: revealed / DEMO_TURNS.length,
  };
}
