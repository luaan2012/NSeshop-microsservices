"use client";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Input from "@/components/ui/inputCard";
import { SHIPPING, brazilianStates } from "@/constants";
import { Address, OrderTransaction } from "@/types";
import { FormikProps } from "formik";
import { Fragment } from "react";
import { formatToCurrency } from "@/utils";

interface ContactFormProps {
  formik: FormikProps<any>;
}

const ContactForm = ({ formik }: ContactFormProps) => {
  return (
    <>
      {/* Contact Information */}
      <div className="mb-8">
        <h3 className="mb-6 text-xl font-semibold leading-6 dark:text-gray-300">E-mail para contato</h3>
        <Input
          labelText="E-mail"
          type="text"
          autocomplete="on"
          name="email"
          id="email"
          className={`mb-2 ${formik.errors?.email && formik.touched?.email && "border-red-500"}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.email || ""}
          error={formik.touched?.email ? formik.errors?.email : ""}
        />
      </div>
      {/* Shipping information */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="mb-6 text-xl font-semibold leading-6 dark:text-gray-300">Endereço de entrega</h3>
        <Input
          labelText="Endereço"
          type="text"
          autocomplete="on"
          name="publicPlace"
          id="publicPlace"
          className={`mb-4 ${formik.errors?.publicPlace && formik.touched?.publicPlace && "border-red-500"}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.publicPlace || ""}
          error={formik.touched?.publicPlace ? formik.errors?.publicPlace : ""}
        />
        <Input
          labelText="Bairro"
          type="text"
          autocomplete="on"
          name="neighborhood"
          id="neighborhood"
          className={`mb-4 ${formik.errors?.neighborhood && formik.touched?.neighborhood && "border-red-500"}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.neighborhood || ""}
          error={formik.touched?.neighborhood ? formik.errors?.neighborhood : ""}
        />
        <Input
          labelText="Complemento"
          type="text"
          autocomplete="on"
          name="complement"
          id="complement"
          className={`mb-4 ${formik.errors?.complement && formik.touched?.complement && "border-red-500"}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.complement || ""}
          error={formik.touched?.complement ? formik.errors?.complement : ""}
        />
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            labelText="Cep"
            type="text"
            autocomplete="on"
            name="cep"
            id="cep"
            className={`mb-4 ${formik.errors?.cep && formik.touched?.cep && "border-red-500"}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.cep || ""}
            error={formik.touched?.cep ? formik.errors?.cep : ""}
          />
          <Input
            labelText="Número"
            type="text"
            autocomplete="on"
            name="number"
            id="number"
            className={`mb-4 ${formik.errors?.number && formik.touched?.number && "border-red-500"}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.number || ""}
            error={formik.touched?.number ? formik.errors?.number : ""}
          />
          <Input
            labelText="Cidade"
            type="text"
            autocomplete="on"
            name="city"
            id="city"
            className={`mb-4 ${formik.errors?.city && formik.touched?.city && "border-red-500"}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.city || ""}
            error={formik.touched?.city ? formik.errors?.city : ""}
          />
          <div>
            <div className="relative h-[2.6rem]">
              <select
                name="state"
                id="state"
                className={`relative h-full w-full cursor-default appearance-none rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-500 shadow-sm ring-1 ring-inset ${"ring-gray-300"}  focus:outline-none focus:ring-2 focus:ring-violet-500 sm:leading-6 ${
                  formik.errors?.state && formik.touched?.state && "border-red-500"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.state}
              >
                <option>Selecione...</option>
                {brazilianStates.map((value, key) => (
                  <Fragment key={key}>
                    <option value={value.value}>{value.label}</option>
                  </Fragment>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-300" />
            </div>
            {formik.errors?.state && formik.touched?.state && (
              <small role="alert" className={`${formik.errors?.state ? "animate-shake" : ""} text-red-500`}>
                {typeof formik.errors.state === "string" && formik.errors?.state}
              </small>
            )}
          </div>
        </div>

        {/* Delivery Method */}
        <fieldset>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="mb-6 text-xl font-semibold leading-6 dark:text-gray-300">Forma de Entrega</h3>
          </div>

          <div className="relative mb-8 w-1/2 rounded-lg border  border-violet-500 p-4 text-sm">
            <h4 className="mb-1 text-base font-semibold">Padrão</h4>
            <p className="text-gray-600 dark:text-gray-300">4-10 dias úteis</p>
            <p className="mt-4 font-semibold">{formatToCurrency(SHIPPING)}</p>
            <CheckCircleIcon className="absolute top-4 right-4 h-6 w-6 text-violet-500" />
          </div>
        </fieldset>

        {/* Payment Method */}
        <fieldset className="border-t border-gray-200 pt-6">
          <legend className="mb-6 contents text-xl font-semibold leading-6 dark:text-gray-300">Método de Pagamento</legend>

          <div className="mt-4 flex flex-wrap items-center">
            <div className="mr-10 flex items-center">
              <Input value="credit" id="credit" name="paymentMethod" type="radio" className="mr-2 flex items-center border-gray-300 accent-violet-500" inputClassName="h-4" />
              <label htmlFor="credit" className="block text-base font-medium leading-6 text-gray-900 dark:text-gray-300">
                Cartão de Crédito
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default ContactForm;
