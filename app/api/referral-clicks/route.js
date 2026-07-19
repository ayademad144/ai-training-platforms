import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function cleanText(value, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanUrl(value) {
  const text = cleanText(value, 1000);

  if (!text) {
    return "";
  }

  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : "";
  } catch {
    return "";
  }
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const platformSlug = cleanText(body?.platformSlug, 120);
  const referralLabel = cleanText(body?.referralLabel, 160);
  const referralType = cleanText(body?.referralType, 60);
  const referralUrl = cleanUrl(body?.referralUrl);

  if (!platformSlug) {
    return NextResponse.json(
      { error: "Platform slug is required." },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Referral tracking is not configured." },
      { status: 503 },
    );
  }

  const { data: platform, error: platformError } = await supabase
    .from("platforms")
    .select("id,name,slug")
    .eq("slug", platformSlug)
    .maybeSingle();

  if (platformError) {
    return NextResponse.json(
      { error: "Could not validate platform." },
      { status: 500 },
    );
  }

  if (!platform) {
    return NextResponse.json({ error: "Platform not found." }, { status: 404 });
  }

  const { error } = await supabase.from("referral_clicks").insert({
    platform_id: String(platform.id),
    platform_name: platform.name || null,
    platform_slug: platform.slug || platformSlug,
    referral_label: referralLabel || null,
    referral_type:
      referralType === "all_projects" ? "all_projects" : "individual_project",
    referral_url: referralUrl || null,
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not save referral click." },
      { status: 500 },
    );
  }

  return new NextResponse(null, { status: 204 });
}
