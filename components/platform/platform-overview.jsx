import { useTranslations } from "next-intl";

export default function PlatformOverview({ description, name }) {
  const t = useTranslations("Platform");

  if (!description) {
    return null;
  }

  return (
    <section aria-labelledby="platform-overview-title">
      <h2
        className="mb-4 font-display text-xl font-bold text-foreground"
        id="platform-overview-title"
      >
        {t("whatIs", { name })}
      </h2>
      <p className="text-[15px] leading-relaxed text-muted-foreground">
        {description}
      </p>
    </section>
  );
}
