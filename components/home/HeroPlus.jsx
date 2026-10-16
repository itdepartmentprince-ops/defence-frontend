"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";

const slides = [
    { src: "/images/DefenceTotalSection.webp", alt: "Prince Defence Total Sections 2026" },
    { src: "/images/Defenceresults01.webp", alt: "Prince Defence Results Slide" },
    { src: "/images/DefenceResult02.webp", alt: "Prince Defence Results Slide 2" },
];

export default function HeroPlus() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = () => setCurrent((c) => (c + 1) % slides.length);
    const prev = () =>
        setCurrent((c) => (c - 1 + slides.length) % slides.length);

    // Auto-play every 3 seconds; pause on hover.
    useEffect(() => {
        if (paused) return;
        const timer = setInterval(next, 3000);
        return () => clearInterval(timer);
    }, [paused]);

    const arrow =
        "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0b1b3a] shadow-md backdrop-blur-sm transition hover:bg-[#d4af37] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold) md:h-11 md:w-11";

    return (
        <section className="overflow-x-hidden bg-white px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <div className="mx-auto w-full max-w-7xl">
                <ScrollReveal className="mx-auto mb-8 max-w-4xl text-center sm:mb-10">
                    <h2 className="montserrat text-2xl font-extrabold leading-tight text-(--navy) sm:text-3xl md:text-4xl lg:text-4xl">
                        Where Defence Dreams Become <br />
                        <span className="text-(--gold)">
                            Proud Achievements
                        </span>
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
                    {/* ---------- Image slider ---------- */}
                    <ScrollReveal
                        animation="up"
                        delay={100}
                        duration={700}
                        className="w-full min-w-0"
                    >
                        <div className="relative h-full w-full">
                            <div className="relative h-[380px] w-full overflow-hidden rounded-2xl bg-(--navy) shadow-[0_20px_50px_rgba(16,42,67,0.18)] ring-1 ring-black/5 sm:h-[320px] sm:rounded-3xl md:h-[380px] lg:h-full lg:min-h-[460px]"
                                onMouseEnter={() => setPaused(true)}
                                onMouseLeave={() => setPaused(false)}
                                onFocus={() => setPaused(true)}
                                onBlur={(event) => {
                                    if (
                                        !event.currentTarget.contains(
                                            event.relatedTarget
                                        )
                                    ) {
                                        setPaused(false);
                                    }
                                }}
                            >
                                {slides.map((slide, index) => (
                                    <div
                                        key={slide.src}
                                        aria-hidden={index !== current}
                                        className={`absolute inset-0 transition-opacity duration-700 ${index === current
                                            ? "opacity-100"
                                            : "pointer-events-none opacity-0"
                                            }`}
                                    >
                                        <Image
                                            src={slide.src}
                                            alt={slide.alt}
                                            fill
                                            priority={index === 0}
                                            sizes="(max-width: 1023px) 100vw, 50vw"
                                            quality={70}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                ))}

                                {/* Bottom fade for readability */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0b1b3a]/80 via-[#0b1b3a]/30 to-transparent"
                                />

                                <button
                                    type="button"
                                    onClick={prev}
                                    aria-label="Previous slide"
                                    className={`${arrow} left-3 sm:left-5`}
                                >
                                    <ChevronLeft aria-hidden="true" />
                                </button>

                                <button
                                    type="button"
                                    onClick={next}
                                    aria-label="Next slide"
                                    className={`${arrow} right-3 sm:right-5`}
                                >
                                    <ChevronRight aria-hidden="true" />
                                </button>

                                {/* Dots + counter */}
                                <div className="absolute inset-x-4 bottom-3 z-10 flex items-center justify-between sm:inset-x-6 sm:bottom-4">
                                    <div className="flex gap-2">
                                        {slides.map((slide, index) => (
                                            <button
                                                key={slide.src}
                                                type="button"
                                                onClick={() => setCurrent(index)}
                                                aria-label={`Go to slide ${index + 1}`}
                                                aria-current={
                                                    index === current
                                                        ? "true"
                                                        : undefined
                                                }
                                                className={`h-2 rounded-full transition-all ${index === current
                                                    ? "w-6 bg-(--gold)"
                                                    : "w-2 bg-white/70"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-semibold tabular-nums text-white/90 sm:text-sm">
                                        {String(current + 1).padStart(2, "0")} /{" "}
                                        {String(slides.length).padStart(2, "0")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* ---------- Text (unchanged) ---------- */}
                    <ScrollReveal
                        animation="up"
                        delay={180}
                        duration={700}
                        className="h-full min-w-0"
                    >
                        <div className="flex h-full flex-col justify-center lg:pl-4">
                            {/* Eyebrow */}
                            <div className="flex items-center gap-3">
                                <span className="h-px w-10 bg-(--gold)" />
                                <span className="text-xs font-bold uppercase tracking-[0.25em] text-(--gold) sm:text-sm">
                                    Introduction
                                </span>
                            </div>

                            {/* Heading */}
                            <h3 className="cinzel mt-4 text-2xl font-bold leading-snug text-(--navy) sm:text-3xl lg:text-4xl">
                                Prince Defence Academy
                            </h3>

                            {/* Introduction */}
                            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 text-justify sm:text-lg sm:leading-8">


                                Started in 2011, &nbsp;

                                <span className="font-semibold text-(--navy)">
                                     Prince Defence Academy
                                </span>{" "}

                                has helped thousands of candidates secure selections in defence exams, including Navy, Army, Air Force, NDA, CDS, AFCAT, etc. Prince Defence Academy, Sikar, is known for providing the best education and physical training. Prince Defence Academy creates a learning environment and provides physical training under the guidance of retired army officials.

                            </p>

                            
                            <div className="mt-6 max-w-xl border-l-4 border-(--gold) pl-5">
                                <p className="mt-2 text-base leading-8 text-slate-600 text-justify sm:text-lg sm:leading-8">
                                  The main motive of PDA Sikar is to produce Armed Personnel from every corner of India and build a successful career in the Indian Defence Forces. We not only believe in delivering academic education, but at Prince Defence, we also focus on the overall development of every student. Here students are offered structured classroom teaching, regular tests, doubt-solving sessions, physical training, personality development, and SSB and interview preparation.
                                </p>
                            </div>

                            {/* Highlights */}
                            <ul className="mt-8 flex flex-row justify-between md:justify-start md:gap-10 lg:gap-12">
                                {["Discipline", "Expert Mentors", "Results"].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-2 text-sm font-semibold text-(--navy)"
                                    >
                                        <span className="h-2 w-2 rotate-45 bg-(--gold)" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
