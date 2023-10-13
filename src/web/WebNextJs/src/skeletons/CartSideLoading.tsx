import { Skeleton } from "@/components";

export function CartSideLoading() {
  return (
    <>
      <Skeleton className="h-[5rem] w-[22rem] bg-gray-400" />
      <Skeleton className="h-[5rem] w-[22rem] mt-2 bg-gray-400" />
      <Skeleton className="h-[5rem] w-[22rem] mt-2 bg-gray-400" />
      <Skeleton className="h-[5rem] w-[22rem] mt-2 bg-gray-400" />
      <Skeleton className="h-[5rem] w-[22rem] mt-2 bg-gray-400" />
      <Skeleton className="h-[5rem] w-[22rem] mt-2 bg-gray-400" />
      <Skeleton className="h-[5rem] w-[22rem] mt-2 bg-gray-400" />
    </>
  );
}
