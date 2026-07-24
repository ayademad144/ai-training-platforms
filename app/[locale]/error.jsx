"use client";

import RouteStatus from "@/components/layout/route-status";

export default function Error({ unstable_retry }) {
  return (
    <RouteStatus
      description="We could not load this page. Please try the request again."
      title="Something went wrong"
    >
      <button
        className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        onClick={() => unstable_retry()}
        type="button"
      >
        Try again
      </button>
    </RouteStatus>
  );
}
