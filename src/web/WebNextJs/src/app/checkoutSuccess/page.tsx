import { Button } from "@/components";
import CheckoutSuccess from "./checkoutSuccess";
import { OrderContextProvider } from "@/contexts/OrderContext";

export default function CheckoutSuccessPage() {
  return (
    <OrderContextProvider>
      <CheckoutSuccess />
    </OrderContextProvider>
  );
}
