import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

const BlogCard = ({ blog, hrefBase = "/blog" }) => {
    if (!blog) return null;

    const imageUrl = blog.featuredImage?.url || "/images/blog-placeholder.jpg";
    const blogUrl = `${hrefBase}/${blog.slug}`;

    const publishedDate = blog.publishedAt
        ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : null;

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E9F3] bg-white shadow-[0_12px_32px_rgba(15,35,65,0.16)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#C9A227]/40 hover:shadow-[0_22px_48px_rgba(15,35,65,0.24)] sm:rounded-3xl">
            <Link href={blogUrl} className="block" aria-label={`Read ${blog.title}`}>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                        src={imageUrl}
                        alt={blog.title || "Prince Defence Academy blog"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        quality={85}
                        className="object-cover"
                    />

                    {blog.category?.name && (
                        <span className="absolute left-3 top-3 inline-flex max-w-[calc(100%-1.5rem)] truncate rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--navy)] shadow-sm backdrop-blur-sm sm:left-4 sm:top-4">
                            {blog.category.name}
                        </span>
                    )}
                </div>
            </Link>

            <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h2 className="line-clamp-2 text-lg font-bold leading-7 text-[var(--navy)] transition-colors duration-300 group-hover:text-[#3869D0] sm:text-xl">
                    <Link href={blogUrl}>{blog.title}</Link>
                </h2>

                {blog.excerpt && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--muted)]">
                        {blog.excerpt}
                    </p>
                )}

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#E5EBF5] pt-4">
                    {publishedDate ? (
                        <div className="flex min-w-0 items-center gap-2 text-xs text-[#9A7A12]">
                            <CalendarDays size={15} className="shrink-0" />
                            <time dateTime={blog.publishedAt} className="truncate">
                                {publishedDate}
                            </time>
                        </div>
                    ) : (
                        <span />
                    )}

                    <Link
                        href={blogUrl}
                        className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--navy)] transition-all duration-300 group-hover:gap-2.5 group-hover:text-[#3869D0]"
                    >
                        Read more
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;
