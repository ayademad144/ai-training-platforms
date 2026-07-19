import { AddingCard } from "./components/AddingCard";
import { ReferralClicksCard } from "./components/ReferralClicksCard";
import { UpdatingCard } from "./components/UpdatingCard";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="flex flex-wrap justify-center gap-8">
        <AddingCard />
        <UpdatingCard />
        <ReferralClicksCard />
      </div>
    </div>
  );
}
