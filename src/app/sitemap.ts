import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://loesnooitgedagt.com";
  const currentDate = new Date();

  const routes = [
    "",
    "/about",
    "/contact",
    "/investment",
    "/portfolio/lifestyle",
    "/portfolio/wedding",
    "/portfolio/brand",
    "/portfolio/portrait",
    "/portfolio/event",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "weekly" : "monthly" as const,
    priority: route === "" ? 1 : 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}${route}`,
        nl: `${baseUrl}${route}`,
      },
    },
  }));
}
