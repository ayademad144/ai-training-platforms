import { EnvelopeIcon } from "@heroicons/react/24/outline";
import NewsletterForm from "./newsletter-form";

export default function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter-title"
      className="border-y border-border bg-gray-50 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-lg text-center">
        <span className="mx-auto mb-6 flex size-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
          <EnvelopeIcon aria-hidden="true" className="size-[21px] text-blue-600" />
        </span>
        <h2
          className="mb-3 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl"
          id="newsletter-title"
        >
          Stay Updated
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Get notified when new platforms are added, guides are published, or
          platform requirements change. No spam, ever.
        </p>

        <NewsletterForm />

        <p className="mt-3 text-xs text-muted-foreground">
          Join 2,400+ subscribers. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
