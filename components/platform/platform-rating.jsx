import { StarIcon } from "@heroicons/react/24/solid";

const ratingSteps = [1, 2, 3, 4, 5];

export default function PlatformRating({ rating }) {
  const numericRating = Number(rating) || 0;
  const roundedRating = Math.round(numericRating);

  return (
    <div
      aria-label={`${numericRating.toFixed(1)} out of 5 stars`}
      className="flex items-center gap-1.5"
    >
      <span aria-hidden="true" className="flex gap-0.5">
        {ratingSteps.map((step) => (
          <StarIcon
            className={`size-3 ${
              step <= roundedRating ? "text-amber-400" : "text-gray-200"
            }`}
            key={step}
          />
        ))}
      </span>
      <span className="text-sm font-medium tabular-nums text-foreground">
        {numericRating.toFixed(1)}
      </span>
    </div>
  );
}
