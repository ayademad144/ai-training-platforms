import RouteStatus from "@/components/layout/route-status";

export default function Loading() {
  return (
    <RouteStatus
      description="Preparing the latest platform information for you."
      isLoading
      title="Loading"
    >
      <span
        aria-hidden="true"
        className="mx-auto block size-8 animate-pulse rounded-full bg-blue-100 motion-reduce:animate-none"
      />
    </RouteStatus>
  );
}
