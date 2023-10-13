import { OrderContextProvider } from "@/contexts/OrderContext";
import Orders from "./Orders";
import AllOrders from "./Orders";

export default function OrdersPage() {
  return (
    <OrderContextProvider>
      <AllOrders />
    </OrderContextProvider>
  );
}
