import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      acessToken: string;
      email: string;
    };
  }
}
