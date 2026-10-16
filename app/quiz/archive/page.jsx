// import Link from "next/link";
// import { ChevronLeft } from "lucide-react";
// import QuizArchiveDates from "@/components/quiz/QuizArchiveDates";

export const metadata = {
  title: "Quiz Archive | Prince Defence Academy",
  description: "Browse published daily quiz questions and answers from previous days.",
  alternates: {
    canonical: "/quiz/archive",
  },
};

export default function QuizArchiveIndexPage() {
  // Previous quiz archive UI is temporarily disabled. Uncomment the original return to restore.
  /*
  return (
    <main className="min-h-screen bg-[#F4F7FC] px-4 pb-20 pt-32 md:px-6 md:pt-36">
      <div className="mx-auto max-w-7xl">
        <Link href="/quiz" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#3869D0] hover:text-[#244A9A]">
          <ChevronLeft size={17} /> Back to daily quiz
        </Link>
        <QuizArchiveDates fullPage />
      </div>
    </main>
  );
  */

  return (
    <main className="min-h-screen bg-[#F4F7FC] px-4 py-32 text-center text-[var(--navy)]">
      Previous quizzes are temporarily unavailable.
    </main>
  );
}
