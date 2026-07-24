export const metadata = {
  description:
    "Read the TrainHub AI privacy policy to understand what information we collect, how we use it, and how to contact us about privacy questions.",
  title: "Privacy Policy",
};

const sections = [
  {
    title: "We do not collect user data",
    text: "TrainHub AI is an informational website. We do not ask users to create accounts, submit personal profiles, upload documents, or provide personal data to browse our platform listings and guides.",
  },
  {
    title: "Contact form messages",
    text: "If you choose to contact us, we receive only the information you type into the contact form, such as your name, email address, subject, and message. We use that information only to read and respond to your request.",
  },
  {
    title: "Platform links and third parties",
    text: "TrainHub AI links to third-party AI training platforms and resources. Those websites have their own privacy practices, and we are not responsible for how they collect, use, or protect your information.",
  },
  {
    title: "Email delivery",
    text: "Contact form messages may be processed by our email delivery provider so they can reach our inbox. We do not sell, rent, or share contact form messages for marketing purposes.",
  },
  {
    title: "No user accounts or tracking profiles",
    text: "We do not maintain user accounts, user dashboards, saved profiles, or personalized tracking profiles for visitors.",
  },
  {
    title: "Your choices",
    text: "If you previously contacted us and want your message deleted from our records, you can contact us and request deletion where applicable.",
  },
  {
    title: "Policy updates",
    text: "We may update this policy as the website changes. When we do, we will revise the date on this page.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="focus:outline-none" id="main-content" tabIndex={-1}>
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-700">
            Privacy Policy
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            How TrainHub AI handles your information
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            TrainHub AI is designed as a public directory and guide website. We
            do not collect personal data from visitors just for browsing.
          </p>
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Last updated: July 17, 2026
          </p>
        </div>
      </section>

      <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-border rounded-lg border border-border bg-white">
          {sections.map((section) => (
            <article className="p-6 sm:p-8" key={section.title}>
              <h2 className="text-xl font-semibold text-foreground">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {section.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
