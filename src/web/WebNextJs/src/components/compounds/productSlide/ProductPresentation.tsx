import { highlightAction } from "@/features/actions";
import { ProductSlide } from "@/components";
import { StoreContextProvider } from "@/contexts/StoreContext";
import { ProductsHighlight } from "@/types";

export default async function ProductPresentation() {
  const productsHighlights: ProductsHighlight[] = await highlightAction();

  return <ProductSlide products={productsHighlights} />;
}
