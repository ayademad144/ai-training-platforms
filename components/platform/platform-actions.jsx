import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function PlatformActions({
  centered = false,
  referralLinks = [],
  showAllReferrals = false,
  websiteLabel = "Visit Website",
  websiteUrl,
}) {
  const visibleReferrals = showAllReferrals
    ? referralLinks
    : referralLinks.slice(0, 1);

  if (!websiteUrl && visibleReferrals.length === 0) {
    return null;
  }

  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${
        centered ? "sm:justify-center" : ""
      }`}
    >
      {websiteUrl ? (
        <a
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          href={websiteUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {websiteLabel}
          <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-[13px]" />
        </a>
      ) : null}

      {visibleReferrals.map((referral, index) => (
        <a
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          href={referral.url}
          key={`${referral.url}-${index}`}
          rel="noopener noreferrer sponsored"
          target="_blank"
        >
          {showAllReferrals ? referral.label : "Referral Link"}
          <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-[13px]" />
        </a>
      ))}
    </div>
  );
}
