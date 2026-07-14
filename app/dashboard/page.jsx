import { AddingCard } from "./components/AddingCard";
import { UpdatingCard } from "./components/UpdatingCard";
export default function DashboardPage() {
  return (
    <div className="flex justify-center items-center h-screen"> 
      <div className="flex gap-16">
        <div>
          <AddingCard />
        </div>
        <div>
          <UpdatingCard />
        </div>
      </div>
    </div>
  );
}
