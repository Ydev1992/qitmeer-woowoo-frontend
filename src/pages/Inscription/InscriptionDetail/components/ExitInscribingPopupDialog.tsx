import React, { useState } from "react";
import "./ExitInscribingPopupDialog.css";
import { ConfirmSVG, CopySVG, LinkSVG } from "assets/svgs";
import { useDispatch } from "react-redux";
import Button from "components/Button";

interface ConfirmPopupProps {
  isOpenBuy: boolean;
  setIsOpenBuy: React.Dispatch<React.SetStateAction<boolean>>;
  handleBuyOkClick: () => void;
}

const ExitInscribingPopupDialog: React.FC<ConfirmPopupProps> = (props) => {
  const { isOpenBuy, setIsOpenBuy, handleBuyOkClick } = props;
  const [isCopied, setIsCopied] = useState(false);

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
          <div className="dialog overflow-y-scroll relative font-Mont w-[470px] border-white border-2 rounded-lg bg-black text-white">
            <button
              onClick={() => setIsOpenBuy(false)}
              className="text-4xl absolute right-5 top-3"
            >
              &times;
            </button>

            <div className="font-Mont mt-10 text-center">
              <img
                src="images/inscription/warning.png"
                className="mx-auto my-5"
              ></img>
              <h2 className="text-[24px] text-white">Quit listing?</h2>
              <p className="text-[#C4C4C4] text-[16px]">
                Are you sure you want to quit listing? All progress will be
                lost.
              </p>
            </div>

            <div className="flex w-full mt-5 text-right justify-between">
              <div className="flex w-full">
                <Button
                  type={"primary"}
                  border={"2px"}
                  className="h-fit m-auto"
                  itemClassName="p-[8px_24px] bg-transparent w-[calc(100%-4px)] text-lg"
                  onClick={() => {
                    handleBuyOkClick();
                  }}
                >
                  Quit Listing
                </Button>
                <button
                  className="text-white rounded-lg m-2 w-[260px] cursor-pointer md:flex-grow
                  bg-gradient-to-r border-pink-300 border-opacity-70 from-blue-500 to-pink-500 font-semibold py-2 px-4"
                  onClick={() => {
                    setIsOpenBuy(false);
                  }}
                >
                  Continue listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ExitInscribingPopupDialog;
