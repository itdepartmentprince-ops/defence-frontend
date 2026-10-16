import Image from "next/image";
import { notFound } from "next/navigation";

import BlogArticleHeader from "@/components/blogs/BlogArticleHeader";
import BlogContentRenderer from "@/components/blogs/BlogContentRenderer";
import BlogTableOfContents from "@/components/blogs/BlogTableOfContents";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import ScrollReveal from "@/components/animations/ScrollReveal";

import {
    getPublicBlogBySlug,
    getRelatedBlogs,
} from "@/services/blogService";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const response = await getPublicBlogBySlug(slug);
        const blog = response?.data;

        if (!blog) {
            return {
                title: "Article not found | Prince Defence Academy",
            };
        }

        const description =
            blog.excerpt ||
            `Read ${blog.title} on the Prince Defence Academy blog.`;

        return {
            title: `${blog.title} | Prince Defence Academy`,
            description,
            alternates: {
                canonical: `/blog/${slug}`,
            },
            openGraph: {
                title: blog.title,
                description,
                url: `/blog/${slug}`,
                type: "article",
                ...(blog.featuredImage?.url
                    ? { images: [blog.featuredImage.url] }
                    : {}),
            },
        };
    } catch (error) {
        console.error("Failed to load blog metadata:", error);
        return {
            title: "Defence Academy Article | Prince Defence Academy",
            description:
                "Read defence exam preparation and career guidance from Prince Defence Academy.",
        };
    }
}

const BlogArticlePage = async ({ params }) => {
    const { slug } = await params;

    let blog;

    try {
        const response =
            await getPublicBlogBySlug(slug);

        blog = response?.data;
    } catch (error) {
        console.error(
            "Failed to fetch blog:",
            error
        );

        notFound();
    }

    if (!blog) {
        notFound();
    }

    // Get related blogs
    let relatedBlogs = [];

    try {
        const categoryId =
            blog.category?._id;

        const blogId =
            blog._id;

        if (categoryId && blogId) {
            const response =
                await getRelatedBlogs(
                    categoryId,
                    blogId,
                    5
                );

            relatedBlogs =
                response?.data || [];
        }
    } catch (error) {
        console.error(
            "Failed to fetch related blogs:",
            error
        );
    }

    const categoryName =
        blog.category?.name ||
        "More Articles";

    return (
        <main className="w-full scroll-smooth bg-[#F7F9FC]">
            <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-16">

                {/* Header */}
                <ScrollReveal
                    className="mb-8 sm:mb-10"
                    animation="up"
                    duration={650}
                    distance={24}
                >
                    <BlogArticleHeader
                        blog={blog}
                    />
                </ScrollReveal>

                {/* Mobile TOC */}
                <ScrollReveal
                    className="mb-8 lg:hidden"
                    animation="up"
                    duration={600}
                    distance={20}
                >
                    <BlogTableOfContents
                    />
                </ScrollReveal>

                {/* Desktop Layout */}
                <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)_320px] lg:items-start">

                    {/* Left Sidebar - TOC */}
                    <ScrollReveal
                        className="hidden w-full lg:sticky lg:top-24 lg:block"
                        animation="right"
                        duration={650}
                        distance={24}
                    >
                        <BlogTableOfContents
                            content={
                                blog.content
                            }
                        />
                    </ScrollReveal>

                    {/* Main Blog */}
                    <article className="min-w-0 overflow-hidden rounded-3xl border border-[#E2E9F3] bg-white shadow-[0_14px_40px_rgba(15,35,65,0.10)]">

                        {/* Featured Image */}
                        {blog.featuredImage?.url && (
                            <ScrollReveal
                                animation="up"
                                duration={700}
                                distance={24}
                            >
                                <div className="relative w-full overflow-hidden">
                                    <Image
                                        src={
                                            blog
                                                .featuredImage
                                                .url
                                        }
                                        alt={
                                            blog.title ||
                                            "Blog featured image"
                                        }
                                        width={1600}
                                        height={900}
                                        priority
                                        sizes="(max-width: 1024px) 100vw, calc(100vw - 600px)"
                                        quality={85}
                                        className="h-auto w-full object-contain"
                                    />
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Blog Content */}
                        <div className="px-5 pb-10 pt-8 sm:px-7 sm:pb-12 sm:pt-10 lg:px-8 lg:pb-14">
                            <BlogContentRenderer
                                content={
                                    blog.content
                                }
                            />
                        </div>
                    </article>

                    {/* Right Sidebar - Related Blogs */}
                    <ScrollReveal
                        className="w-full lg:sticky lg:top-24"
                        animation="left"
                        duration={650}
                        distance={24}
                    >
                        <RelatedBlogs
                            blogs={
                                relatedBlogs
                            }
                            categoryName={
                                categoryName
                            }
                        />
                    </ScrollReveal>
                </div>
            </div>
        </main>
    );
};

export default BlogArticlePage;