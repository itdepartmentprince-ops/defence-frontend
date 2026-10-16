
import Link from "next/link";
import { ArrowLeft, CalendarDays, Newspaper } from "lucide-react";
import { notFound } from "next/navigation";

import BlogContentRenderer from "@/components/blogs/BlogContentRenderer";
import AllNewsTableOfContents from "@/components/blogs/AllNewsTableOfContents";
import ScrollReveal from "@/components/animations/ScrollReveal";
import {
    getPublicBlogBySlug,
    getPublicBlogs,
} from "@/services/blogService";

export const revalidate = 300;

const getNewsArticle = async (slug) => {
    const response = await getPublicBlogBySlug(slug);
    const blog = response?.data;
    const category = blog?.category;
    const isNews =
        category?.name?.trim().toLowerCase() === "news" ||
        category?.slug?.trim().toLowerCase() === "news";

    return isNews ? blog : null;
};

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const blog = await getNewsArticle(slug);

        if (!blog) {
            return {
                title: "News not found | Prince Defence Academy",
            };
        }

        const description =
            blog.excerpt ||
            `Read the latest defence news: ${blog.title}.`;

        return {
            title: `${blog.title} | Defence News`,
            description,
            alternates: {
                canonical: `/news/${slug}`,
            },
            openGraph: {
                title: blog.title,
                description,
                url: `/news/${slug}`,
                type: "article",
                ...(blog.featuredImage?.url
                    ? { images: [blog.featuredImage.url] }
                    : {}),
            },
        };
    } catch (error) {
        console.error("Failed to load news metadata:", error);
        return {
            title: "Defence News | Prince Defence Academy",
        };
    }
}

export default async function NewsArticlePage({ params }) {
    const { slug } = await params;

    let article;

    try {
        article = await getNewsArticle(slug);
    } catch (error) {
        console.error("Failed to fetch news article:", error);
        notFound();
    }

    if (!article) {
        notFound();
    }

    let allNews = [];
    let newsPagination = null;
    const categoryId = article.category?._id;

    if (categoryId) {
        try {
            const response = await getPublicBlogs({
                page: 1,
                limit: 50,
                category: categoryId,
            });
            allNews = (response?.data || []).filter(
                (blog) =>
                    (blog.category?._id || blog.category) === categoryId
            );
            newsPagination = response?.pagination || null;
        } catch (error) {
            console.error("Failed to fetch news navigation:", error);
        }
    }

    const publishedDate = article.publishedAt
        ? new Date(article.publishedAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
        : null;

    return (
        <main className="w-full bg-[#F7F9FC] pb-16 pt-32 sm:pt-30">
            <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-10">com
                <Link
                    href="/news"
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DCE5F5] bg-white px-4 py-2 text-sm font-semibold text-[var(--navy)] shadow-sm transition hover:border-[#C9A227] hover:text-[#9A7A12]"
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back to News
                </Link>

                <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
                    <article className="min-w-0 overflow-hidden rounded-3xl border border-[#E2E9F3] bg-white shadow-[0_16px_48px_rgba(15,35,65,0.12)]">
                        {article.featuredImage?.url && (
                            <div className="w-full bg-[#EEF3FF]">
                                {/* Paper scans can have any intrinsic aspect ratio. */}
                                <img
                                    src={article.featuredImage.url}
                                    alt={article.title || "Defence news"}
                                    fetchPriority="high"
                                    className="block h-auto w-full object-contain"
                                />
                            </div>
                        )}

                        <header className="border-b border-[#E5EBF5] px-5 py-7 sm:px-8 sm:py-9 lg:px-12">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#8D7115]">
                                <Newspaper size={15} aria-hidden="true" />
                                Defence News
                            </span>
                            <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[var(--navy)] sm:text-3xl lg:text-4xl">
                                {article.title}
                            </h1>
                            {article.excerpt && (
                                <p className="mt-4 max-w-4xl text-base leading-7 text-[var(--muted)] sm:text-lg">
                                    {article.excerpt}
                                </p>
                            )}
                            {publishedDate && (
                                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#8D7115]">
                                    <CalendarDays size={16} aria-hidden="true" />
                                    <time dateTime={article.publishedAt}>
                                        {publishedDate}
                                    </time>
                                </div>
                            )}
                        </header>

                        <div className="px-5 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                            <ScrollReveal animation="up" duration={650} distance={20}>
                                <BlogContentRenderer
                                    content={article.content}
                                    fluidImages
                                />
                            </ScrollReveal>
                        </div>
                    </article>

                    <ScrollReveal
                        className="w-full lg:sticky lg:top-24"
                        animation="left"
                        duration={600}
                        distance={20}
                    >
                        <AllNewsTableOfContents
                            news={allNews}
                            categoryId={categoryId}
                            currentSlug={slug}
                            initialPagination={newsPagination}
                        />
                    </ScrollReveal>
                </div>
            </div>
        </main>
    );
}
