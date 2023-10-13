"use client";

import useDarkSide from "@/utils/darkSide";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CartComponent, Label, Switch } from "@/components";
import { classNames, getGravatarUrl } from "@/utils";
import { NAVBAR } from "@/constants";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/features/store/store";
import { getQuantityCart } from "@/features/actions";
import { CartContextProvider } from "@/contexts/CartContex";

export default function Nav() {
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state) => state.cartQuantity);
  const [show, setShow] = useState<boolean>(false);
  const [colorTheme, setTheme] = useDarkSide();
  const { data, status } = useSession();
  const [darkSide, setDarkSide] = useState(colorTheme === "light" ? true : false);
  const [gravatarUrl, setGravatarUrl] = useState<string | null>(null);
  const [navigation, setNavigation] = useState<any[]>(NAVBAR);

  useEffect(() => {
    getGravatarUrl(data?.user.email || "", 200)
      .then((url) => setGravatarUrl(url))
      .catch();
  }, [data]);

  const toggleDarkMode = (checked: boolean) => {
    setDarkSide(checked);
    setTheme(colorTheme);
  };

  const handleNavigationClick = (index: number) => {
    const updatedNavigation = navigation.map((item, i) => ({
      ...item,
      current: i === index,
    }));
    setNavigation(updatedNavigation);
  };

  useEffect(() => {
    if (data?.user.acessToken) dispatch(getQuantityCart(data?.user.acessToken));
  }, [data]);

  return (
    <Disclosure as="nav" className="bg-neutral-950">
      {({ open }: any) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item: any, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => handleNavigationClick(index)}
                        className={classNames(item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "rounded-md px-3 py-2 text-sm font-medium")}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {status === "unauthenticated" && (
                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link href="signin" className="text-sm font-medium text-white hover:text-gray-800">
                      Entrar
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link href="signup" className="text-sm font-medium text-white hover:text-gray-800">
                      Cadastre-se
                    </Link>
                  </div>
                </div>
              )}

              {status === "authenticated" && (
                <>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus: outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={gravatarUrl ?? ""} alt="" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md dark:bg-slate-800 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }: any) => (
                              <Link href="myAccount" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm")}>
                                Minha conta
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }: any) => (
                              <Link href="/orders" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm")}>
                                Meus Pedidos
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item disabled={true}>
                            {({ active }: any) => (
                              <a href="#" className={classNames(active ? "bg-gray-100" : "", "block px-4 text-sm items-center space-x-2")}>
                                <Label htmlFor="airplane-mode">{colorTheme == "dark" ? "Modo claro" : "Modo escuro"}</Label>
                                <Switch id="airplane-mode" checked={darkSide} onCheckedChange={toggleDarkMode} />
                              </a>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }: any) => (
                              <a onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL + "/signin" })} className={`cursor-pointer ${classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm")}`}>
                                Sair
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    <button
                      type="button"
                      className="rounded-full bg-neutral-950 p-1 ml-5 mt-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      {/* <CartComponent/> */}
                    </button>
                  </div>
                  <div className="ml-auto flex items-center">
                    {/* Cart */}
                    <div className="flex lg:ml-3 cursor-pointer hover:text-gray-500" onClick={() => setShow((val) => !val)}>
                      <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                      <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-800">{value}</span>
                    </div>
                    <CartContextProvider>
                      <CartComponent show={show} setShow={setShow} />
                    </CartContextProvider>
                  </div>
                </>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item: any) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "block rounded-md px-3 py-2 text-base font-medium")}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
