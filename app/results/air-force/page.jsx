import Result from "@/components/result/Result";

export const metadata = {
    title: "Air Force Selection Results | Prince Defence Academy",
    description:
        "Explore Prince Defence Academy Air Force student selections organized by year.",
    alternates: {
        canonical: "/results/air-force",
    },
};

export default function AirForceResultsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Result category="air-force" />
        </main>
    );
}
