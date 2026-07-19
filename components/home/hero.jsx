import Image from "next/image";
import Link from "next/link";

export const metadata = {
  description:
    "Compare the best AI training platforms, remote AI jobs, and data annotation websites. Read reviews, payment methods, hourly rates, acceptance guides, and referral links before you apply.",
  title:
    "Best AI Training Platforms 2026 | Reviews, Pay Rates & Guides | TrainHub AI",
};

export default function Hero() {
  return (
    <main className="focus:outline-none" id="main-content" tabIndex={-1}>
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-700">
              Discover AI Training Platforms
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Find the Best AI <span className="text-blue-700">Training </span>
              Platforms & Remote AI Jobs
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground ">
              TrainHub AI helps you discover legitimate AI training platforms,
              remote AI jobs, and data annotation opportunities. Compare
              platform reviews, exam requirements, payment methods, hourly
              rates, and application guides—all in one place.
            </p>
            <div className="mt-8 flex  gap-8 sm:flex-row ">
              <Link
                className="inline-flex items-center justify-center rounded-md  px-5 py-3 text-sm font-semibold bg-foreground text-white transition-colors hover:bg-blue-700"
                href="/#featured-platforms"
              >
                Explore platforms{" "}  

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
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
              src="https://learningmole.com/wp-content/uploads/2025/08/v2-zkoqd-ybdxn.jpg"
              width={900}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
