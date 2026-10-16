"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
    Check,
    Phone,
} from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";
import FacilitiesContact from "@/components/facilities/FacilitiesContact";

import facilitiesData from "@/data/facilities.json";

export default function FacilityDetails({ facility }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const facilities = facilitiesData.facilities;
    const heroImage = facility.images[0];

    const totalImages = facility.images.length;

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % totalImages);
    };

    const previousImage = () => {
        setCurrentImage(
            (prev) => (prev - 1 + totalImages) % totalImages
        );
    };

    // Automatic image slider
    useEffect(() => {
        if (isPaused || totalImages <= 1) return;

        const timer = setInterval(() => {
            setCurrentImage(
                (prev) => (prev + 1) % totalImages
            );
        }, 5000);

        return () => clearInterval(timer);
    }, [isPaused, totalImages]);

    return (
        <main className=" bg-[#F2F5FF]" aria-labelledby="facility-title">


            {/* HERO */}

            <ScrollReveal animation="up-zoom" delay="50" duration="700">

                <section className="px-5 pb-12 pt-30 lg:pb-16  ">
                    <div className="mx-auto max-w-7xl  ">


                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:pb-24">
                            <div className="flex flex-col lg:flex-row">
                                {/* Hero image */}
                                <div className="relative aspect-[16/10] w-full flex-1 overflow-hidden rounded-2xl bg-slate-100 lg:mt-5 lg:rounded-tr-2xl lg:rounded-br-2xl lg:min-h-[360px]">
                                    <Image
                                        src={heroImage}
                                        alt={`${facility.title} at Prince Defence Academy`}
                                        fill
                                        priority
                                        sizes="(max-width: 1023px) 100vw, 50vw"
                                        quality={100}
                                        className="object-cover"
                                    />

                                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" /> */}
                                </div>

                                {/* Right Content */}
                                <div className="hidden lg:flex flex-1 flex-col justify-center">

                                    <div className="lg:mt-10 bg-gradient-to-r from-[#3869D0] from-50% to-[#94CCF9] px-8 py-10 text-white shadow-xl sm:px-10 sm:py-14 lg:px-12 lg:py-3">
                                        <span className="text-xs font-bold  tracking-[0.2em]">
                                            OUR FACILITY
                                        </span>

                                        <h1 id="facility-title" className="mt-3  italic montserrat text-3xl font-extrabold leading-tight sm:text-5xl">
                                            {facility.title}
                                        </h1>

                                        <p className=" max-w-xl text-base leading-7 inter">
                                            {facility.shortDescription}
                                        </p>
                                    </div>

                                    <div className="mt-3 px-8 sm:px-10 sm:pb-10 lg:px-12 lg:pb-10">
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--gold)] hover:shadow-lg"
                                        >
                                            <Phone size={17} />
                                            Contact Us
                                        </Link>
                                    </div>
                                </div>




                            </div>

                            {/* Lower Images */}

                            <div className="absolute bottom-3 left-1/2 z-10 hidden w-auto -translate-x-1/2 gap-2 px-3 sm:gap-3 sm:px-10 lg:bottom-2 lg:left-15 lg:flex lg:w-1/3 lg:translate-x-0 lg:px-14">
                                {Array.from({ length: 3 }, (_, index) => {
                                    const image = facility.images[index] || heroImage;

                                    return (
                                        <div
                                            key={`${image}-${index}`}
                                            className="relative aspect-square w-18 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-[0_14px_30px_rgba(16,42,67,0.35)] sm:w-28"
                                        >
                                            <Image
                                                src={image}
                                                alt={`${facility.title} at Prince Defence Academy`}
                                                fill
                                                sizes="112px"
                                                quality={100}
                                                className="w-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className=" mt-3 flex lg:hidden flex-1 flex-col justify-center">

                            <div className="rounded-2xl bg-gradient-to-r from-[#3869D0] from-50% to-[#94CCF9] px-8 py-5 text-white shadow-xl sm:px-10 sm:py-8">
                                <span className="text-xs font-bold  tracking-[0.2em]">
                                    OUR FACILITY
                                </span>

                                <h1 id="facility-title" className="mt-3  italic montserrat text-3xl font-extrabold leading-tight sm:text-5xl">
                                    {facility.title}
                                </h1>

                                <p className=" max-w-xl text-xs leading-75inter">
                                    {facility.shortDescription}
                                </p>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 mt-3 rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--gold)] hover:shadow-lg"
                                >
                                    <Phone size={17} />
                                    Contact Us
                                </Link>
                            </div>

                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* CONTENT + FACILITY TOC */}


            <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">


                    {/* LEFT MAIN CONTENT */}


                    <div className="min-w-0">

                        {/* Image Slider */}
                        <ScrollReveal animation="right" delay="0" duration="700">

                            <div
                                className="relative overflow-hidden rounded-3xl bg-slate-200 shadow-sm"
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                                onFocus={() => setIsPaused(true)}
                                onBlur={() => setIsPaused(false)}
                            >
                                <div className="relative aspect-[4/3] bg-slate-100 sm:aspect-[16/10] lg:aspect-[16/9]">
                                    <Image
                                        key={facility.images[currentImage]}
                                        src={facility.images[currentImage]}
                                        alt={`${facility.title} - image ${currentImage + 1}`}
                                        fill
                                        sizes="(max-width: 1023px) 100vw, calc(100vw - 360px)"
                                        quality={100}
                                        className="object-cover"
                                        priority={currentImage === 0}
                                    />
                                </div>

                                {/* Previous */}
                                <button
                                    type="button"
                                    onClick={previousImage}
                                    aria-label="Previous image"
                                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--navy)] shadow-md transition-all duration-300 hover:scale-105 hover:bg-white"
                                >
                                    <ChevronLeft size={22} />
                                </button>

                                {/* Next */}
                                <button
                                    type="button"
                                    onClick={nextImage}
                                    aria-label="Next image"
                                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--navy)] shadow-md transition-all duration-300 hover:scale-105 hover:bg-white"
                                >
                                    <ChevronRight size={22} />
                                </button>

                                {/* Counter */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white">
                                    {currentImage + 1} / {totalImages}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Slider Dots */}
                        <div className="mt-5 flex justify-center gap-2">
                            {facility.images.map((image, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() =>
                                        setCurrentImage(index)
                                    }
                                    aria-label={`Show image ${index + 1}`}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${currentImage === index
                                        ? "w-8 bg-[var(--gold)]"
                                        : "w-2.5 bg-slate-300 hover:bg-slate-400"
                                        }`}
                                />
                            ))}
                        </div>


                        {/* DESCRIPTION */}

                        <ScrollReveal animation="up" delay="0" duration="700">

                            <section
                                id="overview"
                                className="mt-12 scroll-mt-28"
                            >
                                <span className="text-xs font-bold tracking-[0.2em] text-[var(--gold)]">
                                    OVERVIEW
                                </span>

                                <h2 className="mt-2 font-[var(--font-montserrat)] text-2xl font-bold text-[var(--navy)] sm:text-3xl">
                                    About {facility.title}
                                </h2>

                                <p className="mt-5 text-base leading-8 text-[var(--muted)]">
                                    {facility.longDescription}
                                </p>
                            </section>
                        </ScrollReveal>


                        {/* HIGHLIGHTS */}

                        <ScrollReveal animation="up" delay="0" duration="700">
                            <section
                                id="highlights"
                                className="mt-12 scroll-mt-28"
                            >
                                <span className="text-xs font-bold tracking-[0.2em] text-[var(--gold)]">
                                    HIGHLIGHTS
                                </span>

                                <h2 className="mt-2 font-[var(--font-montserrat)] text-2xl font-bold text-[var(--navy)] sm:text-3xl">
                                    Facility Highlights
                                </h2>

                                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {facility.list.map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                                        >
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--green)]/10 text-[var(--green)]">
                                                <Check size={17} />
                                            </span>

                                            <span className="text-sm font-semibold text-[var(--navy)]">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </ScrollReveal>

                    </div>


                    {/* FACILITY TOC */}

                    <ScrollReveal animation="up" delay="0" duration="700">
                        <aside className="lg:sticky lg:top-28 lg:self-start">
                            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

                                <span className="text-xs font-bold tracking-[0.2em] text-[var(--gold)]">
                                    EXPLORE
                                </span>

                                <h2 className="mt-2 font-[var(--font-montserrat)] text-lg font-bold text-[var(--navy)]">
                                    Other Facilities
                                </h2>

                                <nav className="mt-5 space-y-1">
                                    {facilities.map((item) => {
                                        const isActive =
                                            item.slug === facility.slug;

                                        return (
                                            <Link
                                                key={item.slug}
                                                href={`/facilities/${item.slug}`}
                                                className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${isActive
                                                    ? "bg-[var(--gold)] text-white"
                                                    : "text-[var(--muted)] hover:bg-slate-50 hover:text-[var(--navy)]"
                                                    }`}
                                            >
                                                {item.title}
                                            </Link>
                                        );
                                    })}
                                </nav>

                            </div>
                        </aside>
                    </ScrollReveal>

                </div>
            </section>


            <FacilitiesContact />

        </main >
    );
}