"use client";

import {
  Bars3Icon,
  GlobeAltIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import NavigationLinks from "./navigation-links";

const mobileNavigationId = "primary-navigation";

function LanguageButton({ className, language, onToggle }) {
  return (
    <button
      aria-label={`Switch language display to ${
        language === "en" ? "Arabic" : "English"
      }`}
      aria-pressed={language === "ar"}
      className={className}
      onClick={onToggle}
      type="button"
    >
      <GlobeAltIcon aria-hidden="true" className="size-[13px]" />
      {language === "en" ? "English" : "العربية"}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const menuToggleRef = useRef(null);

  function toggleLanguage() {
    setLanguage((currentLanguage) =>
      currentLanguage === "en" ? "ar" : "en",
    );
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
        aria-label="Primary navigation"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between">
          <Link
            aria-label="AI Training Models home"
            className="flex items-center gap-2.5"
            href="/"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              alt=""
              aria-hidden="true"
              height={32}
              loading="eager"
              src="/brand/ai-training-models.svg"
              width={32}
            />
            <span className="hidden text-sm font-semibold text-foreground sm:block">
              AI Training Models
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 md:flex">
            <NavigationLinks pathname={pathname} />
          </div>

          <div className="flex items-center gap-2">
            <LanguageButton
              className="hidden items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
              language={language}
              onToggle={toggleLanguage}
            />
            <button
              aria-controls={mobileNavigationId}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
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
                language={language}
                onToggle={toggleLanguage}
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
