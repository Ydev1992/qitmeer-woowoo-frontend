import React, { useState } from "react";
import { SkeletonComponent } from "components/SkeletonComponentCustom";
import { Brc20Token } from "../Brc20TokenInterface";

interface BRCCardSkeletonProps {
  inscriptionDatum: any;
  brc20Token: Brc20Token;
}

const BRCCardSkeleton: React.FC<BRCCardSkeletonProps> = (props) => {

  
  const { inscriptionDatum, brc20Token } = props;

  return (
    <>
      <div className="cursor-pointer w-full" onClick={(e) => {}}>
        <div className=" relative mb-4 py-0.5 w-full">
          <div className="font-Mont w-full text-gray-500 border-white border border-opacity-0 hover:border-white hover:border p-4 rounded-[12px] bg-[#FFFFFF1A] backdrop-blur cursor-pointer">
            <p className="">
              <SkeletonComponent className="" />
            </p>
            <div className="flex items-center justify-between mb-4 mt-4">
              {/* image */}
              <SkeletonComponent className="w-5 h-5" /> 

              <div className="ml-4 w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6 flex justify-between">
                <SkeletonComponent className="w-[70px]" />
                <p>{inscriptionDatum.slug}</p>
              </div>
            </div>
            <p className="flex w-full">
                <SkeletonComponent className="w-[70px]" />
              sats/{inscriptionDatum.slug}
            </p>
            <p className="font-semibold">
              <SkeletonComponent className="" />
            </p>
            <div className="flex mt-3 p-2 rounded-[12px] border-white backdrop-blur text-lg">
              <div>
                <p className="text-white flex">
                  <SkeletonComponent className="w-[70px]" /> 
                  <span>BTC</span>
                </p>
                <p className="font-semibold flex">
                  <span>$</span> <SkeletonComponent className="w-[70px]" />
                </p>
              </div>
            </div>
            <div className="flex mt-4">
              <button
                className="border-2 text-white text-xl border-gray-300 rounded-full m-2 cursor-pointer md:flex-grow
                hover:bg-gradient-to-r hover:border-pink-300 hover:border-opacity-70 hover:from-blue-500 hover:to-pink-500 font-semibold py-2 px-4"
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

export default BRCCardSkeleton;
