import NewsListing from "@/components/blogs/NewsListing";
import {
    getPublicBlogs,
    getPublicBlogCategories,
} from "@/services/blogService";

export const revalidate = 300;

export const metadata = {
    title: "Defence News | Prince Defence Academy",
    description:
        "Latest defence news and updates for NDA, CDS and AFCAT aspirants.",
};

export default async function NewsPage() {
    let newsCategory = null;
    let initialBlogs = [];
    let initialPagination = null;
    let initialError = "";

    try {
        const categoriesResponse =
            await getPublicBlogCategories({
                limit: 50,
                search: "News",
            });

        newsCategory = categoriesResponse?.data?.find(
            (category) =>
                category?.name?.trim().toLowerCase() === "news" ||
                category?.slug?.trim().toLowerCase() === "news"
        ) || null;

        if (newsCategory?._id) {
            const blogsResponse = await getPublicBlogs({
                page: 1,
                limit: 9,
                category: newsCategory._id,
            });

            initialBlogs = blogsResponse?.data || [];
            initialPagination = blogsResponse?.pagination || null;
        }
    } catch (error) {
        console.error("Failed to server-render news listing:", error);
        initialError =
            "News could not be loaded. Please try again.";
    }

    return (
        <NewsListing
            categoryId={newsCategory?._id || ""}
            initialBlogs={initialBlogs}
            initialPagination={initialPagination}
            initialError={initialError}
        />
    );
}
