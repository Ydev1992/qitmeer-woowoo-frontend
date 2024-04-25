import { useCallback, useEffect, useRef, useState } from "react";
import { useMarketPlaceAuctions, useMarketPlaceListings } from "state/hooks";
import FilteredNFTCard from "./FilteredNFTCard";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

export default function NFTSearchList({
  criteria,
  setCategoryOpen,
  selectedCategories,
}: {
  criteria: string;
  setCategoryOpen: any;
  selectedCategories: string[];
}) {
  const listings: any = useMarketPlaceListings();
  const auctions: any = useMarketPlaceAuctions();
  const totalListings = [...listings, ...auctions];

  const [wrappedListings, setWrappedListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const { t } = useTranslation();

  const node: any = useRef();
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = node.current;
    if (
      scrollTop + clientHeight === scrollHeight &&
      !loading &&
      scrollHeight > 50 &&
      (offset + 1) * 8 < listings.length
    ) {
      console.log("reached bottom hook in scroll component");
      setOffset(offset + 1);
    }
  }, [node, offset, loading]);

  useEffect(() => {
    if (node.current) {
      node.current.addEventListener("scroll", handleScroll);
      return () => node.current?.removeEventListener("scroll", handleScroll);
    }
  }, [node, handleScroll]);

  const stringifiedSelectedCategories = JSON.stringify(selectedCategories);
  const stringifiedListings = JSON.stringify(totalListings);

  async function getWrappedNFTs() {
    let temp: any = totalListings;
    setLoading(true);
    try {
      const { data: response } = await axios.get("/api/collections");
      temp = totalListings.filter((listing: any) => {
        const isExistingCollection = response.find(
          (collection: any) => collection.address === listing.address.toLowerCase()
        );
        let isExisting = true;
        selectedCategories.map((category: string) => {
          if (!isExistingCollection?.classification?.includes(category)) isExisting = false;
        });
        return listing.endTimestamp >= Date.now() / 1000 && isExisting;
      });
    } catch (e) {
      console.log(e);
    }
    setWrappedListings(temp.slice(0, (offset + 1) * 8));
    setLoading(false);
  }

  useEffect(() => {
    getWrappedNFTs();
  }, [stringifiedSelectedCategories, stringifiedListings, offset]);

  return (
    <div>
      <div className="mt-6 text-lg leading-[1.2] font-medium mb-2">{t("searchInput.NFTs")}</div>
      <div
        className="flex flex-col max-h-[240px] overflow-y-scroll overflow-x-clip white-scroll w-[calc(100%+24px)] -ml-2"
        ref={node}
      >
        {wrappedListings.length ? (
          wrappedListings.map((listing: any, i: number) => {
            return (
              <FilteredNFTCard
                key={i}
                nft={listing}
                setCategoryOpen={setCategoryOpen}
                criteria={criteria}
              />
            );
          })
        ) : !loading ? (
          <div className="ml-2">{t("searchInput.No result found for this search")}</div>
        ) : (
          ""
        )}

        {loading ? (
          <div className="flex justify-center mt-1">
            <Oval
              width={20}
              height={20}
              color={"white"}
              secondaryColor="black"
              strokeWidth={3}
              strokeWidthSecondary={3}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
