import BlogListing from "@/components/blogs/BlogListing";
import {
    getPublicBlogs,
    getPublicBlogCategories,
} from "@/services/blogService";

export const revalidate = 300;

export default async function BlogPage() {
    const [blogsResult, categoriesResult] = await Promise.allSettled([
        getPublicBlogs({
            page: 1,
            limit: 9,
            excludeCategorySlug: "news",
        }),
        getPublicBlogCategories({ limit: 50 }),
    ]);

    if (blogsResult.status === "rejected") {
        console.error(
            "Failed to server-render blog listing:",
            blogsResult.reason
        );
    }
    if (categoriesResult.status === "rejected") {
        console.error(
            "Failed to server-render blog categories:",
            categoriesResult.reason
        );
    }

    return (
        <BlogListing
            initialBlogs={
                blogsResult.status === "fulfilled"
                    ? blogsResult.value?.data || []
                    : []
            }
            initialCategories={
                categoriesResult.status === "fulfilled"
                    ? categoriesResult.value?.data || []
                    : []
            }
            initialPagination={
                blogsResult.status === "fulfilled"
                    ? blogsResult.value?.pagination
                    : undefined
            }
            initialError={
                blogsResult.status === "rejected"
                    ? "Articles could not be loaded. Please try again."
                    : ""
            }
            categoriesError={
                categoriesResult.status === "rejected"
                    ? "Blog categories could not be loaded."
                    : ""
            }
        />
    );
}
