"use client";

import "react-credit-cards/es/styles-compiled.css";
import ContactForm from "./ContactForm";
import OrderSummary from "./OrderSummary";
import { useContext, useEffect, useState } from "react";
import { Focused } from "react-credit-cards";
import ProductTitle from "@/components/ui/productTitle";
import { CartContext } from "@/contexts/CartContex";
import CreditForm from "./CreditForm";
import { useFormik } from "formik";
import { CompanySchema } from "@/utils/scheme";
import { OrderTransaction } from "@/types";
import { LoadingSpiner } from "@/components/icons/loading/loading";
import { Button } from "@/components";

export default function CheckoutIn() {
  const { cart, data, loadingCart, addAddressApi, mapOrder, sendingOrder, address, getAddressApi} = useContext(CartContext);

  const formik = useFormik({
    initialValues: {} as OrderTransaction,
    validationSchema: CompanySchema(),
    onSubmit: async (values) => {
      const orderUpdate = mapOrder({ ...values, });
      addAddressApi(orderUpdate);
    },
  });

  useEffect(() => {
    if (data && Object.keys(cart).length === 0) loadingCart();

    if(data && Object.keys(address).length === 0) getAddressApi()

    formik.setFieldValue('cardExpiration', ''); 
    formik.setFieldValue('cardName', ''); 
    formik.setFieldValue('cardNumber', ''); 
    formik.setFieldValue('cvvCard', ''); 

  }, [data]);

  useEffect(() => {
    formik.setFieldValue('cep', address.cep || ''); 
    formik.setFieldValue('email', data?.user.email || ''); 
    formik.setFieldValue('publicPlace', address.publicPlace || ''); 
    formik.setFieldValue('neighborhood', address.neighborhood || ''); 
    formik.setFieldValue('complement', address.complement || ''); 
    formik.setFieldValue('number', address.number || ''); 
    formik.setFieldValue('city', address.city || ''); 
    formik.setFieldValue('state', address.state || ''); 
  }, [address]);

  const paymentMethod = "credit";

  const [focused, setFocused] = useState<Focused | undefined>(undefined);

  return (
    <main className="mx-auto mb-32 w-full max-w-7xl  px-4 pt-24 sm:px-6  lg:px-8 bg-white dark:bg-zinc-800">
      <ProductTitle title="Checkout" />

      {/* Loading */}
      {/* {isLoading && <CheckoutLoading />} */}

      {/* {cartData?.length === 0 && <Navigate to="/" replace />} */}

      {/* Information */}
      <form onSubmit={formik.handleSubmit}>
        <section className="mt-4 flex flex-wrap gap-20 lg:flex-nowrap">
          <article className="w-full border-t border-gray-200 pt-4 lg:w-1/2">

            <ContactForm formik={formik} />

            <CreditForm paymentMethod={paymentMethod} focused={focused} setFocused={setFocused} formik={formik} />
          </article>
          {/* Product */}
          <article className="w-full lg:w-1/2">
            <div>
              <h3 className="mb-2 text-xl font-semibold leading-6 ">Resumo do Pedido</h3>
            </div>
            {/* Order Information */}
            <OrderSummary data={cart} />
            <Button
              disabled={sendingOrder}
              type="submit"
              className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-violet-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-violet-600"
            >
              {sendingOrder && (
                <>
                  <LoadingSpiner />
                  Enviado seu pedido...
                </>
              )}
              {!sendingOrder && <>Confirmar pedido</>}
            </Button>
          </article>
        </section>
      </form>
    </main>
  );
}
