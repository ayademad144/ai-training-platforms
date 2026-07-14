import Categories from "@/components/home/categories";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import LatestGuides from "@/components/home/latest-guides";
import Newsletter from "@/components/home/newsletter";
import PlatformsGrid from "@/components/home/platforms-grid";

export default function HomePage() {
  return (
    <main className="focus:outline-none" id="main-content" tabIndex={-1}>
      <Hero />
      <Categories />
      <PlatformsGrid />
      <Features />
      <LatestGuides />
      <Newsletter />
    </main>
  );
}
