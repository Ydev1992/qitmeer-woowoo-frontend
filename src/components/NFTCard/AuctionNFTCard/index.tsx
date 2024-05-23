import Button from "components/Button";
import CancelListingModal from "components/Modals/CancelListingModal";
import ListingModal from "components/Modals/ListingModal";
import PlaceBidModal from "components/Modals/PlaceBidModal";
import Notification from "components/Notification";
import { SkeletonComponent } from "components/SkeletonComponent";
import StyledImage from "components/StyledImage";
import { GAS_MULTIPLE } from "config/constants";
import { tokens } from "config/tokens";
import { ProjectContext } from "contexts/ProjectContext";
import { useWeb3React } from "contexts/wagmi";
import { ethers } from "ethers";
import { useFetchBidInfo, useMarketFetchData } from "hooks/useMarketData";
import useNFTInfo from "hooks/useNFTInfo";
import { useUserFetchData } from "hooks/useUserData";
import { useCallback, useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchNFTInfoAsync } from "state/marketplace";
import { handleWalletError, shortenString } from "utils";
import { getMarketplaceContract } from "utils/contracts";
import { getEllipsis } from "utils/functions";
import { useAccount, useSigner } from "wagmi";

export default function AuctionNFTCard({ nft }: { nft: any }) {
  const { t } = useTranslation();
  const _nftInfo: any = useNFTInfo(nft.chainId, nft.address, nft.tokenId);

  const nftInfo = { ...nft, ...(_nftInfo ?? {}) };

  const bidInfo = useFetchBidInfo(nft.id);
  let currency: any = Object.keys(tokens[nft.chainId]).find(
    (key) => tokens[nft.chainId][key].address.toLowerCase() === nft.currency
  );
  currency = tokens[nft.chainId][currency];

  const { address: account } = useAccount();
  // const account = "0x4edC7a04441de91Ef8783c996267d57d87B85543";
  const buttonRef: any = useRef();

  const [offerOpen, setOfferOpen] = useState(false);
  const [placeBidOpen, setPlaceBidOpen] = useState(false);
  const [offShelfOpen, setOffShelfOpen] = useState(false);
  const isEnded = Date.now() > nft.endTimestamp * 1000;

  const { data: signer } = useSigner();
  const { chainId }: any = useWeb3React();
  const { fetchInfos: fetchUserInfos } = useUserFetchData();
  const { fetchInfos: fetchMarketInfos } = useMarketFetchData();
  const dispatch: any = useDispatch();
  const { pending, setPending }: any = useContext(ProjectContext);
  const navigate = useNavigate();

  const showError = useCallback((errorMsg: string) => {
    if (errorMsg) toast(<Notification type={"fail"} msg={errorMsg} />);
  }, []);

  async function onCollectionAuctionPayout() {
    try {
      if (!account) return;
      setPending(true);
      const nftContract = getMarketplaceContract(signer, chainId);

      const estimateGas: any =
        await nftContract.estimateGas.collectAuctionPayout(nftInfo.id);

      console.log(estimateGas);

      const tx = {
        gasLimit: Math.ceil(estimateGas * GAS_MULTIPLE).toString(),
      };
      const listingTx = await nftContract.collectAuctionPayout(nftInfo.id, tx);

      toast(
        <Notification
          type={"loading"}
          msg={t("notification.Transaction submitted")}
          txhash={listingTx.hash}
        />
      );
      await listingTx.wait();
      toast(
        <Notification
          type={"success"}
          msg={t("notification.Placed a bid")}
          txhash={listingTx.hash}
        />
      );
      fetchUserInfos(account, chainId);
      fetchMarketInfos(chainId);
      dispatch(fetchNFTInfoAsync(nftInfo.address, nftInfo.tokenId, chainId));
      navigate(`/nft/813/${nftInfo.address}/${nftInfo.tokenId}`);
    } catch (e) {
      console.log(e);
      handleWalletError(e, showError);
    }
    setPending(false);
  }

  async function onCollectAuctionTokens() {
    try {
      if (!account) return;
      setPending(true);
      const nftContract = getMarketplaceContract(signer, chainId);

      const estimateGas: any =
        await nftContract.estimateGas.collectAuctionTokens(nftInfo.id);

      console.log(estimateGas);

      const tx = {
        gasLimit: Math.ceil(estimateGas * GAS_MULTIPLE).toString(),
      };
      const listingTx = await nftContract.collectAuctionTokens(nftInfo.id, tx);

      toast(
        <Notification
          type={"loading"}
          msg={t("notification.Transaction submitted")}
          txhash={listingTx.hash}
        />
      );
      await listingTx.wait();
      toast(
        <Notification
          type={"success"}
          msg={t("notification.Collected auction tokens")}
          txhash={listingTx.hash}
        />
      );
      fetchUserInfos(account, chainId);
      fetchMarketInfos(chainId);
      dispatch(fetchNFTInfoAsync(nftInfo.address, nftInfo.tokenId, chainId));
      navigate(`/nft/813/${nftInfo.address}/${nftInfo.tokenId}`);
    } catch (e) {
      console.log(e);
      handleWalletError(e, showError);
    }
    setPending(false);
  }

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

      {nftInfo && bidInfo && (
        <PlaceBidModal
          open={placeBidOpen}
          setOpen={setPlaceBidOpen}
          nftInfo={{ ...nftInfo, ...nft }}
          bidInfo={bidInfo}
        />
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
            navigate(
              `/nft/${nftInfo.chainId}/${nftInfo.address}/${nftInfo.tokenId}`
            );
        }}
      >
        <div className="gradient-border-hover relative mb-4 py-0.5 nftcard-hover-effect">
          <div className="p-4 rounded-[12px] bg-[#FFFFFF1A] backdrop-blur cursor-pointer">
            <div className="w-full aspect-square rounded-[12px] overflow-hidden flex justify-center items-center [&>span]:w-full [&>span]:h-full">
              {!nftInfo ? (
                <SkeletonComponent className="!w-full !max-w-full !h-full flex" />
              ) : (
                <StyledImage
                  src={nftInfo.image}
                  alt={""}
                  className="rounded-[12px]"
                />
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
                  ? `${(
                      nft.floorPrice / Math.pow(10, currency.decimals)
                    ).toFixed(4)} ${currency.symbol}`
                  : "Not Listed"}
              </div>
            </div>
            <div className="flex justify-between text-[#C4C4C4] text-lg mb-4 whitespace-nowrap text-ellipsis overflow-hidden">
              <div className="mr-2 whitespace-nowrap text-ellipsis overflow-hidden flex-1">
                {t("nft.Created by")}
              </div>
              <div>
                {!nftInfo ? (
                  <SkeletonComponent />
                ) : (
                  nftInfo?.creator?.nickname ??
                  getEllipsis(nftInfo?.creator?.wallet)
                )}
              </div>
            </div>
            <div ref={buttonRef}>
              {account ? (
                nftInfo?.owner?.wallet?.toLowerCase() ===
                account.toLowerCase() ? (
                  <Button
                    type={"primary"}
                    className="font-lg font-semibold w-full mt-5"
                    border={"1px"}
                    itemClassName="py-3.5 w-full hover:bg-[linear-gradient(90deg,#4FC0FF_0%,#C23FFF_100%)] hover:!shadow-none"
                    onClick={() => setOfferOpen(true)}
                    disabled={pending}
                    pending={pending}
                  >
                    {t("actions.List for sale")}
                  </Button>
                ) : nftInfo?.listingCreator?.toLowerCase() ===
                  account.toLowerCase() ? (
                  nftInfo.winningBid ? (
                    <>
                      {!nftInfo.paidOutBidAmount ? (
                        <Button
                          type={"primary"}
                          className="font-lg font-semibold w-full mt-5"
                          border={"1px"}
                          itemClassName="py-3.5 w-full hover:bg-[linear-gradient(90deg,#4FC0FF_0%,#C23FFF_100%)] hover:!shadow-none"
                          disabled={pending}
                          pending={pending}
                          onClick={() => {
                            onCollectionAuctionPayout();
                          }}
                        >
                          {t("actions.Collect Auction Payout")}
                        </Button>
                      ) : (
                        ""
                      )}

                      {nftInfo.winningBid.bidder === account.toLowerCase() &&
                      !nftInfo.paidOutAuctionTokens ? (
                        <Button
                          type={"primary"}
                          className="font-lg font-semibold w-full mt-5"
                          border={"1px"}
                          itemClassName="py-3.5 w-full hover:bg-[linear-gradient(90deg,#4FC0FF_0%,#C23FFF_100%)] hover:!shadow-none"
                          onClick={() => {
                            onCollectAuctionTokens();
                          }}
                          disabled={pending}
                          pending={pending}
                        >
                          {t("actions.Collect Auction Tokens")}
                        </Button>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <Button
                      type={"primary"}
                      className="font-lg font-semibold w-full mt-5"
                      border={"1px"}
                      itemClassName="py-3.5 w-full hover:bg-[linear-gradient(90deg,#4FC0FF_0%,#C23FFF_100%)] hover:!shadow-none"
                      disabled={pending}
                      pending={pending}
                      onClick={() => setOffShelfOpen(true)}
                    >
                      {t("actions.Remove from auction")}
                    </Button>
                  )
                ) : !isEnded ? (
                  <Button
                    type={"primary"}
                    className="font-lg font-semibold w-full mt-5"
                    border={"1px"}
                    itemClassName="py-3.5 w-full hover:bg-[linear-gradient(90deg,#4FC0FF_0%,#C23FFF_100%)] hover:!shadow-none"
                    onClick={() => setPlaceBidOpen(true)}
                    disabled={pending}
                    pending={pending}
                  >
                    {t("actions.Place a bid")}
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
