export default function sitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.princedefence.com/test").replace(/\/+$/, "");

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/courses`, lastModified: new Date() },
    { url: `${baseUrl}/facilities`, lastModified: new Date() },
    { url: `${baseUrl}/gallery`, lastModified: new Date() },
    { url: `${baseUrl}/news`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/quiz`, lastModified: new Date() },
  ];
}
