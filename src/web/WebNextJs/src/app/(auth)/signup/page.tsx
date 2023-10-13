import FilterStore from "@/components/compounds/filterStore/FilterStore";
import { StoreContextProvider } from "@/contexts/StoreContext";
import { Metadata } from "next";
import SignUp from "./SignUp";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "NerdStore - Cadastro",
  };
}

export default function Register() {
  return <SignUp />;
}
