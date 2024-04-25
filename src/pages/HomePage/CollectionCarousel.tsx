import { ChevronLeftSVG } from "assets/svgs";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";

const responsive = {
  5: {
    breakpoint: { max: 10000, min: 1280 },
    items: 5,
  },
  4: {
    breakpoint: { max: 1280, min: 1024 },
    items: 4,
  },
  3: {
    breakpoint: { max: 1024, min: 780 },
    items: 3,
  },
  2: {
    breakpoint: { max: 780, min: 540 },
    items: 2,
  },
  1: {
    breakpoint: { max: 540, min: 0 },
    items: 1,
  },
};

export default function CollectionCarousel({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: any;
  setSelectedCategories: any;
}) {
  const { t } = useTranslation();
  const carouselRef: any = useRef();
  const items = [
    {
      logo: "/images/home/carousel/1.png",
      name: t("categories.Ticket / Pass"),
    },
    {
      logo: "/images/home/carousel/2.png",
      name: t("categories.Music"),
    },
    {
      logo: "/images/home/carousel/3.png",
      name: t("categories.PFP"),
    },
    {
      logo: "/images/home/carousel/4.png",
      name: t("categories.Photography"),
    },
    {
      logo: "/images/home/carousel/5.png",
      name: t("categories.3D"),
    },
    {
      logo: "/images/home/carousel/6.png",
      name: t("categories.New Floor Price"),
    },
    {
      logo: "/images/home/carousel/7.png",
      name: t("categories.Cartoon/Anime"),
    },
  ];
  return (
    <div className="relative">
      <div className="w-[calc(100%-60px)] mx-auto overflow-hidden py-5">
        <div>
          <Carousel
            arrows={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000000}
            ref={carouselRef}
            showDots={false}
            className="overflow-visible"
          >
            {items.map((data, i) => {
              return (
                <div key={i} className="">
                  <div
                    className={`${
                      selectedCategories.includes(data.name) ? "" : "gradient-border-hover"
                    } cursor-pointer relative w-[230px] py-0.5`}
                    onClick={() => {
                      const temp: any = [...selectedCategories];
                      if (temp.includes(data.name)) temp.splice(temp.indexOf(data.name), 1);
                      else temp.push(data.name);
                      setSelectedCategories(temp);
                    }}
                  >
                    <div
                      className={`flex justify-between items-center ${
                        selectedCategories.includes(data.name)
                          ? "bg-[linear-gradient(130deg,#4fc0ff_0%,#c23fff_100%)]"
                          : "bg-[#FFFFFF1A]"
                      } rounded-[12px] w-[calc(100%-4px)] ml-0.5 overflow-hidden p-[10px_12px]`}
                    >
                      <img src={data.logo} alt={""} className="rounded-lg w-[50px] h-[50px]" />
                      <div className="text-lg whitespace-nowrap text-ellipsis overflow-hidden ml-4">{t(data.name)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
      <div
        onClick={() => carouselRef.current.previous()}
        className="scale-100 left-0 absolute top-[calc(50%-15px)] bg-[#ffffff1a] rounded-full w-[30px] h-[30px] cursor-pointer flex justify-center items-center transition text-white hover:opacity-80 [&>*:first-child]:!h-3.5 [&>*:first-child]:!w-fit"
      >
        {ChevronLeftSVG}
      </div>
      <div
        onClick={() => carouselRef.current.next()}
        className="-scale-100 right-0 absolute top-[calc(50%-15px)] bg-[#ffffff1a] rounded-full w-[30px] h-[30px] cursor-pointer flex justify-center items-center transition text-white hover:opacity-80 [&>*:first-child]:!h-3.5 [&>*:first-child]:!w-fit"
      >
        {ChevronLeftSVG}
      </div>
    </div>
  );
}
