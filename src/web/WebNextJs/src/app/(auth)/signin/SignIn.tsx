"use client";

import { LoadingSpiner } from "@/components/icons/loading/loading";
import { SignInSchema } from "@/models";
import { ToastEmitter } from "@/utils";
import { useFormik } from "formik";
import { Metadata } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "NerdStore - SignIn",
  };
}

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema(),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await signIn("credentials", {
        redirect: Boolean(false),
        email: values.email,
        password: values.password,
        callbackUrl: callbackUrl ? (process.env.NEXTAUTH_URL ?? "") + callbackUrl : (process.env.NEXTAUTH_URL ?? "") + "/store",
      });

      setLoading(false);

      if (response?.error) return ToastEmitter({ title: response?.error, info: "error" });

      if (response?.url) window.location.href = response?.url;
    },
  });

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mb-[5rem]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Entre com sua conta</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && <small className="text-red-600">{formik.errors.email}</small>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6">
                Senha
              </label>
              {/* <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Esqueceu sua senha?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && <small className="text-red-600">{formik.errors.password}</small>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              disabled={loading}
            >
              {loading && (
                <>
                  <LoadingSpiner />
                  Entrando...
                </>
              )}
              {!loading && <>Entrar</>}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500">
          Não tem conta? &nbsp;
          <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Clique aqui para se cadastrar
          </Link>
        </p>
      </div>
    </div>
  );
}
