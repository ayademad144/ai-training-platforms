import Link from "next/link";

export default function FooterColumn({ column }) {
  const headingId = `footer-${column.id}`;

  return (
    <nav aria-labelledby={headingId}>
      <h2
        className="mb-4 text-[11px] font-bold uppercase tracking-widest text-foreground"
        id={headingId}
      >
        {column.heading}
      </h2>
      <ul className="space-y-2.5">
        {column.links.map((link) => (
          <li key={link.label}>
            <Link
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
