import PlatformFaq from "@/components/platform/platform-faq";
import PlatformHero from "@/components/platform/platform-hero";
import PlatformIndividualProjects from "@/components/platform/platform-individual-projects";
import PlatformListSection from "@/components/platform/platform-list-section";
import PlatformOverview from "@/components/platform/platform-overview";
import PlatformPayment from "@/components/platform/platform-payment";
import PlatformProsCons from "@/components/platform/platform-pros-cons";
import PlatformSidebar from "@/components/platform/platform-sidebar";
import {
  getPlatformBySlug,
  getPlatformPageData,
} from "@/lib/supabase/platforms";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const platform = await getPlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  const description =
    platform.description ||
    `Review ${platform.name}, including requirements, payment methods, and application guidance.`;
  const canonicalPath = `/platform/${platform.slug}`;

  return {
    alternates: { canonical: canonicalPath },
    description,
    openGraph: {
      description,
      title: `${platform.name} Review`,
      type: "article",
      url: canonicalPath,
    },
    title: `${platform.name} Review`,
    twitter: {
      card: "summary_large_image",
      description,
      title: `${platform.name} Review`,
    },
  };
}

export default async function PlatformDetailsPage({ params }) {
  const { slug } = await params;
  const { platform, relatedPlatforms } = await getPlatformPageData(slug);

  if (!platform) {
    notFound();
  }

  return (
    <main
      className="min-h-screen bg-white focus:outline-none"
      id="main-content"
      tabIndex={-1}
    >
      <div>
        <PlatformHero platform={platform} />

        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="space-y-14 lg:col-span-2">
              <PlatformOverview
                description={platform.description}
                name={platform.name}
              />
              <PlatformListSection
                items={platform.requirements}
                title="Requirements"
              />
              <PlatformListSection
                items={platform.passing}
                title="Passing / Acceptance Process"
                variant="steps"
              />
              <PlatformPayment methods={platform.payment} />
              <PlatformProsCons
                cons={platform.prosAndCons.cons}
                pros={platform.prosAndCons.pros}
              />
              <PlatformIndividualProjects
                platformSlug={platform.slug}
                projects={platform.referralLinks}
              />
              <PlatformFaq items={platform.frequentlyAsked} />
            </div>

            <PlatformSidebar
              platform={platform}
              relatedPlatforms={relatedPlatforms}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
