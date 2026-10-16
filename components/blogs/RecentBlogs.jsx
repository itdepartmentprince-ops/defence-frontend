import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";

const RecentBlogs = ({ blogs = [] }) => {
    if (!Array.isArray(blogs) || blogs.length === 0) return null;

    return (
        <aside className="overflow-hidden rounded-2xl border border-[#DCE5F5] bg-white shadow-[0_12px_32px_rgba(15,35,65,0.12)] sm:rounded-3xl">
            <div className="border-b border-[#E7EDF7] bg-gradient-to-r from-[#F7F9FC] to-white px-4 py-4 sm:px-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A7A12]">
                    From the academy
                </span>
                <h2 className="mt-1 text-lg font-extrabold text-[var(--navy)] sm:text-xl">
                    Recent Blogs
                </h2>
            </div>

            <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-1">
                {blogs.map((blog) => {
                    if (!blog?._id) return null;

                    const publishedDate = blog.publishedAt
                        ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                          })
                        : null;

                    return (
                        <article key={blog._id} className="group min-w-0">
                            <Link
                                href={`/blog/${blog.slug}`}
                                className="flex h-full gap-3 rounded-xl border border-[#E7EDF7] bg-white p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C9A227]/50 hover:shadow-[0_8px_22px_rgba(15,35,65,0.10)]"
                            >
                                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-[#EEF3FF] sm:h-24 sm:w-28">
                                    {blog.featuredImage?.url ? (
                                        <Image
                                            src={blog.featuredImage.url}
                                            alt={blog.title || "Recent blog"}
                                            fill
                                            sizes="112px"
                                            quality={85}
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-[#DCE7F8] to-[#F5F8FD]" />
                                    )}
                                </div>

                                <div className="flex min-w-0 flex-1 flex-col py-0.5">
                                    {blog.category?.name && (
                                        <span className="truncate text-[10px] font-bold uppercase tracking-wide text-[#9A7A12]">
                                            {blog.category.name}
                                        </span>
                                    )}
                                    <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-[var(--navy)] transition-colors group-hover:text-[#3869D0]">
                                        {blog.title}
                                    </h3>
                                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                                        {publishedDate ? (
                                            <time
                                                dateTime={blog.publishedAt}
                                                className="flex min-w-0 items-center gap-1 text-[10px] text-gray-500"
                                            >
                                                <CalendarDays size={12} className="shrink-0" />
                                                <span className="truncate">{publishedDate}</span>
                                            </time>
                                        ) : (
                                            <span />
                                        )}
                                        <ArrowUpRight
                                            size={15}
                                            className="shrink-0 text-[var(--navy)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        />
                                    </div>
                                </div>
                            </Link>
                        </article>
                    );
                })}
            </div>
        </aside>
    );
};

export default RecentBlogs;
