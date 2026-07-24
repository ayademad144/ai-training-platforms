import {
  ChevronRightIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PlatformActions from "./platform-actions";
import PlatformLogo from "./platform-logo";
import PlatformRating from "./platform-rating";
import { getCategoryClassName } from "./platform-visuals";

export default function PlatformHero({ platform }) {
  const t = useTranslations("Navigation");

  return (
    <>
      <div className="border-b border-border bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Link className="transition-colors hover:text-foreground" href="/">
              {t("home")}
            </Link>
            <ChevronRightIcon aria-hidden="true" className="size-[11px] rtl:rotate-180" />
            <Link
              className="transition-colors hover:text-foreground"
              href="/#featured-platforms-title"
            >
              {t("platforms")}
            </Link>
            <ChevronRightIcon aria-hidden="true" className="size-[11px] rtl:rotate-180" />
            <span className="truncate font-medium text-foreground">
              {platform.name}
            </span>
          </nav>
        </div>
      </div>

      <section
        aria-labelledby="platform-title"
        className="border-b border-border px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <PlatformLogo
              categoryColor={platform.categoryColor}
              image={platform.image}
              name={platform.name}
              size="lg"
            />

            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <h1
                  className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
                  id="platform-title"
                >
                  {platform.name}
                </h1>
                {platform.category ? (
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getCategoryClassName(
                      platform.categoryColor,
                    )}`}
                  >
                    {platform.category}
                  </span>
                ) : null}
              </div>

              <div className="mb-6 flex flex-wrap items-center gap-5">
                <PlatformRating rating={platform.rating} />
                {platform.countries ? (
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPinIcon aria-hidden="true" className="size-3" />
                    {platform.countries}
                  </span>
                ) : null}
                {platform.hourlyRate ? (
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CurrencyDollarIcon aria-hidden="true" className="size-3" />
                    {platform.hourlyRate}
                  </span>
                ) : null}
              </div>

              <PlatformActions
                allProjectsReferralLink={platform.allProjectsReferralLink}
                platformSlug={platform.slug}
                websiteUrl={platform.websiteUrl}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
