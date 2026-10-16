import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import examData from "@/data/course.json";
import Toc from "@/components/others/Toc"
import ScrollReveal from "@/components/animations/ScrollReveal";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const exam = examData.exams.find((item) => item.slug === slug);

    if (!exam) {
        return {
            title: "Course guide not found | Prince Defence Academy",
        };
    }

    const description =
        exam.contentNote ||
        `${examData.description} Explore the ${exam.title} guide at Prince Defence Academy.`;

    return {
        title: `${exam.title} Preparation Guide | Prince Defence Academy`,
        description,
        alternates: {
            canonical: `/courses/${slug}`,
        },
        openGraph: {
            title: `${exam.title} Preparation Guide`,
            description,
            url: `/courses/${slug}`,
            type: "article",
            ...(exam.image ? { images: [exam.image] } : {}),
        },
    };
}

// Reusable content block renderer
function ContentBlock({ block }) {
    switch (block.type) {
        case "paragraph":
            return (
                <p className="text-[15px] leading-8 text-(--muted)">
                    {block.text}
                </p>
            );

        case "heading":
            return (
                <h3 className="mt-6 text-xl font-bold text-(--navy)">
                    {block.text || block.heading}
                </h3>
            );

        case "list":
            return (
                <ul className="space-y-3 pl-5">
                    {block.items?.map((item, i) => (
                        <li
                            key={i}
                            className="list-disc pl-1 text-[15px] leading-7 text-slate-600 marker:text-amber-500"
                        >
                            {typeof item === "string" ? item : item.text}
                        </li>
                    ))}
                </ul>
            );

        case "note":
            return (
                <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-5">
                    <p className="text-sm font-semibold leading-7 text-amber-950">
                        {block.text}
                    </p>
                </div>
            );

        case "link":
            return (
                <Link
                    href={block.url || "#"}
                    className="font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800"
                    target={block.url?.startsWith("http") ? "_blank" : undefined}
                    rel={block.url?.startsWith("http") ? "noreferrer" : undefined}
                >
                    {block.text || block.label || "Read More"}
                </Link>
            );

        case "image":
            return (
                <figure className="space-y-2">
                    <Image
                        src={block.src || block.url}
                        alt={block.alt || ""}
                        width={1200}
                        height={800}
                        sizes="(max-width: 768px) 100vw, 800px"
                        quality={85}
                        className="h-auto w-full rounded-2xl border border-slate-200 object-cover"
                    />
                    {block.caption && (
                        <figcaption className="text-center text-sm text-slate-500">
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );

        case "table":
            return (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full min-w-[500px] text-left text-sm">
                        {block.headers && (
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    {block.headers.map((header, i) => (
                                        <th key={i} className="px-5 py-4 font-semibold">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                        )}

                        <tbody className="divide-y divide-slate-100">
                            {block.rows?.map((row, i) => (
                                <tr key={i} className="odd:bg-white even:bg-slate-50">
                                    {(Array.isArray(row) ? row : Object.values(row)).map(
                                        (cell, j) => (
                                            <td
                                                key={j}
                                                className="px-5 py-4 text-slate-600"
                                            >
                                                {cell}
                                            </td>
                                        )
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        default:
            return null;
    }
}



export default async function Page({ params }) {
    const { slug } = await params;

    const exam = examData.exams.find(
        (item) => item.slug === slug
    );

    const allExam = examData.exams

    if (!exam) notFound();

    return (
        <main className="min-h-screen bg-slate-50 text-(--navy)">

            <section className="relative overflow-hidden bg-slate-950">
                <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl mt-30 items-center gap-10 px-5 py-6 md:grid-cols-2 md:py-24">
                    <ScrollReveal animation="right" delay="50" duration="700">

                        <div>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                                <span className="h-2 w-2 rounded-full bg-amber-400" />
                                {exam.category || "Defence Exam Guide"}
                            </div>

                            <h1 className="text-3xl font-black montserrat leading-tight text-white sm:text-4xl md:text-5xl">
                                {exam.title}
                            </h1>

                            <p className="mt-6 max-w-xl text-base leading-6 inter text-slate-300">
                                {exam.contentNote || examData.description}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href="#exam-content"
                                    className="rounded-xl bg-(--gold) px-6 py-3.5 text-sm font-bold text-white transition hover:bg-amber-400"
                                >
                                    Explore Exam Guide →
                                </a>


                            </div>
                        </div>
                    </ScrollReveal>


                    <ScrollReveal animation="left" delay="50" duration="700">

                        {exam.image && (
                            <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[360px] md:max-w-[440px]">
                                <div className="absolute -inset-3 rounded-3xl bg-amber-500/10 blur-xl" />
                                <Image
                                    src={exam.image}
                                    alt={exam.title}
                                    width={901}
                                    height={901}
                                    loading="eager"
                                    sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 440px"
                                    quality={100}
                                    className="h-auto w-full rounded-2xl object-contain"
                                />
                            </div>
                        )}

                    </ScrollReveal>
                </div>
            </section>


            <section
                id="exam-content"
                className="mx-auto grid max-w-7xl items-start gap-6 px-5 py-10
  lg:grid-cols-[300px_minmax(0,1fr)_300px]"
            >

                {/* TABLE OF CONTENTS */}

                <Toc sections={exam.sections} />


                {/* EXAM SECTIONS */}


                <div className="min-w-0 space-y-6">
                    {exam.sections?.map((section, i) => (
                        <article
                            key={section.id || i}
                            id={section.id}
                            className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
                        >
                            <ScrollReveal animation="up" delay="0" duration="700">
                                <div className="mb-6 flex items-start gap-4">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-sm font-black text-amber-700">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <div>
                                        <h2 className="text-xl font-extrabold montserrat leading-snug sm:text-2xl">
                                            {section.heading}
                                        </h2>
                                        <div className="mt-3 h-1 w-12 rounded-full bg-amber-500" />
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {section.blocks?.map((block, j) => (
                                        <ContentBlock key={j} block={block} />
                                    ))}
                                </div>
                            </ScrollReveal>
                        </article>
                    ))}
                </div>


                {examData.tocEnabled !== false && (
                        <aside className="top-28 self-start rounded-2xl border border-slate-200 bg-(--navy) p-5 shadow-sm lg:sticky">
                            <h2 className="mb-4 flex items-center gap-2 text-base text-white font-extrabold">
                                <span className="h-5 w-1 rounded-full bg-(--gold)" />
                                All Courses
                            </h2>

                            <div className="space-y-1">
                                {allExam.map((course) => (


                                    <Link
                                        key={course.slug}
                                        href={`/courses/${course.slug}`}
                                        aria-current={course.slug === slug ? "page" : undefined}
                                        className={`block rounded-lg px-3 py-2.5 text-sm leading-5 transition
    ${course.slug === slug
                                                ? "bg-amber-500 font-bold text-slate-950"
                                                : "text-white hover:bg-white/10 hover:text-amber-400"
                                            }`}
                                    >
                                        {course.title}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-6 rounded-xl bg-slate-950 p-4">
                                <p className="text-sm font-bold text-white">
                                    Prepare With Confidence
                                </p>
                                <p className="mt-2 text-xs leading-5 text-slate-400">
                                    Explore the complete exam guide and understand every topic.
                                </p>
                            </div>
                        </aside>
                )}

            </section>

            <ScrollReveal animation="up" delay="50" duration="700">

                <section className="px-5 pb-16">
                    <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-center sm:px-12">
                        <p className="text-sm font-bold uppercase tracking-widest text-(--gold)">
                            Prince Defence
                        </p>

                        <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                            Your Defence Journey Starts Here
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 inter text-(--muted)">
                            Stay focused, prepare smartly, and take the next step towards your
                            defence career.
                        </p>

                        <Link
                            href="/courses"
                            className="mt-7 inline-flex rounded-xl bg-(--gold) px-6 py-3.5 text-sm font-bold text-white transition hover:bg-amber-400"
                        >
                            Explore All Courses →
                        </Link>
                    </div>
                </section>
            </ScrollReveal>
        </main >
    );
}