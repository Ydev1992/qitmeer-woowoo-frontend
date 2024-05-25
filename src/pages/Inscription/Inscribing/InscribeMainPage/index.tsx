import { useTranslation } from "react-i18next";
import { useState } from "react";
import Preview from "./Preview";

import InscribingTabs from "./InscribingTabs";

export default function Inscribing() {
  const { t } = useTranslation();
  return (
    <>
      <div className="max-w-[1240px]  md:flex grid z-10 mx-auto">
        <div className="md:w-1/2  w-full">
          <InscribingTabs />
          <div className="font-Mont text-white mt-7">
            <p className="text-[14px]">Recipient address</p>
            <input
              type="text"
              defaultValue={
                "bc1p7uxsmqw6rflmtu8u450grhnf9x6au9mcn88crkzk75jas686qxyq4ad3wv"
              }
              className="m-2 w-[95%] rounded-xl text-[14px] border border-[#767676] text-center p-2 bg-transparent outline-none"
            />
            <p>
              Minimum UTXO value : 330 sats{" "}
              <span className="bg-gradient-to-r text-[15px] from-[#4FC0FF] to-[#C23FFF] font-bold bg-clip-text text-transparent">
                {" View more > "}{" "}
              </span>
            </p>
          </div>
          <div className="mt-10 text-white text-[18px] font-Mont flex justify-center w-[60%] items-center ">
            <button
              className="overflow-auto border-2 w-[45%] border-gray-500 rounded-2xl m-2 cursor-pointer p-3"
              onClick={() => {}}
            >
              Cancel
            </button>
            <button className="overflow-auto w-[45%] border-none bg-gradient-to-r from-[#4FC0FF] to-[#C23FFF] rounded-2xl border-2 m-2 cursor-pointer  md:flex-grow p-3">
              Confirm
            </button>
          </div>
        </div>
        <Preview />
      </div>
    </>
  );
}
