import {
  ArrowPathIcon,
  BookOpenIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const categoryIcons = {
  book: BookOpenIcon,
  globe: GlobeAltIcon,
  refresh: ArrowPathIcon,
  shield: ShieldCheckIcon,
};

export default function CategoryCard({ category }) {
  const Icon = categoryIcons[category.icon];

  return (
    <li className="flex items-center gap-3.5 rounded-xl border border-border bg-white p-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
        <Icon aria-hidden="true" className="size-[17px] text-blue-600" />
      </span>
      <span>
        <strong className="mb-0.5 block text-base font-bold leading-none text-foreground">
          {category.value}
        </strong>
        <span className="text-xs text-muted-foreground">{category.label}</span>
      </span>
    </li>
  );
}
