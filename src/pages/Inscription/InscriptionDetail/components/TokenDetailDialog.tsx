import React, { useState } from "react";
import "./TokenDetailDialog.css";
import { ConfirmSVG, CopySVG, LinkSVG } from "assets/svgs";
import { useDispatch } from "react-redux";
import Button from "components/Button";

import { Brc20Token } from "../Brc20TokenInterface";

interface ConfirmPopupProps {
  isOpenBuy: boolean;
  setIsOpenBuy: React.Dispatch<React.SetStateAction<boolean>>;

  brc20Token: Brc20Token;
}

const TokenDetailDialog: React.FC<ConfirmPopupProps> = (props) => {
  const { brc20Token } = props;

  const { isOpenBuy, setIsOpenBuy } = props;
  const [isCopiedInscID, setIsCopiedInscID] = useState(false);
  const [isCopiedCreator, setIsCopiedCreator] = useState(false);

  const onCopyAddressInscID = (address: string) => {
    setIsCopiedInscID(true);
    setTimeout(() => {
      setIsCopiedInscID(false);
    }, 1000);
    navigator.clipboard.writeText(address);
  };

  const onCopyAddressCreator = (address: string) => {
    setIsCopiedCreator(true);
    setTimeout(() => {
      setIsCopiedCreator(false);
    }, 1000);
    navigator.clipboard.writeText(address);
  };

  return (
    isOpenBuy && (
      <div className="relative  flex items-center justify-center min-h-screen">
        <div className="overlay bg-opacity-10 backdrop-blur-sm">
          <div className="dialog overflow-y-scroll relative font-Mont w-[470px] border-[#656565] border-2 rounded-lg bg-black text-white">
            <div className="flex justify-between">
              <p className="text-[24px] text-white">Details</p>

              <button
                onClick={() => setIsOpenBuy(false)}
                className="text-4xl right-5 top-3"
              >
                &times;
              </button>
            </div>
            <div>
              <div className="flex text-[16px] my-2 justify-between">
                <p className="text-[#C4C4C4]">Total supply</p>
                <p className="text-white">
                  {brc20Token.totalSupply.toString()}
                </p>
              </div>
              <div className="flex text-[16px] my-2 justify-between">
                <p className="text-[#C4C4C4]">Creation time</p>
                <p className="text-white">
                  {new Date(brc20Token.deployTime.toString()).toString()}
                </p>
              </div>
              <div className="flex text-[16px] my-2 justify-between">
                <p className="text-[#C4C4C4]">
                  Deployment
                  <br />
                  Inscription ID
                </p>
                <div className="flex">
                  <p className="my-auto text-white">
                    {isCopiedInscID
                      ? "Copied"
                      : brc20Token.inscriptionId.toString().slice(0, 5) +
                        "..." +
                        brc20Token.inscriptionId.toString().slice(0, -3)}
                  </p>
                  <div
                    className="w-5 my-auto flex justify-center cursor-pointer"
                    onClick={() =>
                      onCopyAddressInscID(brc20Token.tokenInscriptionId)
                    }
                  >
                    {isCopiedInscID ? ConfirmSVG : CopySVG}
                  </div>
                </div>
              </div>
              <div className="flex text-[16px] my-2 justify-between">
                <p className="text-[#C4C4C4]">Creator</p>
                <div className="flex">
                  <p className="my-auto text-white">
                    {isCopiedCreator
                      ? "Copied"
                      : brc20Token.tokenContractAddress.toString().slice(0, 5) +
                        "..." +
                        brc20Token.tokenContractAddress.toString().slice(0, -3)}
                  </p>
                  <div
                    className="w-5 my-auto flex justify-center cursor-pointer"
                    onClick={() =>
                      onCopyAddressCreator(brc20Token.tokenContractAddress)
                    }
                  >
                    {isCopiedCreator ? ConfirmSVG : CopySVG}
                  </div>
                </div>
              </div>
              <div className="flex text-[16px] my-2 justify-between">
                <p className="text-[#C4C4C4]">
                  Starting Inscription
                  <br />
                  Number
                </p>
                <p className="text-white">
                  {brc20Token.inscriptionNumRange.toString()}
                </p>
              </div>
              <div className="flex text-[16px] my-2 justify-between">
                <p className="text-[#C4C4C4]">
                  Ending Inscription
                  <br />
                  Number
                </p>
                <p className="text-white">
                  {brc20Token.inscriptionNumRange.toString()}
                  </p>
              </div>
              <div className="flex text-[16px] my-2 justify-between">
                <p className="text-[#C4C4C4]">
                  Total supply single
                  <br />
                  casting online
                </p>
                <p className="text-white">
                  {brc20Token.limitPerMint.toString()}
                </p>
              </div>
              <div className="flex text-[16px] my-2 justify-between">
                <p className="text-[#C4C4C4]">accuracy</p>
                <p className="text-white">
                {brc20Token.precision.toString()}</p>
              </div>
            </div>
            <div className="mt-7">
              <button
                className="text-white rounded-lg cursor-pointer md:flex-grow w-full
                bg-gradient-to-r border-pink-300 border-opacity-70 from-blue-500 to-pink-500 font-semibold py-2 px-4"
                onClick={() => {
                  setIsOpenBuy(false);
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TokenDetailDialog;
