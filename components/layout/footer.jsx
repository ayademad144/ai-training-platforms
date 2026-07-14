import {
  copyright,
  footerBrand,
  footerColumns,
} from "@/data/footer";
import Image from "next/image";
import Link from "next/link";
import FooterColumn from "./footer-column";
import SocialLinks from "./social-links";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white px-4 pb-10 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-2 gap-10 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <Link
              aria-label={`${footerBrand.name} home`}
              className="mb-4 flex items-center gap-2.5"
              href="/"
            >
              <Image
                alt=""
                aria-hidden="true"
                height={32}
                src="/brand/ai-training-models.svg"
                width={32}
              />
              <span className="text-sm font-semibold text-foreground">
                {footerBrand.name}
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {footerBrand.description}
            </p>
          </div>

          {footerColumns.map((column) => (
            <FooterColumn column={column} key={column.id} />
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">{copyright}</p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
