import {
  CheckIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function PlatformProsCons({ cons = [], pros = [] }) {
  if (pros.length === 0 && cons.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="platform-pros-cons-title">
      <h2
        className="mb-4 font-display text-xl font-bold text-foreground"
        id="platform-pros-cons-title"
      >
        Pros &amp; Cons
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {pros.length > 0 ? (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
            <div className="mb-3 flex items-center gap-2">
              <HandThumbUpIcon
                aria-hidden="true"
                className="size-[13px] text-emerald-600"
              />
              <h3 className="text-sm font-semibold text-emerald-800">Pros</h3>
            </div>
            <ul className="space-y-2.5">
              {pros.map((pro, index) => (
                <li
                  className="flex items-start gap-2 text-sm text-emerald-700"
                  key={`${pro}-${index}`}
                >
                  <CheckIcon
                    aria-hidden="true"
                    className="mt-0.5 size-3 shrink-0"
                  />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {cons.length > 0 ? (
          <div className="rounded-xl border border-red-100 bg-red-50 p-5">
            <div className="mb-3 flex items-center gap-2">
              <HandThumbDownIcon
                aria-hidden="true"
                className="size-[13px] text-red-600"
              />
              <h3 className="text-sm font-semibold text-red-800">Cons</h3>
            </div>
            <ul className="space-y-2.5">
              {cons.map((con, index) => (
                <li
                  className="flex items-start gap-2 text-sm text-red-700"
                  key={`${con}-${index}`}
                >
                  <XMarkIcon
                    aria-hidden="true"
                    className="mt-0.5 size-3 shrink-0"
                  />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
