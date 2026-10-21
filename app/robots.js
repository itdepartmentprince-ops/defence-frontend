export default function robots() {
  const isDev = process.env.NODE_ENV !== "production";
  const defaultSiteUrl = isDev
    ? "http://localhost:3000"
    : "https://www.princedefence.com/test";
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl).replace(/\/+$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/admin", "/api"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
