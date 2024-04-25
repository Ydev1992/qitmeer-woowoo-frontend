import Button from "components/Button";
import BuyModal from "components/Modals/BuyModal";
import CancelListingModal from "components/Modals/CancelListingModal";
import ListingModal from "components/Modals/ListingModal";
import { SkeletonComponent } from "components/SkeletonComponent";
import StyledImage from "components/StyledImage";
import { tokens } from "config/tokens";
import { ethers } from "ethers";
import useNFTInfo from "hooks/useNFTInfo";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { shortenString } from "utils";
import { getEllipsis } from "utils/functions";
import { useAccount } from "wagmi";

export default function ListingNFTCard({ nft }: { nft: any }) {
  const { t } = useTranslation();
  const nftInfo: any = useNFTInfo(nft.chainId, nft.address, nft.tokenId);
  let currency: any = Object.keys(tokens[nft.chainId]).find(
    (key) => tokens[nft.chainId][key].address.toLowerCase() === nft.currency
  );
  currency = tokens[nft.chainId][currency];

  const { address: account } = useAccount();
  // const account = '0x4edC7a04441de91Ef8783c996267d57d87B85543'
  const buttonRef: any = useRef();

  const navigate = useNavigate();

  const [offerOpen, setOfferOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [offShelfOpen, setOffShelfOpen] = useState(false);

  return (
    <>
      {nftInfo && (
        <ListingModal
          open={offerOpen}
          setOpen={setOfferOpen}
          nftInfo={{ ...nftInfo, ...nft }}
          type="listing"
        />
      )}
      {currency && nftInfo && (
        <BuyModal open={buyOpen} setOpen={setBuyOpen} nftInfo={{ ...nftInfo, ...nft }} />
      )}
      {nftInfo && (
        <CancelListingModal
          open={offShelfOpen}
          setOpen={setOffShelfOpen}
          nftInfo={{ ...nftInfo, ...nft }}
        />
      )}
      <div
        className="cursor-pointer"
        onClick={(e) => {
          if (!buttonRef.current.contains(e.target) && nftInfo)
            navigate(`/nft/${nftInfo.chainId}/${nftInfo.address}/${nftInfo.tokenId}`);
        }}
      >
        <div className="gradient-border-hover relative mb-4 py-0.5 nftcard-hover-effect">
          <div className="p-4 rounded-[12px] bg-[#FFFFFF1A] backdrop-blur cursor-pointer">
            <div className="w-full aspect-square rounded-[12px] overflow-hidden flex justify-center items-center [&>span]:w-full [&>span]:h-full">
              {!nftInfo ? (
                <SkeletonComponent className="!w-full !max-w-full !h-full flex" />
              ) : (
                <StyledImage src={nftInfo.image} alt={""} className="rounded-[12px]" />
              )}
            </div>
            <div className="text-xl font-medium py-3">
              {!nftInfo ? (
                <SkeletonComponent className="!w-[100px] !max-w-[100px]" />
              ) : (
                shortenString(nftInfo.name, 20)
              )}
            </div>
            <div className="flex justify-between text-[#C4C4C4] text-lg whitespace-nowrap text-ellipsis overflow-hidden">
              <div className="mr-2 whitespace-nowrap text-ellipsis overflow-hidden flex-1">
                {t("nft.Floor Price")}
              </div>
              <div className="text-white font-semibold">
                {nft.currency !== ethers.constants.AddressZero
                  ? `${(nft.floorPrice / Math.pow(10, currency.decimals)).toFixed(4)} ${
                      currency.symbol
                    }`
                  : "Not Listed"}
              </div>
            </div>
            <div className="flex justify-between text-[#C4C4C4] text-lg mb-4 whitespace-nowrap text-ellipsis overflow-hidden">
              <div className="whitespace-nowrap text-ellipsis overflow-hidden mr-2 flex-1">
                {t("nft.Created by")}
              </div>
              <div>
                {!nftInfo ? (
                  <SkeletonComponent />
                ) : (
                  nftInfo.creator.nickname ?? getEllipsis(nftInfo.creator.wallet)
                )}
              </div>
            </div>
            <div ref={buttonRef}>
              {account ? (
                nft.listingCreator ? (
                  nft.listingCreator.toLowerCase() === account.toLowerCase() ? (
                    nft.endTimestamp * 1000 < Date.now() ? (
                      <Button
                        type={"primary"}
                        className="font-lg font-semibold w-full mt-5"
                        border={"1px"}
                        itemClassName="py-3.5 w-full hover:bg-[linear-gradient(90deg,#4FC0FF_0%,#C23FFF_100%)] hover:!shadow-none"
                        onClick={() => setOfferOpen(true)}
                      >
                        {t("actions.List for sale")}
                      </Button>
                    ) : (
                      <Button
                        type={"primary"}
                        className="font-lg font-semibold w-full mt-5"
                        border={"1px"}
                        itemClassName="py-3.5 w-full hover:bg-[linear-gradient(90deg,#4FC0FF_0%,#C23FFF_100%)] hover:!shadow-none"
                        onClick={() => setOffShelfOpen(true)}
                      >
                        {t("actions.Remove from listing")}
                      </Button>
                    )
                  ) : (
                    <Button
                      type={"primary"}
                      className="font-lg font-semibold w-full mt-5"
                      border={"1px"}
                      itemClassName="py-3.5 w-full hover:bg-[linear-gradient(90deg,#4FC0FF_0%,#C23FFF_100%)] hover:!shadow-none"
                      onClick={() => setBuyOpen(true)}
                    >
                      {t("actions.Buy now")}
                    </Button>
                  )
                ) : nftInfo?.owner?.wallet?.toLowerCase() === account.toLowerCase() ? (
                  <Button
                    type={"primary"}
                    className="font-lg font-semibold w-full mt-5"
                    border={"1px"}
                    itemClassName="py-3.5 w-full hover:bg-[linear-gradient(90deg,#4FC0FF_0%,#C23FFF_100%)] hover:!shadow-none"
                    onClick={() => setOfferOpen(true)}
                  >
                    {t("actions.List for sale")}
                  </Button>
                ) : (
                  <div className="h-[47px]" />
                )
              ) : (
                <div className="h-[47px]" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
