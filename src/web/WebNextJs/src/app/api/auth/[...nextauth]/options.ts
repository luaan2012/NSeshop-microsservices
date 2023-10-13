import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { signInTwo } from "@/features/actions";

const options: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Digite seu usuário",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Digite sua senha",
        },
      },
      async authorize(credentials: any) {
        const response = await signInTwo(credentials);

        if (!response.errors) {
          const user = {
            ...response.userToken,
            acessToken: response.accessToken,
            refleshToken: response.refreshToken,
            expires: response.expiresIn,
          };
          return user;
        } else {
          throw new Error(response?.errors?.Messages[0] || "Alguma coisa aconteceu, tente novamente mais tarde.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {   
    async redirect({ url }) {
      return url
    },
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};

export default options;
