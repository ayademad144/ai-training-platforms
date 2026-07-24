"use client";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { trackReferralClick } from "./platform-actions";

export default function PlatformIndividualProjects({
  platformSlug,
  projects = [],
}) {
  const t = useTranslations("Platform");

  if (projects.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="platform-individual-projects-title">
      <h2
        className="mb-4 font-display text-xl font-bold text-foreground"
        id="platform-individual-projects-title"
      >
        {t("individualProjects")}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((project, index) => (
          <a
            className="flex items-center justify-between gap-4 rounded-xl border border-border bg-white p-4 text-sm font-semibold text-foreground transition-colors hover:bg-gray-50"
            href={project.url}
            key={`${project.url}-${index}`}
            onClick={() =>
              trackReferralClick({
                platformSlug,
                referral: project,
                referralType: "individual_project",
              })
            }
            rel="noopener noreferrer sponsored"
            target="_blank"
          >
            <span className="truncate">{project.label}</span>
            <ArrowTopRightOnSquareIcon
              aria-hidden="true"
              className="size-[13px] shrink-0"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
