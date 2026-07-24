import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PlatformLogo from "./platform-logo";

export default function RelatedPlatforms({ platforms = [] }) {
  const t = useTranslations("Platform");

  if (platforms.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-platforms-title"
      className="rounded-xl border border-border bg-white p-5"
    >
      <h2
        className="mb-4 text-sm font-semibold text-foreground"
        id="related-platforms-title"
      >
        {t("relatedPlatforms")}
      </h2>
      <div className="space-y-2.5">
        {platforms.map((platform) => (
          <Link
            className="flex items-center gap-3 rounded-lg border border-border bg-gray-50 p-3 text-start transition-colors hover:border-gray-300 hover:bg-muted"
            href={`/platform/${platform.slug}`}
            key={platform.id}
          >
            <PlatformLogo
              categoryColor={platform.categoryColor}
              image={platform.image}
              name={platform.name}
              size="xs"
            />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">
                {platform.name}
              </span>
              <span className="block text-xs text-muted-foreground">
                {platform.hourlyRate || platform.category}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
