import { useTranslation } from "react-i18next";
import HeroSection from "./HeroSection";
import ExplorePanel from "./ExplorePanel";
import CollectionCarousel from "./CollectionCarousel";
import NFTPanel from "./NFTPanel";
import { useState } from "react";
import { useMarketData } from "hooks/useMarketData";

export default function HomePage() {
  const { t } = useTranslation();
  useMarketData();
  const [selectedCategories, setSelectedCategories] = useState([]);
  return (
    <>
      <div className="relative px-3 pt-[80px] z-0 pb-[80px]  overflow-hidden">
        <img src={"/images/home/vectors/1.png"} alt={""} className="absolute top-0 left-0" />
        <img src={"/images/home/vectors/2.png"} alt={""} className="absolute top-[267px] left-0" />
        <img src={"/images/home/vectors/3.png"} alt={""} className="absolute top-[1357px] left-0" />
        <img src={"/images/home/vectors/4.png"} alt={""} className="absolute top-[2184px] left-0" />
        <div className="max-w-[1240px] relative z-10 mx-auto">
          <HeroSection />
          {/* <div className="mt-12" /> */}
          {/* <ExplorePanel /> */}
          {/* <div className="mt-[50px]" /> */}
          <CollectionCarousel
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <div className="mt-[50px]" />
          <NFTPanel selectedCategories={selectedCategories} />
        </div>
      </div>
      {/* <BackToTop /> */}
    </>
  );
}
