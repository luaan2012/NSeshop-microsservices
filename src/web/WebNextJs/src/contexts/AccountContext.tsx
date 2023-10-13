"use client";

import { addAddress, editAddress, getAddress } from "@/features/actions";
import { Address } from "@/types";
import { ToastEmitter } from "@/utils";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useState } from "react";

interface AccountContextTypes {
  address: Address
  data: any
  getAddressApi: () => void
  addAddressApi: (address: Address) => void
  updateAddressApi: (address: Address) => void
}

interface AccountContextProvider {
  children: ReactNode;
}

export const AccountContext = createContext({} as AccountContextTypes);

export function AccountContextProvider({ children }: AccountContextProvider) {
  const { data } = useSession();
  const [address, setAddress] = useState<Address>({} as Address)

  const getAddressApi = () => {
    getAddress(data?.user.acessToken).then(response => {
      setAddress(response)
    })
    .catch()
  }

  const addAddressApi = (address: Address) => {
    addAddress(data?.user.acessToken, address)
      .then(response => {
        ToastEmitter({ title: "Endereço adicionado com sucesso.", info: "success", position: "bottom-left" });
      })
      .catch(error => {
        ToastEmitter({ title: error?.errors?.Messages?.join("; ") || "Aconteceu um erro ao tentar cadastrar seu endereço.", info: "error", position: "bottom-left" });
      });
  };

  const updateAddressApi = (address: Address) => {
    editAddress(data?.user.acessToken, address)
      .then(response => {
        ToastEmitter({ title: "Endereço atualizado com sucesso.", info: "success", position: "bottom-left" });
      })
      .catch(error => {
        ToastEmitter({ title: error?.errors?.Messages?.join("; ") || "Aconteceu um erro ao tentar cadastrar seu endereço.", info: "error", position: "bottom-left" });
      });
  };

  return (
    <AccountContext.Provider
      value={{ address, getAddressApi, data, addAddressApi, updateAddressApi }}
    >
      {children}
    </AccountContext.Provider>
  );
}
