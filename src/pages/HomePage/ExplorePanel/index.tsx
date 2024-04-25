import { useTranslation } from "react-i18next";
import { useRef } from "react";
import Card from "./Card";
import Carousel from "react-multi-carousel";
import { ChevronLeftSVG } from "assets/svgs";

const responsive = {
  desktop: {
    breakpoint: { max: 10000, min: 1280 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 1280, min: 900 },
    items: 2,
  },
  small: {
    breakpoint: { max: 900, min: 0 },
    items: 1,
  },
};

export default function ExplorePanel() {
  const { t } = useTranslation();
  const nfts = [
    {
      name: "ABCD#28",
      price: "2.3 ETH",
      logo: "/images/home/explore/1.png",
    },
    {
      name: "ABCD#70",
      price: "1.6 ETH",
      logo: "/images/home/explore/2.png",
    },
    {
      name: "ABCD#88",
      price: "1.2 ETH",
      logo: "/images/home/explore/3.png",
    },
  ];
  const carouselRef: any = useRef();
  return (
    <div className="w-full backdrop-blur bg-[#FFFFFF1A] xs:p-[24px_24px_36px_24px] p-[24px_12px_36px_12px] rounded-[12px]">
      <div className="flex justify-between items-center">
        <div className="text-[24px]">{t("Explore")}</div>
        <div className="font-lg underline">{t("See All")}</div>
      </div>
      <div className="sm:mx-5 mx-0 mt-9 relative">
        <Carousel
          arrows={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000000}
          ref={carouselRef}
          showDots={false}
        >
          {nfts.map((data, i) => {
            return <Card nft={data} key={i} />;
          })}
        </Carousel>
        <div
          onClick={() => carouselRef.current.previous()}
          className="xl:hidden block scale-100 xs:left-0 -left-2.5 absolute top-[calc(50%-15px)] bg-[#ffffff1a] rounded-full w-[30px] h-[30px] cursor-pointer flex justify-center items-center transition text-white hover:opacity-80 [&>*:first-child]:!h-3.5 [&>*:first-child]:!w-fit"
        >
          {ChevronLeftSVG}
        </div>
        <div
          onClick={() => carouselRef.current.next()}
          className="xl:hidden block -scale-100 xs:right-0 -right-2.5 absolute top-[calc(50%-15px)] bg-[#ffffff1a] rounded-full w-[30px] h-[30px] cursor-pointer flex justify-center items-center transition text-white hover:opacity-80 [&>*:first-child]:!h-3.5 [&>*:first-child]:!w-fit"
        >
          {ChevronLeftSVG}
        </div>
      </div>
    </div>
  );
}
