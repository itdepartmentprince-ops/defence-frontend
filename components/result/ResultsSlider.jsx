"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";

const slidesByCategory = {
    all: [
    {
        src: "/images/resultFirst.webp",
        alt: "Prince Defence Academy selection results",
        title: "A legacy of defence selections",
        category: "Our achievements",
    },
    {
        src: "/images/ndaSelections2.webp",
        alt: "Prince Defence Academy selection results",
        title: "A legacy of defence selections",
        category: "Our achievements",
    },

    {
        src: "/images/AirForceSelections.webp",
        alt: "Air Force students and achievements",
        title: "Preparing future Air Force achievers",
        category: "Air Force",
    },
    {
        src: "/images/ArmySelections.webp",
        alt: "Army students and achievements",
        title: "Building a future in the Army",
        category: "Army",
    },
    {
        src: "/images/NavySelections.webp",
        alt: "Navy students and achievements",
        title: "Celebrating our Navy selections",
        category: "Navy",
    },
    ],
    "air-force": [
        {
            src: "/images/AirForceSelections.webp",
            alt: "Air Force students and achievements",
            title: "Preparing future Air Force achievers",
            category: "Air Force",
        },
        {
            src: "/images/AirForceSelections2.webp",
            alt: "Air Force fighter jets",
            title: "Focused training for the skies",
            category: "Air Force",
        },
        {
            src: "/images/AirForceSelections3.webp",
            alt: "Air Force fighter jets",
            title: "Focused training for the skies",
            category: "Air Force",
        },
    ],
    army: [
        {
            src: "/images/ArmySelections.webp",
            alt: "Army students and achievements",
            title: "Building a future in the Army",
            category: "Army",
        }
    ],
    navy: [
        {
            src: "/images/NavySelections.webp",
            alt: "Navy students and achievements",
            title: "Celebrating our Navy selections",
            category: "Navy",
        },
    ],
    nda: [
         {
            src: "/images/ndaSelections2.webp",
            alt: "Prince Defence Academy selection results",
            title: "A legacy of defence selections",
            category: "Nda",
        },
    ],
};

export default function ResultsSlider({ category = "all" }) {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const slides = slidesByCategory[category] || slidesByCategory.all;

    useEffect(() => {
        if (paused) return undefined;

        const timer = window.setInterval(() => {
            setCurrent((index) => (index + 1) % slides.length);
        }, 3000);

        return () => window.clearInterval(timer);
    }, [paused, slides.length]);

    const showPrevious = () => {
        setCurrent((index) => (index - 1 + slides.length) % slides.length);
    };

    const showNext = () => {
        setCurrent((index) => (index + 1) % slides.length);
    };

    return (
        <section
            aria-label="Prince Defence Academy results slideshow"
            className="bg-(--white) px-4 pt-3 sm:px-8 sm:py-8 lg:px-12 lg:py-12"
        >
            <div
                className="relative mx-auto aspect-[1145/501] max-w-7xl overflow-hidden rounded-xl lg:rounded-2xl bg-(--navy) shadow-[0_24px_70px_rgba(8,24,48,0.2)] sm:aspect-[16/8] lg:aspect-[16/7]"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        setPaused(false);
                    }
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.src}
                        aria-hidden={index !== current}
                        className={`absolute inset-0 transition-opacity duration-700 ${
                            index === current
                                ? "z-[1] opacity-100"
                                : "opacity-0"
                        }`}
                    >
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            priority={index === 0}
                            fetchPriority={index === 0 ? "high" : "auto"}
                            sizes="(max-width: 768px) calc(100vw - 40px), 1280px"
                            quality={95}
                            className={`object-contain md:object-cover transition-transform duration-[6000ms] ${
                                index === current
                                    ? "scale-100 md:scale-105"
                                    : "scale-100"
                            }`}
                        />
                    </div>
                ))}


                <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Previous results image"
                    className="absolute left-3 top-1/2 z-[4] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-transparent text-white shadow-[0_2px_12px_rgba(0,0,0,0.8)] transition-colors hover:bg-(--gold) sm:left-6 sm:h-12 sm:w-12"
                >
                    <ChevronLeft aria-hidden="true" />
                </button>

                <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next results image"
                    className="absolute right-3 top-1/2 z-[4] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-transparent text-white shadow-[0_2px_12px_rgba(0,0,0,0.8)] transition-colors hover:bg-(--gold) sm:right-6 sm:h-12 sm:w-12"
                >
                    <ChevronRight aria-hidden="true" />
                </button>

            </div>
        </section>
    );
}
