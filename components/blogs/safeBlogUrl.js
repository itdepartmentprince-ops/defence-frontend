export const getSafeBlogUrl = (value) => {
    if (
        typeof value !== "string" ||
        !value.trim() ||
        /[\u0000-\u001F\u007F\\]/.test(value)
    ) {
        return null;
    }

    try {
        const url = new URL(
            value.trim(),
            "https://relative.invalid"
        );

        return ["http:", "https:"].includes(url.protocol)
            ? value.trim()
            : null;
    } catch {
        return null;
    }
};
