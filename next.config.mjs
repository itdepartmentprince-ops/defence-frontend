/** @type {import('next').NextConfig} */

const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH !== undefined
        ? process.env.NEXT_PUBLIC_BASE_PATH
        : "/test";

const cspValue = [
    "default-src 'self'",
    "img-src 'self' data: blob: https://res.cloudinary.com https://i.ytimg.com https://images.unsplash.com https://www.google.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
    `connect-src 'self' http://localhost:5000 ${(() => { try { return new URL(process.env.NEXT_PUBLIC_API_URL).origin; } catch { return ""; } })()} https://www.princedefence.com https://res.cloudinary.com`,
    "frame-src 'self' https://www.youtube.com https://www.google.com https://app.coachingsinsikar.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://wa.me",
    `report-uri ${basePath || ""}/api/csp-report`,
].join("; ");

const nextConfig = {
    basePath: basePath === "" ? undefined : basePath,
    images: {
        formats: ["image/avif", "image/webp"],

        qualities: [30, 40, 55, 70, 75, 85, 90, 95, 100],

        deviceSizes: [
            640,
            750,
            828,
            1080,
            1200,
            1600,
            1920,
        ],

        imageSizes: [
            16,
            32,
            48,
            64,
            96,
            128,
            256,
        ],

        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "i.ytimg.com",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "Content-Security-Policy-Report-Only", value: cspValue },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
                    { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
                ],
            },
        ];
    },
};

export default nextConfig;