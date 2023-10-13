import { CartContextProvider } from "@/contexts/CartContex";
import CheckoutIn from "./Checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NerdStore - Finalizar Pedido",
  description: "Advanced form example using react-hook-form and Zod.",
};

export default function Checkout() {
  return (
    <CartContextProvider>
      <CheckoutIn />
    </CartContextProvider>
  );
}
