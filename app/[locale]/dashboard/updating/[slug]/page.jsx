import { notFound } from "next/navigation";
import PlatformForm from "../../adding/platform-form";
import { getPlatformBySlug } from "@/lib/supabase/platforms";

export const metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "Edit Platform",
};

export default async function EditPlatformPage({ params }) {
  const { slug } = await params;
  const platform = await getPlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  return (
    <PlatformForm
      initialPlatform={platform}
      mode="update"
      redirectOnSuccess={false}
    />
  );
}
