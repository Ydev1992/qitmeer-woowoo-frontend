import Button from "components/Button";
import CountDown from "components/CountDown";
import BuyModal from "components/Modals/BuyModal";
import { useTranslation } from "react-i18next";
import { useCallback, useContext, useState } from "react";
import ListingModal from "components/Modals/ListingModal";
import { tokens } from "config/tokens";
import useTokenPrice from "hooks/useTokenPrice";
import { useAccount, useSigner } from "wagmi";
import CancelListingModal from "components/Modals/CancelListingModal";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import PlaceBidModal from "components/Modals/PlaceBidModal";
import { useFetchBidInfo, useMarketFetchData } from "hooks/useMarketData";
import BidHistory from "./BidHistory";
import { getMarketplaceContract } from "utils/contracts";
import Notification from "components/Notification";
import { toast } from "react-toastify";
import { ProjectContext } from "contexts/ProjectContext";
import { useWeb3React } from "contexts/wagmi";
import { handleWalletError } from "utils";
import { fetchNFTInfoAsync } from "state/marketplace";
import { useUserFetchData } from "hooks/useUserData";
import { useDispatch } from "react-redux";
import { GAS_MULTIPLE } from "config/constants";
import { useNavigate } from "react-router-dom";

export default function AuctionBidPanel({ nftInfo }: any) {
  const { t } = useTranslation();
  const [buyOpen, setBuyOpen] = useState(false);
  const [listingOpen, setListingOpen] = useState(false);
  const [offShelfOpen, setOffShelfOpen] = useState(false);
  const [placeBidOpen, setPlaceBidOpen] = useState(false);
  const [listingType, setListingType] = useState("listing");

  const { address: account } = useAccount();
  // const account = '0x8D4496a0F0932e38A7e9ebeb76c33Ec88141dd1a'
  const bidInfo = useFetchBidInfo(nftInfo.id);
  let currency: any = Object.keys(tokens[nftInfo.chainId]).find(
    (key, i) =>
      tokens[nftInfo.chainId][key].address.toLowerCase() === nftInfo.currency
  );
  currency = tokens[nftInfo.chainId][currency];
  const price = useTokenPrice(currency?.address, currency?.chainId);

  const isEnded = Date.now() > nftInfo.endTimestamp * 1000;

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
    <div>
      {nftInfo && (
        <ListingModal
          open={listingOpen}
          setOpen={setListingOpen}
          nftInfo={nftInfo}
          type={listingType}
        />
      )}
      {nftInfo && bidInfo && (
        <PlaceBidModal
          open={placeBidOpen}
          setOpen={setPlaceBidOpen}
          nftInfo={nftInfo}
          bidInfo={bidInfo}
        />
      )}
      {nftInfo && currency && (
        <BuyModal open={buyOpen} setOpen={setBuyOpen} nftInfo={nftInfo} />
      )}
      {nftInfo && (
        <CancelListingModal
          open={offShelfOpen}
          setOpen={setOffShelfOpen}
          nftInfo={nftInfo}
        />
      )}
      {currency ? (
        <div className="flex justify-between mt-2 sm:flex-row flex-col">
          <div>
            <div className="text-[#C4C4C4]">Price</div>
            <div className="flex items-center">
              <img
                src={currency.logo}
                alt={""}
                className="w-6 h-6 rounded-full"
              />
              <div className="text-[28px] font-semibold ml-2">
                {(nftInfo.floorPrice / Math.pow(10, currency.decimals)).toFixed(
                  4
                )}{" "}
                {currency.symbol}
              </div>
              <div className="text-[#C4C4C4] ml-2">
                ≈ ${" "}
                {(
                  (nftInfo.floorPrice * price) /
                  Math.pow(10, currency.decimals)
                ).toFixed(2)}
              </div>
            </div>
            <div className="text-[#C4C4C4]">
              Minimum Buy ={" "}
              {Number(
                formatUnits(nftInfo.minimumBidAmount, currency.decimals)
              ).toFixed(2)}{" "}
              {currency.symbol}
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
        nftInfo?.owner?.wallet?.toLowerCase() === account.toLowerCase() ? (
          <Button
            type={"secondary"}
            className="mt-8 w-full"
            onClick={() => {
              setListingOpen(true);
              setListingType("listing");
            }}
            disabled={pending}
            pending={pending}
          >
            {t("actions.List for sale")}
          </Button>
        ) : nftInfo?.listingCreator?.toLowerCase() === account.toLowerCase() ? (
          nftInfo.winningBid ? (
            <>
              {!nftInfo.paidOutBidAmount ? (
                <Button
                  type={"secondary"}
                  className="mt-8 w-full"
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
            </>
          ) : (
            <Button
              type={"primary"}
              border={"1px"}
              disabled={pending}
              itemClassName="p-3 w-[calc(100%-2px)]"
              className="mt-3 w-full"
              onClick={() => setOffShelfOpen(true)}
            >
              {t("actions.Remove from auction")}
            </Button>
          )
        ) : nftInfo?.winningBid?.bidder === account.toLowerCase() &&
          !nftInfo?.paidOutAuctionTokens ? (
          <Button
            type={"secondary"}
            className="mt-4 w-full"
            onClick={() => {
              onCollectAuctionTokens();
            }}
            disabled={pending}
            pending={pending}
          >
            {t("actions.Collect Auction Tokens")}
          </Button>
        ) : !isEnded ? (
          <>
            <Button
              type={"secondary"}
              className="mt-8 w-full"
              onClick={() => setBuyOpen(true)}
              disabled={pending}
              pending={pending}
            >
              {t("actions.Buy now")}
            </Button>
            <Button
              type={"primary"}
              border={"1px"}
              itemClassName="p-3 w-[calc(100%-2px)]"
              className="mt-3 w-full"
              onClick={() => setPlaceBidOpen(true)}
              disabled={pending}
            >
              {t("actions.Place a bid")}
            </Button>
          </>
        ) : (
          ""
        )
      ) : (
        ""
      )}

      <BidHistory bids={bidInfo} currency={currency} />
    </div>
  );
}
