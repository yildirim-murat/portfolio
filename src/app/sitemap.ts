import type { MetadataRoute } from "next";
import { portfolio } from "@/data/portfolio";
import { absoluteUrl, hasConfiguredSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!hasConfiguredSiteUrl && process.env.NODE_ENV === "production") return [];

  const lastModified = new Date();

  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    ...portfolio.projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
