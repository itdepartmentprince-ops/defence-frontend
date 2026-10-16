import Result from "@/components/result/Result";

export const metadata = {
    title: "Army Selection Results | Prince Defence Academy",
    description:
        "Explore Prince Defence Academy Army student selections organized by year.",
    alternates: {
        canonical: "/results/army",
    },
};

export default function ArmyResultsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Result category="army" />
        </main>
    );
}
