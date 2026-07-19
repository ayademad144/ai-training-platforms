import { siteConfig } from "@/lib/site-config";

export default function manifest() {
  return {
    background_color: "#ffffff",
    description: siteConfig.description,
    display: "standalone",
    icons: [
      {
        purpose: "any",
        sizes: "any",
        src: "/brand/trainhub-ai-icon.svg",
        type: "image/svg+xml",
      },
    ],
    lang: "en",
    name: siteConfig.name,
    scope: "/",
    short_name: siteConfig.shortName,
    start_url: "/",
    theme_color: "#000000",
  };
}
