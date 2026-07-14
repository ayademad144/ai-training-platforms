"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubscribed(true);
    setEmail("");
  }

  if (isSubscribed) {
    return (
      <div
        className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
        role="status"
      >
        <CheckIcon aria-hidden="true" className="size-[15px]" />
        You&apos;re subscribed — we&apos;ll be in touch soon.
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-2.5 sm:flex-row" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        autoComplete="email"
        className="flex-1 rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="newsletter-email"
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        required
        type="email"
        value={email}
      />
      <button
        className="whitespace-nowrap rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        type="submit"
      >
        Subscribe
      </button>
    </form>
  );
}
