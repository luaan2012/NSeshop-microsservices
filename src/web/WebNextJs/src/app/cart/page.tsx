import { Metadata } from "next";
import { CartContextProvider } from "@/contexts/CartContex";
import Cart from "./Cart";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "NerdStore - Carrinho",
  };
}

export default function LoadingCart() {
  return (
    <CartContextProvider>
      <Cart />
    </CartContextProvider>
  );
}
