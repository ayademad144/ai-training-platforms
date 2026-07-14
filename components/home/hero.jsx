import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import HeroPlatformPreview from "./hero-platform-preview";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="bg-white px-4 pb-20 pt-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-blue-500" />
          Updated July 2025 · 20+ Platforms Reviewed
        </p>

        <h1
          className="mb-6 font-display text-[2.6rem] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem]"
          id="hero-title"
        >
          Discover the Best <span className="text-blue-600">AI Training</span>{" "}
          Platforms
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Compare AI training websites, acceptance processes, payment methods,
          exam requirements, reviews, and referral links — all in one place.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
            href="/platforms"
          >
            Explore Platforms
            <ArrowRightIcon aria-hidden="true" className="size-[15px]" />
          </Link>
          <Link
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:w-auto"
            href="/about"
          >
            Learn More
          </Link>
        </div>

        <HeroPlatformPreview />
      </div>
    </section>
  );
}
