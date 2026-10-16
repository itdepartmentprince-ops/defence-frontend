"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const BlogPagination = ({
    page,
    totalPages,
    onPageChange,
}) => {
    if (!totalPages || totalPages <= 1) {
        return null;
    }

    const getPages = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (
                let i = 1;
                i <= totalPages;
                i++
            ) {
                pages.push(i);
            }

            return pages;
        }

        pages.push(1);

        if (page > 3) {
            pages.push("...");
        }

        const start = Math.max(2, page - 1);
        const end = Math.min(
            totalPages - 1,
            page + 1
        );

        for (
            let i = start;
            i <= end;
            i++
        ) {
            pages.push(i);
        }

        if (page < totalPages - 2) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    };

    const pages = getPages();

    return (
        <nav
            aria-label="Blog pagination"
            className="mt-10 flex items-center justify-center gap-2"
        >
            {/* Previous */}

            <button
                type="button"
                disabled={page === 1}
                onClick={() =>
                    onPageChange(page - 1)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9E2F2] bg-white text-[var(--navy)] transition hover:border-[#3869D0] hover:text-[#3869D0] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
            >
                <ChevronLeft size={18} />
            </button>

            {/* Pages */}

            {pages.map(
                (item, index) =>
                    item === "..." ? (
                        <span
                            key={`dots-${index}`}
                            className="flex h-10 w-8 items-center justify-center text-sm text-[var(--muted)]"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={item}
                            type="button"
                            onClick={() =>
                                onPageChange(item)
                            }
                            aria-current={
                                page === item
                                    ? "page"
                                    : undefined
                            }
                            className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${
                                page === item
                                    ? "bg-[#102A43] text-white shadow-sm"
                                    : "border border-[#D9E2F2] bg-white text-[var(--navy)] hover:border-[#3869D0] hover:text-[#3869D0]"
                            }`}
                        >
                            {item}
                        </button>
                    )
            )}

            {/* Next */}

            <button
                type="button"
                disabled={
                    page === totalPages
                }
                onClick={() =>
                    onPageChange(page + 1)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9E2F2] bg-white text-[var(--navy)] transition hover:border-[#3869D0] hover:text-[#3869D0] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
            >
                <ChevronRight size={18} />
            </button>
        </nav>
    );
};

export default BlogPagination;