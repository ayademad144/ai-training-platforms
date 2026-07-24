import {
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

const featureIcons = {
  book: BookOpenIcon,
  "external-link": ArrowTopRightOnSquareIcon,
  shield: ShieldCheckIcon,
  users: UserGroupIcon,
};

export default function FeatureCard({ feature }) {
  const t = useTranslations("Features");
  const Icon = featureIcons[feature.icon];

  return (
    <li className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-sm">
      <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-blue-50">
        <Icon aria-hidden="true" className="size-[19px] text-blue-600" />
      </span>
      <h3 className="mb-2 text-sm font-semibold text-foreground">
        {t(feature.titleKey)}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {t(feature.descriptionKey)}
      </p>
    </li>
  );
}
