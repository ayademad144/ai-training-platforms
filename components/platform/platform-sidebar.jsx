import {
  CreditCardIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  StarIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import RelatedPlatforms from "./related-platforms";

export default function PlatformSidebar({ platform, relatedPlatforms }) {
  const t = useTranslations("Platform");
  const quickInfoRows = [
    {
      Icon: TagIcon,
      label: t("category"),
      value: platform.category,
    },
    {
      Icon: StarIcon,
      label: t("rating"),
      value: t("ratingValue", { rating: platform.rating.toFixed(1) }),
    },
    {
      Icon: CurrencyDollarIcon,
      label: t("hourlyRate"),
      value: platform.hourlyRate,
    },
    {
      Icon: GlobeAltIcon,
      label: t("countries"),
      value: platform.countries,
    },
    {
      Icon: CreditCardIcon,
      label: t("payment"),
      value: platform.payment.join(", "),
    },
  ].filter((row) => row.value);

  return (
    <aside
      className="space-y-5"
      aria-label={t("quickInfoAria", { name: platform.name })}
    >
      {quickInfoRows.length > 0 ? (
        <section
          aria-labelledby="platform-quick-info-title"
          className="rounded-xl border border-border bg-white p-5"
        >
          <h2
            className="mb-4 text-sm font-semibold text-foreground"
            id="platform-quick-info-title"
          >
            {t("quickInfo")}
          </h2>
          <dl className="space-y-4">
            {quickInfoRows.map(({ Icon, label, value }) => (
              <div className="flex items-start gap-3" key={label}>
                <Icon
                  aria-hidden="true"
                  className="mt-0.5 size-[13px] shrink-0 text-muted-foreground"
                />
                <div>
                  <dt className="mb-0.5 text-[11px] text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="text-sm font-medium text-foreground">
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <RelatedPlatforms platforms={relatedPlatforms} />
    </aside>
  );
}
