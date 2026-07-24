export const siteNavigation = [
  { href: "/", labelKey: "home" },
  { href: "/#featured-platforms", labelKey: "platforms" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
];

export function isActiveNavigationItem(pathname, href) {
  const hrefPathname = href.split("#")[0];

  return hrefPathname === "/"
    ? pathname === hrefPathname
    : pathname === hrefPathname || pathname.startsWith(`${hrefPathname}/`);
}
