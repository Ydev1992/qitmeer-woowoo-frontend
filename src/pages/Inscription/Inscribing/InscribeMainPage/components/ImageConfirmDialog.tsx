import React, { useState } from "react";
import "./Brc20InscConfirmDialog.css";
import { ConfirmSVG, CopySVG, LinkSVG } from "assets/svgs";
import { useDispatch } from "react-redux";
import Button from "components/Button";

import ImageState from "../Interfaces/ImageState";

interface ConfirmPopupProps {
  isOpenBuy: boolean;
  setIsOpenBuy: React.Dispatch<React.SetStateAction<boolean>>;
  handleBuyOkClick: () => void;
  imageState: ImageState;
}

const ImageConfirmDialog: React.FC<ConfirmPopupProps> = (props) => {
  const { isOpenBuy, setIsOpenBuy, handleBuyOkClick, imageState } = props;
  const [isCopied, setIsCopied] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const onCopyAddress = (address: string) => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    navigator.clipboard.writeText(address);
  };

  return (
    isOpenBuy && (
      <div className="relative  flex items-center justify-center min-h-screen">
        <div className="overlay bg-opacity-10 backdrop-blur-sm">
          <div className="dialog py-1 overflow-y-scroll flex flex-col relative font-Mont w-[470px] border-[#656565] border-2 rounded-lg bg-black text-white">
            <button
              onClick={() => setIsOpenBuy(false)}
              className="text-4xl absolute right-5 top-3"
            >
              &times;
            </button>
            <h1 className="text-[24px] my-3">Inscription</h1>
            <p className="text-[16px] font-pingfang my-2">
              Waiting for signature
            </p>
            <p className="text-[18px] font-pingfang my-2">Inscriptions (1)</p>

            <div className="flex bg-white bg-opacity-10 rounded-lg p-3 justify-between">
              <div className="flex">
                <div>
                  <p className="text-white text-[18px]">Image</p>
                  <p className="text-[#767676] text-[14px]">150KB</p>
                </div>
                <img
                  src={imageState.imageURL as string}
                  className="rounded-[37px] ml-2 my-auto w-[50px] h-[50px]"
                ></img>
              </div>
              <p className="text-[14px] my-auto">Pending</p>
            </div>

            <div className="mt-3 text-white text-[16px] justify-items-end font-Mont flex w-full items-center ">
              <button
                className=" border-2 w-[20%] grid border-gray-500 rounded-2xl cursor-pointer p-3"
                onClick={() => {
                  setIsOpenBuy(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleBuyOkClick()}
                className={`w-[20%] border-none bg-gradient-to-r grid from-[#4FC0FF] to-[#C23FFF] rounded-2xl border-2 m-2 cursor-pointer  md:flex-grow p-3`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ImageConfirmDialog;
