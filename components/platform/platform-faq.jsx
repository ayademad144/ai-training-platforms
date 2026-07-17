import {
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export default function PlatformFaq({ items = [] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="platform-faq-title">
      <h2
        className="mb-4 font-display text-xl font-bold text-foreground"
        id="platform-faq-title"
      >
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <details
            className="group overflow-hidden rounded-xl border border-border bg-white"
            key={`${item.question}-${index}`}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-3">
                <QuestionMarkCircleIcon
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-blue-500"
                />
                {item.question}
              </span>
              <ChevronRightIcon
                aria-hidden="true"
                className="size-[13px] shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
              />
            </summary>
            <div className="border-t border-border bg-gray-50 px-5 pb-4 pt-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
