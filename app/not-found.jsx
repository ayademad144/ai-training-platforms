import RouteStatus from "@/components/layout/route-status";
import Link from "next/link";

export default function NotFound() {
  return (
    <RouteStatus
      description="The page you requested does not exist or may have moved."
      title="Page not found"
    >
      <Link
        className="inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        href="/"
      >
        Return home
      </Link>
    </RouteStatus>
  );
}
