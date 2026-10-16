import DailyQuizClient from "@/components/quiz/DailyQuizClient";

export const metadata = {
  title: "Daily Quiz | Prince Defence Academy",
  description: "Practice daily defence questions across scheduled categories, check your score, and review answers with explanations.",
  alternates: {
    canonical: "/quiz",
  },
};

export default function QuizPage() {
  return <DailyQuizClient />;
}
