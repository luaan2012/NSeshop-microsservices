import { LazyLoadImage } from "react-lazy-load-image-component";
import PriceCard from "@/components/ui/PriceCard";
import { SHIPPING } from "@/constants";
import { OrderFinished } from "@/types";
import { formatToCurrency } from "@/utils";

interface OrderPropsType {
  data: OrderFinished;
}

const OrderFinishedSummary = ({ data }: OrderPropsType) => {
  return (
    <div>
      <>
        {data.orderItems?.map(({ image, value, quantity, name, productId }, key) => (
          <div key={productId} className="flex border-b border-gray-200 py-4">
            <div className="mr-4 h-20 w-20 shrink-0 rounded-lg bg-gray-100 sm:h-[136px] sm:w-[136px] md:h-40 md:w-40">
              <LazyLoadImage
                src={`images/${image && Array.isArray(image) ? image[0] : image}`}
                alt={image}
                effect="opacity"
                className="h-full w-auto transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
              />
            </div>
            <div className="w-full">
              <p className="text-lg">{name}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Size: {"Blue"}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Quantity: {quantity}</p>
              <p className="mt-2 font-semibold">{formatToCurrency(value)}</p>
            </div>
          </div>
        ))}
        <div>
          <PriceCard text="Subtotal" price={data?.valuetotal} />
          <PriceCard text="Frete estimado" price={SHIPPING} />
          <PriceCard total text="Total" price={data?.valuetotal + SHIPPING} />
        </div>
      </>
    </div>
  );
};

export default OrderFinishedSummary;
