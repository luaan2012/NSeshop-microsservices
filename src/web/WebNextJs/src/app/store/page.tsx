import FilterStore from "@/components/compounds/filterStore/FilterStore";
import { StoreContextProvider } from "@/contexts/StoreContext";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "NerdStore - Loja",
  };
}

export default function Store() {
  return (
    <StoreContextProvider>
      <FilterStore />;
    </StoreContextProvider>
  );
}
