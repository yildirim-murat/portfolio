import type { MetadataRoute } from "next";
import { absoluteUrl, hasConfiguredSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(hasConfiguredSiteUrl || process.env.NODE_ENV !== "production"
      ? { sitemap: absoluteUrl("/sitemap.xml") }
      : {}),
  };
}
