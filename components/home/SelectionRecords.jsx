"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";

const selections = [
    {
        batch: "1/2026",
        total: 182,
        detail: "X Group - 113, Y Group - 69",
    },
    {
        batch: "2/2025",
        total: 110,
        detail: "X Group - 67, Y Group - 43",
    },
    {
        batch: "1/2025",
        total: 85,
        detail: "X Group - 51, Y Group - 34",
    },
    {
        batch: "1/2025",
        total: 21,
        detail: "INDIAN NAVY - SSR",
    },
    {
        batch: "1/2025",
        total: 35,
        detail: "Tech - 10, GD - 19, Clerk - 6",
    },
    {
        batch: "2/2024",
        total: 28,
        detail: "INDIAN NAVY - SSR",
    },
    {
        batch: "1/2024",
        total: 78,
        detail: "X Group - 46, Y Group - 32",
    },
    {
        batch: "2/2023",
        total: 204,
        detail: "X Group - 119, Y Group - 85",
    },
    {
        batch: "1/2023",
        total: 174,
        detail: "X Group - 139, Y Group - 35",
    },
    {
        batch: "2/2023",
        total: 34,
        detail: "INDIAN NAVY - SSR",
    },
    {
        batch: "1/2023",
        total: 48,
        detail: "INDIAN NAVY - SSR",
    },
];

export default function SelectionRecords() {
    return (
        <section
            aria-labelledby="selection-records-title"
            className=" w-full px-0 bg-white"
        >
            <ScrollReveal animation="up" delay={100} duration={700}>
                <div className="w-full overflow-hidden px-0 pb-8 ">
                    <h2
                        id="selection-records-title"
                        className="montserrat p-4 text-center text-xl font-extrabold text-[var(--white)] bg-[var(--navy)] sm:text-2xl"
                    >
                        OUR SELECTIONS
                    </h2>

                    <div className="w-full mt-4 overflow-hidden">
                        <div className="selection-marquee-track flex w-max items-stretch gap-4">
                            {[...selections, ...selections].map((item, index) => (
                                <article
                                    key={`${item.batch}-${index}`}
                                    aria-hidden={index >= selections.length}
                                    className="relative flex min-h-[190px] w-[220px] flex-col overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-tr from-[#ABD2FA]/70 via-white to-white shadow-[0_16px_35px_rgba(15,23,42,0.12)] before:absolute before:left-0 before:top-0 before:h-20 before:w-20 before:rounded-tl-xl before:border-l-2 before:border-t-2 before:border-[#031968] sm:w-[240px]"
                                >
                                    <div className="flex h-full flex-1 flex-col items-center justify-between gap-3 pt-6 text-center">
                                        <div className="w-full px-2">
                                            <h3 className="montserrat text-sm font-bold leading-6 text-[var(--navy)] sm:text-base">
                                                {item.batch}
                                            </h3>
                                            <p className="mt-1 text-[11px] text-[var(--muted)]">
                                                {item.detail}
                                            </p>
                                        </div>

                                        <div className="w-full">
                                            <p className="font-[var(--font-montserrat)] text-2xl font-extrabold text-[var(--green)] sm:text-3xl">
                                                {item.total}
                                            </p>
                                            <span className="block text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                                                Selections
                                            </span>
                                        </div>

                                        <div className="w-full rounded-b-xl bg-gradient-to-r from-[#FCAD38] to-[#EB7F31] py-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                                            Batch Record
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            <style>{`
                @keyframes selection-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .selection-marquee-track {
                    animation: selection-marquee 28s linear infinite;
                }

                .selection-marquee-track:hover {
                    animation-play-state: paused;
                }

                @media (prefers-reduced-motion: reduce) {
                    .selection-marquee-track {
                        animation: none;
                    }
                }
            `}</style>
        </section>
    );
}
