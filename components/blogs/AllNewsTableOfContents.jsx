"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { getPublicBlogs } from "@/services/blogService";

const PAGE_SIZE = 50;

const AllNewsTableOfContents = ({
    news = [],
    categoryId,
    currentSlug,
    initialPagination,
}) => {
    const [items, setItems] = useState(news);
    const [pagination, setPagination] = useState(initialPagination);
    const [loading, setLoading] = useState(false);

    const handleLoadMore = async () => {
        if (!categoryId || loading || !pagination?.totalPages) {
            return;
        }

        setLoading(true);

        try {
            const response = await getPublicBlogs({
                page: pagination.page + 1,
                limit: PAGE_SIZE,
                category: categoryId,
            });
            const nextNews = (response?.data || []).filter(
                (blog) =>
                    (blog?.category?._id || blog?.category) ===
                    categoryId
            );

            setItems((current) => {
                const existingIds = new Set(
                    current.map((blog) => blog._id)
                );
                return [
                    ...current,
                    ...nextNews.filter(
                        (blog) => !existingIds.has(blog._id)
                    ),
                ];
            });
            setPagination(response?.pagination || pagination);
        } catch (error) {
            console.error("Failed to load more news:", error);
            toast.error("More news could not be loaded. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <aside className="w-full rounded-2xl border border-slate-200 bg-(--navy) p-4 shadow-[0_12px_35px_rgba(15,35,65,0.12)] sm:rounded-3xl sm:p-6">
            <div className="mb-5">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-(--gold)">
                    Defence updates
                </span>
                <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                    All News
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-300">
                    {pagination?.totalBlogs ?? items.length} published news articles
                </p>
            </div>

            {items.length > 0 ? (
                <nav
                    aria-label="All news articles"
                    className="max-h-[70vh] overflow-y-auto pr-1"
                >
                    <ol className="space-y-2">
                        {items.map((item, index) => {
                            const active = item.slug === currentSlug;
                            const publishedDate = item.publishedAt
                                ? new Date(
                                      item.publishedAt
                                  ).toLocaleDateString("en-IN", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                  })
                                : null;

                            return (
                                <li key={item._id}>
                                    <Link
                                        href={`/news/${item.slug}`}
                                        aria-current={
                                            active ? "page" : undefined
                                        }
                                        className={`group flex gap-3 rounded-xl border px-3 py-3 transition-colors duration-200 ${
                                            active
                                                ? "border-(--gold) bg-(--gold) text-white"
                                                : "border-white/10 bg-white/5 text-slate-200 hover:border-white/25 hover:bg-white/10"
                                        }`}
                                    >
                                        <span
                                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                                                active
                                                    ? "bg-white/15 text-white"
                                                    : "bg-white/10 text-(--gold)"
                                            }`}
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="line-clamp-2 block text-sm font-semibold leading-5">
                                                {item.title}
                                            </span>
                                            {publishedDate && (
                                                <span
                                                    className={`mt-2 flex items-center gap-1.5 text-[11px] ${
                                                        active
                                                            ? "text-white/75"
                                                            : "text-slate-400"
                                                    }`}
                                                >
                                                    <CalendarDays
                                                        size={13}
                                                        aria-hidden="true"
                                                    />
                                                    {publishedDate}
                                                </span>
                                            )}
                                        </span>
                                        <ArrowRight
                                            size={15}
                                            aria-hidden="true"
                                            className={`mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                                                active
                                                    ? "text-white"
                                                    : "text-(--gold)"
                                            }`}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            ) : (
                <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-5 text-sm text-slate-300">
                    No other news articles are available.
                </p>
            )}

            {pagination?.page < pagination?.totalPages && (
                <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 disabled:cursor-wait disabled:opacity-60"
                >
                    {loading ? (
                        <>
                            <Loader2
                                size={16}
                                className="animate-spin"
                                aria-hidden="true"
                            />
                            Loading news...
                        </>
                    ) : (
                        "Load more news"
                    )}
                </button>
            )}
        </aside>
    );
};

export default AllNewsTableOfContents;
