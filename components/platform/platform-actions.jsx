"use client";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

export function trackReferralClick({
  platformSlug,
  referral,
  referralType = "individual_project",
}) {
  if (!platformSlug || !referral?.url) {
    return;
  }

  const payload = JSON.stringify({
    platformSlug,
    referralLabel: referral.label,
    referralType,
    referralUrl: referral.url,
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: "application/json" });
    navigator.sendBeacon("/api/referral-clicks", blob);
    return;
  }

  fetch("/api/referral-clicks", {
    body: payload,
    headers: {
      "Content-Type": "application/json",
    },
    keepalive: true,
    method: "POST",
  }).catch(() => {});
}

export default function PlatformActions({
  centered = false,
  allProjectsReferralLink = "",
  websiteLabel = "Visit Website",
  platformSlug,
  websiteUrl,
}) {
  const t = useTranslations("Platform");
  const allProjectsReferral = allProjectsReferralLink
    ? {
        label: t("allProjectsReferral"),
        url: allProjectsReferralLink,
      }
    : null;

  if (!websiteUrl && !allProjectsReferral) {
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

      {allProjectsReferral ? (
        <a
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          href={allProjectsReferral.url}
          onClick={() =>
            trackReferralClick({
              platformSlug,
              referral: allProjectsReferral,
              referralType: "all_projects",
            })
          }
          rel="noopener noreferrer sponsored"
          target="_blank"
        >
          {t("allProjectsReferral")}
          <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-[13px]" />
        </a>
      ) : null}
    </div>
  );
}
