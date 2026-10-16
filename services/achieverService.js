import { apiRequest } from "./api";

const request = (endpoint) =>
    apiRequest(
        endpoint,
        {
            method: "GET",
            cache: "no-store",
        },
        "Failed to fetch achievers"
    );

export const getPublicAchieverCategories = async () =>
    request("/achiever-categories");

export const getPublicAchievers = async (
    categorySlug,
    {
        page = 1,
        limit = 12,
        year,
        sort = "newest",
    } = {}
) => {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sort,
    });

    if (year !== undefined && year !== null) {
        params.set("year", String(year));
    }

    const endpoint = categorySlug
        ? `/achievers/category/${encodeURIComponent(categorySlug)}`
        : "/achievers";

    return request(`${endpoint}?${params.toString()}`);
};
