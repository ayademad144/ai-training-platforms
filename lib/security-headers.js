function getSupabaseOrigins() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    return [];
  }

  try {
    const url = new URL(supabaseUrl);
    const websocketProtocol = url.protocol === "http:" ? "ws:" : "wss:";

    return [url.origin, `${websocketProtocol}//${url.host}`];
  } catch {
    return [];
  }
}

function buildContentSecurityPolicy() {
  const isDevelopment = process.env.NODE_ENV !== "production";
  const supabaseOrigins = getSupabaseOrigins();
  const directives = [
    ["default-src", "'self'"],
    [
      "script-src",
      "'self'",
      "'unsafe-inline'",
      ...(isDevelopment ? ["'unsafe-eval'"] : []),
      "https://va.vercel-scripts.com",
    ],
    ["style-src", "'self'", "'unsafe-inline'"],
    ["img-src", "'self'", "data:", "blob:", "https:"],
    ["font-src", "'self'", "data:"],
    [
      "connect-src",
      "'self'",
      ...supabaseOrigins,
      "https://*.supabase.co",
      "wss://*.supabase.co",
      "https://vitals.vercel-insights.com",
      "https://va.vercel-scripts.com",
    ],
    ["media-src", "'self'", "https:"],
    ["object-src", "'none'"],
    ["base-uri", "'self'"],
    ["form-action", "'self'"],
    ["frame-ancestors", "'none'"],
    ["worker-src", "'self'", "blob:"],
    ["manifest-src", "'self'"],
    ...(isDevelopment ? [] : [["upgrade-insecure-requests"]]),
  ];

  return directives
    .map(([name, ...values]) =>
      values.length > 0 ? `${name} ${values.join(" ")}` : name,
    )
    .join("; ");
}

export function applySecurityHeaders(response) {
  response.headers.set("Content-Security-Policy", buildContentSecurityPolicy());
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  return response;
}
