import React, { useRef, useEffect, useState } from "react";
import { Brc20Token } from "./Brc20TokenInterface";
import { useNavigate } from "react-router-dom";

import TokenDetailDialog from "./components/TokenDetailDialog";

interface BadgeProps {
  brc20Token: Brc20Token;
}

const TotalAnalyze: React.FC<BadgeProps> = ({ brc20Token }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const [isOpenDetailModal, setIsOpenDetailModal] = useState<boolean>(false);

  // State to store the width
  const [width, setWidth] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const updateWidth = () => {
      if (elementRef.current) {
        setWidth(elementRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const getMintRateClassName = () => {
    const wid = Math.max(1, Number(width) * Number(brc20Token.mintRate) * 100);
    return `h-full bg-white rounded-full w-[` + wid + `qx]`;
  };

  return (
    <div className="flex-col md:flex-row w-[100%] flex bg-gra">
      <div className="flex flex-col md:flex-row w-[100%] justify-center items-center  ">
        <img
          className="w-[80px] bg-gray-700 h-auto p-2 inline float-left rounded-full text-indigo-500"
          src={brc20Token.logoUrl}
        />
        <div className="flex-1w-[90%] pl-5 pr-5 md:h-auto md:flex-grow">
          <div className=" w-[100%] flex justify-between">
            <p className="">{brc20Token.slug}</p>
            <div className="flex">
              <button className="p-2 my-auto bg-gray-500 rounded-full hover:bg-gray-400 hover:outline-none">
                <svg
                  className="w-4 h-4 text-gray-100 stroke-current"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L9.4 8.2H3.5L8.5 12.8L6.7 18.5L12 14.8L17.3 18.5L15.5 12.8L20.5 8.2H14.6L12 2Z"></path>
                </svg>
              </button>
              <div className="w-0 my-auto mx-3 h-[34px] border bg-[#333333] border-[#333333]"></div>
              <div
                className="my-auto cursor-pointer text-[#C4C4C4]"
                onClick={() => {
                  setIsOpenDetailModal(true);
                }}
              >
                currency details &gt;
              </div>
            </div>
          </div>
          <div className="mt-2 mb-2 h-1 w-full bg-gray-500 rounded-full">
            <div
              ref={elementRef}
              style={{
                width: `${Math.max(1, Number(brc20Token.mintRate) * 100)}%`,
              }}
              className={getMintRateClassName()}
            ></div>
          </div>
          <div className=" w-[100%] flex justify-between">
            <p className="">Cast: {brc20Token.mintAmount.toString()}</p>
            <p className="">
              Total win volume: {brc20Token.totalSupply.toString()}
            </p>
          </div>
        </div>
        <div className=" flex md:flex-row justify-center items-center ">
          <button
            className="overflow-auto border-2 border-gray-500 rounded-2xl m-2 cursor-pointer md:flex-grow p-3"
            onClick={() => {}}
          >
            outwell
          </button>
          <button
            className="overflow-auto border-none bg-gradient-to-r from-blue-500 to-pink-400 rounded-2xl border-2 m-2 cursor-pointer  md:flex-grow p-3"
            onClick={() => {
              navigate("/listForSale");
            }}
          >
            inscription
          </button>
        </div>
      </div>

      <TokenDetailDialog
        isOpenBuy={isOpenDetailModal}
        setIsOpenBuy={setIsOpenDetailModal}
        brc20Token={brc20Token}
      />
    </div>
  );
};

export default TotalAnalyze;
