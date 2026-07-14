import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function GuideCard({ guide }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-md">
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <Image
          alt={guide.title}
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105 motion-reduce:transition-none"
          fill
          sizes="(min-width: 1280px) 405px, (min-width: 1024px) calc(33vw - 32px), (min-width: 640px) calc(50vw - 28px), calc(100vw - 32px)"
          src={guide.image}
        />
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="rounded-full border border-border bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
            {guide.category}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {guide.readTime}
          </span>
        </div>
        <h3 className="mb-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-blue-600">
          {guide.title}
        </h3>
        <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
          {guide.excerpt}
        </p>
        <Link
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700"
          href={`/guides/${guide.slug}`}
        >
          Read Guide
          <ArrowRightIcon aria-hidden="true" className="size-[11px]" />
        </Link>
      </div>
    </article>
  );
}
