import { OrderContextProvider } from "@/contexts/OrderContext";
import DashboardPage from "./dashboard";

export default function SettingsDashboardPage() {
  return (
    <div className="space-y-6">
      <OrderContextProvider>
        <DashboardPage />
      </OrderContextProvider>
    </div>
  );
}
