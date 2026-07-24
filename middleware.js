import createIntlMiddleware from "next-intl/middleware";
import { updateSession } from "@/lib/supabase/middleware";
import { applySecurityHeaders } from "@/lib/security-headers";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createIntlMiddleware(routing);

export async function middleware(request) {
  const i18nResponse = handleI18nRouting(request);
  const response = await updateSession(request, i18nResponse);
  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|opengraph-image|twitter-image|manifest.webmanifest|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
