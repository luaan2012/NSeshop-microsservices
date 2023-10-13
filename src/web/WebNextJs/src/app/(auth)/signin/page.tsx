import { Metadata } from "next";
import SignIn from "./SignIn";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "NerdStore - Login",
  };
}

export default function Login() {
  return <SignIn />;
}
