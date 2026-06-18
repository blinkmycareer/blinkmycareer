"use client";

import { motion } from "motion/react";

type Props = {
  /** listening = user is talking; thinking = AI is forming a reply */
  state?: "idle" | "listening" | "thinking";
  size?: number;
  onClick?: () => void;
  label?: string;
};

/**
 * The voice orb — the emotional anchor of the whole product.
 * It breathes when idle, ripples when listening, swirls when thinking.
 */
export default function VoiceOrb({
  state = "idle",
  size = 132,
  onClick,
  label,
}: Props) {
  const listening = state === "listening";
  const thinking = state === "thinking";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label ?? "Talk"}
      className="group relative grid place-items-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-violet/60"
      style={{ width: size, height: size }}
    >
      {/* expanding rings while listening */}
      {listening &&
        [0, 0.6, 1.2].map((delay) => (
          <span
            key={delay}
            className="absolute rounded-full border border-violet/40"
            style={{
              width: size,
              height: size,
              animation: `ring-pulse 2.1s ease-out ${delay}s infinite`,
            }}
          />
        ))}

      {/* the orb */}
      <motion.span
        className="animate-orb relative grid place-items-center rounded-full"
        style={{
          width: size * 0.78,
          height: size * 0.78,
          background:
            "radial-gradient(circle at 32% 28%, #b79bff 0%, #8b5cff 36%, #5b7cff 70%, #2c2f6e 100%)",
        }}
        animate={
          thinking
            ? { rotate: 360 }
            : listening
              ? { scale: [1, 1.06, 1] }
              : {}
        }
        transition={
          thinking
            ? { repeat: Infinity, duration: 6, ease: "linear" }
            : { repeat: Infinity, duration: 1.4, ease: "easeInOut" }
        }
      >
        {/* glossy highlight */}
        <span
          className="absolute rounded-full"
          style={{
            inset: 6,
            background:
              "radial-gradient(circle at 38% 30%, rgba(255,255,255,0.6), transparent 42%)",
          }}
        />
        {/* mic glyph */}
        <svg
          width={size * 0.26}
          height={size * 0.26}
          viewBox="0 0 24 24"
          fill="none"
          className="relative drop-shadow"
        >
          <rect x="9" y="3" width="6" height="11" rx="3" fill="white" />
          <path
            d="M6 11a6 6 0 0 0 12 0M12 17v3"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </motion.span>

      {label && (
        <span className="absolute -bottom-8 text-sm text-muted transition group-hover:text-foreground">
          {label}
        </span>
      )}
    </button>
  );
}
