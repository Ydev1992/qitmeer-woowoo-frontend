/* eslint-disable @typescript-eslint/no-explicit-any */

import { XMarkSVG } from "assets/svgs";
import Button from "components/Button";
import { MARKETPLACE_ADDR } from "config/contracts";
import { tokens } from "config/tokens";
import { ProjectContext } from "contexts/ProjectContext";
import { useWeb3React } from "contexts/wagmi";
import { ethers } from "ethers";
import { useTokenAllowance } from "hooks/useAllowance";
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { handleWalletError } from "utils";
import { getErc20TokenContract, getMarketplaceContract } from "utils/contracts";
import { useAccount, useSigner } from "wagmi";
import { shortenString } from "./../../utils/index";
import StyledImage from "components/StyledImage";
import { GAS_MULTIPLE } from "config/constants";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";
import { useUserFetchData } from "hooks/useUserData";
import { useMarketFetchData } from "hooks/useMarketData";
import { getEllipsis } from "utils/functions";
import Notification from "components/Notification";
import { fetchNFTInfoAsync } from "state/marketplace";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const BuyModal = ({ open, setOpen, nftInfo }: { open: boolean; setOpen: any; nftInfo: any }) => {
  const { t } = useTranslation();

  let currency: any = Object.keys(tokens[nftInfo.chainId]).find(
    (key) => tokens[nftInfo.chainId][key].address.toLowerCase() === nftInfo.currency
  );
  currency = tokens[nftInfo.chainId][currency];
  const infos = {
    chainId: 1,
    currency,
    data: [
      {
        name: t("listing.Listing price"),
        detail: `${nftInfo.floorPrice / Math.pow(10, currency.decimals)} ${currency.symbol}`,
      },
      {
        name: t("nft.Created by"),
        detail: nftInfo?.creator?.nickname ?? getEllipsis(nftInfo?.creator?.wallet),
      },
    ],
  };

  const { allowance, fetchAllowance } = useTokenAllowance(currency.address, MARKETPLACE_ADDR[813]);
  const { pending, setPending }: any = useContext(ProjectContext);
  const { data: signer } = useSigner();
  const { chainId }: any = useWeb3React();
  const { address: account } = useAccount();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { fetchInfos: fetchUserInfos } = useUserFetchData();
  const { fetchInfos: fetchMarketInfos } = useMarketFetchData();

  const isNative = currency.address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  const isAllowed = isNative || BigInt(allowance.toString()) >= BigInt(nftInfo.floorPrice);

  const showError = useCallback((errorMsg: string) => {
    if (errorMsg) toast(<Notification type={"fail"} msg={errorMsg} />);
  }, []);

  async function onApprove() {
    setPending(true);
    try {
      const tokenContract = getErc20TokenContract(currency.address, signer, chainId);
      const estimateGas: any = await tokenContract.estimateGas.approve(
        MARKETPLACE_ADDR[chainId],
        ethers.constants.MaxUint256
      );

      const tx = {
        gasLimit: Math.ceil(estimateGas * GAS_MULTIPLE).toString(),
      };

      const approveTx = await tokenContract.approve(
        MARKETPLACE_ADDR[chainId],
        ethers.constants.MaxUint256,
        tx
      );
      toast(
        <Notification
          type={"loading"}
          msg={t("notification.Transaction submitted")}
          txhash={approveTx.hash}
        />
      );
      await approveTx.wait();
      fetchAllowance();
      toast(
        <Notification
          type={"success"}
          msg={t(`notification.${currency.symbol} approved successfully`)}
          txhash={approveTx.hash}
        />
      );
    } catch (e) {
      handleWalletError(e, showError, currency.symbol);
      console.log(e);
    }
    setPending(false);
  }
  async function onListBuy() {
    if (!account) return;
    setPending(true);
    try {
      const nftContract = getMarketplaceContract(signer, chainId);
      const estimateGas: any = await nftContract.estimateGas.buyFromListing(
        nftInfo.id,
        account,
        1,
        currency.address,
        nftInfo.floorPrice,
        { value: isNative ? nftInfo.floorPrice : 0 }
      );

      console.log(estimateGas);
      const tx = {
        gasLimit: Math.ceil(estimateGas * GAS_MULTIPLE).toString(),
        value: isNative ? nftInfo.floorPrice : 0,
      };
      const buyTx = await nftContract.buyFromListing(
        nftInfo.id,
        account,
        1,
        currency.address,
        nftInfo.floorPrice,
        tx
      );
      toast(
        <Notification
          type={"loading"}
          msg={t("notification.Transaction submitted")}
          txhash={buyTx.hash}
        />
      );
      await buyTx.wait();
      fetchUserInfos(account, chainId);
      fetchMarketInfos(chainId);
      dispatch(fetchNFTInfoAsync(nftInfo.address, nftInfo.tokenId, chainId));
      toast(
        <Notification
          type={"success"}
          msg={t("notification.NFT bought successfully")}
          txhash={buyTx.hash}
        />
      );
      setOpen(false);
      navigate(`/nft/813/${nftInfo.address}/${nftInfo.tokenId}`);
    } catch (e) {
      handleWalletError(e, showError, currency.symbol);
      console.log(e);
    }
    setPending(false);
  }

  async function onAuctionBuy() {
    if (!account) return;
    setPending(true);
    try {
      const nftContract = getMarketplaceContract(signer, chainId);
      const estimateGas: any = await nftContract.estimateGas.bidInAuction(
        nftInfo.id,
        nftInfo.floorPrice,
        { value: isNative ? nftInfo.floorPrice : 0 }
      );

      console.log(estimateGas);
      const tx = {
        gasLimit: Math.ceil(estimateGas * GAS_MULTIPLE).toString(),
        value: isNative ? nftInfo.floorPrice : 0,
      };
      const buyTx = await nftContract.bidInAuction(nftInfo.id, nftInfo.floorPrice, tx);
      toast(
        <Notification
          type={"loading"}
          msg={t("notification.Transaction submitted")}
          txhash={buyTx.hash}
        />
      );
      await buyTx.wait();
      fetchUserInfos(account, chainId);
      fetchMarketInfos(chainId);
      dispatch(fetchNFTInfoAsync(nftInfo.address, nftInfo.tokenId, chainId));
      toast(
        <Notification
          type={"success"}
          msg={t("notification.NFT bought successfully")}
          txhash={buyTx.hash}
        />
      );
      setOpen(false);
      navigate(`/nft/813/${nftInfo.address}/${nftInfo.tokenId}`);
    } catch (e) {
      handleWalletError(e, showError, currency.symbol);
      console.log(e);
    }
    setPending(false);
  }
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="relative w-[calc(100vw-24px)] max-w-[653px] rounded-[12px] bg-black sm:p-6 p-[24px_12px] shadow-[0px_0px_46px_0px_#FFFFFF33] border-[2px] border-[#656565]  relative">
        <div className="text-2xl font-medium tracking-normal">{t("modal.Confirm purchase")}</div>
        <div className="flex mt-5 sm:flex-row flex-col">
          <div className="w-[240px] h-[240px]">
            <StyledImage src={nftInfo.image} className="rounded-lg" />
          </div>
          <div className="flex-1 sm:ml-4 ml-0 sm:w-fit w-full sm:mt-0 mt-6 flex flex-col justify-between">
            <div>
              <div className="text-xl">{shortenString(nftInfo.name, 20)}</div>
              <div className="mt-2">
                {infos.data.map((data, i) => {
                  return (
                    <div key={i} className="flex justify-between mt-4 leading-none">
                      <div className="text-[#C4C4C4]">{data.name}</div>
                      <div className={`font-semibold ${i == 3 ? "text-xl" : ""}`}>
                        {data.detail}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {isAllowed ? (
          <div className="mt-6">
            <div>{t("modal.Are you sure you want to continue?")}</div>
            <div className="flex mt-6">
              <Button
                type={"primary"}
                border="1px"
                className="flex-1 font-semibold text-xl h-12"
                itemClassName="p-[6px_12px] w-[calc(100%-2px)] tracking-normal relative"
                disabled={pending}
                onClick={() => setOpen(false)}
              >
                {t("actions.Cancel")}
              </Button>
              <div className="mr-2" />
              <Button
                type={"secondary"}
                className="flex-1 font-semibold text-xl h-12"
                disabled={pending}
                onClick={() => (nftInfo.type === "listing" ? onListBuy() : onAuctionBuy())}
                pending={pending}
              >
                {t("actions.Buy now")}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            type={"secondary"}
            className="w-full mt-6 font-semibold text-xl h-12"
            onClick={() => onApprove()}
            disabled={pending}
            pending={pending}
          >
            {!pending ? "Approve" : "Approving"} {currency.symbol}
          </Button>
        )}
        <button onClick={() => setOpen(false)} className="absolute top-6 right-6">
          <span className="sr-only">{t("actions.Close")}</span>
          {XMarkSVG}
        </button>
      </div>
    </Modal>
  );
};

export default BuyModal;
