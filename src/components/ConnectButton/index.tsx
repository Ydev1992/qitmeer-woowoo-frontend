import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import Button from "../Button";
import WalletSelector from "components/WalletSelector";
import { useAccount, useDisconnect, useNetwork, useSigner } from "wagmi";
import { WalletSVG } from "assets/svgs";
import { Link } from "react-router-dom";
import { useUserETHBalance, useUserInfo } from "state/hooks";
import StyledImage from "components/StyledImage";

import { useLocation } from "react-router-dom";

export default function ConnectButton({ fullWidth }: { fullWidth?: boolean }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const { address: _account } = useAccount();
  const { data: signer } = useSigner();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  const menus = [
    { text: t("menus.Personal data"), action: "", link: "personaldata" },
    { text: t("menus.My Collection"), action: "", link: "mycollection" },
    { text: t("menus.Create NFT"), action: "", link: "createnft" },
    // { text: "Set up", action: "" },
    { text: t("menus.Exit"), action: disconnect, link: "exit" },
  ];

  const account = signer ? _account : "";

  const menuRef: any = useRef();
  useEffect(() => {
    document.addEventListener("mouseup", function (event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    });
  }, []);

  const ethBalance = useUserETHBalance();
  const userInfo = useUserInfo();

  const location = useLocation();

  const handleConnectOKX = () => {
    if (typeof (window as any).okxwallet === "undefined") {
      alert("OKX is uninstalled!");
      return;
    }
    async function connectWallet() {
      let result = await (window as any).okxwallet.bitcoinSignet.connect();
    }
    connectWallet();
  };

  return (
    <>
      <WalletSelector open={walletOpen} setOpen={setWalletOpen} />
      {account ? (
        <Button
          type={"primary"}
          border="1px"
          className={`${fullWidth ? "w-full" : "w-[200px]"} z-10`}
          itemClassName="p-[6px_12px] w-[calc(100%-4px)] tracking-normal relative"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="flex justify-between items-center w-full overflow-hidden whitespace-nowrap text-ellipsis">
            <div className="flex items-center flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
              <div className="ml-0.5">{WalletSVG}</div>
              <div className="ml-1.5 overflow-hidden whitespace-nowrap text-ellipsis">{`${(
                ethBalance / Math.pow(10, 18)
              ).toFixed(2)} ${
                chain?.unsupported ? "ETH" : chain?.nativeCurrency.symbol
              }`}</div>
            </div>
            <div className="bg-[#858585] w-[1px] h-[27px] mx-1" />
            <div className="w-9 h-9 rounded-full overflow-hidden flex justify-center items-center">
              <StyledImage
                src={userInfo?.avatar ?? ""}
                alt={""}
                className="w-full"
                defaultImage="/images/personalcenter/personaldata/avatar.png"
              />
            </div>
          </div>
          <div
            className={`absolute top-16 right-0 ${
              fullWidth ? "w-full" : ""
            } rounded-lg border border-white p-[8px_24px] backdrop-blur bg-[#0000001A] ${
              open ? "flex" : "hidden"
            } flex-col items-start`}
            ref={menuRef}
          >
            {menus.map((data: any, i) => {
              return (
                <Link
                  key={i}
                  to={
                    i === 1
                      ? "/personalnfts/mycollection"
                      : i === 3
                      ? "#"
                      : `/${data.link}`
                  }
                  className="leading-[1.2] w-full text-left my-2 relative before:content-[''] before:absolute before:w-0 before:-bottom-2 before:h-[1px] before:bg-white before:transition-all hover:before:w-full before:duration-500"
                  onClick={() => data.action && data.action()}
                >
                  {data.text}
                </Link>
              );
            })}
          </div>
        </Button>
      ) : (
        <Button
          type={"primary"}
          border={"2px"}
          itemClassName="p-3 bg-[#FFFFFF1A] w-[calc(100%-4px)] tracking-normal"
          onClick={() => {
            if (location.pathname === "/") {
              setWalletOpen(true);
            } else {
              handleConnectOKX();
            }
          }}
          className={`${fullWidth ? "w-full" : ""}`}
        >
          {t("topbar.Connect Wallet")}
        </Button>
      )}
    </>
  );
}
