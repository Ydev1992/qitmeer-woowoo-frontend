/* eslint-disable @typescript-eslint/no-explicit-any */

import DatePicker from "react-datepicker";
import { InfoSVG, XMarkSVG } from "assets/svgs";
import Button from "components/Button";
import Dropdown from "components/Dropdown";
import StyledImage from "components/StyledImage";
import StyledInput from "components/StyledInput";
import { GAS_MULTIPLE } from "config/constants";
import { MARKETPLACE_ADDR } from "config/contracts";
import { tokens } from "config/tokens";
import { ProjectContext } from "contexts/ProjectContext";
import { useWeb3React } from "contexts/wagmi";
import { parseUnits } from "ethers/lib/utils.js";
import { useNFTAllowance } from "hooks/useAllowance";
import { forwardRef, useCallback, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { handleWalletError } from "utils";
import { getCollectionContract, getMarketplaceContract } from "utils/contracts";
import { useAccount, useSigner } from "wagmi";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";
import { useUserFetchData } from "hooks/useUserData";
import { useMarketFetchData } from "hooks/useMarketData";
import Notification from "components/Notification";
import { fetchNFTInfoAsync } from "state/marketplace";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";

const ListingModal = ({
  open,
  setOpen,
  nftInfo,
  type,
}: {
  open: boolean;
  setOpen: any;
  nftInfo: any;
  type?: any;
}) => {
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(0);
  const [minAmount, setMinAmount] = useState("");
  const [timeBuffer, setTimeBuffer] = useState("");
  const [bidBuffer, setBidBuffer] = useState("");
  const [confirmClicked, setConfirmClicked] = useState(false);

  const { address: account } = useAccount();
  const { data: signer } = useSigner();
  const { chainId }: any = useWeb3React();
  const { pending, setPending }: any = useContext(ProjectContext);
  const { allowance, fetchAllowance } = useNFTAllowance(
    nftInfo.address,
    MARKETPLACE_ADDR[chainId]
  );
  const navigate = useNavigate();
  const { fetchInfos: fetchUserInfos } = useUserFetchData();
  const { fetchInfos: fetchMarketInfos } = useMarketFetchData();
  const dispatch: any = useDispatch();
  const { t } = useTranslation();

  const currencies = [tokens[813].meer, tokens[813].usdt, tokens[813].dim];
  const SaleTypes = [t("listing.Fixed price"), t("listing.Auction")];
  const [saleType, setSaleType] = useState(0);

  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000 * 3));

  const showError = useCallback((errorMsg: string) => {
    if (errorMsg) toast(<Notification type={"fail"} msg={errorMsg} />);
  }, []);

  async function onApprove() {
    setPending(true);
    try {
      const nftContract = getCollectionContract(
        nftInfo.address,
        signer,
        chainId
      );
      const tx = await nftContract.setApprovalForAll(
        MARKETPLACE_ADDR[chainId],
        true
      );
      toast(
        <Notification
          type={"loading"}
          msg={t("notification.Transaction submitted")}
          txhash={tx.hash}
        />
      );
      await tx.wait();
      fetchAllowance();
      toast(
        <Notification
          type={"success"}
          msg={t("notification.NFT approved")}
          txhash={tx.hash}
        />
      );
    } catch (e) {
      handleWalletError(e, showError);
      console.log(e);
    }
    setPending(false);
  }

  async function onAuctionList() {
    try {
      setConfirmClicked(true);
      if (
        !amount ||
        !endDate ||
        !account ||
        !timeBuffer ||
        !minAmount ||
        !bidBuffer
      )
        return;
      setPending(true);
      console.log(nftInfo);
      const nftContract = getMarketplaceContract(signer, chainId);
      const params = [
        nftInfo.address,
        nftInfo.tokenId,
        1,
        currencies[selectedCurrency].address,
        parseUnits(minAmount, currencies[selectedCurrency].decimals),
        parseUnits(amount, currencies[selectedCurrency].decimals),
        timeBuffer,
        bidBuffer,
        Math.floor(Date.now() / 1000),
        Math.floor(endDate.getTime() / 1000),
      ];
      const estimateGas: any = await nftContract.estimateGas.createAuction(
        params
      );

      const tx = {
        gasLimit: Math.ceil(estimateGas * GAS_MULTIPLE).toString(),
      };
      const listingTx = await nftContract.createAuction(params, tx);
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
          msg={t("notification.NFT listed")}
          txhash={listingTx.hash}
        />
      );
      setOpen(false);
      fetchUserInfos(account, chainId);
      fetchMarketInfos(chainId);
      dispatch(fetchNFTInfoAsync(nftInfo.address, nftInfo.tokenId, chainId));
      navigate(`/nft/813/${nftInfo.address}/${nftInfo.tokenId}`);
    } catch (e) {
      handleWalletError(e, showError);
      console.log(e);
    }
    setPending(false);
  }

  async function onList() {
    try {
      setConfirmClicked(true);
      if (!amount || !endDate || !account) return;
      setPending(true);
      console.log(nftInfo);
      const nftContract = getMarketplaceContract(signer, chainId);
      const params = [
        nftInfo.address,
        nftInfo.tokenId,
        1,
        [currencies[selectedCurrency].address],
        [parseUnits(amount, currencies[selectedCurrency].decimals)],
        Math.floor(Date.now() / 1000),
        Math.floor(endDate.getTime() / 1000),
        false,
      ];
      const estimateGas: any = await nftContract.estimateGas.createListing(
        params
      );

      console.log(estimateGas);

      const tx = {
        gasLimit: Math.ceil(estimateGas * GAS_MULTIPLE).toString(),
      };
      const listingTx = await nftContract.createListing(params, tx);
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
          msg={t("notification.NFT listed")}
          txhash={listingTx.hash}
        />
      );
      setOpen(false);
      fetchUserInfos(account, chainId);
      fetchMarketInfos(chainId);
      dispatch(fetchNFTInfoAsync(nftInfo.address, nftInfo.tokenId, chainId));
      navigate(`/nft/813/${nftInfo.address}/${nftInfo.tokenId}`);
    } catch (e) {
      handleWalletError(e, showError);
      console.log(e);
    }
    setPending(false);
  }

  async function onUpdate() {
    try {
      setConfirmClicked(true);
      if (!amount || !endDate || !account) return;
      setPending(true);
      const nftContract = getMarketplaceContract(signer, chainId);
      const estimateGas: any = await nftContract.estimateGas.updateListing(
        nftInfo.id,
        [
          nftInfo.address,
          nftInfo.tokenId,
          1,
          [currencies[selectedCurrency].address],
          [parseUnits(amount, currencies[selectedCurrency].decimals)],
          nftInfo.startTimestamp,
          Math.floor(endDate.getTime() / 1000),
          false,
        ]
      );

      console.log(estimateGas);

      const tx = {
        gasLimit: Math.ceil(estimateGas * GAS_MULTIPLE).toString(),
      };
      const listingTx = await nftContract.updateListing(nftInfo.id, [
        nftInfo.address,
        nftInfo.tokenId,
        1,
        [currencies[selectedCurrency].address],
        [parseUnits(amount, currencies[selectedCurrency].decimals)],
        nftInfo.startTimestamp,
        Math.floor(endDate.getTime() / 1000),
        false,
        tx,
      ]);
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
          msg={t("notification.NFT listed")}
          txhash={listingTx.hash}
        />
      );
      setOpen(false);
      fetchUserInfos(account, chainId);
      fetchMarketInfos(chainId);
      dispatch(fetchNFTInfoAsync(nftInfo.address, nftInfo.tokenId, chainId));
    } catch (e) {
      handleWalletError(e, showError);
      console.log(e);
    }
    setPending(false);
  }

  const DurationInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <div className="max-w-[210px]" onClick={onClick}>
      <StyledInput
        className="!p-[8px_12px]"
        type={"number"}
        suffix={t("listing.Days")}
        value={value}
        placeholder="0"
        isValid={!confirmClicked || value}
      />
    </div>
  ));

  const tooltips = [
    {
      id: "listingprice",
      text: "tooltip.The total bid amount for which the bidder can directly purchase the auctioned items and close the auction as a result.",
    },
    {
      id: "minamount",
      text: "tooltip.The minimum bid amount for the auction.",
    },
    {
      id: "timebuffer",
      text: "tooltip.This is a buffer e.g. x seconds. If a new winning bid is made less than x seconds before expirationTimestamp, the expirationTimestamp is increased by x seconds.",
    },
    {
      id: "bidbuffer",
      text: "tooltip.This is a buffer in basis points e.g. x%. To be considered as a new winning bid, a bid must be at least x% greater than the current winning bid.",
    },
  ];
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="relative w-[calc(100vw-24px)] max-w-[653px] rounded-[12px] bg-black sm:p-6 p-[24px_12px] shadow-[0px_0px_46px_0px_#FFFFFF33] border-[2px] border-[#656565] tracking-normal max-h-screen xs:overflow-y-visible overflow-y-scroll">
        <div className="text-2xl font-medium tracking-normal">{type}</div>
        <div className="flex mt-5 sm:flex-row flex-col sm:items-start items-center w-full ">
          <div className="w-[240px] h-[240px]">
            <StyledImage src={nftInfo.image} className="rounded-lg" />
          </div>
          <div className="sm:flex-1 flex-none w-full sm:ml-4 ml-0 sm:mt-0 mt-6 text-ellipsis whitespace-nowrap flex flex-col overflow-hidden pb-5">
            <div className="text-xl overflow-hidden text-ellipsis whitespace-nowrap font-bold">
              {nftInfo.name}
            </div>
            {type === "listing" ? (
              <div className="flex justify-between items-center my-2">
                <div className="text-grey mr-8">
                  {t("listing.Sales method")}
                </div>
                <Dropdown
                  value={saleType}
                  setValue={setSaleType}
                  values={SaleTypes.map((type) => type)}
                  className="z-20 !text-sm !w-[125px] font-semibold"
                  bodyClassName="!p-2"
                  itemClassName="!p-2"
                  iconClassName="[&>svg]:w-2.5 [&>svg]:h-2.5"
                />
              </div>
            ) : (
              ""
            )}
            {saleType === 1 ? (
              <div className="flex justify-end mb-2">
                <div className="gradient-text w-fit font-bold">
                  {t("listing.SELL TO HIGHEST BIDDER")}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="flex justify-between my-2 xs:flex-row flex-col">
              <div className="text-grey mr-8 mt-3.5 relative">
                {t("listing.Listing price")}
                {saleType === 1 ? (
                  <div
                    className="[&>svg]:h-3.5 [&>svg]:w-3.5 absolute top-1 -right-[22px]"
                    id={"listingprice"}
                  >
                    {InfoSVG}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex-1 xs:max-w-[210px] max-w-full xs:mt-0 mt-2">
                <StyledInput
                  type={"number"}
                  value={amount}
                  setValue={setAmount}
                  isValid={!confirmClicked || amount}
                  decimals={6}
                  className="z-10 !p-[8px_12px]"
                  suffix={
                    <Dropdown
                      value={selectedCurrency}
                      setValue={setSelectedCurrency}
                      values={currencies.map((data) => (
                        <div className="text-white">{data.symbol}</div>
                      ))}
                      bodyClassName="!p-[4px_4px_4px_8px]"
                      itemClassName="!p-[4px_8px] !w-20 !bg-black hover:!bg-[#383838] !rounded"
                      className="!w-[80px] !text-base"
                      iconClassName="[&>svg]:w-3 [&>svg]:h-3"
                    />
                  }
                />
              </div>
            </div>

            {saleType === 1 ? (
              <div className="flex flex-col">
                <div className="flex justify-between my-2 xs:flex-row flex-col">
                  <div className="text-grey mr-8 mt-3.5 relative">
                    {t("listing.Min amount")}
                    <div
                      className="[&>svg]:h-3.5 [&>svg]:w-3.5 absolute top-1 -right-[22px]"
                      id={"minamount"}
                    >
                      {InfoSVG}
                    </div>
                  </div>
                  <div className="flex-1 xs:max-w-[210px] max-w-full xs:mt-0 mt-2">
                    <StyledInput
                      className="!p-[8px_12px]"
                      type={"number"}
                      value={minAmount}
                      setValue={setMinAmount}
                      placeholder="0"
                      isValid={!confirmClicked || minAmount}
                    />
                  </div>
                </div>

                <div className="flex justify-between my-2 xs:flex-row flex-col">
                  <div className="text-grey mr-8 mt-3.5 relative">
                    {t("listing.Time buffer")}
                    <div
                      className="[&>svg]:h-3.5 [&>svg]:w-3.5 absolute top-1 -right-[22px]"
                      id={"timebuffer"}
                    >
                      {InfoSVG}
                    </div>
                  </div>
                  <div className="flex-1 xs:max-w-[210px] max-w-full xs:mt-0 mt-2">
                    <StyledInput
                      className="!p-[8px_12px]"
                      type={"number"}
                      value={timeBuffer}
                      setValue={setTimeBuffer}
                      placeholder="0"
                      isValid={!confirmClicked || timeBuffer}
                    />
                  </div>
                </div>

                <div className="flex justify-between my-2 xs:flex-row flex-col">
                  <div className="text-grey mr-8 mt-3.5 relative">
                    {t("listing.Bid buffer")}
                    <div
                      className="[&>svg]:h-3.5 [&>svg]:w-3.5 absolute top-1 -right-[22px]"
                      id={"bidbuffer"}
                    >
                      {InfoSVG}
                    </div>
                  </div>
                  <div className="flex-1 max-w-[210px] xs:max-w-[210px] max-w-full xs:mt-0 mt-2">
                    <StyledInput
                      className="!p-[8px_12px]"
                      type={"number"}
                      value={bidBuffer}
                      setValue={setBidBuffer}
                      placeholder="0"
                      isValid={!confirmClicked || bidBuffer}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="flex justify-between my-2 xs:flex-row flex-col">
              <div className="text-grey mr-8 mt-3.5 ">
                {t("listing.Duration")}
              </div>
              <div className="xs:mt-0 mt-2">
                <DatePicker
                  selected={endDate}
                  onChange={(date: any) => setEndDate(date)}
                  minDate={new Date()}
                  customInput={<DurationInput />}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-[#C4C4C4] sm:text-base text-sm">
          {t("listing.List NFT and sell NFT in the trading market")}
        </div>
        {allowance ? (
          <Button
            type={"secondary"}
            className="w-full mt-6 font-semibold text-xl"
            onClick={() =>
              type === "listing"
                ? saleType === 0
                  ? onList()
                  : onAuctionList()
                : onUpdate()
            }
            disabled={pending}
            pending={pending}
          >
            {type === "listing"
              ? t("actions.List for sale")
              : t("actions.Update listing")}
          </Button>
        ) : (
          <Button
            type={"secondary"}
            className="w-full mt-6 font-semibold text-xl"
            onClick={() => onApprove()}
            disabled={pending}
            pending={pending}
          >
            {t("actions.Approve NFT")}
          </Button>
        )}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6"
        >
          <span className="sr-only">{t("actions.Close")}</span>
          {XMarkSVG}
        </button>
      </div>
      {saleType === 1
        ? tooltips.map((tooltip, i) => (
            <ReactTooltip
              anchorId={tooltip.id}
              place="top"
              content={t(tooltip.text)}
            />
          ))
        : ""}
    </Modal>
  );
};

export default ListingModal;
