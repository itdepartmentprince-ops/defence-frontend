import Result from "@/components/result/Result";

export const metadata = {
    title: "NDA Selection Results | Prince Defence Academy",
    description:
        "Explore Prince Defence Academy NDA student selections organized by year.",
    alternates: {
        canonical: "/results/nda",
    },
};

export default function NDASResultsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Result category="nda" />
        </main>
    );
}
