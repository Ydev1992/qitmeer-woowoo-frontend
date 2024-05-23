import axios from "axios";
import Button from "components/Button";
import NFTList from "components/NFTList";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMarketPlaceAuctions, useMarketPlaceListings } from "state/hooks";
import { numberWithCommas } from "utils/functions";

export default function NFTPanel({
  selectedCategories,
}: {
  selectedCategories: any;
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const listings = useMarketPlaceListings();
  const auctions = useMarketPlaceAuctions();
  const wrappedListings = listings.filter(
    (listing: any) =>
      listing.endTimestamp >= Date.now() / 1000 &&
      listing.startTimestamp <= Date.now() / 1000
  );

  const wrappedAuctions = auctions.filter(
    (auction: any) =>
      auction.endTimestamp >= Date.now() / 1000 &&
      auction.startTimestamp <= Date.now() / 1000
  );

  const allItems = [...wrappedListings, ...wrappedAuctions].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp)
  );

  const [wrappedItems, setWrappedItems] = useState<any>([]);
  const stringifiedSelectedCategories = JSON.stringify(selectedCategories);
  const stringifiedItems = JSON.stringify(allItems);

  useEffect(() => {
    if (!selectedCategories.length) {
      setWrappedItems(allItems);
      return;
    }
    setLoading(true);
    axios
      .get(`/api/collections`)
      .then((result) => {
        setWrappedItems(
          allItems.filter((listing: any) => {
            const isExistingCollection = result.data.find(
              (collection: any) =>
                collection.address === listing.address.toLowerCase()
            );
            if (!isExistingCollection) return false;
            console.log(isExistingCollection, selectedCategories);
            let isExisting = true;
            selectedCategories.map((category: any) => {
              if (!isExistingCollection.classification.includes(category))
                isExisting = false;
            });
            return isExisting;
          })
        );
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [stringifiedSelectedCategories, stringifiedItems]);

  return (
    <div>
      <div className="text-2xl text-[#C4C4C4]">
        {numberWithCommas(wrappedItems.length)} Result
      </div>
      <NFTList nfts={wrappedItems} type={"home"} />
    </div>
  );
}
