import { StoreContext } from "@/contexts/StoreContext";
import { Products } from "@/types";
import { useContext, useEffect } from "react";
import { DetailProduct } from "../detailProduct/DetailProduct";
import { Skeleton } from "@/components";
import { StoreLoading } from "@/skeletons/StoreLoading";
import { formatToCurrency } from "@/utils";

interface ProductsProps {
  layout: string;
}

export default function ProductsComponent({ layout }: ProductsProps) {
  const { products, loadingCatalog, data, setProduct, setShowDetail, showDetail, loading, filters, loadingCart, addItemCart, product } = useContext(StoreContext);

  const showDetailProduct = (product: Products) => {
    setProduct(product);
    setShowDetail(true);
  };

  useEffect(() => {
    if (data && products.length <= 0) loadingCatalog();
  }, [data]);

  const filteredProducts = products.filter((prod) => {
    // Filtrar por categoria
    const categoryFilterPassed = filters.category.length === 0 || filters.category.includes(prod.productType);

    // Filtrar por preço (caso haja filtros de preço)
    const priceFilterPassed =
      filters.price.length === 0 ||
      filters.price.some((priceFilter) => {
        return prod.value >= priceFilter.between[0] && prod.value <= priceFilter.between[1];
      });

    // Retorna true se o produto passar tanto no filtro de categoria quanto no filtro de preço
    return categoryFilterPassed && priceFilterPassed;
  });

  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl">
      <div className={`grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-${layout} xl:gap-x-8`}>
        {loading ? (
          <StoreLoading />
        ) : (
          filteredProducts?.length > 0 &&
          filteredProducts.map((product) => (
            <div key={product.id} className="group relative transition-transform duration-300 ease-in-out transform hover:scale-105">
              <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                <img src={`/images/${product.image}`} alt={product.image} className="h-full w-full object-center lg:h-full lg:w-full" />
                <div className="flex items-end p-4 cursor-pointer" onClick={() => showDetailProduct(product)}>
                  <button type="button" className="relative z-10 w-full rounded-md bg-black text-white bg-opacity-100 px-4 py-2 text-sm opacity-0 focus:opacity-100 group-hover:opacity-100">
                    Ver Detalhes<span className="sr-only">, Basic Tee 6-Pack </span>
                  </button>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm">
                    <a>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm">{product.active}</p>
                </div>
                <p className="text-sm font-medium">{formatToCurrency(product.value)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <DetailProduct showDetail={showDetail} product={product} setProduct={setProduct} setShowDetail={setShowDetail} loadingCart={loadingCart} addItemCart={addItemCart} />
    </div>
  );
}
