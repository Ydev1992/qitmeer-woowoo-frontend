/* eslint-disable @typescript-eslint/no-explicit-any */

import { XMarkSVG } from "assets/svgs";
import Button from "components/Button";
import { tokens } from "config/tokens";
import { handleWalletError, shortenString } from "../../utils/index";
import StyledImage from "components/StyledImage";
import { Modal } from "./Modal";
import { useCallback, useContext, useState } from "react";
import { getEllipsis } from "utils/functions";
import { useUserETHBalance } from "state/hooks";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import StyledInput from "components/StyledInput";
import { ProjectContext } from "contexts/ProjectContext";
import {
  getCollectionContract,
  getErc20TokenContract,
  getMarketplaceContract,
} from "utils/contracts";
import { useAccount, useSigner } from "wagmi";
import { useWeb3React } from "contexts/wagmi";
import { GAS_MULTIPLE } from "config/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserFetchData } from "hooks/useUserData";
import { useMarketFetchData } from "hooks/useMarketData";
import Notification from "components/Notification";
import { useDispatch } from "react-redux";
import { fetchNFTInfoAsync } from "state/marketplace";
import { useTokenBalance } from "hooks/useTokenBalance";
import { MARKETPLACE_ADDR } from "config/contracts";
import { ethers } from "ethers";
import { useTokenAllowance } from "hooks/useAllowance";
import { useTranslation } from "react-i18next";

const PlaceBidModal = ({
  open,
  setOpen,
  nftInfo,
  bidInfo,
}: {
  open: boolean;
  setOpen: any;
  nftInfo: any;
  bidInfo: any;
}) => {
  let currency: any = Object.keys(tokens[nftInfo.chainId]).find(
    (key) =>
      tokens[nftInfo.chainId][key].address.toLowerCase() === nftInfo.currency
  );
  currency = tokens[nftInfo.chainId][currency];

  const { chainId }: any = useWeb3React();
  const { address: account } = useAccount();

  const { balance } = useTokenBalance(
    account as string,
    currency.address,
    chainId
  );

  const { pending, setPending }: any = useContext(ProjectContext);

  const [amount, setAmount] = useState("");
  let bestBid = nftInfo.minimumBidAmount;
  if (bidInfo.length) {
    const temp = [...bidInfo].sort(
      (a: any, b: any) => Number(b.bidAmount) - Number(a.bidAmount)
    );
    bestBid = temp[0].bidAmount;
  }

  bestBid = Number(formatUnits(bestBid, currency.decimals));

  const prices = [
    {
      name: "Balance",
      amount: Number(formatUnits(balance, currency.decimals)),
    },
    {
      name: "Price",
      amount: Number(formatUnits(nftInfo.floorPrice, currency.decimals)),
    },
    { name: "Best offer", amount: bestBid },
  ];

  const { data: signer } = useSigner();

  const navigate = useNavigate();
  const { fetchInfos: fetchUserInfos } = useUserFetchData();
  const { fetchInfos: fetchMarketInfos } = useMarketFetchData();
  const dispatch: any = useDispatch();

  const [confirmClicked, setConfirmClicked] = useState(false);

  const showError = useCallback((errorMsg: string) => {
    if (errorMsg) toast(<Notification type={"fail"} msg={errorMsg} />);
  }, []);
  const isNative =
    currency.address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  const { allowance, fetchAllowance } = useTokenAllowance(
    currency.address,
    MARKETPLACE_ADDR[813]
  );

  const isAllowed =
    isNative || BigInt(allowance.toString()) >= BigInt(nftInfo.floorPrice);

  async function onApprove() {
    setPending(true);
    try {
      const tokenContract = getErc20TokenContract(
        currency.address,
        signer,
        chainId
      );
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

  async function onPlaceBid() {
    setConfirmClicked(true);
    try {
      if (!amount || !account) return;
      setPending(true);
      const nftContract = getMarketplaceContract(signer, chainId);
      const _amount = parseUnits(amount, currency.decimals);
      const estimateGas: any = await nftContract.estimateGas.bidInAuction(
        nftInfo.auctionId,
        _amount,
        {
          value: isNative
            ? BigInt(_amount.toString()) > BigInt(nftInfo.buyoutBidAmount)
              ? nftInfo.buyoutBidAmount
              : _amount
            : 0,
        }
      );

      console.log(estimateGas);

      const tx = {
        gasLimit: Math.ceil(estimateGas * GAS_MULTIPLE).toString(),
        value: isNative
          ? BigInt(_amount.toString()) > BigInt(nftInfo.buyoutBidAmount)
            ? nftInfo.buyoutBidAmount
            : _amount
          : 0,
      };
      const listingTx = await nftContract.bidInAuction(
        nftInfo.auctionId,
        _amount,
        tx
      );
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
      setOpen(false);
      fetchUserInfos(account, chainId);
      fetchMarketInfos(chainId);
      dispatch(fetchNFTInfoAsync(nftInfo.address, nftInfo.tokenId, chainId));
      navigate(`/nft/813/${nftInfo.address}/${nftInfo.tokenId}`);
    } catch (e) {
      console.log(e);
      handleWalletError(e, showError, currency.symbol);
    }
    setPending(false);
  }

  const { t } = useTranslation();

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="relative w-[calc(100vw-24px)] max-w-[653px] rounded-[12px] bg-black sm:p-6 p-[24px_12px] shadow-[0px_0px_46px_0px_#FFFFFF33] border-[2px] border-[#656565]  relative">
        <div className="text-2xl font-medium tracking-normal">
          {t("actions.Place a bid")}
        </div>

        <div className="flex mt-5 sm:flex-row flex-col">
          <div className="w-[240px] h-[240px]">
            <StyledImage src={nftInfo.image} className="rounded-lg" />
          </div>
          <div className="flex-1 sm:ml-4 ml-0 sm:w-fit w-full sm:mt-0 mt-6 flex flex-col justify-between">
            <div>
              <div className="text-xl">{shortenString(nftInfo.name, 20)}</div>
              <div className="text-xl mt-2">
                {amount ? amount : "--"} {currency.symbol}
              </div>
              <div className="flex justify-between mt-4 leading-none">
                <div className="text-[#C4C4C4]">{t("nft.Created by")}</div>
                <div className={`font-semibold`}>
                  {nftInfo?.creator?.nickname ??
                    getEllipsis(nftInfo?.creator?.wallet)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5">
          {prices.map((price, i) => (
            <div key={i} className="flex justify-between items-center my-1">
              <div className="text-[#C4C4C4]">{price.name}</div>
              <div className="text-xl">
                {price.amount.toFixed(2)} {currency.symbol}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 mb-4">
          <StyledInput
            type={"number"}
            value={amount}
            setValue={setAmount}
            suffix={currency.symbol}
            decimals={6}
            isValid={
              (!confirmClicked || amount) &&
              Number(amount) <=
                Number(balance) / Math.pow(10, currency.decimals)
            }
            requireText={
              Number(amount) > Number(balance) / Math.pow(10, currency.decimals)
                ? `requireText.You don't have enough ${currency.symbol}`
                : "requireText.Please enter a valid amount."
            }
          />
        </div>
        {isAllowed ? (
          <Button
            type={"secondary"}
            className="w-full font-semibold text-xl"
            onClick={() => {
              onPlaceBid();
            }}
            disabled={pending}
            pending={pending}
          >
            {t("actions.Place a bid")}
          </Button>
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
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6"
        >
          <span className="sr-only">Close</span>
          {XMarkSVG}
        </button>
      </div>
    </Modal>
  );
};

export default PlaceBidModal;
