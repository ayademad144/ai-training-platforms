import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#ffffff",
    description: siteConfig.description,
    display: "standalone",
    icons: [
      {
        purpose: "any",
        sizes: "any",
        src: "/brand/ai-training-models.svg",
        type: "image/svg+xml",
      },
    ],
    lang: "en",
    name: siteConfig.name,
    scope: "/",
    short_name: siteConfig.shortName,
    start_url: "/",
    theme_color: "#2563eb",
  };
}
