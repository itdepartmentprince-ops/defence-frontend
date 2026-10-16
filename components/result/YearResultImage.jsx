import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";

const YearResultImage = ({ year, category }) => (
    <Link
        href={`/results/image/${encodeURIComponent(year)}/${category}`}
        aria-label={`View ${category} results image for ${year}`}
        className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-(--navy) px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-(--green) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--gold) sm:px-4 sm:text-sm"
    >
        <ImageIcon size={16} aria-hidden="true" />
        View All Results for {year}
    </Link>
);

export default YearResultImage;
