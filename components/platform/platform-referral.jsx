import { useTranslations } from "next-intl";
import PlatformActions from "./platform-actions";

export default function PlatformReferral({ platform }) {
  const t = useTranslations("Platform");
  const hasReferral = Boolean(platform.allProjectsReferralLink);

  if (!platform.websiteUrl && !hasReferral) {
    return null;
  }

  return (
    <section
      aria-labelledby="platform-referral-title"
      className="rounded-2xl border border-blue-100 bg-blue-50 p-8 text-center"
    >
      <h2
        className="mb-2 font-display text-xl font-bold text-foreground"
        id="platform-referral-title"
      >
        {t("readyToJoin", { name: platform.name })}
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        {hasReferral
          ? t("chooseReferral")
          : t("visitOfficial")}
      </p>
      <PlatformActions
        centered
        allProjectsReferralLink={platform.allProjectsReferralLink}
        platformSlug={platform.slug}
        websiteLabel={t("visitWebsite")}
        websiteUrl={platform.websiteUrl}
      />
    </section>
  );
}
