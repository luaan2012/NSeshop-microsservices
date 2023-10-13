import { formatToCurrency } from "@/utils";

interface PriceProps {
  text: string;
  price:  number;
  total?: boolean;
}

export default function PriceCard({ text, price, total }: PriceProps) {
  return (
    <div
      className={`flex justify-between ${
        total ? '' : 'border-b border-gray-200'
      } py-4`}
    >
      <p
        className={` ${
          total ? 'text-lg font-medium text-gray-900 dark:text-gray-300' : 'text-gray-500 dark:text-gray-300'
        }`}
      >
        {text}
      </p>
      <p
        className={` ${
          total ? 'text-lg font-semibold text-gray-900 dark:text-gray-300' : 'text-gray-800 dark:text-gray-300'
        }`}
      >
        {formatToCurrency(price)}
      </p>
    </div>
  );
}
