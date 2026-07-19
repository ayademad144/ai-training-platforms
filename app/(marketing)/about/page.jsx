import Image from "next/image";
import Link from "next/link";

export const metadata = {
  description:
    "Learn how TrainHub AI helps you find part-time AI training jobs that pay in USD and prepare for platform tests.",
  title: "About",
};

const supportCards = [
  {
    title: "Find part-time USD jobs",
    text: "We collect AI training, data annotation, evaluation, and writing platforms so you can compare roles, payment methods, and beginner-friendly opportunities in one place.",
  },
  {
    title: "Understand each platform",
    text: "Before applying, you can learn what every platform usually asks for, what type of tasks you may see, and whether it fits your skills and available time.",
  },
  {
    title: "Pass the test with confidence",
    text: "Our guides focus on the real preparation steps: reading instructions carefully, practicing sample tasks, avoiding rushed answers, and improving the quality of your submissions.",
  },
];

const testSteps = [
  "Choose platforms that match your English level, subject knowledge, and schedule.",
  "Read the guide for the platform before starting the qualification test.",
  "Practice the task style first, then take the test slowly and check every answer.",
  "Track your applications and keep improving until you land consistent part-time work.",
];

export default function AboutPage() {
  return (
    <main className="focus:outline-none" id="main-content" tabIndex={-1}>
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-700">
              About TrainHub AI
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Find part-time AI work, earn in USD, and prepare for every test.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              TrainHub AI is built for people who want flexible online work with
              international platforms. We help you discover part-time AI
              training jobs, compare the best options, and understand how to
              pass the tests that usually decide whether you get accepted.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                href="/#featured-platforms"
              >
                Explore platforms
              </Link>
              
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              alt="Student learning online with study materials"
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
          {supportCards.map((card) => (
            <article className="rounded-lg bg-white p-6" key={card.title}>
              <h2 className="text-lg font-semibold text-foreground">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-700">
              How we help
            </p>
            <h2 className="font-display text-3xl font-semibold text-foreground">
              From searching to passing the test
            </h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {testSteps.map((step, index) => (
              <li
                className="rounded-lg border border-border p-5 text-sm leading-7 text-muted-foreground"
                key={step}
              >
                <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-foreground">
                  Step {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
