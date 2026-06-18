import Link from "next/link";
import Aurora from "@/components/Aurora";
import Wordmark from "@/components/Wordmark";
import LandingTeaser from "@/components/LandingTeaser";

export default function Home() {
  return (
    <div className="grain relative min-h-screen overflow-hidden">
      <Aurora />

      {/* Header */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Wordmark className="text-lg" />
        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          <a href="#how" className="transition hover:text-foreground">
            How it works
          </a>
          <a href="#free" className="transition hover:text-foreground">
            What&apos;s free
          </a>
          <Link
            href="/talk"
            className="rounded-full bg-foreground px-4 py-2 font-medium text-ink transition hover:opacity-90"
          >
            Start talking
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.02fr_1fr] lg:items-center lg:pt-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            The end of the blank page
          </span>

          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            Don&apos;t write a resume.
            <br />
            Just <span className="editorial text-aurora">talk.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            You don&apos;t write a resume and then prep for interviews. You have{" "}
            <span className="text-foreground">one honest conversation</span> — and
            walk away hireable on paper and ready in the room. Talk, and it builds.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/talk"
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-violet px-6 py-3.5 font-medium text-white shadow-[0_10px_40px_-10px_rgba(139,92,255,0.6)] transition hover:shadow-[0_14px_50px_-8px_rgba(139,92,255,0.8)]"
            >
              Start talking
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <a
              href="#how"
              className="rounded-full glass px-6 py-3.5 font-medium text-foreground transition hover:bg-white/10"
            >
              See how it works
            </a>
          </div>

          <p className="mt-6 text-sm text-faint">
            Free to build. Free to download. No watermark, no signup to export.
          </p>
        </div>

        <LandingTeaser />
      </section>

      {/* The two-become-one band */}
      <section className="relative z-10 border-y border-white/5 bg-ink-2/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-2">
          <ScoreCard
            tag="Paper-ready"
            color="from-amber to-coral"
            title="Strong on the page"
            body="Your story becomes a polished, ATS-clean resume — vague lines sharpened into quantified, real bullets as you speak."
          />
          <ScoreCard
            tag="Room-ready"
            color="from-violet to-indigo"
            title="Ready out loud"
            body="The same conversation rehearses you — it interviews you on your own stories so the answers are ones you've already told."
          />
          <p className="md:col-span-2 text-center text-sm text-muted">
            A resume is your story <span className="text-foreground">on paper</span>.
            An interview is the same story{" "}
            <span className="text-foreground">out loud</span>. They were never two
            jobs. We made them <span className="editorial text-aurora">one</span>.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          One conversation. <span className="text-muted">Three things happen.</span>
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Step
            n="01"
            title="You talk"
            body="Voice or chat. No blank template, no boxes to fill. Just tell it about your work like you'd tell a sharp mentor."
          />
          <Step
            n="02"
            title="It builds — live"
            body="Your resume assembles itself on screen as you speak. It probes for the missing metric and rewrites the line in front of you."
          />
          <Step
            n="03"
            title="It interviews you"
            body="Then it flips — and drills you on your own stories for the job you want, until you're ready for the room."
          />
        </div>
      </section>

      {/* The honest-free promise */}
      <section
        id="free"
        className="relative z-10 mx-auto max-w-4xl px-6 pb-24 text-center"
      >
        <div className="glass relative overflow-hidden rounded-[2rem] px-8 py-14">
          <Aurora className="opacity-40" />
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              The download is <span className="editorial text-aurora">honestly</span>{" "}
              free.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              We never paywall your resume. Build it, export it as PDF or DOCX, keep
              it forever — no watermark, no account required. We earn our keep on
              tailoring, practice, and tracking, never on holding your story hostage.
            </p>
            <Link
              href="/talk"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 font-medium text-ink transition hover:opacity-90"
            >
              Build mine now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-faint sm:flex-row">
          <Wordmark />
          <p>Practice &amp; preparation. We help you get ready — we never guarantee a job.</p>
        </div>
      </footer>
    </div>
  );
}

function ScoreCard({
  tag,
  color,
  title,
  body,
}: {
  tag: string;
  color: string;
  title: string;
  body: string;
}) {
  return (
    <div className="glass rounded-2xl p-7">
      <span
        className={`inline-block rounded-full bg-gradient-to-r ${color} px-3 py-1 text-xs font-semibold text-white`}
      >
        {tag}
      </span>
      <h3 className="mt-4 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="glass group relative rounded-2xl p-7 transition hover:bg-white/[0.07]">
      <span className="font-mono text-sm text-faint">{n}</span>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
