import {
  ChevronRightIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import PlatformLogo from "@/components/platform/platform-logo";
import PlatformRating from "@/components/platform/platform-rating";
import { getCategoryClassName } from "@/components/platform/platform-visuals";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function PlatformCard({ platform }) {
  const t = useTranslations("Platform");
  const homeT = useTranslations("Home");

  return (
    <article className="relative flex flex-col gap-4 rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <PlatformLogo
            categoryColor={platform.categoryColor}
            image={platform.image}
            name={platform.name}
          />
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-foreground">
              {platform.name}
            </h3>
            <PlatformRating rating={platform.rating} />
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getCategoryClassName(
            platform.categoryColor,
          )}`}
        >
          {platform.category}
        </span>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
        {platform.shortDescription}
      </p>

      <dl className="space-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPinIcon aria-hidden="true" className="size-[11px] shrink-0" />
          <dt className="sr-only">{t("countries")}</dt>
          <dd>{platform.countries}</dd>
        </div>
        <div className="flex items-center gap-2">
          <CreditCardIcon
            aria-hidden="true"
            className="size-[11px] shrink-0"
          />
          <dt className="sr-only">{t("paymentMethods")}</dt>
          <dd>{platform.payment.join(" · ")}</dd>
        </div>
        <div className="flex items-center gap-2">
          <CurrencyDollarIcon
            aria-hidden="true"
            className="size-[11px] shrink-0"
          />
          <dt className="sr-only">{t("hourlyRate")}</dt>
          <dd>{platform.hourlyRate}</dd>
        </div>
      </dl>

      <Link
        aria-label={`${homeT("viewPlatform")}: ${platform.name}`}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors after:absolute after:inset-0 after:rounded-xl after:content-[''] hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        href={`/platform/${platform.slug}`}
      >
        {homeT("viewPlatform")}
        <ChevronRightIcon aria-hidden="true" className="size-[13px] rtl:rotate-180" />
      </Link>
    </article>
  );
}
