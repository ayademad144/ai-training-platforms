import { guides } from "@/data/guides";
import GuideCard from "./guide-card";

export default function LatestGuides() {
  return (
    <section
      aria-labelledby="latest-guides-title"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      id="latest-guides"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              className="mb-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
              id="latest-guides-title"
            >
              Latest Guides
            </h2>
            <p className="text-lg text-muted-foreground">
              Practical, up-to-date guides to help you get started and succeed.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard guide={guide} key={guide.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
