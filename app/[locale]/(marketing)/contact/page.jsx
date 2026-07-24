import { useTranslations } from "next-intl";
import ContactForm from "./contact-form";

export const metadata = {
  description:
    "Contact TrainHub AI to report incorrect platform information, suggest new AI training platforms, discuss partnerships, or share feedback.",
  title: "Contact Us",
};

const contactTopics = [
  "contactTopic1",
  "contactTopic2",
  "contactTopic3",
  "contactTopic4",
];

export default function ContactPage() {
  const t = useTranslations("Marketing");

  return (
    <main className="focus:outline-none" id="main-content" tabIndex={-1}>
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {t("contactTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              {t("contactHeroDescription")}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-white p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-semibold text-foreground">
              {t("contactTopicsTitle")}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactTopics.map((topicKey) => (
              <article
                className="rounded-lg border border-border bg-white p-5 text-sm font-semibold leading-6 text-foreground shadow-sm"
                key={topicKey}
              >
                {t(topicKey)}
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-blue-100 bg-blue-50 p-6">
            <h2 className="text-lg font-semibold text-foreground">
              {t("responseTimeTitle")}
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {t("responseTimeText")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
