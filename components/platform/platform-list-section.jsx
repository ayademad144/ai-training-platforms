import { CheckIcon } from "@heroicons/react/24/outline";

export default function PlatformListSection({
  items = [],
  title,
  variant = "check",
}) {
  if (items.length === 0) {
    return null;
  }

  const titleId = `platform-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section aria-labelledby={titleId}>
      <h2
        className="mb-4 font-display text-xl font-bold text-foreground"
        id={titleId}
      >
        {title}
      </h2>

      {variant === "steps" ? (
        <ol className="space-y-3">
          {items.map((item, index) => (
            <li
              className="flex items-start gap-3.5 rounded-xl border border-border bg-gray-50 p-4"
              key={`${item}-${index}`}
            >
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-700">
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              className="flex items-start gap-3 text-sm text-muted-foreground"
              key={`${item}-${index}`}
            >
              <CheckIcon
                aria-hidden="true"
                className="mt-0.5 size-3.5 shrink-0 text-emerald-500"
              />
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
