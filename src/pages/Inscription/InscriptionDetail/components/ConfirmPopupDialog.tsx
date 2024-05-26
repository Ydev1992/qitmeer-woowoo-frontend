import React, { useState } from "react";
import "./ConfirmPopupDialog.css";

interface ConfirmPopupProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirmClick: () => void;
}

const ConfirmPopupDialog: React.FC<ConfirmPopupProps> = (props) => {
  const { isOpen, setIsOpen, handleConfirmClick } = props;
  return (
    isOpen && (
      <div className="relative  flex items-center justify-center min-h-screen">
        <div className="overlay bg-opacity-10 backdrop-blur-sm">
          <div className="dialog font-Mont w-[370px] border-white border-2 rounded-lg bg-black text-white">
            <h2 className=" text-2xl font-semibold mb-4">Trading alert</h2>
            <p className="mb-4 text-gray-300">
              The order price is 228% higher than the floor price. Confirm
              buying?
            </p>
            <div className="flex justify-end">
              <button
                className="border-2 w-[40%] text-white border-gray-300 rounded-lg m-2 cursor-pointer md:flex-grow
                hover:bg-gray-600py-2 px-4"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Not now
              </button>

              <button
                className=" w-[60%] text-white rounded-lg m-2 cursor-pointer md:flex-grow
                bg-gradient-to-r border-pink-300 border-opacity-70 from-blue-500 to-pink-500 font-semibold py-2 px-4"
                onClick={() => {
                  handleConfirmClick();
                }}
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

export default ConfirmPopupDialog;
