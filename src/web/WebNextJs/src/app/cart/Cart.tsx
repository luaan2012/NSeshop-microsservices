"use client";

import { CartContext } from "@/contexts/CartContex";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components";
import { DetailProduct } from "@/components/compounds/detailProduct/DetailProduct";
import { Products } from "@/types";
import { SHIPPING } from "@/constants";
import { formatToCurrency } from "@/utils";

export default function Cart() {
  const { cart, loadingCart, data, showDetail, product, setProduct, setShowDetail, addItemCart, loading } = useContext(CartContext);

  const setProductOpen = (product: Products) => {
    setProduct(product);
    setShowDetail(true);
  };

  useEffect(() => {
    if (data && Object.keys(cart).length === 0) loadingCart();
  }, [data]);

  return (
    <section className="py-28">
      <div className="container">
        <div className="flex justify-center gap-2 my-4">
          <div className="w-full md:w-8/12">
            <div className="bg-white dark:bg-zinc-400 rounded-lg shadow-md mb-4">
              <div className="bg-gray-200 dark:bg-zinc-500 py-3 px-4">
                <h5 className="mb-0 text-lg font-semibold dark:text-slate-300">Todos os Itens</h5>
              </div>
              <div className="p-4">
                {Object.keys(cart).length !== 0 &&
                  cart.items.length > 0 &&
                  cart?.items?.map((product, key) => (
                    <div key={key} className="mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1/4">
                          <div className="bg-image rounded-md overflow-hidden">
                            <img src={`images/${product?.image}`} alt={product?.image} className="object-cover w-full h-full" />
                          </div>
                        </div>

                        <div className="w-1/2">
                          <p className="font-semibold dark:text-slate-700">{product?.name}</p>
                        </div>

                        <div className="w-1/4">
                          <div className="flex mb-4">
                            <Button className="bg-white" onClick={() => setProductOpen(product)}>
                              <ArrowPathRoundedSquareIcon className="h-6 w-6 text-slate-600" />
                            </Button>
                            <p className="mx-5 dark:text-slate-700">{product.quantity}</p>
                          </div>
                          <p className="text-start md:text-center font-semibold text-gray-600">
                            <span className="text-gray-700">Total:</span> {formatToCurrency(product.value * product.quantity)}
                          </p>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/12">
            <div className="bg-white dark:bg-zinc-400 rounded-lg shadow-md mb-4">
              <div className="bg-gray-100 dark:bg-zinc-500 py-3 px-4">
                <h5 className="mb-0 text-lg font-semibold dark:text-slate-300">Resumo do pedido</h5>
              </div>
              <div className="p-4">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item flex justify-between items-center border-0 px-0 pb-2 dark:text-slate-700">
                    Produtos ({cart?.items?.length})<span className="font-semibol">{formatToCurrency(cart?.valueTotal)}</span>
                  </li>
                  <li className="list-group-item flex justify-between items-center px-0 dark:text-slate-700">
                    Taxa de entrega<span className="font-semibold">{formatToCurrency(SHIPPING)}</span>
                  </li>
                  <li className="list-group-item flex justify-between items-center border-0 px-0 mb-3 mt-1 dark:text-slate-700">
                    <div>
                      <strong>Valor total</strong>
                    </div>
                    <span className="font-semibold">
                      <strong>{formatToCurrency(cart.valueTotal + SHIPPING)}</strong>
                    </span>
                  </li>
                </ul>
                <Link href="/checkout" className="">
                  <Button className="btn bg-slate-600 font-semibold hover:bg-slate-400 dark:text-slate-200 w-full py-3">Continuar para o pagamento</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DetailProduct showDetail={showDetail} product={product} setProduct={setProduct} setShowDetail={setShowDetail} loadingCart={loading} addItemCart={addItemCart} />
    </section>
  );
}
