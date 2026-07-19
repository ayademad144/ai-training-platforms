import { updateSession } from "@/lib/supabase/middleware";
import { applySecurityHeaders } from "@/lib/security-headers";

export async function middleware(request) {
  const response = await updateSession(request);
  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
