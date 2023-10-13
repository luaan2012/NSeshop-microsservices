"use client";

import { Button } from "@/components";
import { OrderContext } from "@/contexts/OrderContext";
import { useContext, useEffect } from "react";
import OrderFinishedSummary from "./OrderFinishedSummary";
import Link from "next/link";
import { DateBR } from "@/utils";

export default function CheckoutSuccess() {
  const { order, getLastOrderApi, data } = useContext(OrderContext);

  useEffect(() => {
    if (data && Object.keys(order).length === 0) getLastOrderApi();
  }, [data]);

  return (
    <main className="mx-auto mb-32 w-full max-w-7xl  px-4 pt-24 sm:px-6  lg:px-8">
      <section>
        <h3 className="mb-2 text-xl font-semibold leading-6 ">Seu Pedido foi Enviado!</h3>
        <p className="mt-10 mb-1  font-semibold">Olá {data?.user?.email},</p>
        <p>Seu pedido está sendo confirmado e enviaremos dentro de 4 a 10 dias uteis.</p>
      </section>
      <section className="mt-8 grid grid-cols-1 gap-5 break-words border-y border-y-gray-200 py-5 text-sm sm:grid-cols-2 lg:grid-cols-4 lg:gap-0	">
        <div>
          <p className="text-gray-500 dark:text-gray-300">Data</p>
          <p className="mt-2 font-semibold">{DateBR(order.data)}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-300">Número do Pedido</p>
          <p className="mt-2 font-semibold">{order.code}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-300">Forma de Pagamento</p>
          <p className="mt-2 font-semibold">{"Credito"}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-300">Endereço de Entrega</p>
          <p className="mt-2 font-semibold">{order?.address?.completAddress}</p>
        </div>
      </section>
      <section>
        <OrderFinishedSummary data={order} />
      </section>
      <section className="mt-10">
        <h3 className="mb-2 text-xl font-semibold leading-6 ">Obrigado por comprar com nós!</h3>
      </section>
      <Link href={'/store'} className="mt-16 flex w-full items-center justify-center rounded-md border border-transparent bg-violet-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-violet-600">
        Continuar
      </Link>
    </main>
  );
}
