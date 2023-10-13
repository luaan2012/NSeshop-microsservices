"use client";

import { addItem, getQuantityCart, listCatalog } from "@/features/actions";
import { useAppDispatch } from "@/features/store/store";
import { Products } from "@/types";
import { ToastEmitter } from "@/utils";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useState } from "react";

interface StoreContextTypes {
  products: Products[];
  product: Products;
  data: any;
  filters: Filters;
  showDetail: boolean;
  loading: boolean;
  loadingCart: boolean;
  loadingCatalog: () => void;
  setProduct: (product: Products) => void;
  setShowDetail: (val: boolean) => void;
  addItemCart: () => void;
  sortByNameA: () => void;
  sortByNameZ: () => void;
  toggleFilterCategory: (category: number) => void;
  toggleFilterPrice: (prince: number, array: number[]) => void;
}

interface StoreContextProvider {
  children: ReactNode;
}

interface Filters {
  category: number[]; // Defina o tipo explic]itamente como string[]
  price: { value: number; between: number[] }[];
}

export const StoreContext = createContext({} as StoreContextTypes);

export function StoreContextProvider({ children }: StoreContextProvider) {
  const dispatch = useAppDispatch();
  const { data } = useSession();
  const [products, setProducts] = useState<Products[]>([]);
  const [product, setProduct] = useState<Products>({} as Products);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCart, setLoadingCart] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({ category: [], price: [] });

  const sortByNameA = () => {
    const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
    setProducts(sorted);
  };

  const toggleFilterPrice = (price: number, array: number[]) => {
    if (filters.price.some((x) => x.value === price)) {
      const updatedCategoryFilters = filters.price.filter((x) => x.value !== price);
      setFilters({ ...filters, price: updatedCategoryFilters });
    } else {
      const updatedCategoryFilters = [...filters.price, { value: price, between: array }];
      setFilters({ ...filters, price: updatedCategoryFilters });
    }
  };

  const toggleFilterCategory = (category: number) => {
    if (filters.category.includes(category)) {
      const updatedCategoryFilters = filters.category.filter((cat) => cat !== category);
      setFilters({ ...filters, category: updatedCategoryFilters });
    } else {
      const updatedCategoryFilters = [...filters.category, category];
      setFilters({ ...filters, category: updatedCategoryFilters });
    }
  };

  const sortByNameZ = () => {
    const sorted = [...products].sort((a, b) => b.name.localeCompare(a.name));
    setProducts(sorted);
  };

  const loadingCatalog = () => {
    setLoading(true);
    listCatalog(data?.user.acessToken)
      .then((response) => {
        setProducts(response);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const addItemCart = () => {
    setLoadingCart(true);
    addItem(data?.user.acessToken, product)
      .then(() => {
        ToastEmitter({ title: `O produto ${product.name} foi adicionado ao seu carrinho.`, info: "success", position: "bottom-left" });
        dispatch(getQuantityCart(data?.user.acessToken));
        setShowDetail(false);
        setLoadingCart(false);
      })
      .catch((error) => {
        ToastEmitter({ title: error?.errors?.Messages?.join("; ") || "Aconteceu um erro ao tentar adicionar.", info: "error", position: "bottom-left" });
        setLoadingCart(false);
      });
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        product,
        setProduct,
        loadingCatalog,
        data,
        setShowDetail,
        showDetail,
        addItemCart,
        loading,
        loadingCart,
        sortByNameA,
        sortByNameZ,
        toggleFilterCategory,
        filters,
        toggleFilterPrice,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
