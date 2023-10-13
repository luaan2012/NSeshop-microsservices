import { Button, Input } from "@/components";
import { StoreContext } from "@/contexts/StoreContext";
import { classNames, formatToCurrency } from "@/utils";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/20/solid";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useContext } from "react";
import { LoadingSpiner } from "@/components/icons/loading/loading";
import { Products } from "@/types";

const products = {
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
};

interface DetailProductsProps {
  product: Products;
  showDetail: boolean;
  loadingCart: boolean;
  setProduct(product: Products): void;
  addItemCart(): void;
  setShowDetail(val: boolean): void;
}

export function DetailProduct({ product, setProduct, showDetail, setShowDetail, addItemCart, loadingCart }: DetailProductsProps) {
  const add = () => {
    const productUpdate = !isNaN(product.quantity) ? product.quantity + 1 : 1;
    setProduct({ ...product, quantity: productUpdate, productId: product.id || product.productId });
  };

  const less = () => {
    const productUpdate = !isNaN(product.quantity) && product.quantity > 0 ? product.quantity - 1 : 0;

    setProduct({ ...product, quantity: productUpdate, productId: product.id || product.productId });
  };

  return (
    <Transition.Root show={showDetail} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setShowDetail(false)}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white dark:bg-zinc-800 px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setShowDetail(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img src={`/images/${product.image}`} alt={product.name} className="object-center" />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold sm:pr-12">{product.name}</h2>

                      <section aria-labelledby="information-heading" className="mt-2">
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl">{formatToCurrency(product.value)}</p>

                        {/* Reviews */}
                        <div className="mt-6">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon key={rating} className={classNames(product.productType > rating ? "text-black" : "text-gray-200", "h-5 w-5 flex-shrink-0")} aria-hidden="true" />
                              ))}
                            </div>
                            <p className="sr-only">{product.productType} out of 5 stars</p>
                            <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                              {product.productType} reviews
                            </a>
                          </div>
                        </div>
                      </section>

                      <section aria-labelledby="options-heading" className="mt-10">
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        {/* Colors */}
                        <div>
                          <h4 className="text-sm font-medium">Color</h4>

                          <RadioGroup value={"blue"} className="mt-4">
                            <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                            <span className="flex items-center space-x-3">
                              {products.colors.map((color) => (
                                <RadioGroup.Option
                                  key={color.name}
                                  value={color}
                                  className={({ active, checked }) =>
                                    classNames(
                                      color.selectedClass,
                                      active && checked ? "ring ring-offset-1" : "",
                                      !active && checked ? "ring-2" : "",
                                      "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                    )
                                  }
                                >
                                  <RadioGroup.Label as="span" className="sr-only">
                                    {color.name}
                                  </RadioGroup.Label>
                                  <span aria-hidden="true" className={classNames(color.class, "h-8 w-8 rounded-full border border-black border-opacity-10")} />
                                </RadioGroup.Option>
                              ))}
                            </span>
                          </RadioGroup>
                        </div>

                        <span className="mt-2 flex items-center justify-center">{product.quantityStock} unidades restantes</span>

                        {/* Sizes */}
                        <div className="flex w-full items-center justify-center text-center mt-6">
                          <Button className="flex h-10 w-16 items-center justify-center border-2 border-main-500 bg-indigo-500 dark:bg-gray-600 dark:hover:bg-gray-300 rounded-l-lg" onClick={less}>
                            <MinusSmallIcon className="h-6 w-6" />
                          </Button>

                          <Input
                            type="number"
                            placeholder="0"
                            className="h-10 w-full flex-1 border-2 dark:bg-gray-600 text-center outline-none"
                            value={product?.quantity || 0}
                            onFocus={(e) => {
                              if (e.currentTarget.value === "0") {
                                e.currentTarget.value = "";
                              }
                            }}
                            onChange={(e) => {
                              setProduct({ ...product, quantity: +e.currentTarget.value, productId: product.id || product.productId });
                            }}
                          />

                          <Button className="flex h-10 w-16 items-center justify-center border-2 border-main-200 bg-indigo-500 dark:bg-gray-600 dark:hover:bg-gray-300 rounded-r-lg" onClick={add}>
                            <PlusSmallIcon className="h-6 w-6 flex-shrink-0" />
                          </Button>
                        </div>

                        <span className="mt-2 flex items-center justify-center">{!isNaN(product.quantity) && formatToCurrency(product.quantity * product.value)}</span>

                        <Button
                          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={addItemCart}
                        >
                          {loadingCart && (
                            <>
                              <LoadingSpiner />
                              Adicionando...
                            </>
                          )}

                          {!loadingCart && <>Adicionar ao Carrinho</>}
                        </Button>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
