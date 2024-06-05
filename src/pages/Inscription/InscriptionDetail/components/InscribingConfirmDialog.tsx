import React, { useState } from "react";
import "./InscribingConfirmDialog.css";
import { ConfirmSVG, CopySVG, LinkSVG } from "assets/svgs";
import { useDispatch } from "react-redux";
import Button from "components/Button";

interface ConfirmPopupProps {
  isOpenBuy: boolean;
  setIsOpenBuy: React.Dispatch<React.SetStateAction<boolean>>;
  handleBuyOkClick: () => void;
}

const InscribingConfirmDialog: React.FC<ConfirmPopupProps> = (props) => {
  const { isOpenBuy, setIsOpenBuy, handleBuyOkClick } = props;
  const [isCopied, setIsCopied] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const onCopyAddress = (address: string) => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    navigator.clipboard.writeText(address);
  };

  return (
    isOpenBuy && (
      <div className="relative  flex items-center justify-center min-h-screen">
        <div className="overlay bg-opacity-10 backdrop-blur-sm">
          <div className="dialog overflow-y-scroll relative font-Mont w-[470px] border-[#656565] border-2 rounded-lg bg-black text-white">
            <button
              onClick={() => setIsOpenBuy(false)}
              className="text-4xl absolute right-5 top-3"
            >
              &times;
            </button>

            {!isConfirmed ? (
              <div className="font-Mont mt-10 text-center">
                <h2 className="text-[24px] my-3 text-white">
                  Inscription for listing?
                </h2>
              </div>
            ) : (
              <div className="font-Mont mt-10 text-center">
                <img
                  src="images/inscription/success.png"
                  className="mx-auto my-5"
                ></img>
                <h2 className="text-[24px] text-white">Successfully listed!</h2>
                <p className="text-[#C4C4C4] px-5 text-[16px]">
                  The one that was successfully listed, please be patient and
                  wait for the buyer to make a purchase.{" "}
                  <span className="text-[16px] cursor-pointer bg-gradient-to-r from-[#4FC0FF] to-[#C23FFF] bg-clip-text text-transparent">
                    View My Orders
                  </span>
                </p>
              </div>
            )}

            <div className="w-[211px] h-[134px] mx-auto my-5">
              <div className="w-full h-[102px] flex rounded-lg bg-white bg-opacity-[15%] ">
                <img
                  src="images/inscription/hero1.png"
                  className="w-[40px] h-[40px] border-[0.44px] mr-1 bg-gray-800 border-black  rounded-full bg- ml-auto my-auto"
                ></img>
                <div className="my-auto mr-auto">
                  <p className="text-white text-[20px]">1,000 dddd</p>
                  <p className="text-[#A0A0A0] text-[16px]">#501232123</p>
                </div>
              </div>
              {isConfirmed || (
                <div className="flex font-Mont justify-between my-2">
                  <p className="text-[16px] text-[#C4C4C4]">Autograph</p>
                  <p className="text-[16px] cursor-pointer bg-gradient-to-r from-[#4FC0FF] to-[#C23FFF] bg-clip-text text-transparent">
                    View details
                  </p>
                </div>
              )}
            </div>

            <div className="flex w-full">
              {!isConfirmed ? (
                <button
                  className="text-white rounded-lg m-2 w-[260px] cursor-pointer flex-grow
                  bg-gradient-to-r border-pink-300 border-opacity-70 from-blue-500 to-pink-500 font-semibold py-2 px-4"
                  onClick={() => {
                    setIsConfirmed(true);
                  }}
                >
                  Confirm listing
                </button>
              ) : (
                <button
                  className="text-white rounded-lg m-2 w-[260px] cursor-pointer flex-grow
                  bg-gradient-to-r border-pink-300 border-opacity-70 from-blue-500 to-pink-500 font-semibold py-2 px-4"
                  onClick={() => {
                    setIsOpenBuy(false);
                    setIsConfirmed(false);
                  }}
                >
                  I am aware of it
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default InscribingConfirmDialog;
