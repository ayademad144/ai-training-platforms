import { guides } from "@/data/guides";
import { useTranslations } from "next-intl";
import GuideCard from "./guide-card";

export default function LatestGuides({ platforms = [] }) {
  const t = useTranslations("Home");

  const platformsBySlug = new Map(
    platforms.map((platform) => [platform.slug, platform]),
  );
  const platformGuides = guides.flatMap((guide) => {
    const platform = platformsBySlug.get(guide.platformSlug);

    if (!platform) {
      return [];
    }

    return [
      {
        ...guide,
        category: platform.category,
        href: `/platform/${platform.slug}#passing-process`,
        image: platform.image,
        platformName: platform.name,
      },
    ];
  });

  if (platformGuides.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="latest-guides-title"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      id="latest-guides"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              className="mb-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            id="latest-guides-title"
          >
              {t("latestGuides")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("latestGuidesDescription")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {platformGuides.map((guide) => (
            <GuideCard guide={guide} key={guide.platformSlug} />
          ))}
        </div>
      </div>
    </section>
  );
}
