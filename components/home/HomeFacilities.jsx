import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import facilities from "@/data/facilities.json";
import ScrollReveal from "@/components/animations/ScrollReveal";

const homeFacilities = facilities.facilities
    .filter((facility) => facility.onHome)
    .slice(0, 6);

export default function HomeFacilities() {
    return (
        <section
            aria-labelledby="home-facilities-heading"
            className="bg-white px-5 py-6 sm:px-8 lg:px-12 lg:py-20"
        >
            <div className="mx-auto max-w-7xl">
                <ScrollReveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
                    <h2
                        id="home-facilities-heading"
                        className="mt-4 montserrat text-2xl font-extrabold leading-tight text-(--navy) sm:text-3xl lg:text-4xl"
                    >
                        Our <span className="text-(--gold)">Facilities</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-(--muted) sm:text-base">
                        Explore the spaces and services that support focused
                        preparation, student wellbeing, and campus life.
                    </p>
                </ScrollReveal>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {homeFacilities.map((facility, index) => (
                        <ScrollReveal
                            key={facility.id}
                            animation={index % 2 === 0 ? "up" : "zoom"}
                            delay={Math.min(index * 50, 250)}
                            duration={500}
                            className="h-full"
                        >
                            <Link
                                href={`/facilities/${facility.slug}`}
                                aria-label={`Learn more about ${facility.title}`}
                                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_32px_rgba(8,24,48,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(8,24,48,0.2)]"
                            >
                                <div className="relative h-64 w-full overflow-hidden bg-slate-200 sm:h-72 lg:h-80">
                                    {facility.images?.[0] && (
                                        <Image
                                            src={facility.images[0]}
                                            alt={facility.title}
                                            fill
                                            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 50vw, 33vw"
                                            quality={85}
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#061A3A]/85 via-[#061A3A]/15 to-transparent" />
                                    <h3 className="absolute inset-x-5 bottom-5 text-center montserrat text-2xl font-extrabold text-white sm:text-3xl">
                                        {facility.title}
                                    </h3>
                                </div>

                                <div className="flex flex-1 flex-col p-5 sm:p-6">
                                    <p className="line-clamp-3 text-sm leading-6 text-(--muted)">
                                        {facility.longDescription}
                                    </p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-(--navy)">
                                        Learn More
                                        <ArrowUpRight
                                            aria-hidden="true"
                                            size={18}
                                            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                        />
                                    </span>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal className="mt-9 flex justify-center">
                    <Link
                        href="/facilities"
                        className="inline-flex items-center gap-2 rounded-xl border border-(--gold) bg-white px-5 py-3 text-sm font-semibold text-(--gold) transition hover:-translate-y-0.5 hover:bg-[#fffaf0]"
                    >
                        View All Facilities
                        <ArrowUpRight aria-hidden="true" size={17} />
                    </Link>
                </ScrollReveal>
            </div>
        </section>
    );
}
