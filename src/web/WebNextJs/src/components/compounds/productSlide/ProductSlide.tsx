"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { ProductsHighlight } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductsProps {
  products: ProductsHighlight[];
}

export default function ProductSlide({ products }: ProductsProps) {
  return (
    <>
      <Tabs defaultValue="Mais Vendidos" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-10">
          <TabsTrigger value="Mais Vendidos">Mais Vendidos</TabsTrigger>
          <TabsTrigger value="Novidades">Novidades</TabsTrigger>
          <TabsTrigger value="Ofertas">Ofertas</TabsTrigger>
          <TabsTrigger value="Mais Buscados">Mais Buscados</TabsTrigger>
        </TabsList>
        <TabsContent value="Mais Vendidos">
          <Swiper
            modules={[Pagination, Scrollbar, Autoplay]}
            slidesPerView={4}
            spaceBetween={35}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            {products
              ?.filter((x) => x.productCategory === 0)
              ?.map((item, key) => {
                return (
                  <SwiperSlide key={key}>
                    <img src={`/images/${item.image}`} className="rounded-[16px] w-full max-h-[528px] object-cover" />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </TabsContent>
        <TabsContent value="Novidades">
          <Swiper
            modules={[Pagination, Scrollbar, Autoplay]}
            slidesPerView={4}
            spaceBetween={35}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            {products
              ?.filter((x) => x.productCategory === 1)
              ?.map((item, key) => {
                return (
                  <SwiperSlide key={key}>
                    <img src={`/images/${item.image}`} className="rounded-[16px] w-full max-h-[528px] object-cover" />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </TabsContent>
        <TabsContent value="Ofertas">
          <Swiper
            modules={[Pagination, Scrollbar, Autoplay]}
            slidesPerView={4}
            spaceBetween={35}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            {products
              ?.filter((x) => x.productCategory === 2)
              ?.map((item, key) => {
                return (
                  <SwiperSlide key={key}>
                    <img src={`/images/${item.image}`} className="rounded-[16px] w-full max-h-[528px] object-cover" />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </TabsContent>
        <TabsContent value="Mais Buscados">
          <Swiper
            modules={[Pagination, Scrollbar, Autoplay]}
            slidesPerView={4}
            spaceBetween={35}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            {products
              ?.filter((x) => x.productCategory === 3)
              ?.map((item, key) => {
                return (
                  <SwiperSlide key={key}>
                    <img src={`/images/${item.image}`} className="rounded-[16px] w-full max-h-[528px] object-cover" />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </TabsContent>
      </Tabs>
    </>
  );
}
