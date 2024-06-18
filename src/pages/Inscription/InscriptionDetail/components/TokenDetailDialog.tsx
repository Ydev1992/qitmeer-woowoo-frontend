import React, { useState } from "react";
import "./TokenDetailDialog.css";
import { ConfirmSVG, CopySVG, LinkSVG } from "assets/svgs";
import { useDispatch } from "react-redux";
import Button from "components/Button";

interface ConfirmPopupProps {
  isOpenBuy: boolean;
  setIsOpenBuy: React.Dispatch<React.SetStateAction<boolean>>;
}

const TokenDetailDialog: React.FC<ConfirmPopupProps> = (props) => {
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
                <p className="text-white">21,000,000</p>
              </div>
              <div className="flex text-[16px] my-2 justify-between">
                <p className="text-[#C4C4C4]">Creation time</p>
                <p className="text-white">2023/03/12 23</p>
              </div>
              <div className="flex text-[16px] my-2 justify-between">
                <p className="text-[#C4C4C4]">
                  Deployment
                  <br />
                  Inscription ID
                </p>
                <div className="flex">
                  <p className="my-auto text-white">
                    {isCopiedInscID ? "Copied" : "bc1...qwqdka"}
                  </p>
                  <div
                    className="w-5 my-auto flex justify-center cursor-pointer"
                    onClick={() =>
                      onCopyAddressInscID("bc17gasklfdsk3242lkmqwqdka")
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
                    {isCopiedCreator ? "Copied" : "bc1...qwqdka"}
                  </p>
                  <div
                    className="w-5 my-auto flex justify-center cursor-pointer"
                    onClick={() =>
                      onCopyAddressCreator("bc17gasklfdsk3242lkmqwqdka")
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
                <p className="text-white">#789873</p>
              </div>
              <div className="flex text-[16px] my-2 justify-between">
                <p className="text-[#C4C4C4]">
                  Ending Inscription
                  <br />
                  Number
                </p>
                <p className="text-white">#78987334</p>
              </div>
              <div className="flex text-[16px] my-2 justify-between">
                <p className="text-[#C4C4C4]">
                  Total supply single
                  <br />
                  casting online
                </p>
                <p className="text-white">1,000</p>
              </div>
              <div className="flex text-[16px] my-2 justify-between">
                <p className="text-[#C4C4C4]">accuracy</p>
                <p className="text-white">18</p>
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
