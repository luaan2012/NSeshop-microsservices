"use client";

import { addItem, getLastOrder, getQuantityCart, listCatalog, listOrders } from "@/features/actions";
import { useAppDispatch } from "@/features/store/store";
import { OrderFinished, Products } from "@/types";
import { ToastEmitter } from "@/utils";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useState } from "react";

interface OrderContextTypes {
  order: OrderFinished;
  orders: OrderFinished[];
  data: any;
  getLastOrderApi: () => void;
  getAllOrdersApi: () => void;
}

interface OrderContextProvider {
  children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextTypes);

export function OrderContextProvider({ children }: OrderContextProvider) {
  const { data } = useSession();
  const [order, setOrder] = useState<OrderFinished>({} as OrderFinished);
  const [orders, setOrders] = useState<OrderFinished[]>([]);

  const getLastOrderApi = () => {
    getLastOrder(data?.user.acessToken)
      .then((response) => {
        setOrder(response);
      })
      .catch(() => {
        ToastEmitter({ title: "Nenhum pedido encontrado.", info: "error", position: "bottom-left" });
      });
  };

  const getAllOrdersApi = () => {
    listOrders(data?.user.acessToken)
      .then((response) => {
        setOrders(response);
      })
      .catch(() => {
        ToastEmitter({ title: "Nenhum pedido encontrado.", info: "error", position: "bottom-left" });
      });
  };

  return <OrderContext.Provider value={{ orders, data, getLastOrderApi, getAllOrdersApi, order }}>{children}</OrderContext.Provider>;
}
