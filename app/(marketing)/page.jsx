import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import LatestGuides from "@/components/home/latest-guides";
import PlatformsGrid from "@/components/home/platforms-grid";
import { getCachedPlatforms } from "@/lib/supabase/platforms";

export const revalidate = 300;

export default async function HomePage() {
  const platforms = await getCachedPlatforms();

  return (
    <main className="focus:outline-none" id="main-content" tabIndex={-1}>
      <Hero />
      <Features />
      <PlatformsGrid platforms={platforms} />
      <LatestGuides platforms={platforms} />
    </main>
  );
}
