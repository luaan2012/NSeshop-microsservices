"use client";

import ProductTitle from "@/components/ui/productTitle";
import { OrderContext } from "@/contexts/OrderContext";
import { useContext, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import StatusOrder from "@/components/compounds/statusOrder/StatusOrder";
import { DateBR } from "@/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AllOrders() {
  const { orders, data, getAllOrdersApi } = useContext(OrderContext);

  useEffect(() => {
    if (data && orders.length === 0) getAllOrdersApi();
  }, [data]);

  return (
    <main className="mx-auto mb-32 w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
  
      <div className="flex items-end justify-between  pb-6">
        <ProductTitle title="Meus Pedidos" />
      </div>
    
      {orders?.length === 0 ? (
        <p className="mt-32 text-center text-lg">Não encontramos nenhum pedido ainda.</p>
      ) : (
        orders?.map((order, key) => {
          return (
            <div key={key} className="grid grid-cols-1 lg:grid-cols-6">
              <div className="col-span-4 pr-0 lg:pr-10">
                <div className="flex justify-between border-t border-gray-200 py-4">
                  <h3 className="font-semibold leading-6">
                    <StatusOrder status={order.status} />
                  </h3>
                  <h2 className="text-right text-gray-500 dark:text-gray-300">
                    Data do Pedido
                    <span className="block">{DateBR(order.data)}</span>
                  </h2>
                </div>
                <div className="flex justify-between border-gray-200 py-4">
                  <h3 className="font-semibold leading-6">Pedido #</h3>
                  <p className="max-w-[200px] truncate text-right text-gray-500 dark:text-gray-300 hover:max-w-full hover:text-clip">{order.code}</p>
                </div>
                {order.orderItems.map((product, key) => (
                  <div key={key} className="flex border-gray-200 py-4">
                    <div className="mr-4 h-20 w-20 shrink-0 rounded-lg bg-gray-100 sm:h-[136px] sm:w-[136px] md:h-40 md:w-40">
                      <LazyLoadImage
                        src={`images/${product.image}`}
                        alt={product.name}
                        effect="opacity"
                        className="h-full w-auto transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
                      />
                    </div>
                    <div className="w-full">
                      <p className="text-lg">{product.name}</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Cor: {"Preto"}</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Quantidade: {product.quantity}</p>
                      <p className="mt-2 font-semibold">${product.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-span-2 ml-0 border-t border-gray-200 py-4 lg:ml-10">
                <div className="flex justify-between ">
                  <h3 className="font-semibold leading-6">Endereço</h3>
                  <p className="text-right text-gray-500 dark:text-gray-300">{order.address.completAddress}
                  </p>
                </div>
                <div className="mt-12 flex justify-between border-gray-200 pt-4 text-2xl font-semibold ">
                  <h3 className="text-base font-semibold leading-6">Forma de Pagamento</h3>
                  <div className="flex">
                    <p className="mr-2 text-base font-normal text-gray-500 dark:text-gray-300">{"Credito"}</p>
                    <CreditCardIcon className="text-violet-500" />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </main>
  );
}
