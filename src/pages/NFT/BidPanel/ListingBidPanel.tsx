import Button from "components/Button";
import CountDown from "components/CountDown";
import BuyModal from "components/Modals/BuyModal";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ListingModal from "components/Modals/ListingModal";
import { tokens } from "config/tokens";
import useTokenPrice from "hooks/useTokenPrice";
import { useAccount } from "wagmi";
import CancelListingModal from "components/Modals/CancelListingModal";

export default function ListingBidPanel({ nftInfo }: any) {
  const { t } = useTranslation();
  const [buyOpen, setBuyOpen] = useState(false);
  const [listingOpen, setListingOpen] = useState(false);
  const [offShelfOpen, setOffShelfOpen] = useState(false);
  const [listingType, setListingType] = useState("listing");

  const { address: account } = useAccount();
  // const account = '0x4edC7a04441de91Ef8783c996267d57d87B85543';
  let currency: any = Object.keys(tokens[nftInfo.chainId]).find(
    (key, i) => tokens[nftInfo.chainId][key].address.toLowerCase() === nftInfo.currency
  );
  currency = tokens[nftInfo.chainId][currency];
  const price = useTokenPrice(currency?.address, currency?.chainId);
  return (
    <div>
      {nftInfo && (
        <ListingModal
          open={listingOpen}
          setOpen={setListingOpen}
          nftInfo={nftInfo}
          type={listingType}
        />
      )}
      {nftInfo && currency && <BuyModal open={buyOpen} setOpen={setBuyOpen} nftInfo={nftInfo} />}
      {nftInfo && (
        <CancelListingModal open={offShelfOpen} setOpen={setOffShelfOpen} nftInfo={nftInfo} />
      )}
      {currency ? (
        <div className="flex justify-between mt-2 sm:flex-row flex-col">
          <div>
            <div className="text-[#C4C4C4]">Current bid</div>
            <div className="flex items-center">
              <img src={currency.logo} alt={""} className="w-6 h-6 rounded-full" />
              <div className="text-[28px] font-semibold ml-2">
                {(nftInfo.floorPrice / Math.pow(10, currency.decimals)).toFixed(4)}{" "}
                {currency.symbol}
              </div>
              <div className="text-[#C4C4C4] ml-2">
                ≈ $ {((nftInfo.floorPrice * price) / Math.pow(10, currency.decimals)).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="sm:mt-0 mt-4">
            <div className="text-[#C4C4C4] mb-1.5">Deadline</div>
            <CountDown time={nftInfo.endTimestamp * 1000} />
          </div>
        </div>
      ) : (
        ""
      )}
      {account ? (
        nftInfo.listingCreator ? (
          nftInfo.listingCreator.toLowerCase() === account.toLowerCase() ? (
            <>
              {nftInfo.endTimestamp * 1000 >= Date.now() ? (
                <Button
                  type={"primary"}
                  border="1px"
                  itemClassName="p-3 w-[calc(100%-2px)]"
                  className="mt-8 w-full"
                  onClick={() => {
                    setListingOpen(true);
                    setListingType("Update");
                  }}
                >
                  {t("actions.Update listing")}
                </Button>
              ) : (
                ""
              )}
              <Button
                type={"secondary"}
                className="mt-3 w-full"
                onClick={() => setOffShelfOpen(true)}
              >
                {t("actions.Remove from listing")}
              </Button>
            </>
          ) : nftInfo.endTimestamp * 1000 >= Date.now() ? (
            <Button type={"secondary"} className="mt-8 w-full" onClick={() => setBuyOpen(true)}>
              {t("actions.Buy now")}
            </Button>
          ) : (
            ""
          )
        ) : nftInfo?.owner?.wallet?.toLowerCase() === account.toLowerCase() ? (
          <Button
            type={"secondary"}
            className="mt-8 w-full"
            onClick={() => {
              setListingOpen(true);
              setListingType("listing");
            }}
          >
            {t("actions.List for sale")}
          </Button>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
}
