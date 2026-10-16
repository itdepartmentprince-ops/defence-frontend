import { apiRequest } from "./api";

const BLOG_API_TIMEOUT_MS = 10000;

const requestBlogApi = (endpoint, fallbackMessage) =>
    apiRequest(
        endpoint,
        {
            signal: AbortSignal.timeout(BLOG_API_TIMEOUT_MS),
        },
        fallbackMessage
    );


// Get Published Blogs

export const getPublicBlogs = async ({
    page = 1,
    limit = 9,
    search = "",
    category = "",
    excludeCategory = "",
    excludeCategorySlug = "",
} = {}) => {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    if (search.trim()) {
        params.append(
            "search",
            search.trim()
        );
    }

    if (category) {
        params.append(
            "category",
            category
        );
    }

    if (excludeCategory) {
        params.append(
            "excludeCategory",
            excludeCategory
        );
    }

    if (excludeCategorySlug) {
        params.append(
            "excludeCategorySlug",
            excludeCategorySlug
        );
    }

    return requestBlogApi(
        `/blogs?${params.toString()}`,
        "Failed to fetch blogs"
    );
};


// Get Single Published Blog

export const getPublicBlogBySlug = async (
    slug
) => {
    if (!slug) {
        throw new Error(
            "Blog slug is required"
        );
    }

    return requestBlogApi(
        `/blogs/slug/${encodeURIComponent(slug)}`,
        "Failed to fetch blog"
    );
};


// Get Related Blogs

export const getRelatedBlogs = async (
    categoryId,
    blogId,
    limit = 5
) => {
    if (!categoryId || !blogId) {
        throw new Error(
            "Category ID and Blog ID are required"
        );
    }

    return requestBlogApi(
        `/blogs/related/${categoryId}/${blogId}?limit=${limit}`,
        "Failed to fetch related blogs"
    );
};


// Get Active Blog Categories

export const getPublicBlogCategories =
    async ({
        page = 1,
        limit = 10,
        search = "",
    } = {}) => {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        });

        if (search.trim()) {
            params.set("search", search.trim());
        }

        return requestBlogApi(
            `/blog-categories?${params.toString()}`,
            "Failed to fetch blog categories"
        );
    };