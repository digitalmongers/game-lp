import type { MetadataRoute } from "next";
import { resolveSiteBaseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = resolveSiteBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/og"],
      },
    ],
    sitemap: new URL("/sitemap.xml", baseUrl).toString(),
    host: baseUrl.origin,
  };
}

