
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

import examData from "@/data/course.json";
import ScrollReveal from "../animations/ScrollReveal";
import Courses from "@/components/courses/Courses";

const exams = examData.exams;
const AUTO_SLIDE_TIME = 5000;
const getExamIndex = (slug) =>
  exams.findIndex((exam) => exam.slug === slug);

const preparation = [
  "IX",
  "X",
  "XI",
  "XII",
  "B.Sc.",
  "B.A. + NDA",
  "AIRFORCE",
  "NAVY",
  "ARMY",
  "SSC",
  "POLICE",
  "Others",
];

export default function HomeCourses() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const tabsRef = useRef([]);

  useEffect(() => {
    const activeSlug = exams[activeIndex]?.slug;
    const activeTabIndex = examData.navbar.findIndex(
      (exam) => exam.slug === activeSlug
    );
    const activeTab = tabsRef.current[activeTabIndex];
    const tabsContainer = activeTab?.parentElement;

    if (activeTab && tabsContainer) {
      tabsContainer.scrollTo({
        left:
          activeTab.offsetLeft -
          (tabsContainer.clientWidth - activeTab.clientWidth) / 2,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  // Next exam
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % exams.length);
  };

  // Auto slider
  useEffect(() => {
    if (isPaused || exams.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % exams.length);
    }, AUTO_SLIDE_TIME);

    return () => clearInterval(interval);
  }, [isPaused]);

  if (!exams.length) return null;

  return (
    <section
      id="courses"
      aria-labelledby="courses-heading"
      className="[content-visibility:auto] [contain-intrinsic-size:900px] bg-[#dfe7f1] px-5 py-16 sm:px-8 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <ScrollReveal animation="up" duration={500}>
          <header className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-bold tracking-widest text-(--green) sm:px-8">
            OUR COURSES
          </span>

          <h2
            id="courses-heading"
            className="mt-5 montserrat  text-3xl font-bold text-(--navy) sm:text-4xl lg:text-5xl"
          >
              Courses in {""} 
            <span className="text-(--gold)">Prince {""} </span>
            Defence Academy
          </h2>

          <p className="mt-4 text-sm leading-7 text-(--muted) sm:text-base">
            Explore eligibility, exam patterns and selection
            processes for defence examinations.
          </p>
          </header>
        </ScrollReveal>

        {/* Exam Category Tabs */}
        <nav
          aria-label="Exam categories"
          className="mt-8 flex w-full gap-2 overflow-x-scroll p-2 scrollbar-hide lg:mx-auto lg:w-[70%] lg:justify-center lg:p-0"
        >
          {examData.navbar.map((exam, index) => (
            <button
              key={exam.slug}
              ref={(element) => {
                tabsRef.current[index] = element;
              }}
              type="button"
              onClick={() => {
                const examIndex = getExamIndex(exam.slug);
                if (examIndex !== -1) setActiveIndex(examIndex);
              }}
              aria-pressed={activeIndex === getExamIndex(exam.slug)}
              className={`shrink-0 rounded-xl px-6 py-2.5 text-sm font-semibold transition-colors ${activeIndex === getExamIndex(exam.slug)
                  ? "bg-(--navy) text-white"
                  : "bg-white text-(--navy) hover:bg-slate-100"
                }`}
            >
              {exam.name}
            </button>
          ))}
        </nav>

        {/* Course Slider */}
        <ScrollReveal animation="up" delay={80} duration={500}>
          <div
            className="relative mt-5 overflow-hidden rounded-4xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsPaused(false);
              }
            }}
          >
          {/* Slider Track */}
          <div
            className="flex w-full flex-nowrap transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            <Courses/>
          </div>
          </div>
        </ScrollReveal>

        {/* Complete Preparation */}
        <ScrollReveal animation="up" delay={140} duration={500}>
          <div className="mt-10 lg:mt-15">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold tracking-widest text-(--green)">
              COMPLETE PREPARATION
            </span>

            <h2 className="mt-3 font-(--font-montserrat) text-2xl font-bold text-(--navy) sm:text-3xl">
              School + Competition
            </h2>

            <p className="mt-3 text-sm leading-6 text-(--muted)">
              Academic and competitive preparation for different
              stages of a student&apos;s career.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {preparation.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-(--navy) shadow-sm"
              >
                <ShieldCheck
                  size={16}
                  className="text-(--gold)"
                />
                {item}
              </span>
            ))}
          </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}