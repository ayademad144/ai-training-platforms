import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: "weekly",
      priority: 1,
      url: new URL("/", siteConfig.url).toString(),
    },
  ];
}
