import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

const RelatedBlogs = ({ blogs = [], categoryName = "" }) => {
    if (!Array.isArray(blogs) || blogs.length === 0) return null;

    return (
        <aside className="w-full rounded-2xl border border-slate-200 bg-(--navy) p-4 shadow-sm sm:rounded-3xl sm:p-6">
            <div className="mb-5">
                <span className="text-xs font-semibold tracking-wide text-(--gold)">
                    {categoryName || "More articles"}
                </span>
                <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                    Related Blogs
                </h2>
            </div>

            {/* 1 col mobile, 2 col tablet, stacked in sidebar on desktop */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {blogs.map((blog) => {
                    if (!blog?._id) return null;

                    const blogUrl = `/blog/${blog.slug}`;
                    const imageUrl = blog.featuredImage?.url;
                    const publishedDate = blog.publishedAt
                        ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                          })
                        : null;

                    return (
                        <article
                            key={blog._id}
                            className="group rounded-2xl border border-white/15 bg-white/5 p-3 transition-colors duration-200 hover:border-white/30 hover:bg-white/10"
                        >
                            {imageUrl && (
                                <Link href={blogUrl} className="block overflow-hidden rounded-xl" aria-label={`Read ${blog.title}`}>
                                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-800 ring-1 ring-inset ring-white/10">
                                        <Image
                                            src={imageUrl}
                                            alt={blog.title || "Related blog"}
                                            fill
                                            sizes="(max-width: 1023px) 100vw, 280px"
                                            quality={85}
                                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                        />
                                    </div>
                                </Link>
                            )}

                            <div className="mt-3.5">
                                {blog.category?.name && (
                                    <span className="inline-flex max-w-full truncate rounded-full border border-[#C9A227]/35 bg-[#C9A227]/10 px-2.5 py-1 text-[11px] font-semibold leading-4 text-[#E0C35C]">
                                        {blog.category.name}
                                    </span>
                                )}

                                <h3 className="mt-2 line-clamp-3 text-base font-bold leading-6 text-white transition-colors duration-200 group-hover:text-[#E0C35C]">
                                    <Link href={blogUrl}>{blog.title}</Link>
                                </h3>

                                {blog.excerpt && (
                                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-300">
                                        {blog.excerpt}
                                    </p>
                                )}

                                <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
                                    {publishedDate ? (
                                        <div className="flex min-w-0 items-center gap-1.5 text-[11px] text-slate-400">
                                            <CalendarDays size={13} className="shrink-0" />
                                            <time dateTime={blog.publishedAt} className="truncate">
                                                {publishedDate}
                                            </time>
                                        </div>
                                    ) : (
                                        <span />
                                    )}

                                    <Link
                                        href={blogUrl}
                                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white transition-all duration-200 hover:bg-[#C9A227] hover:text-slate-950"
                                    >
                                        Read article
                                        <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </aside>
    );
};

export default RelatedBlogs;
