import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Clock3,
  ShieldCheck,
  Target,
  Trophy,
} from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";

export default function HomeQuizSection() {
  return (
    <section
      aria-labelledby="home-quiz-heading"
      className="relative isolate overflow-hidden bg-[#071b32] px-4 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_15%,rgba(184,146,66,0.22),transparent_34%),radial-gradient(ellipse_at_88%_82%,rgba(56,105,208,0.28),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        <ScrollReveal animation="up" className="w-full max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#b89242]/35 bg-[#b89242]/10 px-4 py-2 text-[10px] font-extrabold tracking-[0.18em] text-[#e7c36d] sm:text-[11px]">
            <Target size={14} />
            DAILY DEFENCE CHALLENGE
          </span>

          <h2
            id="home-quiz-heading"
            className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Ready for today&apos;s
            <span className="block bg-gradient-to-r from-[#e7c36d] to-[#b89242] bg-clip-text text-transparent">
              defence quiz?
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
            Test your preparation with a timed daily challenge. Answer with
            focus, check your score, and learn from the explanations.
          </p>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/quiz"
              className="quiz-cta-glow quiz-cta-sheen group relative inline-flex min-h-12 overflow-hidden rounded-xl items-center justify-center gap-2 bg-gradient-to-b from-[#e7c36d] to-[#b89242] px-6 py-3 text-sm font-extrabold text-[#071b32] transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e7c36d]/40"
            >
              <span>Take Today&apos;s Quiz</span>
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <span className="inline-flex items-center gap-2 text-xs font-medium text-white/60 sm:text-sm">
              <ShieldCheck size={17} className="shrink-0 text-[#e7c36d]" />
              One attempt per mobile number each day
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm font-semibold text-white/75">
            <span className="inline-flex items-center gap-2">
              <Clock3 size={16} className="text-[#e7c36d]" />
              Timed practice
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpenCheck size={16} className="text-[#e7c36d]" />
              Answer review
            </span>
            <span className="inline-flex items-center gap-2">
              <Trophy size={16} className="text-[#e7c36d]" />
              Track your score
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal
          animation="up-zoom"
          delay={150}
          className="mx-auto w-full max-w-[430px] md:mx-0 md:justify-self-end"
        >
        <div className="quiz-preview-float relative w-full">
          <div className="absolute -inset-3 rounded-[2rem] border border-[#e7c36d]/20 bg-[#e7c36d]/5" />
          <div className="quiz-preview-glow relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7">
            <p className="text-[10px] font-extrabold tracking-[0.2em] text-[#e7c36d]">
              TODAY&apos;S MISSION
            </p>
            <h3 className="mt-1 text-lg font-extrabold text-white">
              Ready. Focus. Answer.
            </h3>

            <div className="mt-5 rounded-2xl border border-white/10 bg-[#071b32]/70 p-4 sm:mt-6 sm:p-5">
              <div className="flex items-center justify-between gap-3 text-xs font-bold">
                <span className="text-white/55">QUESTION 01</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-white/80">
                  <Clock3 size={13} />
                  On the clock
                </span>
              </div>
              <p className="mt-4 text-base font-bold leading-7 text-white sm:text-lg">
                Every question is a chance to move closer to your goal.
              </p>

              <div className="mt-5 space-y-2.5" aria-hidden="true">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[10px] font-bold text-white/65">
                    A
                  </span>
                  <span className="h-2 w-2/3 rounded-full bg-white/25" />
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-[#e7c36d]/50 bg-[#b89242]/15 px-3.5 py-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e7c36d] text-[10px] font-extrabold text-[#071b32]">
                    B
                  </span>
                  <span className="h-2 w-1/2 rounded-full bg-[#e7c36d]/70" />
                  <BookOpenCheck
                    size={16}
                    className="ml-auto text-[#e7c36d]"
                  />
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[10px] font-bold text-white/65">
                    C
                  </span>
                  <span className="h-2 w-3/4 rounded-full bg-white/25" />
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#b89242]/15 text-[#e7c36d]">
                <Trophy size={19} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Finish strong</p>
                <p className="mt-0.5 text-xs leading-5 text-white/55">
                  Your score and answer review are waiting at the end.
                </p>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
