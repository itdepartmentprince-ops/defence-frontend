import {
    Check,
    ArrowUpRight,
} from "lucide-react";



import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../animations/ScrollReveal";

const reasons = [
    "Well-planned and exam-focused preparation",
    "Experienced teachers who guide students at every step",
    "Regular tests, mock exams and practice sessions",
    "Personalised doubt-solving and academic support",
    "Focused preparation for written examinations",
    "SSB, interview and personality development guidance",
    "Preparation support for different defence and government exams",
    "A disciplined environment that encourages regular study and steady progress",
];


export default function WhyChooseUs() {
    return (
        <section
            id="why-choose-us"
            className="[content-visibility:auto] [contain-intrinsic-size:900px] relative isolate overflow-hidden bg-gradient-to-br from-[#f5f8ff] via-[#edf3ff] to-[#f8faff] px-5 py-16 sm:px-8 lg:px-12 lg:pt-24 lg:pb-15"
            aria-labelledby="why-choose-heading"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#7488f2]/10 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-36 bottom-[-8rem] -z-10 h-[34rem] w-[34rem] rounded-full bg-[#56a4dc]/10 blur-3xl"
            />
            <div className="mx-auto max-w-7xl">

                {/* Section heading */}

                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full border uppercase border-[rgba(35,79,61,0.25)] bg-white/70 px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-(--green) sm:text-sm">
                        Why to Choose Prince Defence Academy?
                    </span>

                    <ScrollReveal animation="up">

                        <h2
                            id="why-choose-heading"
                            className="mt-4 montserrat text-2xl font-bold leading-tight text-(--navy) sm:text-3xl lg:text-4xl"
                        >
                            <span className="text-(--gold) montserrat"> Building </span>  Aspirants Into Future
                            Defence Professionals
                        </h2>

                    </ScrollReveal>

                    <p className="mt-4 text-xs leading-6 text-(--muted) inter sm:text-base lg:text-medium">
                        When it comes to taking admission at Prince Defence Academy Sikar, parents and students should know the key reasons why Prince Defense Academy is the best choice for defence & competitive exam preparation.


                    </p>
                </div>



                <div className="mt-12 grid items-stretch gap-8 lg:mt-16 lg:grid-cols-[0.8fr_1.2fr]">
                    <ScrollReveal animation="right" className="order-2 h-full lg:order-2">
                        <div className="h-full w-full">
                            {/* header */}
                            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-(--navy) sm:text-3xl">
                                Why students{" "}
                                <span className="bg-gradient-to-r from-(--navy) to-(--green) bg-clip-text text-transparent">
                                    choose us
                                </span>
                            </h3>

                            {/* list */}
                            <ul className="mt-6 grid w-full gap-3">
                                {reasons.map((reason) => (
                                    <li
                                        key={reason}
                                        className="group flex min-h-[50px] w-full items-center justify-start gap-4 rounded-2xl border border-white/70 bg-white/35 p-2 shadow-[0_12px_32px_rgba(16,42,67,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition-all duration-300 hover:bg-white/55 sm:p-4"
                                    >
                                        {/* icon */}
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--navy)/10 text-(--navy) ring-1 ring-(--navy)/20 transition-all duration-300 group-hover:bg-(--navy) group-hover:text-white group-hover:ring-(--navy)">
                                            <Check aria-hidden="true" size={15} />
                                        </span>

                                        {/* text: left-right justified, extra text wraps below */}
                                        <span className="line-clamp-3 min-w-0 flex-1 hyphens-auto break-words text-left text-sm font-medium leading-6 text-slate-700 transition-colors duration-300 group-hover:text-(--navy) sm:text-base sm:leading-7">
                                            {reason}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>





                    <ScrollReveal animation="left" className="order-1 h-full lg:order-1">
                        <div className="flex flex-col rounded-3xl bg-(--green) p-7 text-white sm:p-9 lg:h-180">
                            <span className="text-sm font-semibold tracking-widest text-(--gold)">
                                OUR TOTAL SELECTIONS
                            </span>
                            <div className="mt-5 flex items-end gap-2">
                                <span className="font-(--font-montserrat) text-5xl font-extrabold sm:text-6xl">
                                    3965
                                </span>
                                <span className="mb-2 text-white/70">Selections</span>
                            </div>
                            <div className="relative mt-6 h-48 w-full overflow-hidden rounded-2xl lg:h-80">
                                <Image
                                    src="/images/nda01.webp"
                                    alt="NDA selections"
                                    fill
                                    sizes="(max-width: 640px) calc(100vw - 40px), 50vw"
                                    quality={85}
                                    className="object-cover"
                                />
                            </div>
                            <p className="mt-5 max-w-md inter text-sm leading-6 text-white/75">
                                We empower young aspirants with the right guidance,
                                disciplined training, and expert mentorship to pursue
                                a career in the Armed Forces. Our focused approach
                                helps students build confidence, leadership,
                                determination, and a strong sense of service.
                            </p>
                            <Link
                                href="/results"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-(--gold)"
                            >
                                View Selection Results
                                <ArrowUpRight size={17} />
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>

            </div>
        </section>
    );
}