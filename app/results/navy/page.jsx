import Result from "@/components/result/Result";

export const metadata = {
    title: "Navy Selection Results | Prince Defence Academy",
    description:
        "Explore Prince Defence Academy Navy student selections organized by year.",
    alternates: {
        canonical: "/results/navy",
    },
};

export default function NavyResultsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Result category="navy" />
        </main>
    );
}
