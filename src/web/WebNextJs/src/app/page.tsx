import { Skeleton } from "@/components";
import Collections from "@/components/compounds/collections/Collections";
import { Suspense } from "react";
import { Metadata } from "next";
import { Banner } from "@/components/compounds/bannerSlide/Banner";
import React from "react";
import ProductPresentation from "@/components/compounds/productSlide/ProductPresentation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "NerdStore - Home",
  };
}

export default async function Home() {
  return (
    <main className="">
      <Suspense
        fallback={
          <section className="relative w-full px-6 xl:mx-auto xl:max-w-1200 xl:px-0 2xl:max-w-[104rem]">
            <Skeleton className="h-[30rem] w-[104rem] object-cover bg-gray-400" />
          </section>
        }
      >
        <Banner />
      </Suspense>

      <section className="relative w-full px-6 xl:mx-auto xl:max-w-1200 xl:px-0 2xl:max-w-[104rem]">
        <Collections />
      </section>

      <section className="relative w-full px-6 xl:mx-auto xl:max-w-1200 xl:px-0 2xl:max-w-[94rem] mb-20">
        <Suspense
          fallback={
            <section className="relative w-full px-6 xl:mx-auto xl:max-w-1200 xl:px-0 2xl:max-w-[104rem]">
              <div className="flex flex-wrap gap-4 justify-center">
                <Skeleton className="h-[380px] w-[350px] object-cover bg-gray-400" />
                <Skeleton className="h-[380px] w-[350px] object-cover bg-gray-400" />
                <Skeleton className="h-[380px] w-[350px] object-cover bg-gray-400" />
                <Skeleton className="h-[380px] w-[350px] object-cover bg-gray-400" />
              </div>
            </section>
          }
        >
          <ProductPresentation />
        </Suspense>
      </section>
    </main>
  );
}
