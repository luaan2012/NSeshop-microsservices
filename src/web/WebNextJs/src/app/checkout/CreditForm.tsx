"use client";

import Cards from "react-credit-cards";
import { Address, CardTypes, Focused, OrderTransaction } from "@/types";
import { handleOnChangeNumber, handleOnChangeString, handleOnFocus } from "@/utils";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister, FormState, UseFormSetValue } from "react-hook-form";
import Input from "@/components/ui/inputCard";
import { FormikConfig, FormikProps, FormikValues } from "formik";

interface CreditFormPropsTypes {
  paymentMethod: string;
  focused: Focused | undefined;
  setFocused: Dispatch<SetStateAction<Focused | undefined>>;
  formik: FormikProps<OrderTransaction>;
}

const CreditForm = ({ paymentMethod, focused, setFocused, formik }: CreditFormPropsTypes) => {
  return (
    <>
      {paymentMethod === "credit" && (
        <div className="mt-10" id="PaymentForm">
          <Cards placeholders={{name: 'SEU NOME AQUI'}} number={formik.values.cardNumber || ""} name={formik.values.cardName || ""} expiry={formik.values.cardExpiration || ""} cvc={formik.values.cvvCard || ""} focused={focused} />

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className={`mb-2 ${formik.errors.cardNumber && formik.touched.cardNumber && "border-red-500"}`}
              onChange={(e) => {
                let value = e.target.value;
                // Remove todos os espaços em branco
                value = value.replace(/\D/g, '');
                // Limita a 16 caracteres
                value = value.slice(0, 16);
                // Adiciona espaços a cada quatro dígitos
                value = value.replace(/(\d{4})/g, '$1 ').trim();
                formik.setFieldValue('cardNumber', value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.cardNumber || ""}
              error={formik.touched.cardNumber ? formik.errors?.cardNumber : ""}
              onFocus={() => {
                handleOnFocus("number", setFocused);
              }}
              labelText="Número do cartão"
              maxLength={19}
            />
            <Input
              type="text"
              id="cardName"
              name="cardName"
              className={`mb-2 ${formik.errors.cardName && formik.touched.cardName && "border-red-500"}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cardName || ""}
              error={formik.touched.cardName ? formik.errors?.cardName : ""}
              onFocus={() => {
                handleOnFocus("name", setFocused);
              }}
              labelText="Nome do cartão"
            />
            <Input
              type="text"
              id="cardExpiration"
              name="cardExpiration"
              className={`mb-2 ${formik.errors.cardExpiration && formik.touched.cardExpiration && "border-red-500"}`}
              onChange={(e) => {
                let value = e.target.value;
                value = value.replace(/\D/g, '');
                if (value.length > 2) {
                  value = value.slice(0, 2) + '/' + value.slice(2);
                }
                if (value.length >= 2) {
                  const month = parseInt(value.slice(0, 2), 10);
                  if (month < 1 || month > 12) {
                    value = value.slice(0, 1);
                  }
                }
                formik.setFieldValue('cardExpiration', value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.cardExpiration || ""}
              error={formik.touched.cardExpiration ? formik.errors?.cardExpiration : ""}
              onFocus={() => {
                handleOnFocus("expiry", setFocused);
              }}
              labelText="Data de Expiracão"
              maxLength={5}
            />
            <Input
              type="text"
              id="cvvCard"
              name="cvvCard"
              className={`mb-2 ${formik.errors.cvvCard && formik.touched.cvvCard && "border-red-500"}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cvvCard || ""}
              error={formik.touched.cvvCard ? formik.errors?.cvvCard : ""}
              onFocus={() => {
                handleOnFocus("cvc", setFocused);
              }}
              labelText="CVC"
              maxLength={4}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CreditForm;
