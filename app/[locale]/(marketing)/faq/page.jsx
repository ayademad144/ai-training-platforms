export const metadata = {
  description:
    "Answers about TrainHub AI, how the website helps applicants, and how long AI training platform acceptance usually takes.",
  title: "FAQ",
};

const faqs = [
  {
    answer:
      "TrainHub AI helps you compare AI training, data annotation, evaluation, and remote task platforms in one place. Instead of opening many websites separately, you can quickly check what each platform does, expected pay style, available countries, payment methods, requirements, and guides before you apply.",
    question: "What is the benefit of this website?",
  },
  {
    answer:
      "Acceptance time is different from one platform to another. Outlier-style AI writing platforms may reply in about 3 to 10 days, data annotation platforms often take 1 to 3 weeks, microtask platforms can approve accounts within 24 to 72 hours, and evaluator platforms such as Appen or TELUS-type projects may take 2 to 4 weeks because they usually include screening, exams, and project availability checks.",
    question: "How long does acceptance usually take?",
  },
  {
    answer:
      "No. Some platforms approve quickly when they need more workers in your country or skill area. Others may keep your account under review until a matching project opens. A strong profile, careful test answers, and applying to more than one suitable platform can improve your chances.",
    question: "Do all platforms accept applicants at the same speed?",
  },
  {
    answer:
      "Start with the platforms section, choose websites that match your English level, country, skills, and available time, then read the latest guides before taking any qualification test. The guides are made to help you understand the task style before you apply.",
    question: "Where should I start?",
  },
];

export default function FaqPage() {
  return (
    <main className="focus:outline-none" id="main-content" tabIndex={-1}>
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-700">
            FAQ
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Common questions before you apply
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Quick answers about using TrainHub AI and understanding acceptance
            timelines across different AI work platforms.
          </p>

          <div className="mt-12 divide-y divide-border rounded-lg border border-border bg-white">
            {faqs.map((faq) => (
              <article className="p-6 sm:p-7" key={faq.question}>
                <h2 className="text-lg font-semibold text-foreground">
                  {faq.question}
                </h2>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
