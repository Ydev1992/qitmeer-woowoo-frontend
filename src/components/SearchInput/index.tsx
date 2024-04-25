import { SearchSVG } from "assets/svgs";
import Button from "components/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMarketPlaceAuctions, useMarketPlaceListings } from "state/hooks";
import FilteredNFTCard from "./FilteredNFTCard";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import NFTSearchList from "./NFTSearchList";
import RecordSearchList from "./RecordSearchList";
import { useTranslation } from "react-i18next";

export default function SearchInput({
  criteria,
  setCriteria,
  placeholder,
  className,
  inputClassName,
  isCategory,
}: {
  criteria: string;
  setCriteria: any;
  placeholder?: string;
  className?: string;
  isCategory?: boolean;
  inputClassName?: string;
}) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categoryRef: any = useRef();

  const { t } = useTranslation();

  useEffect(() => {
    document.addEventListener("mouseup", function (event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
    });
  }, []);

  const categories = [
    t("categories.Under $100"),
    t("categories.$100 - $250"),
    t("categories.Most Liked"),
    t("categories.New Floor Price"),
    t("categories.PFP"),
    t("categories.Photography"),
    t("categories.Cartoon/Anime"),
    t("categories.Music"),
    t("categories.3D"),
    t("categories.Ticket / Pass"),
  ];

  return (
    <div className={`relative ${className} text-md `} ref={categoryRef}>
      <div
        className={`${inputClassName} bg-[#FFFFFF1A] backdrop-blur flex items-center p-[8px_26px] relative border  ${
          categoryOpen ? "border-white rounded-t-lg" : "border-transparent rounded-lg"
        }`}
      >
        <div className="mr-2">{SearchSVG}</div>
        <input
          type={"text"}
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent flex-1 outline-none border-none leading-[1.6] min-w-0"
          onFocus={() => isCategory && setCategoryOpen(true)}
        />

        <div
          className={`underline font-lg leading-[1.6] cursor-pointer ${
            categoryOpen ? "" : "hidden"
          }`}
          onClick={() => {
            setSelectedCategories([]);
            setCriteria("");
          }}
        >
          {t("searchInput.Clear")}
        </div>
      </div>
      {categoryOpen ? (
        <div
          className={`absolute w-full top-[44px] p-6 bg-[#0000001A] backdrop-blur  border rounded-b-[12px]`}
        >
          <div className="mb-6 text-lg leading-[1.2] font-medium">{t("categories.Categories")}</div>
          <div className="flex flex-wrap max-w-[480px] -mx-1.5 -my-1.5">
            {categories.map((data: any, i) => {
              return (
                <div key={i} className="mx-1.5 my-1.5">
                  <Button
                    type={"category"}
                    onClick={() => {
                      const temp: any = [...selectedCategories];
                      if (!temp.includes(data)) temp.push(data);
                      else temp.splice(temp.indexOf(data), 1);
                      setSelectedCategories(temp);
                    }}
                    className={
                      (selectedCategories as any).includes(data)
                        ? "!bg-white !text-black font-semibold !text-sm !p-2"
                        : "!text-sm !p-2"
                    }
                  >
                    {data}
                  </Button>
                </div>
              );
            })}
          </div>
          <RecordSearchList setCategoryOpen={setCategoryOpen} />
          <NFTSearchList
            criteria={criteria}
            selectedCategories={selectedCategories}
            setCategoryOpen={setCategoryOpen}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
