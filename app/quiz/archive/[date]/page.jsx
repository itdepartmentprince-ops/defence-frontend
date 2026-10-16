// import DailyQuizClient from "@/components/quiz/DailyQuizClient";

export async function generateMetadata({ params }) {
  const { date } = await params;
  return {
    title: `Daily Quiz Archive ${date} | Prince Defence Academy`,
    description: `Attempt the published defence quiz for ${date}.`,
    alternates: { canonical: `/quiz/archive/${date}` },
    robots: { index: false, follow: true },
  };
}

export default async function QuizArchivePage({ params }) {
  const { date } = await params;

  // Previous quiz attempt UI is temporarily disabled. Uncomment to restore.
  // return <DailyQuizClient archiveDate={date} />;
  return (
    <main className="min-h-screen bg-[#F4F7FC] px-4 py-32 text-center text-[var(--navy)]">
      Previous quizzes are temporarily unavailable.
    </main>
  );
}
