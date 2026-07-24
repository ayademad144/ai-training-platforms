"use client";

import {
  Bars3Icon,
  GlobeAltIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import NavigationLinks from "./navigation-links";

const mobileNavigationId = "primary-navigation";

function LanguageButton({ className, language, onToggle }) {
  const t = useTranslations("Navigation");

  return (
    <button
      aria-label={t("switchTo")}
      aria-pressed={language === "ar"}
      className={className}
      onClick={onToggle}
      type="button"
    >
      <GlobeAltIcon aria-hidden="true" className="size-[13px]" />
      {t("currentLanguage")}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);

  function toggleLanguage() {
    const nextLocale = locale === "en" ? "ar" : "en";
    const hash = window.location.hash || "";

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.replace(`${pathname}${hash}`, { locale: nextLocale });
    setIsMenuOpen(false);
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <nav
        aria-label={t("primary")}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between">
          <Link
            aria-label={t("homeAria")}
            className="flex items-center gap-2.5"
            href="/"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              alt=""
              aria-hidden="true"
              height={32}
              loading="eager"
              src="/brand/trainhub-ai-icon.svg"
              width={32}
            />
            <span className="hidden text-sm font-semibold text-foreground sm:block">
              Train Hub AI
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 md:flex">
            <NavigationLinks pathname={pathname} />
          </div>

          <div className="flex items-center gap-2">
            <LanguageButton
              className="hidden items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
              language={locale}
              onToggle={toggleLanguage}
            />
            <button
              aria-controls={mobileNavigationId}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              ref={menuToggleRef}
              type="button"
            >
              {isMenuOpen ? (
                <XMarkIcon aria-hidden="true" className="size-[18px]" />
              ) : (
                <Bars3Icon aria-hidden="true" className="size-[18px]" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            className="space-y-1 border-t border-border pb-4 pt-2 md:hidden"
            id={mobileNavigationId}
          >
            <NavigationLinks
              mobile
              onNavigate={() => setIsMenuOpen(false)}
              pathname={pathname}
            />
            <div className="px-4 pt-1">
              <LanguageButton
                className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
                language={locale}
                onToggle={toggleLanguage}
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
