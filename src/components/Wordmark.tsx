import Link from "next/link";

/** The wordmark — a blink of light before the name. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 font-semibold tracking-tight ${className}`}
    >
      <span className="relative grid h-6 w-6 place-items-center">
        <span className="absolute h-2.5 w-2.5 rounded-full bg-gradient-to-br from-amber via-coral to-violet animate-orb" />
      </span>
      <span>
        blink<span className="text-aurora">my</span>career
      </span>
    </Link>
  );
}
