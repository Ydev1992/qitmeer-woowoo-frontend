import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import Button from "../Button";
import WalletSelector from "components/WalletSelector";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSigner,
} from "wagmi";
import { WalletSVG } from "assets/svgs";
import { Link } from "react-router-dom";
import { useUserETHBalance, useUserInfo } from "state/hooks";
import StyledImage from "components/StyledImage";

import { OKXConnector } from "@okwallet/wagmi-okx-connector";
import WalletConnect from "@walletconnect/client";

import { useLocation } from "react-router-dom";
import QRCodeModal from "@walletconnect/qrcode-modal";
import QRCode from "react-qr-code";

import Modal from "./Modal";

export default function ConnectButton({ fullWidth }: { fullWidth?: boolean }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const { address: _account, isConnected } = useAccount();
  const { data: signer } = useSigner();

  const myOKXConnector: Partial<any> = {
    connector: new OKXConnector(),
  };

  const { connect } = useConnect(myOKXConnector);
  const { disconnect } = useDisconnect();

  const [okxOpen, setOkxOpen] = useState<boolean>(false);

  const myDappURL = "https://localhost:5173/";
  const encodedDappUrl = encodeURIComponent(myDappURL);
  const deepLink = "okx://wallet/dapp/url?dappUrl=" + encodedDappUrl;
  const encodedUrl =
    "https://www.okx.com/download?deeplink=" + encodeURIComponent(deepLink);

  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod|ios/i.test(ua);
  const isAndroid = /android|XiaoMi|MiuiBrowser/i.test(ua);
  const isMobile = isIOS || isAndroid;
  const isOKApp = /OKApp/i.test(ua);

  if (isMobile && !isOKApp) {
    // const encodedUrl =
    //   "https://www.okx.com/download?deeplink=" +
    //   encodeURIComponent(
    //     "okx://wallet/dapp/url?dappUrl=" +
    //       encodeURIComponent(window.location.href)
    //   );
    // window.location.href = encodedUrl;
  } else if ((window as any).okxwallet) {
    // const accounts = await(window as any).okxwallet.request({
    //   method: "eth_requestAccounts",
    // });
  }

  const qrConnector = new WalletConnect({
    bridge: encodedUrl, // Required
  });

  if (!qrConnector.connected) {
    // Create a new session
    qrConnector.createSession();

    // // Display QR Code modal
    // QRCodeModal.open(qrConnector.uri, () => {
    //   console.log("QR Code Modal closed");
    // });
  }

  qrConnector.on("connect", (error, payload) => {
    if (error) {
      throw error;
    }

    // Close QR Code Modal
    QRCodeModal.close();

    // Get provided accounts and chainId
    const { accounts } = payload.params[0];
  });

  qrConnector.on("session_update", (error, payload) => {
    if (error) {
      throw error;
    }

    // Get updated accounts and chainId
    const { accounts } = payload.params[0];
  });

  qrConnector.on("disconnect", (error, payload) => {
    if (error) {
      throw error;
    }
  });

  const menus = [
    { text: t("menus.Personal data"), action: "", link: "personaldata" },
    { text: t("menus.My Collection"), action: "", link: "mycollection" },
    { text: t("menus.Create NFT"), action: "", link: "createnft" },
    // { text: "Set up", action: "" },
    { text: t("menus.Exit"), action: disconnect, link: "exit" },
  ];

  const menuRef: any = useRef();

  useEffect(() => {
    document.addEventListener("mouseup", function (event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    });

    if (isConnected) closeOkxModal();
  }, [isConnected]);

  const ethBalance = useUserETHBalance();
  const userInfo = useUserInfo();

  const location = useLocation();

  const openOkxModal = () => setOkxOpen(true);
  const closeOkxModal = () => setOkxOpen(false);

  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <>
      <WalletSelector open={walletOpen} setOpen={setWalletOpen} />
      {isConnected ? (
        <Button
          type={"primary"}
          border="1px"
          className={`${fullWidth ? "w-full" : "w-[200px]"} z-10`}
          itemClassName="p-[6px_12px] w-[calc(100%-4px)] tracking-normal relative"
          onClick={() => {
            disconnect();
            // setOpen(!open);
          }}
        >
          Disconnect
          {/* <div className="flex justify-between items-center w-full overflow-hidden whitespace-nowrap text-ellipsis">
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
          </div> */}
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
              openOkxModal();
            }
          }}
          className={`${fullWidth ? "w-full" : ""}`}
        >
          {t("topbar.Connect Wallet")}
        </Button>
      )}
      <Modal isOpen={okxOpen} onClose={closeOkxModal}>
        <div className="text-white text-[18px] flex justify-between">
          <h2 className="my-auto">Connect Wallet</h2>
          <button className="text-[30px]" onClick={closeOkxModal}>
            &times;
          </button>
        </div>
        <div className="flex mt-3 border-b-[#2D2D2D] border-b">
          <button
            className={`px-4 py-2 font-Mont text-[16px]  focus:outline-none ${
              activeTab === 1
                ? "active:text-white border-b-white border-b"
                : "text-[#A0A0A0]"
            }`}
            onClick={() => handleTabClick(1)}
          >
            OKX Wallet
          </button>
          <button
            className={`px-4 py-2 font-Mont text-[16px]  focus:outline-none ${
              activeTab === 2
                ? "active:text-white border-b-white border-b"
                : "text-[#A0A0A0]"
            }`}
            onClick={() => handleTabClick(2)}
          >
            Other
          </button>
        </div>
        <div className="mt-2">
          {activeTab === 1 && (
            <>
              <div className="flex px-[10px] h-[64px] rounded-xl bg-white bg-opacity-10 justify-between">
                <div className="my-auto flex justify-start">
                  <img
                    src="images/okx.png"
                    className=" w-[32px] h-[32px] "
                  ></img>
                  <p className="my-auto ml-1 text-[16px]">OKX</p>
                </div>
                <Button
                  type={"smallConnect"}
                  border={"2px"}
                  itemClassName="p-3 bg-transparent w-[calc(100%-4px)] tracking-normal"
                  onClick={() => {
                    connect();
                  }}
                >
                  {t("topbar.Connect Wallet")}
                </Button>
              </div>
              <div className="flex my-3 py-3 px-[10px] h-[154px] rounded-xl bg-white bg-opacity-10 justify-between">
                <div className="flex justify-start w-[226px]">
                  <img
                    src="images/okx.png"
                    className=" w-[32px] h-[32px] "
                  ></img>
                  <div className="ml-1">
                    <p className="text-[16px]">OKX app</p>
                    <p className="text-[12px] mt-3 text-[#C5C5C5]">
                      Scan QR code to connect your wallet
                    </p>
                    <p className="text-[12px] mt-5 text-[#C5C5C5]">
                      Not installed yet? <br />
                      <a
                        className="text-white"
                        href="https://www.okx.com/download"
                        target="blank"
                      >
                        Download now
                      </a>
                    </p>
                  </div>
                </div>
                <div className="w-[95px] h-[95px] rounded-xl flex bg-[#D9D9D9]">
                  <QRCode
                    value={qrConnector.uri}
                    size={82}
                    className="m-auto"
                  />
                </div>
              </div>
            </>
          )}
          {activeTab === 2 && (
            <div className="flex px-[20px] h-[64px] rounded-xl bg-white bg-opacity-10 justify-between">
              <div className="my-auto flex justify-start">
                <img src="images/okx.png" className=" w-[30px] h-[30px] "></img>
                <p className="my-auto ml-1">OKX</p>
              </div>
              <Button
                type={"smallConnect"}
                border={"2px"}
                itemClassName="p-3 bg-transparent w-[calc(100%-4px)] tracking-normal"
                onClick={() => {
                  connect();
                }}
              >
                {t("topbar.Connect Wallet")}
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
