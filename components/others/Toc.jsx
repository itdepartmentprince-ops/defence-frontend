
"use client";

import { useEffect, useState } from "react";

export default function Toc({ sections }) {
    const [activeId, setActiveId] = useState(sections?.[0]?.id || "");

    useEffect(() => {
        const sectionElements = sections
            ?.map((section) => document.getElementById(section.id))
            .filter(Boolean);

        if (!sectionElements?.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (first, second) =>
                            first.boundingClientRect.top -
                            second.boundingClientRect.top
                    );

                if (visibleSections[0]) {
                    setActiveId(visibleSections[0].target.id);
                }
            },
            {
                rootMargin: "-20% 0px -65% 0px",
                threshold: 0,
            }
        );

        sectionElements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [sections]);

    return (
        <aside className="top-28 self-start rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,35,65,0.12)] lg:sticky">
            <h2 className="mb-4 flex items-center gap-2 text-base montserrat font-extrabold">
                <span className="h-5 w-1 rounded-full bg-amber-500" />
                Table of Contents
            </h2>

            <div className="space-y-1">
                {sections?.map((section, i) => (
                    <a
                        key={section.id || i}
                        href={`#${section.id}`}
                        aria-current={activeId === section.id ? "location" : undefined}
                        className={`block rounded-lg px-3 py-2.5 text-sm leading-5 transition ${activeId === section.id
                                ? "bg-(--gold) font-bold text-white"
                                : "text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                            }`}
                    >
                        {section.heading}
                    </a>
                ))}
            </div>

            <div className="mt-6 rounded-xl bg-slate-950 p-4">
                <p className="text-sm font-bold text-white montserrat">
                    Prepare With Confidence
                </p>

                <p className="mt-2 text-xs leading-4 inter text-slate-400">
                    Explore the complete exam guide and understand every topic.
                </p>
            </div>
        </aside>
    );
}