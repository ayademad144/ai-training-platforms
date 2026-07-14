"use client";

import { platformCategories, platforms } from "@/data/platforms";
import { useState } from "react";
import PlatformCard from "./platform-card";

export default function PlatformsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const visiblePlatforms =
    activeCategory === "All"
      ? platforms
      : platforms.filter((platform) => platform.category === activeCategory);

  return (
    <section
      aria-labelledby="featured-platforms-title"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2
            className="mb-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            id="featured-platforms-title"
          >
            Featured AI Training Platforms
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Hand-reviewed platforms to help you find the right fit for your
            skills and country.
          </p>
        </div>

        <div
          aria-label="Filter platforms by category"
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="group"
        >
          {platformCategories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                aria-pressed={isActive}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-border bg-white text-muted-foreground hover:border-gray-300 hover:text-foreground"
                }`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePlatforms.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </div>
    </section>
  );
}
