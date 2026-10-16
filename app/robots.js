export default function robots() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.princedefence.com/test").replace(/\/+$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/admin", "/api"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
