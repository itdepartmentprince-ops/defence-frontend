"use client";

import { useState, useId } from "react";
import { ChevronDown } from "lucide-react";
import BlogRichText from "./BlogRichText";

const BlogFaq = ({ items = [] }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const baseId = useId();

    if (!Array.isArray(items)) return null;

    return (
        <div className="my-8 space-y-3 sm:my-10 sm:space-y-4">
            {items.map((item, index) => {
                if (!item) return null;
                const isOpen = openIndex === index;
                const panelId = `${baseId}-panel-${index}`;

                return (
                    <div
                        key={index}
                        className={`overflow-hidden rounded-xl border bg-white transition-all duration-200 sm:rounded-2xl ${
                            isOpen
                                ? "border-[#3869D0]/40 shadow-sm"
                                : "border-[#DCE5F5] hover:border-[#3869D0]/30"
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#3869D0] sm:px-6 sm:py-5"
                        >
                            <span className="min-w-0 text-[15px] font-semibold leading-6 text-[var(--navy)] sm:text-lg sm:leading-7">
                                <BlogRichText items={item.question} />
                            </span>

                            <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 sm:h-9 sm:w-9 ${
                                    isOpen
                                        ? "rotate-180 bg-[#3869D0] text-white"
                                        : "bg-[#F2F6FF] text-[#3869D0]"
                                }`}
                            >
                                <ChevronDown size={18} />
                            </span>
                        </button>

                        <div
                            id={panelId}
                            role="region"
                            className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            }`}
                        >
                            <div className="overflow-hidden">
                                <div className="border-t border-[#E7EDF7] px-4 pb-4 pt-4 text-sm leading-7 text-gray-600 sm:px-6 sm:pb-6 sm:text-base sm:leading-8">
                                    <BlogRichText items={item.answer} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BlogFaq;
