

import { Trophy } from "lucide-react";
import result from "@/data/results.json";
import ScrollReveal from "../animations/ScrollReveal";
import ProspectusCard from "./ProspectusCard";
import Image from "next/image";
import Link from "next/link";
import ResultsSlider from "./ResultsSlider";
import YearResultImage from "./YearResultImage";

const resultCategories = [
    { label: "All Results", href: "/results", value: "all" },
    { label: "Air Force", href: "/results/air-force", value: "air-force" },
    { label: "Army", href: "/results/army", value: "army" },
    { label: "Navy", href: "/results/navy", value: "navy" },
    { label: "NDA", href: "/results/nda", value: "nda" },
];

const matchesCategory = (item, category) => {
    if (category === "all") return true;

    const searchable = `${item.title} ${item.category}`.toLowerCase();

    if (category === "air-force") return searchable.includes("air force");
    if (category === "army") return searchable.includes("army");
    if (category === "navy") return searchable.includes("navy");
    if (category === "nda") return searchable.includes("nda");

    return false;
};

const getYear = (date) => {
    const year = date.match(/\b20\d{2}(?:-\d{2})?\b/);
    return year ? year[0] : "Other";
};

const Result = ({ category = "all" }) => {
    const activeCategory =
        resultCategories.find((item) => item.value === category) ||
        resultCategories[0];
    const filteredResults = result.result.filter((item) =>
        matchesCategory(item, activeCategory.value)
    );
    const groupedResults = Object.groupBy(
        filteredResults,
        (item) => getYear(item.date)
    );
    const years = Object.keys(groupedResults).sort((first, second) =>
        second.localeCompare(first, undefined, { numeric: true })
    );

    return (
        <section
            id="results"
            aria-labelledby="results-heading"
            className="bg-(--white)"
        >
            {/* Results Hero */}




            <header className="relative isolate overflow-hidden bg-gradient-to-br from-[#000825] via-[#001D87] to-[#002CCD] px-4 pb-8 pt-30 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-20 lg:pt-36">
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:48px_48px]" />

                <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full border border-white/10 sm:h-96 sm:w-96" />
                <div className="pointer-events-none absolute -right-8 -top-12 -z-10 h-52 w-52 rounded-full border border-white/10 sm:h-72 sm:w-72" />

                <ScrollReveal className="mx-auto max-w-7xl">
                    <div>
                        <div className="flex items-center justify-center gap-3 lg:justify-start">
                            

                            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-blue-100 sm:text-sm">
                                <Trophy size={16} aria-hidden="true" />
                                OUR RESULTS
                            </span>

                            
                        </div>

                        <div className="mt-5 grid items-center gap-2 sm:mt-9 sm:gap-8 lg:mt-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
                            <div className="relative text-center lg:text-left">
                                <h2
                                    id="results-heading"
                                    className="montserrat text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl sm:leading-[1.2] md:text-5xl lg:text-6xl"
                                >
                                    {activeCategory.value === "all"
                                        ? "Year After Year, We Deliver"
                                        : `${activeCategory.label} Selection`}{" "}
                                    <span className="bg-gradient-to-r from-[#94E6FE] via-[#ADD4BD] to-[#FFAA22] bg-clip-text text-transparent">
                                        Results
                                    </span>
                                </h2>

                                <div className="mt-1 flex items-center justify-center gap-2 sm:mt-6 lg:justify-start">
                                    <span className=" hidden lg:block h-1 w-16 rounded-full bg-[#94E6FE]" />
                                        
                                </div>
                            </div>

                            <div className="relative lg:border-l lg:border-white/20 lg:pl-8">
                                <div className="absolute -left-px top-0 hidden h-12 w-0.5 bg-[#FFAA22] lg:block" />

                                <p className="inter text-center text-sm leading-6 text-white/90 sm:text-base sm:leading-8 md:text-justify">
                                    Explore our selection achievements and see the consistent success of our students across defence and government recruitment examinations.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </header>




            <ScrollReveal>
                <ResultsSlider
                    key={activeCategory.value}
                    category={activeCategory.value}
                />
            </ScrollReveal>

            {/* Selection Records */}
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
                <header className="mb-8">
                    <p className="text-xs font-bold tracking-[0.2em] text-(--gold)">
                        SELECTION RECORDS
                    </p>

                    <h3 className="mt-2 font-(--font-montserrat) text-2xl font-bold text-(--navy) sm:text-3xl">
                        {activeCategory.value === "all"
                            ? "Selection Records by Year"
                            : `${activeCategory.label} Results by Year`}
                    </h3>

                    <nav
                        aria-label="Filter results by defence force"
                        className="mt-6 flex flex-nowrap gap-2 overflow-x-auto overscroll-x-contain whitespace-nowrap pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
                    >
                        {resultCategories.map((item) => (
                            <Link
                                key={item.value}
                                href={item.href}
                                aria-current={
                                    item.value === activeCategory.value
                                        ? "page"
                                        : undefined
                                }
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${item.value === activeCategory.value
                                    ? "bg-(--navy) text-white"
                                    : "border border-slate-200 bg-white text-(--navy) hover:border-(--gold) hover:text-(--green)"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </header>

                {years.length ? (
                    <div className="space-y-10">
                        {years.map((year) => (
                            <section
                                key={year}
                                aria-labelledby={`results-year-${year.replace(/[^a-zA-Z0-9]/g, "-")}`}
                            >
                                <ScrollReveal>
                                    <div className="mb-5 flex items-center gap-3">
                                        <h4
                                            id={`results-year-${year.replace(/[^a-zA-Z0-9]/g, "-")}`}
                                            className="flex min-w-0 flex-1 items-center gap-3 font-(--font-montserrat) text-xl font-bold text-(--navy) sm:text-2xl"
                                        >
                                            <span>{year}</span>
                                            <span className="h-px flex-1 bg-gradient-to-r from-(--gold)/50 to-transparent" />
                                        </h4>
                                        <YearResultImage
                                            year={year}
                                            category={activeCategory.value}
                                        />
                                    </div>
                                </ScrollReveal>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {groupedResults[year].map((item, index) => (
                                        <ScrollReveal
                                            key={`${item.title}-${item.date}-${index}`}
                                            animation="up"
                                            delay={Math.min(index * 45, 225)}
                                            duration={450}
                                            className="h-full"
                                        >
                                            <article className="group relative flex h-full min-h-56 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,35,65,0.06)] transition duration-300 hover:-translate-y-1 hover:border-(--gold)/50 hover:shadow-[0_18px_36px_rgba(15,35,65,0.12)]">
                                                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-(--navy) via-(--gold) to-(--green)" />

                                                <div className="flex flex-1 flex-col p-5">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <span className="inline-flex rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-semibold text-(--navy)">
                                                            {item.date}
                                                        </span>
                                                        <Trophy
                                                            size={18}
                                                            aria-hidden="true"
                                                            className="shrink-0 text-(--gold) transition-transform group-hover:scale-110"
                                                        />
                                                    </div>

                                                    <h5 className="montserrat mt-4 text-sm font-bold leading-6 text-(--navy) sm:text-base">
                                                        {item.title}
                                                    </h5>

                                                    <div className="mt-auto pt-5">
                                                        <p className="font-(--font-montserrat) text-4xl font-extrabold leading-none text-(--green) sm:text-5xl">
                                                            {item.selections}
                                                        </p>
                                                        <span className="mt-1 block text-xs font-medium uppercase tracking-[0.14em] text-(--muted)">
                                                            Selections
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="border-t border-slate-100 bg-[#f8fafc] px-5 py-3 text-xs font-semibold leading-5 text-(--muted) sm:text-sm">
                                                    {item.category}
                                                </p>
                                            </article>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                ) : (
                    <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-(--muted)">
                        No {activeCategory.label} results are available yet.
                    </p>
                )}
            </div>

            {/* Prospectus */}
            <div className="relative mx-auto w-full">

                <Image
                    src="/images/Prince Defence Results.webp"
                    alt="Prince Defence Academy Defence Results"
                    width={1000}
                    height={764}
                    loading="lazy"
                    quality={100}
                    className="
              mx-auto
              h-auto
              
              object-cover
            "
                />

            </div>
            <ProspectusCard />
        </section>
    );
};

export default Result;