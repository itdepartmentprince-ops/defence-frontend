import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Prince Defence Academy",
  description:
    "The page you are looking for could not be found. Return to Prince Defence Academy's homepage.",
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-white px-5 py-14 sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="absolute -left-32 top-0 -z-10 h-80 w-80 rounded-full bg-(--gold)/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 right-0 -z-10 h-96 w-96 rounded-full bg-(--green)/10 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="text-center md:text-left">
          <span className="inline-flex items-center rounded-full border border-(--gold)/30 bg-(--gold)/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-(--green)">
            404 · Page not found
          </span>

          <h1 className="mt-5 font-[var(--cinzel-fonts)] text-7xl font-bold leading-none tracking-tight text-(--navy) sm:text-8xl lg:text-9xl">
            404
          </h1>
          <h2 className="mt-4 text-balance text-2xl font-bold leading-snug text-(--navy) sm:text-3xl">
            Looks like you&apos;ve wandered off course.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-(--muted) sm:text-base md:mx-0">
            The page you&apos;re looking for may have moved or no longer exists.
            Let&apos;s get you back on track.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-(--gold) px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-(--green)/15 transition hover:-translate-y-0.5 hover:bg-(--navy) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--gold)"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              Back to home
            </Link>
            <Link
              href="/courses"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-(--navy) transition hover:-translate-y-0.5 hover:border-(--gold) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--gold)"
            >
              Explore courses
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative mx-auto aspect-square w-full max-w-[440px]"
        >
          <div className="absolute inset-[12%] rounded-full bg-(--gold)/10 blur-3xl" />
          <DotLottieReact
            src="https://lottie.host/3c81dca3-a894-49ba-8feb-1c51f882045e/DnaaferNm1.lottie"
            loop
            autoplay
            className="relative h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
