"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Newspaper } from "lucide-react";
import { toast } from "react-hot-toast";

import BlogCard from "@/components/blogs/BlogCard";
import BlogPagination from "@/components/blogs/BlogPagination";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { getPublicBlogs } from "@/services/blogService";

const PAGE_SIZE = 9;

const NewsListing = ({
    categoryId,
    initialBlogs = [],
    initialPagination,
    initialError = "",
}) => {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(
        initialPagination || {
            page: 1,
            limit: PAGE_SIZE,
            totalBlogs: 0,
            totalPages: 0,
        }
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(initialError);
    const skipInitialFetch = useRef(!initialError);

    useEffect(() => {
        if (skipInitialFetch.current) {
            skipInitialFetch.current = false;
            return;
        }

        if (!categoryId) {
            return;
        }

        let active = true;

        const fetchNews = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getPublicBlogs({
                    page,
                    limit: PAGE_SIZE,
                    category: categoryId,
                });

                if (!active) return;

                const newsOnly = (response?.data || []).filter(
                    (blog) =>
                        (blog?.category?._id || blog?.category) ===
                        categoryId
                );

                setBlogs(newsOnly);
                setPagination(
                    response?.pagination || {
                        page,
                        limit: PAGE_SIZE,
                        totalBlogs: 0,
                        totalPages: 0,
                    }
                );
            } catch (fetchError) {
                if (!active) return;

                console.error("Failed to fetch news:", fetchError);
                setBlogs([]);
                setError("News could not be loaded. Please try again.");
                toast.error("News could not be loaded. Please try again.", {
                    id: "news-list-load-error",
                });
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchNews();

        return () => {
            active = false;
        };
    }, [categoryId, page, initialError]);

    const handlePageChange = (nextPage) => {
        setPage(nextPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <main className="w-full overflow-x-hidden bg-white">
            {/* ---------- Hero ---------- */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1B3A] via-[#102A43] to-[#1F4E9C] px-4 pb-20 pt-28 text-white sm:px-8 sm:pb-24 sm:pt-36 lg:px-12 lg:pb-28">
                {/* Decorative rings and glows */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/10"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-14 h-56 w-56 rounded-full border border-white/10"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#C9A227]/10 blur-3xl"
                />

                <div className="relative mx-auto max-w-7xl">

                    <div className="mt-6 flex flex-col items-center text-center md:items-start md:text-left">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E8C95A] sm:text-xs">
                            <Newspaper size={14} aria-hidden="true" />
                            Defence updates
                        </span>

                        <h1 className="cinzel mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Latest{" "}
                            <span className="text-[var(--gold)]">Defence News</span>
                        </h1>

                        <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-[#C9A227] to-[#E8C95A]" />

                        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base lg:text-lg lg:leading-8">
                            Read the latest defence news and updates for aspiring
                            candidates.
                        </p>

                        <ul className="mt-7 flex flex-wrap justify-center gap-2 md:justify-start">
                            {["NDA", "CDS", "AFCAT", "Agniveer"].map((tag) => (
                                <li
                                    key={tag}
                                    className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm"
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Curved bottom edge */}
                <svg
                    aria-hidden="true"
                    viewBox="0 0 1440 48"
                    preserveAspectRatio="none"
                    className="absolute inset-x-0 bottom-0 h-8 w-full text-white sm:h-12"
                >
                    <path
                        fill="currentColor"
                        d="M0,48 L0,24 C240,0 480,0 720,16 C960,32 1200,40 1440,16 L1440,48 Z"
                    />
                </svg>
            </section>

            {/* ---------- Listing ---------- */}
            <section
                aria-label="News articles"
                className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 sm:py-14 lg:px-12"
            >
                {/* Section header */}
                {!loading && blogs.length > 0 && (
                    <div className="mb-8 flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                        <div className="flex items-center gap-3">
                            <span className="h-6 w-1 rounded-full bg-[#C9A227]" />
                            <h2 className="text-lg font-bold text-[var(--navy)] sm:text-xl">
                                All News
                            </h2>
                        </div>
                        {pagination.totalBlogs > 0 && (
                            <p className="text-sm text-slate-500">
                                {pagination.totalBlogs}{" "}
                                {pagination.totalBlogs === 1
                                    ? "News Article"
                                    : "News Articles"}
                            </p>
                        )}
                    </div>
                )}

                {error && (
                    <p
                        role="alert"
                        className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {error}
                    </p>
                )}

                {loading ? (
                    <div
                        aria-label="Loading news"
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
                    >
                        {Array.from({ length: PAGE_SIZE }, (_, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-2xl border border-[#D9E2F2] bg-white"
                            >
                                <div className="aspect-[16/10] animate-pulse bg-[#EEF3FF]" />
                                <div className="space-y-3 p-5">
                                    <div className="h-3 w-24 animate-pulse rounded bg-[#EEF3FF]" />
                                    <div className="h-5 animate-pulse rounded bg-[#EEF3FF]" />
                                    <div className="h-4 w-3/4 animate-pulse rounded bg-[#EEF3FF]" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : blogs.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        {blogs.map((blog, index) => (
                            <ScrollReveal
                                key={blog._id}
                                animation="up"
                                delay={(index % 3) * 80}
                                duration={600}
                                distance={20}
                                className="h-full min-w-0"
                            >
                                <BlogCard blog={blog} hrefBase="/news" />
                            </ScrollReveal>
                        ))}
                    </div>
                ) : (
                    !error && (
                        <div className="mx-auto max-w-lg rounded-3xl border border-[#DCE5F5] bg-gradient-to-br from-white to-[#F8F4E7] px-6 py-14 text-center shadow-sm">
                            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A227]/10 text-[#9A7A12]">
                                <Newspaper size={30} aria-hidden="true" />
                            </span>
                            <h2 className="mt-5 text-xl font-bold text-[var(--navy)]">
                                No news available yet
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                                Please check back soon for the latest updates.
                            </p>
                        </div>
                    )
                )}

                {!loading && pagination.totalPages > 1 && (
                    <div className="mt-12">
                        <BlogPagination
                            page={pagination.page}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </section>
        </main>
    );
};

export default NewsListing;
