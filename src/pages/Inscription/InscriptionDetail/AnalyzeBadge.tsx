import React from "react";
import { Brc20Token } from "./Brc20TokenInterface";

interface BadgeProps {
  brc20Token: Brc20Token;
}

const AnalyzeBadge: React.FC<BadgeProps> = ({ brc20Token }) => {
  return (
    <div className="flex mt-5" style={{ flexWrap: "wrap" }}>
      <div className="flex mx-auto bg-white/10 rounded-xl w-md  py-2 pl-4 pr-6 overflow-hidden">
        <div className="w-10">
          <img className="" src="/images/networks/bsc.png" alt="Image" />
        </div>
        <div className="w-20 font-mont flex flex-col space-y-2">
          <p className="font-medium text-2xl">
            {brc20Token.marketCap.toString()}
          </p>
          <p className="font-normal text-xs">Total transaction amount</p>
        </div>
      </div>

      <div className="flex mx-auto bg-white/10 rounded-xl w-sm py-2 pl-4 pr-6 overflow-hidden">
        <div className="w-10">
          <img className="" src="/images/networks/bsc.png" alt="Image" />
        </div>
        <div className="w-20 font-mont flex flex-col space-y-2">
          <p className="font-medium text-2xl">
            {brc20Token.volume24h.toString()}
          </p>
          <p className="font-normal text-xs">24-hour trading volume</p>
        </div>
      </div>

      <div className="flex mx-auto bg-white/10 rounded-xl w-sm py-2 pl-4 pr-6 overflow-hidden">
        <div className="w-10">
          <img className="" src="/images/networks/bsc.png" alt="Image" />
        </div>
        <div className="w-20 font-mont flex flex-col space-y-2">
          <p className="font-medium text-2xl">
            {brc20Token.lastPrice.toString()}
          </p>
          <p className="font-normal text-xs">{"market value >"}</p>
        </div>
      </div>

      <div className="flex mx-auto bg-white/10 rounded-xl w-sm py-2 pl-4 pr-6 overflow-hidden">
        <div className="w-20 font-mont flex flex-col space-y-2">
          <p className="font-medium text-2xl">
            {brc20Token.high24h.toString()}
          </p>
          <p className="font-normal text-xs">floor price</p>
        </div>
      </div>

      <div className="flex mx-auto bg-white/10 rounded-xl w-sm py-2 pl-4 pr-6 overflow-hidden">
        <div className="w-20 font-mont flex flex-col space-y-2">
          <p className="font-medium text-2xl">
            {brc20Token.transactionCount.toString()}
          </p>
          <p className="font-normal text-xs"> Number of transactions</p>
        </div>
      </div>

      <div className="mx-auto flex bg-white/10 rounded-xl w-sm py-2 pl-4 pr-6 overflow-hidden">
        <div className="w-20 font-mont flex flex-col space-y-2">
          <p className="font-medium text-2xl">{brc20Token.holder.toString()}</p>
          <p className="font-normal text-xs">Holder</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeBadge;
