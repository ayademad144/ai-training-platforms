import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function FooterColumn({ column }) {
  const t = useTranslations("Footer");
  const headingId = `footer-${column.id}`;

  return (
    <nav aria-labelledby={headingId}>
      <h2
        className="mb-4 text-[11px] font-bold uppercase tracking-widest text-foreground"
        id={headingId}
      >
        {t(column.headingKey)}
      </h2>
      <ul className="space-y-2.5">
        {column.links.map((link) => (
          <li key={link.labelKey}>
            <Link
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              href={link.href}
            >
              {t(link.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
