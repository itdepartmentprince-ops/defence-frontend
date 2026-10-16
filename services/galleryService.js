import { apiRequest } from "./api";

// Get gallery categories
export const getGalleryCategories = async () => {
    return apiRequest(
        "/gallery-categories",
        {
            method: "GET",
            cache: "no-store",
        },
        "Failed to fetch gallery categories"
    );
};

// Get gallery images
export const getGallery = async ({
    page = 1,
    limit = 50,
    category = "",
} = {}) => {
    const params = new URLSearchParams();

    params.append("page", page);
    params.append("limit", limit);

    if (category) {
        params.append("category", category);
    }

    return apiRequest(
        `/gallery?${params.toString()}`,
        {
            method: "GET",
            cache: "no-store",
        },
        "Failed to fetch gallery"
    );
};