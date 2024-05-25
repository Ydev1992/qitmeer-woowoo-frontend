import React, { useState } from "react";
import { SkeletonComponent } from "components/SkeletonComponent";
import { useTranslation } from "react-i18next";

interface BRCCardProps {
  inscriptionDatum: any;
  handleBuyClick: any;
}

const BRCCard: React.FC<BRCCardProps> = (props) => {
  const { t } = useTranslation();
  const { inscriptionDatum, handleBuyClick } = props;

  const { inscriptionNumber, symbol, ownerAddress } = inscriptionDatum;

  return (
    <>
      <div className="cursor-pointer" onClick={(e) => {}}>
        <div className=" relative mb-4 py-0.5 ">
          <div className="font-Mont text-gray-500 border-white border border-opacity-0 hover:border-white hover:border p-4 rounded-[12px] bg-[#FFFFFF1A] backdrop-blur cursor-pointer">
            <p>{inscriptionNumber}</p>
            <div className="flex items-center justify-between mb-4 mt-4">
              <img
                src="images/inscription/hero2.png"
                alt="Image"
                className="w-1/5 md:w-1/4 lg:w-1/5 xl:w-1/6"
              />
              <div className="ml-4 w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6">
                <p className="text-lg text-white">{symbol}</p>
              </div>
            </div>
            <p>
              <span className="text-white">2.25</span> sats/loli
            </p>
            <p className="font-semibold">{ownerAddress}</p>
            <div className="flex mt-3 p-2 rounded-[12px] border-white backdrop-blur text-lg">
              <div>
                <span className="text-white">0.00144 BTC</span>
                <p className="font-semibold">$12312</p>
              </div>
            </div>
            <div className="flex mt-4">
              <button
                className="border-2 text-white text-xl border-gray-300 rounded-full m-2 cursor-pointer md:flex-grow
                hover:bg-gradient-to-r hover:border-pink-300 hover:border-opacity-70 hover:from-blue-500 hover:to-pink-500 font-semibold py-2 px-4"
                onClick={() => {
                  handleBuyClick();
                }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BRCCard;
