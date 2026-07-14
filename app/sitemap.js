import { siteConfig } from "@/lib/site-config";

export default function sitemap() {
  return [
    {
      changeFrequency: "weekly",
      priority: 1,
      url: new URL("/", siteConfig.url).toString(),
    },
  ];
}
