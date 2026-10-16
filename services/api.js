const DEFAULT_API_URL =
    "https://prince-defence-backend.onrender.com/api";

const configuredApiUrl = (
    process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL
).trim().replace(/\/+$/, "");

export const API_URL = configuredApiUrl
    ? `${configuredApiUrl.replace(/\/api$/i, "")}/api`
    : "";

export const apiRequest = async (
    endpoint,
    options = {},
    fallbackMessage = "Something went wrong. Please try again."
) => {
    if (!API_URL) {
        const error = new Error(
            "API URL is not configured. Set NEXT_PUBLIC_API_URL to your backend URL ending in /api."
        );
        error.isConfigurationError = true;
        throw error;
    }

    const isFormData =
        typeof FormData !== "undefined" &&
        options.body instanceof FormData;

    let response;

    try {
        response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                ...(options.body != null && !isFormData
                    ? { "Content-Type": "application/json" }
                    : {}),
                ...options.headers,
            },
        });
    } catch (cause) {
        const error = new Error(
            "Unable to reach the API. Please check your connection."
        );
        error.isNetworkError = true;
        error.cause = cause;
        throw error;
    }

    const contentType =
        response.headers.get("content-type") || "";

    let payload;

    if (
        contentType.includes("application/json") ||
        contentType.includes("+json")
    ) {
        try {
            payload = await response.json();
        } catch (cause) {
            const error = new Error(
                `The API returned invalid JSON (HTTP ${response.status}). Check that NEXT_PUBLIC_API_URL points to the backend /api URL.`
            );
            error.status = response.status;
            error.cause = cause;
            throw error;
        }
    } else {
        const responseText = await response.text();
        const isHtml =
            contentType.includes("text/html") ||
            /^\s*<!doctype html/i.test(responseText);

        if (response.ok) {
            throw new Error(
                `The API returned a non-JSON response (HTTP ${response.status}). Check that NEXT_PUBLIC_API_URL points to the backend /api URL.`
            );
        }

        const error = new Error(
            isHtml || !responseText.trim()
                ? `${fallbackMessage} The API returned a non-JSON response (HTTP ${response.status}); check NEXT_PUBLIC_API_URL.`
                : responseText.trim().slice(0, 300)
        );
        error.status = response.status;
        error.payload = null;
        throw error;
    }

    if (!response.ok) {
        const error = new Error(
            payload?.message ||
                `${fallbackMessage} (HTTP ${response.status})`
        );
        error.status = response.status;
        error.payload = payload;
        throw error;
    }

    return payload;
};
