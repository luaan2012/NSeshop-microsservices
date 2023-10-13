import { Banners } from "@/types";
import { bannerAction } from "@/features/actions";
import BannerSlide from "./BannerSlide";

export async function Banner() {
  const banners: Banners[] = await bannerAction();

  return (
    <section className="relative w-full mt-8 px-6 xl:mx-auto xl:max-w-1200 xl:px-0 2xl:max-w-[104rem]">
      <BannerSlide banners={banners} />
    </section>
  );
}
