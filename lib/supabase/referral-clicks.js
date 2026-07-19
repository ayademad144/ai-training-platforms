import { createClient } from "./server";

export async function getReferralClickStats() {
  const supabase = await createClient();

  if (!supabase) {
    return {
      error: "Supabase is not configured.",
      platformClicks: [],
      totalClicks: 0,
    };
  }

  const { count, error: countError } = await supabase
    .from("referral_clicks")
    .select("id", { count: "exact", head: true });

  if (countError) {
    return {
      error: countError.message,
      platformClicks: [],
      totalClicks: 0,
    };
  }

  const { data, error } = await supabase
    .from("referral_clicks")
    .select("platform_id,platform_slug,platform_name,referral_label,referral_type,clicked_at")
    .order("clicked_at", { ascending: false })
    .limit(10000);

  if (error) {
    return {
      error: error.message,
      platformClicks: [],
      totalClicks: count ?? 0,
    };
  }

  const groupedClicks = new Map();

  for (const click of data ?? []) {
    const referralType = click.referral_type || "individual_project";
    const referralLabel =
      click.referral_label ||
      (referralType === "all_projects"
        ? "All Projects Referral Link"
        : "Individual Project");
    const key = `${click.platform_id}:${referralType}:${referralLabel}`;
    const current = groupedClicks.get(key) ?? {
      count: 0,
      lastClickedAt: null,
      platformId: key,
      platformName: click.platform_name || click.platform_slug || key,
      platformSlug: click.platform_slug || "",
      referralLabel,
      referralType,
    };

    current.count += 1;

    if (!current.lastClickedAt && click.clicked_at) {
      current.lastClickedAt = click.clicked_at;
    }

    groupedClicks.set(key, current);
  }

  const platformClicks = Array.from(groupedClicks.values()).sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }

    return (b.lastClickedAt || "").localeCompare(a.lastClickedAt || "");
  });

  return {
    error: null,
    platformClicks,
    totalClicks: count ?? 0,
  };
}
