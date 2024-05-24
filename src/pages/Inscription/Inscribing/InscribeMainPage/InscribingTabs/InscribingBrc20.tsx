import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const InscribingBrc20 = () => {
  const { t } = useTranslation();

  const [mintChecked, setMintChecked] = useState<boolean>(false);
  const [transferChecked, setTransferChecked] = useState<boolean>(false);
  const [deployChecked, setDeployChecked] = useState<boolean>(false);

  return (
    <div className="">
      <p className="my-[26px] text-[14px] text-[#A0A0A0] font-Mont">
        You can deploy or mint BRC-20 tokens here
      </p>
      <div className="">
        <span className="mr-5">
          <input
            type="checkbox"
            className="mr-1"
            onClick={() => {
              setMintChecked(!mintChecked);
            }}
          />
          <span className={mintChecked ? "text-white" : " text-gray-400"}>
            Mint
          </span>
        </span>
        <span className="mr-3">
          <input
            type="checkbox"
            className="mr-1"
            onClick={() => {
              setTransferChecked(!transferChecked);
            }}
          />
          <span className={transferChecked ? "text-white" : " text-gray-400"}>
            Transfer
          </span>
        </span>
        <span className="">
          <input
            type="checkbox"
            className="mr-1"
            onClick={() => {
              setDeployChecked(!deployChecked);
            }}
          />
          <span className={deployChecked ? "text-white" : " text-gray-400"}>
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
      </div>
    </div>
  );
};

export default InscribingBrc20;
