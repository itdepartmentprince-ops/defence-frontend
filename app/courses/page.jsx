
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, } from "lucide-react";

import examData from "@/data/course.json";
import ScrollReveal from "@/components/animations/ScrollReveal";
import EnquireButton from "@/components/common/EnquireButton";

import { FaAnchor, FaAward, FaShieldAlt } from 'react-icons/fa';
import { GiSwordsEmblem, GiJetFighter, GiThreeFriends } from 'react-icons/gi';
import { SiReact } from "react-icons/si";
import Courses from "@/components/courses/Courses";



const iconMap = {
  FaAnchor: FaAnchor,
  FaAward: FaAward,
  FaShieldAlt: FaShieldAlt,
  GiJetFighter: GiJetFighter,
  GiSwordsEmblem: GiSwordsEmblem,
  GiThreeFriends: GiThreeFriends,
};


export const metadata = {
  title: "Our Courses | Prince Defence Academy",
  description:
    "Explore defence training courses and preparation programs at Prince Defence Academy.",
};

const exams = examData.exams

const CoursesPage = () => {
  return (
    <main className="min-h-screen bg-[#ffffff]">


      {/* Courses Header */}
      <header
        className="
    relative isolate
    overflow-hidden
    bg-[#ffffff]
    px-5 pt-32 pb-20
    sm:px-8 sm:pb-44
    lg:px-12 lg:pt-35 lg:pb-40
  "
      >
        {/* Curved Background */}
        <div
          aria-hidden="true"
          className="
      absolute -z-10
      top-0 bottom-0 FFF
      left-[-20%] w-[140%]
      
      bg-gradient-to-t from-[#EEF2FF] via-[#F5F8FF] to-[#ffffff]
      rounded-b-[45%] lg:rounded-b-[50%]
    "
        />

        {/* Header Content */}
        <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
          <p className="mb-3 text-lg font-semibold montserrat uppercase tracking-[0.3em] text-[#234f3d]">
            Courses
          </p>

          <h1 className="text-xl sm:text-2xl montserrat font-bold text-(--navy) md:text-3xl">
            Start Learning Defence Today
          </h1>

          <p className="mt-4 max-w-2xl text-sm inter leading-6 text-(--muted) sm:text-base sm:leading-7">
            At Prince Defence Academy, we provide expert defence training, structured learning, and physical fitness programs to help aspirants achieve their defence career goals.
          </p>
        </div>


        <div className="flex flex-wrap justify-center gap-5 p-5">
          {examData.navbar.map((sector) => {
            const IconComponent = iconMap[sector.icon] || FaAward;

            return (
              <Link
                key={sector.slug}
                href={`/courses/${sector.slug}`}
                className="
          flex w-30 sm:w-50 items-center justify-center gap-1 lg:gap-3
          rounded-lg border-l-[5px]
          bg-white p-3 text-center
          shadow-sm transition-shadow duration-200
          hover:shadow-md
        "
                style={{
                  borderLeftColor: sector.color,
                }}
              >
                <IconComponent
                  className="  h-5 w-5 sm:h-10 sm:w-10"
                  style={{ color: sector.color }}
                />

                <p className="text-xs lg:text-lg font-semibold sm:font-bold leading-tight text-gray-700 montserrat">
                  {sector.name}
                </p>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Courses Content - Separate From Header */}
      <section
        aria-label="Available training courses"
        className="
          mx-auto max-w-7xl
          space-y-8
          px-5 pt-10 pb-16
          sm:space-y-10 sm:px-8 sm:pt-14
          lg:space-y-12 lg:px-12 lg:pt-16 lg:pb-24
        "
      >

        <Courses />
        <ScrollReveal animation="up" delay="50" duration="700">
          <div className="rounded-[28px] border border-[#e5e7eb] bg-gradient-to-r from-[#f5f7ff] to-[#E3F2FD] px-6 py-8 text-center shadow-sm sm:px-8 lg:px-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--gold) sm:text-base">
              Need guidance?
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-(--navy) montserrat sm:text-3xl">
              Choose the right defence course for your future.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-(--muted) inter sm:text-base">
              Speak with our experts to understand the best coaching path, eligibility, and preparation strategy for your desired defence career.
            </p>

            <div className="mt-6 flex justify-center">
              <EnquireButton
                className="group inline-flex items-center gap-2 rounded-full bg-(--gold) px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Enquire Now
              </EnquireButton>
            </div>
          </div> </ScrollReveal>
      </section>
    </main>
  );
};

export default CoursesPage;