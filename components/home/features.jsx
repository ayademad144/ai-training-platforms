import { features } from "@/data/features";
import FeatureCard from "./feature-card";

export default function Features() {
  return (
    <section
      aria-labelledby="features-title"
      className="border-y border-border bg-gray-50 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2
            className="mb-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            id="features-title"
          >
            Why Choose This Website
          </h2>
          <p className="mx-auto max-w-md text-lg text-muted-foreground">
            We do the research so you can focus on earning.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard feature={feature} key={feature.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}
