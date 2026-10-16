import React from "react";

import examData from "@/data/course.json";
import ScrollReveal from "../animations/ScrollReveal";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    GraduationCap,
} from "lucide-react";

const exams = examData.exams;

const Courses = () => {
    return (
        <>
            {exams.map((exam, index) => (
                <ScrollReveal
                    key={exam.slug}
                    animation={
                        index % 2 === 0
                            ? "right"
                            : "left"
                    }
                    delay={Math.min(
                        index * 60,
                        240
                    )}
                    duration={500}
                    className="w-full min-w-0 flex-none"
                >
                    <article className="grid w-full min-w-full basis-full tems-center flex-none overflow-hidden rounded-4xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[40%_60%] lg:p-8">

                        {/* Course Image */}
                        <div className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-4xl bg-slate-50 sm:max-w-[400px] lg:mx-0 lg:max-w-none">
                            <Image
                                src={exam.image}
                                alt={exam.title}
                                fill
                                sizes="(max-width: 1023px) 100vw, 40vw"
                                quality={100}
                                className="rounded-4xl object-contain"
                                priority={index === 0}
                            />

                            <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-xs font-semibold text-white">
                                <GraduationCap
                                    size={17}
                                />
                                {exam.category}
                            </span>
                        </div>

                        {/* Course Details */}
                        <div className="flex flex-col justify-center px-6 lg:px-8 xl:px-12 pt-6 md:pt-0">
                            <span className="w-fit rounded-full bg-[#fbf1d8] px-3.5 py-1.5 text-xs font-bold tracking-wide text-(--gold)">
                                DEFENCE EXAM GUIDE
                            </span>

                            <h3 className="mt-4 font-(--font-montserrat) text-xl font-extrabold leading-tight text-(--navy) sm:text-4xl">
                                {exam.title}
                            </h3>

                            <p className="mt-2 font-(--font-montserrat) text-sm font-medium text-(--muted) lg:text-lg">
                                Eligibility &amp;
                                Selection Process
                            </p>

                            <p className="mt-4 max-w-xl text-sm leading-5 text-slate-600 line-clamp-7 text-justify sm:text-base lg:text-medium lg:leading-7">
                                {exam.contentNote}
                            </p>

                            <Link
                                href={`/courses/${exam.slug}`}
                                aria-label={`Explore ${exam.title}`}
                                className="mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-(--gold) px-8 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                            >
                                Learn More
                                <ArrowRight
                                    size={18}
                                />
                            </Link>
                        </div>
                    </article>
                </ScrollReveal>
            ))}
        </>
    );
};

export default Courses;