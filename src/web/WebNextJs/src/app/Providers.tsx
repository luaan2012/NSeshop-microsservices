"use client";

import { store } from "@/features/store/store";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

interface Props {
  children: ReactNode;
}
const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ReduxProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
