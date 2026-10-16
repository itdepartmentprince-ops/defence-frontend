import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getExamLabel, getResultImage } from "@/components/result/resultImages";

export async function generateMetadata({ params }) {
    const { year, exam } = await params;
    const examLabel = getExamLabel(exam);

    return {
        title: examLabel
            ? `${examLabel} Results ${year} | Prince Defence Academy`
            : "Results image not found | Prince Defence Academy",
        description: examLabel
            ? `View Prince Defence Academy ${examLabel} results for ${year}.`
            : "The requested results image could not be found.",
    };
}

export default async function ResultImagePage({ params }) {
    const { year, exam } = await params;
    const examLabel = getExamLabel(exam);

    if (!/^(20\d{2}(?:-\d{2})?|Other)$/.test(year) || !examLabel) {
        notFound();
    }

    const src = getResultImage(year, exam);

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-30 sm:px-8 sm:py-32">
            <div className="mx-auto max-w-7xl">
                <Link
                    href={
                        exam === "all" || exam === "other"
                            ? "/results"
                            : `/results/${exam}`
                    }
                    className="mb-6 inline-flex items-center gap-2 rounded-full bg-(--navy) px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-(--green) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold)"
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back to Results
                </Link>

                <h1 className="mb-5 font-(--font-montserrat) text-2xl font-bold text-(--navy) sm:text-3xl">
                    {examLabel} Results {year}
                </h1>

                <Image
                    src={src}
                    alt={`Prince Defence Academy ${examLabel} results for ${year}`}
                    width={1600}
                    height={1000}
                    sizes="(max-width: 768px) 100vw, 1280px"
                    className="block h-auto w-full"
                    priority
                />
            </div>
        </main>
    );
}
