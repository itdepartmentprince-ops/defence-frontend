"use client";

import Link from "next/link";
import useActiveBlogHeading from "./useActiveBlogHeading";

const BlogTableOfContents = ({ content = [] }) => {
    const { headings, activeId } = useActiveBlogHeading(content);

    if (headings.length === 0) {
        return null;
    }

    return (
        <aside className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,35,65,0.12)] sm:rounded-3xl sm:p-6">
            <div className="mb-5">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-(--gold)">
                    Currently Reading
                </span>
                <p className="mt-1 text-xs font-semibold leading-4 text-[var(--navy)]">
                    {headings.find(({ id }) => id === activeId)?.text || headings[0].text}
                </p>
                <h2 className="mt-4 text-lg font-bold text-[var(--navy)]">
                    Table of Contents
                </h2>
            </div>

            <nav aria-label="Table of Contents">
                <ol className="space-y-1">
                    {headings.map((heading, index) => (
                        <li key={heading.id}>
                            <Link
                                href={`#${heading.id}`}
                                aria-current={activeId === heading.id ? "location" : undefined}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-xs leading-5 transition-colors duration-200 ${
                                    activeId === heading.id
                                        ? "bg-(--gold) font-bold text-white"
                                        : "text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                                }`}
                            >
                                <span className={`flex h-6 w-6 shrink-0 items-center justify-center text-xs font-semibold ${
                                    activeId === heading.id ? "text-white" : "text-(--gold)"
                                }`}>
                                    {String(index + 1).padStart(
                                        2,
                                        "0"
                                    )}
                                </span>

                                <span className="line-clamp-2">
                                    {heading.text}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ol>
            </nav>
        </aside>
    );
};

export default BlogTableOfContents;