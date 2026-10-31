import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";
import {
  GAME_SEO_PRESETS,
  SECTION_SEO_PRESETS,
  resolveSiteBaseUrl,
} from "@/lib/seo";

async function buildCachedSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("days");

  const baseUrl = resolveSiteBaseUrl();
  const lastModified = new Date();

  const gameEntries: MetadataRoute.Sitemap = Object.values(
    GAME_SEO_PRESETS
  ).map((preset) => ({
    url: new URL(`/?game=${preset.slug}`, baseUrl).toString(),
    lastModified,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const sectionEntries: MetadataRoute.Sitemap = Object.values(
    SECTION_SEO_PRESETS
  ).map((preset) => ({
    url: new URL(`/?section=${preset.slug}`, baseUrl).toString(),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: new URL("/", baseUrl).toString(),
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    ...sectionEntries,
    ...gameEntries,
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildCachedSitemapEntries();
}

