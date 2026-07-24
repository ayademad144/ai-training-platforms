import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ar"];
export const defaultLocale = "en";

export const routing = defineRouting({
  defaultLocale,
  localeCookie: {
    name: "NEXT_LOCALE",
  },
  localePrefix: "always",
  locales,
});

export function isLocale(value) {
  return locales.includes(value);
}

export function getLocaleFromPathname(pathname) {
  const segment = pathname.split("/")[1];
  return isLocale(segment) ? segment : defaultLocale;
}

export function stripLocaleFromPathname(pathname) {
  const locale = getLocaleFromPathname(pathname);
  return pathname === `/${locale}`
    ? "/"
    : pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "") || "/";
}
