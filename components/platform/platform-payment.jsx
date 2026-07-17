import { CreditCardIcon } from "@heroicons/react/24/outline";

export default function PlatformPayment({ methods = [] }) {
  if (methods.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="platform-payment-title">
      <h2
        className="mb-4 font-display text-xl font-bold text-foreground"
        id="platform-payment-title"
      >
        Payment Methods
      </h2>
      <ul className="flex flex-wrap gap-3">
        {methods.map((method) => (
          <li
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-gray-50 px-4 py-3 text-sm font-medium text-foreground"
            key={method}
          >
            <CreditCardIcon
              aria-hidden="true"
              className="size-3.5 text-blue-600"
            />
            {method}
          </li>
        ))}
      </ul>
    </section>
  );
}
