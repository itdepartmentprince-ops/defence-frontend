import Link from "next/link";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";

const BlogArticleHeader = ({ blog }) => {
    if (!blog) {
        return null;
    }

    const publishedDate = blog.publishedAt
        ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : null;

    return (
        <header className="w-full">
            <div className="mx-auto w-full max-w-7xl pb-4 pt-20 sm:px-6 sm:pb-5 sm:pt-15 lg:px-10 lg:pb-6 lg:pt-15">
                {/* Back link */}
                {/* <Link
                    href="/blog"
                    className="
                        group mb-3 inline-flex items-center gap-1.5 rounded-full
                        border border-[#E1E8F3] bg-white px-3 py-1.5
                        text-xs font-semibold text-[var(--muted)]
                        transition-colors duration-300
                        hover:border-[#3869D0]/40 hover:text-[#3869D0]
                        focus-visible:outline focus-visible:outline-2
                        focus-visible:outline-offset-2 focus-visible:outline-[#3869D0]
                        sm:mb-4 sm:text-sm
                    "
                >
                    <ArrowLeft
                        size={14}
                        className="transition-transform duration-300 group-hover:-translate-x-0.5"
                    />
                    Back to Blogs
                </Link> */}

                {/* Header card */}
                <div
                    className="
                        relative w-full overflow-hidden rounded-xl
                        border border-[#E1E8F3] bg-white
                        py-3 pl-5 pr-4
                        shadow-[0_8px_24px_rgba(16,42,67,0.07)]
                        sm:rounded-2xl sm:py-4 sm:pl-7 sm:pr-6
                        lg:py-5 lg:pl-9 lg:pr-8
                    "
                >
                    {/* Gold accent bar */}
                    <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-1 bg-[#C9A227] sm:w-1.5"
                    />

                    {/* Title: single line */}
                    <h1
                        title={blog.title}
                        className="
                            truncate text-base font-bold leading-snug
                            tracking-tight text-[var(--navy)]
                            sm:text-lg lg:text-2xl
                        "
                    >
                        {blog.title}
                    </h1>

                    {/* Meta: category + author + date in one line */}
                    <div
                        className="
                            mt-2 flex min-w-0 flex-nowrap items-center
                            gap-x-3 overflow-hidden whitespace-nowrap
                            text-[11px] text-[var(--muted)]
                            sm:gap-x-4 sm:text-xs lg:text-sm
                        "
                    >
                        {blog.category?.name && (
                            <span className="shrink-0 rounded-full bg-[#C9A227]/10 px-2.5 py-0.5 font-semibold text-[#9A7A12]">
                                {blog.category.name}
                            </span>
                        )}

                        <div className="flex min-w-0 items-center gap-1.5">
                            <UserRound size={14} className="shrink-0 text-[#C9A227]" />
                            <span className="truncate">Prince</span>
                        </div>

                        {publishedDate && (
                            <div className="flex shrink-0 items-center gap-1.5">
                                <CalendarDays size={14} className="text-[#C9A227]" />
                                <time dateTime={blog.publishedAt}>{publishedDate}</time>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default BlogArticleHeader;
