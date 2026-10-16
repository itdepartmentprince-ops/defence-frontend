import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BlogCategories = ({ categories = [], activeSlug = "" }) => {
    if (!Array.isArray(categories) || categories.length === 0) return null;

    return (
        <aside className="rounded-2xl border border-[#DCE5F5] bg-white p-4 shadow-sm sm:p-6">
            <h2 className="mb-4 border-l-4 border-[#C9A227] pl-3 text-lg font-bold text-[var(--navy)] sm:text-xl">
                Blog Categories
            </h2>

            <nav aria-label="Blog categories">
                {/* Mobile: wrapped chips; Desktop: vertical list */}
                <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                    {categories.map((category) => {
                        if (!category?._id) return null;
                        const active = category.slug === activeSlug;

                        return (
                            <li key={category._id} className="lg:w-full">
                                <Link
                                    href={`/blog/category/${category.slug}`}
                                    aria-current={active ? "page" : undefined}
                                    className={`group flex items-center justify-between gap-3 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 lg:rounded-xl lg:border-transparent lg:py-3 ${
                                        active
                                            ? "border-[#3869D0] bg-[#3869D0] text-white lg:bg-[#F2F6FF] lg:text-[#3869D0]"
                                            : "border-[#DCE5F5] text-gray-600 hover:border-[#3869D0]/40 hover:bg-[#F2F6FF] hover:text-[#3869D0]"
                                    }`}
                                >
                                    <span>{category.name}</span>
                                    <ChevronRight
                                        size={16}
                                        className="hidden text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#3869D0] lg:block"
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default BlogCategories;
