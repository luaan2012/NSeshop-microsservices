"use client";

import { parseCookies, setCookie } from "nookies";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import Router from "next/router";

type User = {
  name: string;
  email: string;
};

type SignInData = {
  user: string;
  password: string;
};

type AuthContextType = {
  isAutenticaded: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isAutenticaded = !!user;

  useEffect(() => {
    const { "ns.token": token } = parseCookies();

    if (token) {
      recoverUserInformation().then((response) => setUser(response.user));
    }
  }, []);

  async function signIn(data: SignInData) {
    setCookie(undefined, "ns.token", "token", {
      maxAge: 60 * 60 * 1,
    });

    const authenticatedUser: User = {
      name: data.user,
      email: `${data.user}@example.com`,
    };

    setUser(authenticatedUser);

    Router.push("/");
  }

  return <AuthContext.Provider value={{ user, isAutenticaded, signIn }}>{children}</AuthContext.Provider>;
}

const delay = (amount = 750) => new Promise((resolve) => setTimeout(resolve, amount));

export async function recoverUserInformation() {
  await delay();

  return {
    user: {
      name: "",
      email: "",
    },
  };
}
