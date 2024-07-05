import React from "react";
import { SkeletonComponent } from "components/SkeletonComponent";
import { useTranslation } from "react-i18next";

import { useState, useEffect, useRef } from "react";
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

import { Brc20Token } from "../Brc20TokenInterface";


import Modal from "../../../../components/ConnectButton/Modal";
import Button from "../../../../components/Button";

interface BRCCardProps {
  inscriptionDatum: any;
  brc20Token: Brc20Token;
  handleBuyClick: any;
}

const myRoundByk = (x: Number, k: number) => {
  return Math.round(Math.pow(10, k) * Number(x)) / Math.pow(10, k);
};

const BRCCard: React.FC<BRCCardProps> = (props) => {
  const { t } = useTranslation();
  const { inscriptionDatum, handleBuyClick, brc20Token } = props;

  const { floorPrice } = brc20Token;

  const [open, setOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const { address: _account, isConnected } = useAccount();

  const [okxOpen, setOkxOpen] = useState<boolean>(false);

  
  const myOKXConnector: Partial<any> = {
    connector: new OKXConnector(),
  };
  const { connect } = useConnect(myOKXConnector);
  const { disconnect } = useDisconnect();

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

  const { orderId, amount, slug, unitPrice, price, InscriptioNumber } = inscriptionDatum;

  const tmpVal = Math.random() + 1;

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

  const myHandleBuyClick = () => {
    if(isConnected) {
      handleBuyClick();
    } else {
      openOkxModal();
    }
  }

  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={(e) => {}}>
        <div className=" relative mb-4 py-0.5 ">
          <div className="font-Mont text-gray-500 border-white border border-opacity-0 hover:border-white hover:border p-4 rounded-[12px] bg-[#FFFFFF1A] backdrop-blur cursor-pointer">
            <p className="">#{InscriptioNumber}</p>
            <div className="flex items-center justify-between mb-4 mt-4">
              <img
                src={brc20Token.logoUrl}
                alt="Image"
                className="w-1/5 md:w-1/4 lg:w-1/5 xl:w-1/6"
              />
              <div className="ml-4 w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6">
                <p className="text-md text-white">{`${
                  myRoundByk(amount, 2)
                }  ${slug}`}</p>
              </div>
            </div>
            <p>
              <span className="text-white">
                {myRoundByk(unitPrice*1e8, 2)}
              </span>{" "}
              sats/{slug}
            </p>
            <p className="font-semibold">
            $ {myRoundByk(unitPrice * 60000, 4)}
            </p>
            <div className="flex mt-3 p-2 rounded-[12px] border-white backdrop-blur text-lg">
              <div>
                <span className="text-white">
                  {myRoundByk(price, 6)} BTC
                </span>
                <p className="font-semibold">
                  $ {myRoundByk(price * 60000, 4)}
                </p>
              </div>
            </div>
            <div className="flex mt-4">
              <button
                className="border-2 text-white text-xl border-gray-300 rounded-full m-2 cursor-pointer md:flex-grow
                hover:bg-gradient-to-r hover:border-pink-300 hover:border-opacity-70 hover:from-blue-500 hover:to-pink-500 font-semibold py-2 px-4"
                onClick={() => {
                  myHandleBuyClick();
                }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>






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
};

export default BRCCard;
