import Link from "next/link";
import { isActiveNavigationItem, siteNavigation } from "./site-navigation";

const desktopLinkClassName =
  "rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors";
const mobileLinkClassName =
  "block w-full rounded-md px-4 py-2.5 text-left text-sm font-medium transition-colors";
const activeLinkClassName = "bg-muted text-foreground";
const inactiveLinkClassName =
  "text-muted-foreground hover:bg-muted hover:text-foreground";

export default function NavigationLinks({ mobile = false, onNavigate, pathname }) {
  const baseClassName = mobile ? mobileLinkClassName : desktopLinkClassName;

  return siteNavigation.map(({ href, label }) => {
    const isActive = isActiveNavigationItem(pathname, href);

    return (
      <Link
        key={href}
        aria-current={isActive ? "page" : undefined}
        className={`${baseClassName} ${
          isActive ? activeLinkClassName : inactiveLinkClassName
        }`}
        href={href}
        onClick={onNavigate}
        prefetch={false}
      >
        {label}
      </Link>
    );
  });
}
