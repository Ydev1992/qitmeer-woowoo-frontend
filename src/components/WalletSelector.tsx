import { useContext, useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { WalletConfig } from "config/constants/types";
import { wallets } from "config/constants/wallets";
import { AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { LoadingSVG, XMarkSVG } from "assets/svgs";
import { useTranslation } from "react-i18next";
import { ProjectContext } from "contexts/ProjectContext";

interface WalletSelectorProps {
  open: boolean;
  setOpen: any;
}

function WalletSelector({ open, setOpen }: WalletSelectorProps) {
  const { connectors, isLoading, error, pendingConnector } = useConnect();

  const { isConnected } = useAccount();
  const { t } = useTranslation();
  const { onConnect } = useContext(ProjectContext);

  const [errorMsg, setErrorMsg] = useState("");

  const walletsToShow: WalletConfig[] = wallets.filter((w) => {
    return w.installed !== false || w.deepLink;
  });

  useEffect(() => {
    if (error) {
      setErrorMsg(error?.message ?? "");
    } else setErrorMsg("");
  }, [error]);

  useEffect(() => {
    if (isConnected) setOpen(false);
  }, [isConnected]);

  return (
    <AnimatePresence>
      <Dialog open={open} className="relative z-[1000]" onClose={() => setOpen(false)}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="relative w-full max-w-[400px] bg-black rounded-[12px] border-[2px] border-[#656565]">
              <div>
                <div className="p-6">
                  <h5 className="pb-6 text-lg font-bold text-left border-b border-[#2D2D2D] leading-[1.2]">
                    {t("wallet.Connect Wallet")}
                  </h5>
                  {errorMsg && (
                    <div
                      className="relative mt-4 -mb-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                      role="alert"
                    >
                      <strong className="">{errorMsg}</strong>
                      <span
                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                        onClick={() => setErrorMsg("")}
                      >
                        <svg
                          className="h-6 w-6 fill-current text-red-500"
                          role="button"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <title>Close</title>
                          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                      </span>
                    </div>
                  )}
                  <ul role="list" className="mt-[14px] ">
                    {walletsToShow.map((wallet) => (
                      <li key={wallet.id} className="py-2.5">
                        <button
                          disabled={
                            isLoading || !connectors.find((c) => c.id === wallet.connectorId)?.ready
                          }
                          onClick={() => {
                            const selectedConnector = connectors.find(
                              (c) => c.id === wallet.connectorId
                            );
                            onConnect(selectedConnector);
                          }}
                          className="flex w-full items-center bg-[#FFFFFF1A] rounded-[12px] p-4 text-white hover:bg-[#ffffff26]"
                        >
                          <img src={wallet.icon} alt="" />
                          <div className="ml-4 flex-col text-left">
                            <p className="font-bold">{wallet.title}</p>
                            <p className="text-xs text-[#C5C5C5]">{t(wallet.description)}</p>
                          </div>
                          <div className="ml-auto">
                            {isLoading && wallet.connectorId === pendingConnector?.id && (
                              <div role="status">{LoadingSVG}</div>
                            )}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => setOpen(false)} className="absolute top-6 right-6">
                  <span className="sr-only">Close</span>
                  {XMarkSVG}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </AnimatePresence>
  );
}

export default WalletSelector;
