import { siteConfig } from "@/lib/site-config";

export default function robots() {
  return {
    host: siteConfig.url.origin,
    rules: {
      allow: "/",
      disallow: [
        "/Admin",
        "/Admin/",
        "/dashboard",
        "/dashboard/",
        "/signin",
        "/signin/",
      ],
      userAgent: "*",
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
