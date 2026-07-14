import {
  ChevronRightIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const categoryClassNames = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  green: "border-emerald-100 bg-emerald-50 text-emerald-700",
  orange: "border-orange-100 bg-orange-50 text-orange-700",
  purple: "border-purple-100 bg-purple-50 text-purple-700",
};

const ratingSteps = [1, 2, 3, 4, 5];

function StarRating({ rating }) {
  const roundedRating = Math.round(rating);

  return (
    <div aria-label={`${rating.toFixed(1)} out of 5 stars`} className="flex items-center gap-1.5">
      <span aria-hidden="true" className="flex gap-0.5">
        {ratingSteps.map((step) => (
          <StarIcon
            className={`size-3 ${
              step <= roundedRating
                ? "text-amber-400"
                : "text-gray-200"
            }`}
            key={step}
          />
        ))}
      </span>
      <span className="text-sm font-medium tabular-nums text-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function PlatformCard({ platform }) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
            style={{ backgroundColor: platform.logoColor }}
          >
            {platform.logo}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-foreground">
              {platform.name}
            </h3>
            <StarRating rating={platform.rating} />
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${categoryClassNames[platform.categoryColor]}`}
        >
          {platform.category}
        </span>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
        {platform.description}
      </p>

      <dl className="space-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPinIcon aria-hidden="true" className="size-[11px] shrink-0" />
          <dt className="sr-only">Countries</dt>
          <dd>{platform.countries}</dd>
        </div>
        <div className="flex items-center gap-2">
          <CreditCardIcon aria-hidden="true" className="size-[11px] shrink-0" />
          <dt className="sr-only">Payment methods</dt>
          <dd>{platform.payment.join(" · ")}</dd>
        </div>
        <div className="flex items-center gap-2">
          <CurrencyDollarIcon aria-hidden="true" className="size-[11px] shrink-0" />
          <dt className="sr-only">Hourly rate</dt>
          <dd>{platform.hourlyRate}</dd>
        </div>
      </dl>

      <Link
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        href={`/platforms/${platform.slug}`}
      >
        View Details
        <ChevronRightIcon aria-hidden="true" className="size-[13px]" />
      </Link>
    </article>
  );
}
