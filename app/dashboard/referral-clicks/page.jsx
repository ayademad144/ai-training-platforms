import Link from "next/link";
import { getReferralClickStats } from "@/lib/supabase/referral-clicks";

export const metadata = {
  title: "Referral Clicks",
};

function formatDate(value) {
  if (!value) {
    return "No clicks yet";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Cairo",
  }).format(new Date(value));
}

function formatReferralType(value) {
  return value === "all_projects" ? "All Projects" : "Individual Project";
}

export default async function ReferralClicksPage() {
  const { error, platformClicks, totalClicks } = await getReferralClickStats();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Link
              className="text-sm font-medium text-blue-700 hover:text-blue-900"
              href="/dashboard"
            >
              Back to dashboard
            </Link>
            <h1 className="mt-3 text-3xl font-bold text-gray-950">
              Referral Clicks
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Track referral link clicks grouped by platform, sorted by the
              most clicked.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Total referral clicks
            </p>
            <p className="mt-1 text-3xl font-bold text-gray-950">
              {totalClicks.toLocaleString()}
            </p>
          </div>
        </div>

        {error ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            Referral click data is not available yet. Run the Supabase migration
            for the <code className="font-semibold">referral_clicks</code>{" "}
            table, then refresh this page.
            <p className="mt-2 text-xs text-amber-800">{error}</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-5 py-3">Platform</th>
                  <th className="px-5 py-3">Referral</th>
                  <th className="px-5 py-3">Clicks</th>
                  <th className="px-5 py-3">Last click</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {platformClicks.length > 0 ? (
                  platformClicks.map((platform) => (
                    <tr key={platform.platformId}>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-gray-950">
                          {platform.platformName}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {platform.platformSlug || platform.platformId}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-gray-950">
                          {platform.referralLabel}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {formatReferralType(platform.referralType)}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-950">
                        {platform.count.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {formatDate(platform.lastClickedAt)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="px-5 py-10 text-center text-gray-500"
                      colSpan={4}
                    >
                      No referral clicks have been tracked yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
