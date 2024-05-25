import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const InscribingBrc20 = () => {
  const { t } = useTranslation();

  const [op, setOp] = useState<string>("mint");
  const [tick, setTick] = useState<string>("");
  const [mintCount, setMintCount] = useState<Number>(1);
  const [mintAmount, setMintAmount] = useState<Number>(1000);

  useEffect(() => {
    alert(Number.MAX_SAFE_INTEGER);
  }, []);

  return (
    <div className="">
      <p className="my-[26px] text-[14px] text-[#A0A0A0] font-Mont">
        You can deploy or mint BRC-20 tokens here
      </p>
      <div className="">
        <span
          className="mr-5 cursor-pointer"
          onClick={() => {
            setOp("mint");
          }}
        >
          <input type="checkbox" checked={op === "mint"} className="mr-1" />
          <span className={op === "mint" ? "text-white" : " text-gray-400"}>
            Mint
          </span>
        </span>
        <span
          className="mr-3 cursor-pointer"
          onClick={() => {
            setOp("transfer");
          }}
        >
          <input type="checkbox" checked={op === "transfer"} className="mr-1" />
          <span className={op === "transfer" ? "text-white" : " text-gray-400"}>
            Transfer
          </span>
        </span>
        <span
          className="cursor-pointer"
          onClick={() => {
            setOp("deploy");
          }}
        >
          <input type="checkbox" checked={op === "deploy"} className="mr-1" />
          <span className={op === "deploy" ? "text-white" : " text-gray-400"}>
            Deploy
          </span>
        </span>
      </div>
      <div className="w-full rounded-xl my-2 p-2 font-mont text-white bg-white bg-opacity-10">
        <div>
          <p className="text-[14px] ">Ticker</p>
          <input
            type="text"
            className="text-[14px] outline-none border border-opacity-30 border-white  bg-transparent w-full p-2 rounded"
            defaultValue={"Loli"}
          />
          <p className="text-[#F02C2C] text-[14px]">Minted: 37.37%</p>
        </div>
        <div className="my-5">
          <p className="text-[14px] ">Mint amount</p>
          <input
            type="text"
            className="text-[14px] outline-none border border-opacity-30 border-white  bg-transparent w-full p-2 rounded"
            defaultValue={"1000"}
          />
          <p className="text-[#A0A0A0] text-[14px]">
            Max available amount:1,000
          </p>
        </div>
        <div className="text-white">
          <p>Repeat mint({mintCount.toString()})</p>
          <div className="flex justify-between">
            <div className="relative  text-white  w-[80%] mb-6">
              <label htmlFor="labels-range-input" className="sr-only">
                Labels range
              </label>
              <input
                id="labels-range-input"
                type="range"
                value={mintCount.toString()}
                min={1}
                max={1200}
                onChange={(e) => {
                  setMintCount(Number(e.target.value));
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span className="text-sm  absolute start-0 -bottom-6">1</span>
              <span
                style={{
                  insetInlineStart: `${Math.round(Number(mintCount) / 12)}%`,
                }}
                className={`text-sm  ${
                  Number(mintCount) <= 100 || Number(mintCount) >= 1050
                    ? "hidden"
                    : "block"
                } absolute -translate-x-1/2 rtl:translate-x-1/2 -bottom-6`}
              >
                {mintCount.toString()}
              </span>
              <span className="text-sm absolute end-0 -bottom-6">1,200</span>
            </div>
            <input
              type="number"
              onChange={(e) => {
                const cnt = Math.min(Math.max(Number(e.target.value), 1), 1200);
                setMintCount(cnt);
              }}
              className={`text-[14px] bg-transparent outline-none p-2 ml-3s w-[98px] border rounded-lg border-[#767676] text-left`}
              value={mintCount.toString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InscribingBrc20;
