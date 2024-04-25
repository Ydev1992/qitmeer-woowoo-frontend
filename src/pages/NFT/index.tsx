import { useTranslation } from "react-i18next";
import Detail from "./Detail";
import NFTInfo from "./NFTInfo";
import { useNavigate, useParams } from "react-router-dom";
import useNFTInfo from "hooks/useNFTInfo";
import { SkeletonComponent } from "components/SkeletonComponent";
import { useMarketPlaceAuctions, useMarketPlaceListings } from "state/hooks";
import StyledImage from "components/StyledImage";
import ListingBidPanel from "./BidPanel/ListingBidPanel";
import AuctionBidPanel from "./BidPanel/AuctionBidPanel";
import { useContext, useEffect } from "react";
import { ProjectContext } from "contexts/ProjectContext";
import Button from "components/Button";

export default function NFT() {
  const { t } = useTranslation();
  const { chainId, address, tokenId } = useParams();
  const nftInfo: any = useNFTInfo(chainId, address, tokenId);
  const listings = useMarketPlaceListings();
  const auctions = useMarketPlaceAuctions();
  const { onRecords } = useContext(ProjectContext);

  let isExistings = [...listings, ...auctions].filter(
    (listing: any) =>
      listing.assetContract &&
      listing.assetContract.toLowerCase() === address?.toLowerCase() &&
      Number(listing.tokenId) === Number(tokenId)
  );

  if (!isExistings.length) isExistings = [null];
  useEffect(() => {
    onRecords(
      {
        chainId,
        address,
        tokenId,
      },
      1
    );
  }, [chainId, address, tokenId]);

  const navigate = useNavigate();

  return (
    <div className="relative pt-20 tracking-normal px-3 pb-[70px] overflow-hidden">
      <img src={"/images/buynft/vectors/1.png"} alt={""} className="absolute top-0 left-0 w-full" />
      <img
        src={"/images/buynft/vectors/2.png"}
        alt={""}
        className="absolute top-[267px] left-0 w-full"
      />
      <div className="w-full max-w-[1110px] mx-auto mt-[68px] relative z-10">
        <div className="flex justify-between w-full lg:flex-row flex-col lg:items-start items-center">
          <div>
            <div className="sm:w-[400px] w-[280px] sm:h-[400px] h-[280px] rounded-[12px] overflow-hidden flex justify-center items-center [&>span]:w-full [&>span]:h-full">
              {!nftInfo ? (
                <SkeletonComponent className="!w-full !max-w-full !h-full flex" />
              ) : (
                <StyledImage src={nftInfo.image} alt={""} className="rounded" />
              )}
            </div>
            <div className="lg:w-[400px] w-full lg:mt-9 mt-16 lg:block hidden">
              {nftInfo ? <Detail nftInfo={nftInfo} /> : ""}
            </div>
          </div>
          <div className="lg:flex-1 flex-none lg:w-fit w-full lg:ml-[42px] ml-0 lg:mt-0 mt-10  overflow-hidden text-ellipsis whitespace-nowrap">
            <NFTInfo nftInfo={nftInfo} />
            <div className="mt-7" />

            {nftInfo
              ? isExistings.map((priceInfo, i) => {
                  const wrappedNftInfo = {
                    ...(nftInfo ?? {}),
                    ...(priceInfo ?? {}),
                  };
                  return (
                    <div key={i} className="mb-10">
                      {wrappedNftInfo.type === "auction" ? (
                        <AuctionBidPanel nftInfo={wrappedNftInfo} />
                      ) : (
                        <ListingBidPanel nftInfo={wrappedNftInfo} />
                      )}
                    </div>
                  );
                })
              : ""}
            <div>
              <Button
                type={"primary"}
                className="font-lg font-semibold w-full"
                border={"1px"}
                itemClassName="py-3.5 w-full"
                onClick={() => navigate(-1)}
              >
                {t("actions.Back")}
              </Button>
            </div>
          </div>
        </div>
        <div className="lg:w-[400px] w-full lg:mt-9 mt-16 lg:hidden block">
          {nftInfo ? <Detail nftInfo={nftInfo} /> : ""}
        </div>
      </div>
    </div>
  );
}
