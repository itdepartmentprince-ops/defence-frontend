import AchieversClient from "@/components/achievers/AchieversClient";
import Achieversheader from "@/components/achievers/Achieversheader";

export const metadata = {
    title: "Defence Achievers & Selection Results | Prince Defence Academy",
    description:
        "Explore successful students of Prince Defence Academy, including NDA, Army, Navy and Air Force selections. Discover student achievements by category and year.",
};

export default async function AchieversCategoryPage({ params }) {
    const { slug } = await params;

    return (
        <>
            <Achieversheader />
            <AchieversClient
                key={slug}
                initialCategorySlug={slug}
            />
        </>
    );
}
