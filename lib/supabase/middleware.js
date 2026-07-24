import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { defaultLocale, getLocaleFromPathname, stripLocaleFromPathname } from "@/i18n/routing";

function redirectToSignIn(request, response) {
  const url = request.nextUrl.clone();
  const locale = getLocaleFromPathname(request.nextUrl.pathname);
  url.pathname = `/${locale}/signin`;
  url.searchParams.set("next", request.nextUrl.pathname);

  const redirectResponse = NextResponse.redirect(url);

  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });

  return redirectResponse;
}

export async function updateSession(request, initialResponse) {
  let response =
    initialResponse ||
    NextResponse.next({
      request,
    });
  const pathnameWithoutLocale = stripLocaleFromPathname(request.nextUrl.pathname);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return pathnameWithoutLocale.startsWith("/dashboard")
      ? redirectToSignIn(request, response)
      : response;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!pathnameWithoutLocale.startsWith("/dashboard")) {
    return response;
  }

  if (error || !user) {
    return redirectToSignIn(request, response);
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (!admin) {
    return redirectToSignIn(request, response);
  }

  return response;
}
