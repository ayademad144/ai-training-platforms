import PlatformActions from "./platform-actions";

export default function PlatformReferral({ platform }) {
  const hasReferrals = platform.referralLinks.length > 0;

  if (!platform.websiteUrl && !hasReferrals) {
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
        Ready to Join {platform.name}?
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        {hasReferrals
          ? "Choose an available referral link or visit the official platform website."
          : "Visit the official platform website to review current opportunities."}
      </p>
      <PlatformActions
        centered
        referralLinks={platform.referralLinks}
        showAllReferrals
        websiteLabel={`Visit ${platform.name}`}
        websiteUrl={platform.websiteUrl}
      />
    </section>
  );
}
