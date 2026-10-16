
import AchieversClient from "@/components/achievers/AchieversClient";
import Achieversheader from "@/components/achievers/Achieversheader";

export const metadata = {
    title: "Defence Achievers & Selection Results | Prince Defence Academy",
    description:
        "Explore successful students of Prince Defence Academy, including NDA, Army, Navy and Air Force selections. Discover student achievements by category and year.",
    alternates: {
        canonical: "/achievers",
    },
};

export default function AchieversPage() {
    return (
        <>
            <Achieversheader />
            <AchieversClient key="all" />
        </>
    );
}
