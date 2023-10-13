"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import { classNames } from "@/utils";
import { Metadata } from "next";
import { useFormik } from "formik";
import { SignUpScheme } from "@/models";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import { signUp } from "@/features/actions";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "NerdStore - Cadastro",
  };
}

export default function SignUp() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      lastName: "",
      password: "",
      passwordConfirm: "",
      cpf: "",
      phone: "",
    },
    validationSchema: SignUpScheme(),
    onSubmit: async (values) => {
      values.cpf = values.cpf.replace(/\D/g, "");

      const response = await toast.promise(signUp(JSON.stringify(values)), {
        pending: {
          render() {
            return "Estamos te registrando, aguarde...";
          },
        },
        success: {
          render({ data }) {
            return `Cadastro realizado com sucesso! Estamos te redirecionando...`;
          },
        },
        error: {
          render({ data }: any) {
            return `${data?.errors?.Messages?.join(" ")}`;
          },
        },
      });

      if (!response?.errors) {
        const response = await signIn("credentials", {
          redirect: Boolean(false),
          email: values.email,
          password: values.password,
          callbackUrl: "/store",
        });

        if (response?.url) router.push(response.url);
      }
    },
  });

  return (
    <div className="bg-white mb-10 px-6 py-24 sm:py-16 lg:px-8">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Cadastro</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">Cadastra-se e veja os melhores produtos.</p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Nome
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && <small className="text-red-600">{formik.errors.name}</small>}
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
              SobreNome
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="lastName"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && <small className="text-red-600">{formik.errors.lastName}</small>}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              CPF
            </label>
            <div className="mt-2.5">
              <InputMask
                mask={"999.999.999-99"}
                name="cpf"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cpf}
              />
              {formik.touched.cpf && formik.errors.cpf && <small className="text-red-600">{formik.errors.cpf}</small>}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && <small className="text-red-600">{formik.errors.email}</small>}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
              Número Celular
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Pais
                </label>
                <select name="country" className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                  <option>BR</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="tel"
                name="phone"
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone && <small className="text-red-600">{formik.errors.phone}</small>}
            </div>
          </div>
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Senha
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="password"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && <small className="text-red-600">{formik.errors.password}</small>}
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Confirmar Senha
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="passwordConfirm"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
              />
              {formik.touched.passwordConfirm && formik.errors.passwordConfirm && <small className="text-red-600">{formik.errors.passwordConfirm}</small>}
            </div>
          </div>
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? "bg-indigo-600" : "bg-gray-200",
                  "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(agreed ? "translate-x-3.5" : "translate-x-0", "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out")}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">Deseja receber notificações por email?</Switch.Label>
          </Switch.Group>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
