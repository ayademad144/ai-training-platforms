import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export const metadata = {
  description:
    "Learn how TrainHub AI helps you find part-time AI training jobs that pay in USD and prepare for platform tests.",
  title: "About",
};

const supportCards = [
  ["aboutCard1Title", "aboutCard1Text"],
  ["aboutCard2Title", "aboutCard2Text"],
  ["aboutCard3Title", "aboutCard3Text"],
];

const testSteps = ["aboutStep1", "aboutStep2", "aboutStep3", "aboutStep4"];

export default function AboutPage() {
  const t = useTranslations("Marketing");
  const homeT = useTranslations("Home");

  return (
    <main className="focus:outline-none" id="main-content" tabIndex={-1}>
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-700">
              {t("aboutEyebrow")}
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {t("aboutHeroTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {t("aboutHeroDescription")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                href="/#featured-platforms"
              >
                {homeT("browsePlatforms")}
              </Link>
              
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              alt={t("aboutImageAlt")}
              className="h-full w-full object-cover"
              height={720}
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              src="https://www.onlc.com/blog/wp-content/uploads/2023/12/ai-specialist-2001x1332-1.png"
              width={900}
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {supportCards.map(([titleKey, textKey]) => (
            <article className="rounded-lg bg-white p-6" key={titleKey}>
              <h2 className="text-lg font-semibold text-foreground">
                {t(titleKey)}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {t(textKey)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-700">
              {t("aboutHelpEyebrow")}
            </p>
            <h2 className="font-display text-3xl font-semibold text-foreground">
              {t("aboutHelpTitle")}
            </h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {testSteps.map((stepKey, index) => (
              <li
                className="rounded-lg border border-border p-5 text-sm leading-7 text-muted-foreground"
                key={stepKey}
              >
                <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-foreground">
                  {t("step", { number: index + 1 })}
                </span>
                {t(stepKey)}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
