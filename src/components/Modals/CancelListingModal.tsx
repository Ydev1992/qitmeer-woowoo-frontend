/* eslint-disable @typescript-eslint/no-explicit-any */

import { XMarkSVG } from "assets/svgs";
import Button from "components/Button";
import { GAS_MULTIPLE } from "config/constants";
import { ProjectContext } from "contexts/ProjectContext";
import { useWeb3React } from "contexts/wagmi";
import { motion } from "framer-motion";
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { handleWalletError } from "utils";
import { getMarketplaceContract } from "utils/contracts";
import { useAccount, useSigner } from "wagmi";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";
import { useUserFetchData } from "hooks/useUserData";
import { useMarketFetchData } from "hooks/useMarketData";
import Notification from "components/Notification";
import { fetchNFTInfoAsync } from "state/marketplace";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const CancelListingModal = ({
  open,
  setOpen,
  nftInfo,
}: {
  open: boolean;
  setOpen: any;
  nftInfo: any;
}) => {
  const { pending, setPending }: any = useContext(ProjectContext);
  const { data: signer } = useSigner();
  const { chainId }: any = useWeb3React();
  const { address: account } = useAccount();
  const navigate = useNavigate();
  const { fetchInfos: fetchUserInfos } = useUserFetchData();
  const { fetchInfos: fetchMarketInfos } = useMarketFetchData();
  const dispatch: any = useDispatch();

  const { t } = useTranslation();

  const showError = useCallback((errorMsg: string) => {
    if (errorMsg) toast(<Notification type={"fail"} msg={errorMsg} />);
  }, []);

  async function onCancel() {
    if (!account) return;
    setPending(true);
    try {
      const nftContract = getMarketplaceContract(signer, chainId);
      const estimateGas: any = await (nftInfo.type === "auction"
        ? nftContract.estimateGas.cancelAuction(nftInfo.id)
        : nftContract.estimateGas.cancelListing(nftInfo.id));
      console.log(estimateGas);
      const tx = {
        gasLimit: Math.ceil(estimateGas * GAS_MULTIPLE).toString(),
      };
      const cancelTx = await (nftInfo.type === "auction"
        ? nftContract.cancelAuction(nftInfo.id, tx)
        : nftContract.cancelListing(nftInfo.id, tx));
      toast(
        <Notification
          type={"loading"}
          msg={t("notification.Transaction submitted")}
          txhash={cancelTx.hash}
        />
      );
      await cancelTx.wait();
      fetchUserInfos(account, chainId);
      fetchMarketInfos(chainId);
      dispatch(fetchNFTInfoAsync(nftInfo.address, nftInfo.tokenId, chainId));
      toast(
        <Notification
          type={"success"}
          msg={t("notification.Listing cancelled")}
          txhash={cancelTx.hash}
        />
      );
      setOpen(false);
      navigate(`/nft/813/${nftInfo.address}/${nftInfo.tokenId}`);
    } catch (e) {
      handleWalletError(e, showError);
      console.log(e);
    }
    setPending(false);
  }
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              ease: "easeOut",
              duration: 0.15,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.75,
            transition: {
              ease: "easeIn",
              duration: 0.15,
            },
          }}
          transition={{ duration: 0.25 }}
        >
          <div className="relative w-[calc(100vw-24px)] max-w-[400px] rounded-[12px] bg-black sm:p-6 p-[24px_12px] shadow-[0px_0px_46px_0px_#FFFFFF33] border-[2px] border-[#656565]  relative">
            <div className="text-2xl font-medium tracking-normal border-b border-[#2D2D2D] pb-4">
              {t("modal.Tip")}
            </div>
            <div className="flex mt-5 sm:flex-row flex-col sm:items-start items-center">
              <div>
                {t(
                  "modal.Do you want to remove this NFT？After delisting, it will no longer be displayed in the trading market"
                )}
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <Button
                type={"primary"}
                className="flex-1 mt-6 text-xl"
                itemClassName="p-[6px_12px] w-[calc(100%-4px)] tracking-normal relative"
                border="1px"
                onClick={() => setOpen(false)}
                disabled={pending}
              >
                {t("actions.Cancel")}
              </Button>
              <div className="mr-2" />
              <Button
                type={"secondary"}
                className="flex-1 mt-6 text-xl"
                onClick={() => onCancel()}
                disabled={pending}
                pending={pending}
              >
                {t("actions.Confirm")}
              </Button>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6"
            >
              <span className="sr-only">Close</span>
              {XMarkSVG}
            </button>
          </div>
        </motion.div>
      </div>
    </Modal>
  );
};

export default CancelListingModal;
