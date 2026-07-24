import { Suspense } from "react";

import UpdatePlatformClient from "./update-platform-client";

export const metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "Update Platform",
};

export default function UpdatePlatformPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-gray-50 px-4">
          <p className="text-sm font-medium text-gray-600">Loading platform...</p>
        </main>
      }
    >
      <UpdatePlatformClient />
    </Suspense>
  );
}
