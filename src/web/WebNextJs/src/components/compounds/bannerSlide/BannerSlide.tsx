"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Banners } from "@/types";

interface BannersProps {
  banners: Banners[];
}

export default function BannerSlide({ banners }: BannersProps) {
  return (
    <Swiper
      modules={[Pagination, Scrollbar, Autoplay]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {banners.map((item, key) => {
        return (
          <SwiperSlide key={key}>
            <img src={`/images/${item.image}`} alt={item.altImage} className="rounded-[16px] w-full max-h-[528px] object-cover" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
