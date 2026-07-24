import {
  copyrightKey,
  footerBrand,
  footerColumns,
} from "@/data/footer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import FooterColumn from "./footer-column";
import SocialLinks from "./social-links";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-border bg-white px-4 pb-10 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 justify-between gap-10 text-center sm:grid-cols-3 sm:text-start lg:grid-cols-[minmax(260px,320px)_max-content_max-content] lg:gap-28">
          <div>
            <Link
              aria-label={footerBrand.name}
              className="mb-4 flex items-center justify-center gap-2.5 sm:justify-start"
              href="/"
            >
              <Image
                alt=""
                aria-hidden="true"
                height={32}
                src="/brand/trainhub-ai-icon.svg"
                width={32}
              />
              <span className="text-sm font-semibold text-foreground">
                {footerBrand.name}
              </span>
            </Link>
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground sm:mx-0">
              {t(footerBrand.descriptionKey)}
            </p>
          </div>

          {footerColumns.map((column) => (
            <FooterColumn column={column} key={column.id} />
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">{t(copyrightKey)}</p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
