import { notFound } from "next/navigation";
import facilitiesData from "@/data/facilities.json";
import FacilityDetails from "@/components/facilities/FacilitiesDatails";


export function generateStaticParams() {
  return facilitiesData.facilities.map((facility) => ({
    slug: facility.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const facility = facilitiesData.facilities.find(
    (item) => item.slug === slug
  );

  return facility
    ? {
      title: `${facility.title} | Prince Defence Academy`,
      description: facility.shortDescription,
    }
    : {};
}

export default async function FacilityPage({ params }) {
  const { slug } = await params;
  const facility = facilitiesData.facilities.find(
    (item) => item.slug === slug
  );

  if (!facility) {
    notFound();
  }

  return <FacilityDetails facility={facility} />
}