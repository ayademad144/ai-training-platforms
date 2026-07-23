import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { createClient } from "./server";

const PUBLIC_PLATFORM_CACHE_SECONDS = 300;

const HOME_PLATFORM_COLUMNS = [
  "id",
  "name",
  "slug",
  "shortDescription",
  "category",
  "categoryColor",
  "countries",
  "hourlyRate",
  "image",
  "rating",
  "payment",
].join(",");

function createPublicClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

const RELATED_PLATFORM_COLUMNS = [
  "id",
  "name",
  "slug",
  "category",
  "categoryColor",
  "hourlyRate",
  "image",
].join(",");

function normalizeTextList(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
  }

  return typeof value === "string" && value.trim() ? [value.trim()] : [];
}

function normalizeExternalUrl(value) {
  if (typeof value !== "string" || !value.trim()) {
    return "";
  }

  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : "";
  } catch {
    return "";
  }
}

function normalizeReferralLinks(value) {
  const items = Array.isArray(value) ? value : value ? [value] : [];

  return items
    .map((item, index) => {
      if (typeof item === "string") {
        return {
          label: `Referral Link ${index + 1}`,
          url: normalizeExternalUrl(item),
        };
      }

      return {
        label:
          item?.projectName?.trim() ||
          item?.label?.trim() ||
          `Referral Link ${index + 1}`,
        url: normalizeExternalUrl(
          item?.referralLink ?? item?.url ?? item?.href,
        ),
      };
    })
    .filter((item) => item.url);
}

function normalizeFrequentlyAsked(value) {
  return (Array.isArray(value) ? value : [])
    .map((item) => ({
      answer:
        typeof item?.answer === "string"
          ? item.answer.trim()
          : typeof item?.a === "string"
            ? item.a.trim()
            : "",
      question:
        typeof item?.question === "string"
          ? item.question.trim()
          : typeof item?.q === "string"
            ? item.q.trim()
            : "",
    }))
    .filter((item) => item.question && item.answer);
}

function normalizePlatformDetails(platform) {
  if (!platform) {
    return null;
  }

  return {
    allProjectsReferralLink: normalizeExternalUrl(
      platform.allProjectsReferralLink ?? platform.referralLink,
    ),
    category: platform.category || "",
    categoryColor: platform.categoryColor || "slate",
    countries: platform.countries || "",
    description: platform.description || "",
    shortDescription: platform.shortDescription || "",
    frequentlyAsked: normalizeFrequentlyAsked(platform.frequentlyAsked),
    hourlyRate: platform.hourlyRate || "",
    id: platform.id,
    image: normalizeExternalUrl(platform.image),
    name: platform.name || "",
    passing: normalizeTextList(platform.passing ?? platform.howToPass),
    payment: normalizeTextList(platform.payment),
    prosAndCons: {
      cons: normalizeTextList(platform.prosAndCons?.cons),
      pros: normalizeTextList(platform.prosAndCons?.pros),
    },
    rating: Number(platform.rating) || 0,
    referralLinks: normalizeReferralLinks(platform.referralLinks),
    requirements: normalizeTextList(platform.requirements),
    slug: platform.slug || "",
    websiteUrl: normalizeExternalUrl(platform.websiteUrl),
  };
}

async function queryPlatformBySlug(supabase, slug) {
  const normalizedSlug = typeof slug === "string" ? slug.trim() : "";

  if (!normalizedSlug) {
    return null;
  }

  const { data, error } = await supabase
    .from("platforms")
    .select("*")
    .eq("slug", normalizedSlug)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to load platform: ${error.message}`, {
      cause: error,
    });
  }

  return normalizePlatformDetails(data);
}

async function queryRelatedPlatforms(supabase, platform, limit) {
  if (!platform?.category || !platform?.id) {
    return [];
  }

  const safeLimit = Math.min(Math.max(Number(limit) || 3, 1), 4);
  const { data, error } = await supabase
    .from("platforms")
    .select(RELATED_PLATFORM_COLUMNS)
    .eq("category", platform.category)
    .neq("id", platform.id)
    .order("rating", { ascending: false, nullsFirst: false })
    .limit(safeLimit);

  if (error) {
    throw new Error(`Unable to load related platforms: ${error.message}`, {
      cause: error,
    });
  }

  return (data ?? []).map((relatedPlatform) => ({
    ...relatedPlatform,
    image: normalizeExternalUrl(relatedPlatform.image),
  }));
}

export async function getPlatforms() {
  const supabase = await createClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("platforms")
    .select(HOME_PLATFORM_COLUMNS)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Unable to load platforms: ${error.message}`, {
      cause: error,
    });
  }

  return (data ?? []).map((platform) => ({
    ...platform,
    image: normalizeExternalUrl(platform.image),
  }));
}

export async function getPlatformBySlug(slug) {
  const supabase = await createClient();

  if (!supabase) {
    return null;
  }

  return queryPlatformBySlug(supabase, slug);
}

export async function getPlatformPageData(slug, relatedLimit = 3) {
  const supabase = await createClient();

  if (!supabase) {
    return { platform: null, relatedPlatforms: [] };
  }

  const platform = await queryPlatformBySlug(supabase, slug);
  const relatedPlatforms = platform
    ? await queryRelatedPlatforms(supabase, platform, relatedLimit)
    : [];

  return { platform, relatedPlatforms };
}

export const getCachedPlatforms = unstable_cache(
  async () => {
    const supabase = createPublicClient();

    if (!supabase) {
      return [];
    }

    const { data, error } = await supabase
      .from("platforms")
      .select(HOME_PLATFORM_COLUMNS)
      .order("name", { ascending: true });

    if (error) {
      throw new Error(`Unable to load platforms: ${error.message}`, {
        cause: error,
      });
    }

    return (data ?? []).map((platform) => ({
      ...platform,
      image: normalizeExternalUrl(platform.image),
    }));
  },
  ["public-platforms"],
  {
    revalidate: PUBLIC_PLATFORM_CACHE_SECONDS,
    tags: ["platforms"],
  },
);

export const getCachedPlatformBySlug = unstable_cache(
  async (slug) => {
    const supabase = createPublicClient();

    if (!supabase) {
      return null;
    }

    return queryPlatformBySlug(supabase, slug);
  },
  ["public-platform-by-slug"],
  {
    revalidate: PUBLIC_PLATFORM_CACHE_SECONDS,
    tags: ["platforms"],
  },
);

export const getCachedPlatformPageData = unstable_cache(
  async (slug, relatedLimit = 3) => {
    const supabase = createPublicClient();

    if (!supabase) {
      return { platform: null, relatedPlatforms: [] };
    }

    const platform = await queryPlatformBySlug(supabase, slug);
    const relatedPlatforms = platform
      ? await queryRelatedPlatforms(supabase, platform, relatedLimit)
      : [];

    return { platform, relatedPlatforms };
  },
  ["public-platform-page-data"],
  {
    revalidate: PUBLIC_PLATFORM_CACHE_SECONDS,
    tags: ["platforms"],
  },
);
