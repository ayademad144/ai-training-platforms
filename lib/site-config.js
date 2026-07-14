const fallbackSiteUrl = "http://localhost:3000";

function resolveSiteUrl() {
  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  const configuredUrl =
    process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    vercelHost ??
    fallbackSiteUrl;
  const normalizedUrl = configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`;

  try {
    return new URL(normalizedUrl);
  } catch {
    return new URL(fallbackSiteUrl);
  }
}

export const siteConfig = Object.freeze({
  author: "AI Training Models Editorial Team",
  description:
    "Discover and compare AI training, evaluation, and data annotation platforms with practical guides for remote workers.",
  keywords: [
    "AI training platforms",
    "data annotation jobs",
    "AI evaluation",
    "remote AI work",
    "remote AI jobs",
    "AI data labeling",
  ],
  name: "AI Training Models",
  shortName: "AI Training",
  title: "AI Training Platforms | Reviews, Pay & Guides",
  url: resolveSiteUrl(),
});
