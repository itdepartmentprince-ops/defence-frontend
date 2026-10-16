"use client";

import { Search, ChevronDown, X } from "lucide-react";

const fieldBase =
    "h-12 w-full rounded-xl border border-[#D9E2F2] bg-white text-sm text-[var(--navy)] shadow-[0_6px_20px_rgba(16,42,67,0.06)] outline-none transition duration-300 hover:shadow-[0_8px_26px_rgba(16,42,67,0.10)] focus:border-[#3869D0] focus:ring-4 focus:ring-[#3869D0]/10 sm:h-14 sm:rounded-2xl";

const BlogFilters = ({
    search,
    category,
    categories = [],
    onSearchChange,
    onCategoryChange,
}) => {
    return (
        <div className="mb-6 flex w-full flex-col gap-3 sm:mb-8 sm:gap-4 md:flex-row">
            {/* Search */}
            <div className="relative flex-1">
                <label htmlFor="blog-search" className="sr-only">
                    Search blogs
                </label>
                <Search
                    size={18}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8CA5]"
                />
                <input
                    id="blog-search"
                    type="search"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search blogs..."
                    className={`${fieldBase} pl-11 pr-11 placeholder:text-[#8A99AD] [&::-webkit-search-cancel-button]:hidden`}
                />
                {search && (
                    <button
                        type="button"
                        onClick={() => onSearchChange("")}
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#7B8CA5] transition-colors hover:bg-[#F2F6FF] hover:text-[#3869D0]"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Category */}
            <div className="relative w-full md:w-64">
                <label htmlFor="blog-category" className="sr-only">
                    Filter by category
                </label>
                <select
                    id="blog-category"
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className={`${fieldBase} cursor-pointer appearance-none pl-4 pr-11`}
                >
                    <option value="">All Categories</option>
                    {categories.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7B8CA5]"
                />
            </div>
        </div>
    );
};

export default BlogFilters;
