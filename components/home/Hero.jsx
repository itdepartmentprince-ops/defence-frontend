"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroReveal from "../animations/HeroReveal";
import ContactForm from "../common/ContactForm";
import EnquireButton from "../common/EnquireButton";

const slides = [
    {
        image: "/images/fighterjet.avif",
        alt: "Defence fighter jet",
    },
    {
        image: "/images/fighterjets.avif",
        alt: "Fighter jets formation",
    },
    {
        image: "/images/military.avif",
        alt: "Defence training",
    },
    {
        image: "/images/campusbg-2.webp",
        alt: "Defence training",
    },
];

export const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(timer);
    }, []);

    const activeSlide = slides[current];

    return (

        <section
            className="relative min-h-[100svh] overflow-hidden"
            aria-label="Prince Defence Academy introduction"
        >
            {/* Background images */}
            <div className="absolute inset-0">
                <Image
                    src={activeSlide.image}
                    alt={activeSlide.alt}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="100vw"
                    quality={85}
                    className="object-cover object-center"
                />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[rgba(8,20,30,0.85)]" />

            {/* Hero content */}

            <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-5 pb-16 pt-32 sm:px-8 lg:px-10 lg:pt-36">
                <div className="grid w-full  grid-cols-1 justify-items-center items-center gap-10 lg:grid-cols-2">

                    {/* Left content */}

                    <HeroReveal type="fade-up" duration={1200} delay={30}>
                        <div className="max-w-5xl text-white">
                            <span className="glass-card inline-block rounded-full  px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white  sm:text-sm">
                                INDIA&apos;s NO.1 DEFENCE ACADEMY
                            </span>

                            <h1 className="mt-5 cinzel text-2xl text-shadow-xs text-shadow-white/70 text-(--gold) font-extrabold leading-tight sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl">
                                Prince Defence Academy
                                <span className="block text-(--white)">
                                    Build Your Career
                                </span>
                            </h1>

                            <p className="mt-5 max-w-xl text-sm text-justify leading-6 inter text-white/90 sm:text-base sm:leading-8 lg:text-lg">
                               Welcome to the Best Defence Academy in Sikar for Indian Navy, Army, and Air Force preparation, Prince Defence Academy. Along with defence services, we are known for offering best preparation or courses for NDA, Air Force, Navy, Army, SSC, and other competitive exams preparations. 
                            </p>

                            {/* CTA */}
                            <div className="mt-7 flex flex-row gap-3">
                                <Link
                                    href="/courses"
                                    className="gold-shimmer-cta group relative isolate inline-flex min-w-0 flex-1 items-center justify-center gap-2 inter rounded-xl bg-(--gold) px-3 py-3 text-center text-xs font-bold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:flex-none sm:px-6 sm:text-sm"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="gold-cta-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3"
                                    />
                                    <span className="relative">Explore Courses</span>
                                    <ArrowRight
                                        size={17}
                                        className="relative transition-transform duration-300 group-hover:translate-x-1.5"
                                    />
                                </Link>

                                <Link
                                    href="https://www.youtube.com/watch?v=TYeSoOQUhlY"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group glass-card inline-flex min-w-0 flex-1 items-center justify-center gap-2 inter rounded-xl border px-3 py-3 text-center text-xs font-semibold text-white hover:bg-white/20 sm:flex-none sm:px-6 sm:text-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    Campus Tour
                                    <ArrowRight
                                        size={17}
                                        className="relative transition-transform duration-300 group-hover:translate-x-1.5"
                                    />
                                </Link>
                            </div>

                            <div className="mt-8 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
                                <div className="rounded-2xl border border-white/20 bg-white/[0.1] px-4 py-4 text-center shadow-lg backdrop-blur-md sm:px-6">
                                    <p className="text-xl font-extrabold text-(--gold) sm:text-2xl">
                                        3900+
                                    </p>
                                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/75 sm:text-xs">
                                        Selections
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/20 bg-white/[0.1] px-4 py-4 text-center shadow-lg backdrop-blur-md sm:px-6">
                                    <p className="text-xl font-extrabold text-(--gold) sm:text-2xl">
                                        2011
                                    </p>
                                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/75 sm:text-xs">
                                        Established
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/20 bg-white/[0.1] px-4 py-4 text-center shadow-lg backdrop-blur-md sm:px-6">
                                    <p className="text-xl font-extrabold text-(--gold) sm:text-2xl">
                                        15+
                                    </p>
                                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/75 sm:text-xs">
                                        Years Experience
                                    </p>
                                </div>
                            </div>
                        </div>

                    </HeroReveal>


                    {/* Enquiry card */}
                    <div className="hidden xl:block">
                        <HeroReveal type="zoom" duration={1200} delay={30}>

                            <ContactForm theme="glass" size="sm" />
                        </HeroReveal>
                    </div>

                    <div className="block xl:hidden">
                        <HeroReveal type="zoom" duration={1200} delay={30}>

                            <ContactForm theme="glass" size="lg" />
                        </HeroReveal>
                    </div>
                </div>
            </div>



            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setCurrent(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-2 rounded-full transition-all ${index === current
                            ? "w-7 bg-(--gold)"
                            : "w-2 bg-white/60"
                            }`}
                    />
                ))}
            </div>
        </section>

    );
};