import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Trophy,
  Target,
  GraduationCap,
  Star,
  CheckCircle2,
  Quote,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import EnquireButton from "@/components/common/EnquireButton";
import SelectionRecords from "@/components/home/SelectionRecords";

const achievements = [
  {
    icon: GraduationCap,
    number: "2011",
    title: "Established",
    desc: "A journey of excellence",
  },
  {
    icon: Trophy,
    number: "3900+",
    title: "Selections",
    desc: "Reported selections",
  },
  {
    icon: ShieldCheck,
    number: "15+",
    title: "Years",
    desc: "Of educational experience",
  },
];

const courses = [
  "NDA",
  " Army",
  "Air Force",
  " Navy",
  "SSC",
];

const values = [
  "Quality education & expert guidance",
  "Structured and exam-oriented preparation",
  "Disciplined and supportive learning environment",
  "Focus on confidence and personality development",
];



export const metadata = {
  title: "About Prince Defence Academy | NDA, CDS & AFCAT Coaching",
  description:
    "Discover Prince Defence Academy, Sikar, Rajasthan, established in 2012. Learn about our expert defence trainers, NDA, CDS and AFCAT coaching, disciplined training and commitment to defence career success.",
  alternates: {
    canonical: "/about",
  },
};


export default function About() {
  return (
    <>
      <section
        id="about"
        className=" relative overflow-hidden fixed bg-[#E0EDFF] px-5 py-16 sm:px-8 lg:px-12 lg:py-30"
      >

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-white/10 h-[100px] to-transparent" />
        <div className="mx-auto max-w-7xl">

          {/* TOP HEADING */}
          <ScrollReveal animation="up" duration={500}>
            <div className="mx-auto mb-10 mt-20 sm:mt-15 lg:mt-4 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dce8df] bg-white px-5 py-2 text-xs font-bold tracking-[0.18em] text-(--green)">
                <ShieldCheck size={15} />
                ABOUT PRINCE DEFENCE ACADEMY
              </span>

              <h2 className="mt-5 montserrat text-3xl font-extrabold leading-tight text-(--navy) sm:text-4xl lg:text-5xl">
                Shaping Future
                <span className="text-(--gold)">
                  {" "}Defence Leaders
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Empowering ambitious students with quality education,
                professional guidance and the confidence to pursue
                their dreams since 2011.
              </p>
            </div>
          </ScrollReveal>

          {/* ABOUT CONTENT */}
          <ScrollReveal animation="up" delay={80} duration={500}>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

              {/* IMAGE SIDE */}
              <div className="relative mx-auto w-full max-w-xl lg:mx-0">

                <div className="absolute -left-5 -top-5 h-32 w-32 rounded-3xl border-2 border-(--gold)/30" />

                <div className="relative z-10 h-[360px] overflow-hidden rounded-3xl bg-slate-200 shadow-xl sm:h-[480px] lg:h-[560px]">
                  <Image
                    src="/images/campusbg-2.webp"
                    alt="Prince Defence Academy Sikar Rajasthan"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 via-40% to-black/20" />

                  <div className="absolute bottom-6 left-6 right-6 z-10 rounded-2xl border border-white/20 bg-gradient-to-b from-black/70 via-black/45 to-white/10 p-5 text-white backdrop-blur-[2px] sm:bottom-8 sm:left-8 sm:right-8">
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e7c36d]">
                      <Star size={15} fill="currentColor" />
                      Our Journey Since 2011
                    </div>

                    <h3 className="text-2xl font-extrabold sm:text-3xl">
                      Discipline. Dedication.
                      <br />
                      Determination.
                    </h3>

                    <p className="mt-2 text-sm text-white/80">
                      Building careers through quality education.
                    </p>
                  </div>
                </div>

                {/* FLOATING ACHIEVEMENT CARD */}
                <div className="relative z-20 mx-4 -mt-7 rounded-2xl border border-slate-100 bg-white p-5 shadow-lg sm:mx-8 sm:p-6">
                  <div className="grid grid-cols-3 divide-x divide-slate-200">
                    {achievements.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="px-2 text-center sm:px-4"
                        >
                          <Icon
                            size={21}
                            className="mx-auto text-(--gold)"
                          />

                          <h4 className="mt-2 text-lg font-extrabold text-(--navy) sm:text-2xl">
                            {item.number}
                          </h4>

                          <p className="mt-1 text-[10px] font-bold text-(--green) sm:text-xs">
                            {item.title}
                          </p>

                          <p className="mt-1 hidden text-[10px] text-slate-500 sm:block">
                            {item.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* CONTENT SIDE */}
              <div className="lg:py-4">

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-(--gold)">
                  No. 1 Defence Academy of India
                </span>

                <h3 className="mt-4 font-(--font-montserrat) text-2xl font-extrabold leading-snug text-(--navy) sm:text-3xl">
                  Your Dreams, Our Guidance,
                  Your Future.
                </h3>

                <p className="mt-5 text-sm leading-7 inter text-slate-600 sm:text-base">
                  Prince Defence Academy (PDA) is one of the emerging defence coaching institutes of Northern India and has contributed by delivering thousands of successful candidates to various defence and government services. Prince Defence Academy was established in 2011 with an aim of helping students in delivering the best education and physical training. Prince Defence Academy believes in providing structured coaching, expert guidance, and a disciplined learning environment.
                </p>

                <p className="mt-4 text-sm leading-7 inter text-slate-600 sm:text-base">
                  Prince Defence Academy (PDA) was inaugurated in 2011 and started its first batch with a few students. Gradually, it expanded its courses and changed the preparation methods according to the requirements of competitive examinations. Its unique teaching methods and physical training attract future soldiers to PDA. The way of learning, disciplined environment, guidance of experts, and defence-oriented preparation have helped thousands of students. And today, Prince Defense Academy stands among the leading defence academies in India.
                </p>

                {/* FEATURE LIST */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {values.map((value) => (
                    <div
                      key={value}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-(--green)"
                      />

                      <p className="text-sm font-medium leading-6 text-slate-700">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/gallery"
                  className="mt-8 inline-flex items-center gap-3 rounded-xl bg-(--gold) px-6 py-3.5 text-sm font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-(--navy)"
                >
                  Discover Our Academy
                  <ArrowRight size={18} />
                </Link>

              </div>
            </div>
          </ScrollReveal>

          {/* COURSES SECTION */}
          <ScrollReveal animation="up" delay={120} duration={500}>
            <div className="mt-20 rounded-3xl bg-(--navy) px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
              <div className="grid items-center gap-8 text-center sm:gap-10 lg:text-left">

                <div>

                  <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                    Our Approach to Defence
                    <span className="text-[#e7c36d]">
                      {" "} Exam Preparation
                    </span>
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-justify md:text-left text-slate-300">
                    Prince Defense Academy believes in providing defence and exam-oriented preparation. At PDA, students are offered quality study material, proper classes, proper physical training, the best strategy to question-solving techniques, and guidance on how to deal with concepts. The main approach of Prince Defence is to build a strong foundation first and then work on improving a student's speed, accuracy, and confidence through continuous practice.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {courses.map((course) => (
                    <span
                      key={course}
                      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-[#e7c36d] hover:bg-[#e7c36d] hover:text-(--navy) sm:text-sm"
                    >
                      {course}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          </ScrollReveal>

          {/* VISION & MISSION */}
          <ScrollReveal animation="up" delay={160} duration={500}>
            <div className="mt-16 grid gap-6 md:grid-cols-2">

              <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4ef] text-(--green)">
                  <Target size={25} />
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-(--navy)">
                  Our Vision
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Prince Defence Academy provides a platform for students where they get quality academic support, updated study resources, regular practice, physical training by experts, and proper guidance. Prince Defence creates an environment where students can identify their strengths, work on their weaknesses, and prepare themselves with discipline, consistency, and confidence.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fbf1dc] text-(--gold)">
                  <Quote size={25} />
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-(--navy)">
                  Our Mission
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  The main motive of Prince Defence Academy Sikar is to shape today’s generation and prepare them for a successful future in the defence services. Prince Defence Academy aims to fulfil the dreams of lakhs of students who aspire to serve the nation by joining the Indian Defence Forces.

                </p>
              </div>

            </div>
          </ScrollReveal>

          {/* BOTTOM CTA */}
          <ScrollReveal animation="up" delay={200} duration={500}>
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-extrabold text-(--navy) sm:text-3xl">
                Our Selection Track Record
              </h3>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Prince Defence Academy has contributed to the preparation of candidates selected in different defence and government services. The academy has crossed 1286+ selections (2022 to 2025) across areas including the Army, Navy, Air Force, SSB, NDA, etc., based on the academy's reported selection record
              </p>

              <EnquireButton
                variant="right"
                className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-(--gold) px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                Join Our Academy
              </EnquireButton>
            </div>
          </ScrollReveal>

        </div>
      </section>
      <SelectionRecords />
    </>
    );
}