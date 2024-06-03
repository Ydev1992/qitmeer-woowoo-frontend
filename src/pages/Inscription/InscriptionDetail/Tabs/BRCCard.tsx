import React, { useState } from "react";
import { SkeletonComponent } from "components/SkeletonComponent";
import { useTranslation } from "react-i18next";

import { Brc20Token } from "../Brc20TokenInterface";

interface BRCCardProps {
  inscriptionDatum: any;
  brc20Token: Brc20Token;
  handleBuyClick: any;
}

const myRoundBy2 = (x: Number) => {
  return Math.round(100 * Number(x)) / 100;
};

const BRCCard: React.FC<BRCCardProps> = (props) => {
  const { t } = useTranslation();
  const { inscriptionDatum, handleBuyClick, brc20Token } = props;

  const { inscriptionNumber, amount, symbol, ownerAddress } = inscriptionDatum;

  const tmpVal = Math.random() + 1;

  return (
    <>
      <div className="cursor-pointer" onClick={(e) => {}}>
        <div className=" relative mb-4 py-0.5 ">
          <div className="font-Mont text-gray-500 border-white border border-opacity-0 hover:border-white hover:border p-4 rounded-[12px] bg-[#FFFFFF1A] backdrop-blur cursor-pointer">
            <p className="">#{inscriptionNumber}</p>
            <div className="flex items-center justify-between mb-4 mt-4">
              <img
                src={brc20Token.logoUrl}
                alt="Image"
                className="w-1/5 md:w-1/4 lg:w-1/5 xl:w-1/6"
              />
              <div className="ml-4 w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6">
                <p className="text-md text-white">{`${
                  Math.round(Number(amount * 100)) / 100
                }  ${symbol}`}</p>
              </div>
            </div>
            <p>
              <span className="text-white">
                {Math.round(Number(brc20Token.lastPrice) * tmpVal)}
              </span>{" "}
              sats/loli
            </p>
            <p className="font-semibold">
              {Math.round(Number(brc20Token.lastPrice) * amount)}
            </p>
            <div className="flex mt-3 p-2 rounded-[12px] border-white backdrop-blur text-lg">
              <div>
                <span className="text-white">
                  {myRoundBy2(amount * 600)} BTC
                </span>
                <p className="font-semibold">
                  $ {myRoundBy2(amount * Number(brc20Token.lastPrice))}
                </p>
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
