"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Trophy, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { getPublicAchieverCategories, getPublicAchievers } from "@/services/achieverService";
import AchieverCard, { AchieverCardSkeleton } from "@/components/achievers/AchieverCard";
import ScrollReveal from "@/components/animations/ScrollReveal";

const PAGE_SIZE = 12;

export default function AchieversClient({ initialCategorySlug = "" }) {
    const router = useRouter();
    const fetchSequence = useRef(0);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(
        initialCategorySlug || "all"
    );
    const [years, setYears] = useState([]);
    const [yearResults, setYearResults] = useState({});
    const [yearPages, setYearPages] = useState({});
    const [yearLoading, setYearLoading] = useState({});
    const [yearErrors, setYearErrors] = useState({});
    const [totalResults, setTotalResults] = useState(0);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadCategories() {
            setCategoriesLoading(true);

            try {
                const response = await getPublicAchieverCategories();
                const data = response?.data;

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.items)
                        ? data.items
                        : [];

                const activeCategories = list.filter(
                    (category) => category.isActive !== false
                );

                if (!active) return;

                setCategories(activeCategories);
            } catch (err) {
                if (active) {
                    setError(err?.message || "Categories load nahi ho sakin.");
                }
            } finally {
                if (active) setCategoriesLoading(false);
            }
        }

        loadCategories();

        return () => {
            active = false;
        };
    }, []);

    const fetchAchievers = useCallback(async () => {
        const requestSequence = ++fetchSequence.current;
        setLoading(true);
        setError("");
        setYears([]);
        setYearResults({});
        setYearPages({});
        setYearLoading({});
        setYearErrors({});
        setTotalResults(0);

        try {
            const categorySlug =
                selectedCategory === "all" ? "" : selectedCategory;
            const response = await getPublicAchievers(
                categorySlug,
                {
                    page: 1,
                    limit: 1,
                    sort: "newest",
                }
            );

            if (requestSequence !== fetchSequence.current) return;

            const result = response?.data;
            if (!Array.isArray(result?.years)) {
                throw new Error("Achiever years could not be loaded.");
            }

            const availableYears = result.years.map(String);
            setYears(availableYears);
            setTotalResults(
                Number(result.pagination?.total ?? 0)
            );
            setYearPages(
                Object.fromEntries(availableYears.map((year) => [year, 1]))
            );

            const yearResponses = await Promise.all(
                availableYears.map(async (year) => {
                    const yearResponse = await getPublicAchievers(
                        categorySlug,
                        {
                            page: 1,
                            limit: PAGE_SIZE,
                            year,
                            sort: "newest",
                        }
                    );
                    const yearResult = yearResponse?.data;

                    if (
                        !Array.isArray(yearResult?.items) ||
                        !yearResult?.pagination
                    ) {
                        throw new Error(`Achievers for ${year} could not be loaded.`);
                    }

                    return [
                        year,
                        {
                            items: yearResult.items,
                            pagination: yearResult.pagination,
                        },
                    ];
                })
            );

            if (requestSequence !== fetchSequence.current) return;

            setYearResults(Object.fromEntries(yearResponses));
        } catch (err) {
            if (requestSequence !== fetchSequence.current) return;

            setYears([]);
            setYearResults({});
            setError(err?.message || "Achievers load nahi ho sake.");
        } finally {
            if (requestSequence === fetchSequence.current) {
                setLoading(false);
            }
        }
    }, [selectedCategory]);

    const fetchYearPage = useCallback(async (year, nextPage) => {
        const yearKey = String(year);
        const requestSequence = fetchSequence.current;
        setYearLoading((current) => ({ ...current, [yearKey]: true }));
        setYearErrors((current) => ({ ...current, [yearKey]: "" }));

        try {
            const response = await getPublicAchievers(
                selectedCategory === "all" ? "" : selectedCategory,
                {
                    page: nextPage,
                    limit: PAGE_SIZE,
                    year: yearKey,
                    sort: "newest",
                }
            );
            const result = response?.data;

            if (requestSequence !== fetchSequence.current) return;

            if (!Array.isArray(result?.items) || !result?.pagination) {
                throw new Error(`Achievers for ${yearKey} could not be loaded.`);
            }

            setYearResults((current) => ({
                ...current,
                [yearKey]: {
                    items: result.items,
                    pagination: result.pagination,
                },
            }));
            setYearPages((current) => ({ ...current, [yearKey]: nextPage }));
        } catch (err) {
            if (requestSequence !== fetchSequence.current) return;

            setYearErrors((current) => ({
                ...current,
                [yearKey]: {
                    message:
                        err?.message ||
                        `Achievers for ${yearKey} could not be loaded.`,
                    page: nextPage,
                },
            }));
        } finally {
            if (requestSequence === fetchSequence.current) {
                setYearLoading((current) => ({ ...current, [yearKey]: false }));
            }
        }
    }, [selectedCategory]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAchievers();
        }, 250);

        return () => {
            clearTimeout(timer);
            fetchSequence.current += 1;
        };
    }, [fetchAchievers]);

    const changeCategory = (slug) => {
        setSelectedCategory(slug);
        router.push(
            slug === "all"
                ? "/achievers"
                : `/achievers/${encodeURIComponent(slug)}`,
            { scroll: false }
        );
    };

    return (
        <main className="min-h-screen overflow-hidden bg-gradient-to-b from-white via-[#EFF3FF] to-[#EFF3FF] text-[#102a43]">
            <section className="px-4 py-10 sm:px-6 lg:py-16">
                <div className="mx-auto max-w-7xl">
                    {/*  heading  */}
                    <ScrollReveal className="mx-auto mb-10 max-w-2xl text-center">
                        <p className="inline-flex items-center gap-2 rounded-full border border-[#e9dcb6] bg-[#fbf3dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#8a6a1f]">
                            <Trophy size={14} />
                            Hall of Fame
                        </p>
                        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Our Student <span className="text-[#b89242]">Achievers</span>
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                            Meet the students who turned dedication and discipline into selection.
                        </p>
                    </ScrollReveal>

                    {/*  filters  */}
                    <ScrollReveal className="mb-6">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <nav
                                aria-label="Filter achievers by category"
                                className="flex flex-nowrap gap-2 overflow-x-auto overscroll-x-contain whitespace-nowrap pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
                            >
                                {categoriesLoading && (
                                    <span className="text-sm text-slate-500">
                                        Loading categories...
                                    </span>
                                )}
                                {!categoriesLoading && categories.length === 0 && (
                                    <span className="text-sm text-slate-500">
                                        No categories available.
                                    </span>
                                )}
                                {[
                                    { _id: "all", name: "All Results", slug: "all" },
                                    ...categories,
                                ].map((category) => {
                                        const isActive = selectedCategory === category.slug;

                                        return (
                                            <button
                                                key={category._id || category.slug}
                                                type="button"
                                                onClick={() => changeCategory(category.slug)}
                                                aria-pressed={isActive}
                                                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                                                    isActive
                                                        ? "bg-[#102a43] text-white"
                                                        : "border border-slate-200 bg-white text-[#102a43] hover:border-[#b89242] hover:text-[#17395c]"
                                                }`}
                                            >
                                                {category.name}
                                            </button>
                                        );
                                    })}
                            </nav>

                            <p className="shrink-0 text-sm text-slate-500">
                                {totalResults} result{totalResults === 1 ? "" : "s"} found
                            </p>
                        </div>
                    </ScrollReveal>

                    {/*  error  */}
                    {error && (
                        <ScrollReveal className="mb-6 flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
                            <p>{error}</p>
                            <button
                                type="button"
                                onClick={fetchAchievers}
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 font-semibold hover:bg-red-100"
                            >
                                <RefreshCw size={15} />
                                Retry
                            </button>
                        </ScrollReveal>
                    )}

                    {/*  results  */}
                    {loading ? (
                        <ScrollReveal className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <AchieverCardSkeleton key={index} />
                                ))}
                        </ScrollReveal>
                    ) : years.length === 0 ? (
                        <ScrollReveal className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-[#d5deec] bg-white/70 px-5 text-center">
                            <div className="grid size-16 place-items-center rounded-2xl bg-[#fbf3dc] text-[#b89242]">
                                <Trophy size={30} />
                            </div>
                            <h3 className="mt-5 text-xl font-bold">No achievers found</h3>
                            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                                No published achievers are available in this category.
                            </p>
                        </ScrollReveal>
                    ) : (
                        <div className="space-y-10">
                            {years.map((year) => {
                                const yearResult = yearResults[year];
                                const students = yearResult?.items || [];
                                const pagination = yearResult?.pagination;
                                const page = Number(yearPages[year] || 1);
                                const totalPages = Math.max(
                                    1,
                                    Number(pagination?.totalPages || 1)
                                );

                                return (
                                <section
                                    key={year}
                                    aria-labelledby={`achievers-year-${year.replace(/[^a-zA-Z0-9]/g, "-")}`}
                                >
                                  <ScrollReveal delay={80}>
                                    <h2
                                        id={`achievers-year-${year.replace(/[^a-zA-Z0-9]/g, "-")}`}
                                        className="mb-5 flex items-center gap-3 text-xl font-bold text-[#102a43] sm:text-2xl"
                                    >
                                        <span>{year}</span>
                                        <span className="h-px flex-1 bg-gradient-to-r from-[#b89242]/50 to-transparent" />
                                        <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500">
                                            {pagination?.total ?? students.length}{" "}
                                            {(pagination?.total ?? students.length) === 1
                                                ? "achiever"
                                                : "achievers"}
                                        </span>
                                    </h2>
                                  </ScrollReveal>

                                    {yearErrors[year] && (
                                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                            <p>{yearErrors[year].message}</p>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    fetchYearPage(
                                                        year,
                                                        yearErrors[year].page
                                                    )
                                                }
                                                className="font-semibold underline"
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                                        {students.map((student, index) => (
                                            <ScrollReveal
                                                key={student._id}
                                                animation="up-zoom"
                                                delay={Math.min(index * 70, 210)}
                                                duration={600}
                                                distance={24}
                                                className="h-full"
                                            >
                                                <AchieverCard student={student} />
                                            </ScrollReveal>
                                        ))}
                                    </div>

                                    {pagination && (
                                        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-[#e6ebf3] bg-white p-4 shadow-[0_4px_20px_rgba(16,42,67,0.05)] sm:flex-row sm:items-center sm:justify-between">
                                            <p className="text-center text-sm text-slate-500 sm:text-left">
                                                {year} — Page{" "}
                                                <strong className="text-[#102a43]">{page}</strong>{" "}
                                                of{" "}
                                                <strong className="text-[#102a43]">{totalPages}</strong>
                                            </p>

                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    disabled={page <= 1 || yearLoading[year]}
                                                    onClick={() => fetchYearPage(year, page - 1)}
                                                    className="inline-flex items-center gap-1 rounded-xl border border-[#e3e9f2] bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[#f6f8fc] disabled:cursor-not-allowed disabled:opacity-40"
                                                >
                                                    <ChevronLeft size={17} />
                                                    Previous
                                                </button>

                                                <button
                                                    type="button"
                                                    disabled={page >= totalPages || yearLoading[year]}
                                                    onClick={() => fetchYearPage(year, page + 1)}
                                                    className="inline-flex items-center gap-1 rounded-xl bg-[#102a43] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#17395c] disabled:cursor-not-allowed disabled:opacity-40"
                                                >
                                                    {yearLoading[year] ? "Loading..." : "Next"}
                                                    {!yearLoading[year] && <ChevronRight size={17} />}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </section>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
