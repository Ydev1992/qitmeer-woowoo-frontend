import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Brc20State from "../Interfaces/Brc20State";
import Brc20InscConfirmDialog from "../components/Brc20InscConfirmDialog";

import { useDispatch, useSelector } from "react-redux";
import { fetchExistanceOfToken, fetchMintRateOfToken } from "state/inscBrc20";
import { RootState, AppDispatch } from "state";

interface MyComponentProps {
  brc20State: Brc20State;
  setBrc20State: (brc20State: Brc20State) => void;
}

const roundToFour = (x: number) => {
  return Math.round(x * 10 ** 4) / 10 ** 4;
};

const InscribingBrc20: React.FC<MyComponentProps> = ({
  brc20State,
  setBrc20State,
}) => {
  const { t } = useTranslation();

  const { op, tick, mintCount, mintAmount } = brc20State;

  const [confirmDialogShow, setConfirmDialogShow] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const isDeployed = useSelector(
    (state: RootState) => state.inscBrc20.isDeployed
  );
  const mintedRate: number = useSelector((state: RootState) => {
    return state.inscBrc20.mintedRate;
  });

  useEffect(() => {
    if (tick.length !== 4) return;
    dispatch(fetchExistanceOfToken(tick));
    dispatch(fetchMintRateOfToken(tick));
  }, [dispatch, tick]);

  const handleConfirmClicked = () => {
    setConfirmDialogShow(true);
  };

  const handleConfirmOkClicked = () => {
    setConfirmDialogShow(false);
  };

  const getMessageForTickerInfo = () => {
    if (tick.length !== 4)
      return "Enter the 4-character ticker, such as 'ordi'";
    if (op === "mint") {
      if (isDeployed) return `Minted: ${roundToFour(mintedRate)}%`;
      else return `${tick} isn’t deployed yet. Check if the ticker is correct.`;
    } else if (op === "transfer") {
      if (isDeployed) return `Available balance: ${roundToFour(mintedRate)}%`;
      else return `${tick} isn’t deployed yet. Check if the ticker is correct.`;
    } else {
      return "";
    }
  };

  const disableConfirmButton = () => {
    if (tick.length !== 4) return true;

    if (op === "mint") {
      if (mintAmount <= 0) return true;
      if (mintCount <= 0) return true;
      if (!isDeployed) return true;
    }
    return false;
  };

  return (
    <div className="">
      <p className="my-[26px] text-[14px] text-[#A0A0A0] font-Mont">
        You can deploy or mint BRC-20 tokens here
      </p>
      <div className="">
        <span
          className="mr-5 cursor-pointer"
          onClick={() => {
            setBrc20State({ ...brc20State, op: "mint" });
          }}
        >
          <input
            type="checkbox"
            checked={op === "mint"}
            onChange={(e) => {}}
            className="mr-1"
          />
          <span className={op === "mint" ? "text-white" : " text-gray-400"}>
            Mint
          </span>
        </span>
        <span
          className="mr-3 cursor-pointer"
          onClick={() => {
            setBrc20State({ ...brc20State, op: "transfer" });
          }}
        >
          <input
            type="checkbox"
            checked={op === "transfer"}
            onChange={(e) => {}}
            className="mr-1"
          />
          <span className={op === "transfer" ? "text-white" : " text-gray-400"}>
            Transfer
          </span>
        </span>
        <span
          className="cursor-pointer"
          onClick={() => {
            setBrc20State({ ...brc20State, op: "deploy" });
          }}
        >
          <input
            type="checkbox"
            checked={op === "deploy"}
            onChange={(e) => {}}
            className="mr-1"
          />
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
            value={tick}
            onChange={(e) => {
              setBrc20State({ ...brc20State, tick: e.target.value });
            }}
            className="text-[14px] outline-none border border-opacity-30 border-white  bg-transparent w-full p-2 rounded"
          />
          <p className="text-[#F02C2C] text-[14px]">
            {getMessageForTickerInfo()}
          </p>
        </div>
        <div className="my-5">
          <p className="text-[14px] ">Mint amount</p>
          <input
            type="text"
            value={mintAmount}
            onChange={(e) => {
              setBrc20State({
                ...brc20State,
                mintAmount: Number.isNaN(Number(e.target.value))
                  ? 0
                  : Number(e.target.value),
              });
            }}
            className="text-[14px] outline-none border border-opacity-30 border-white  bg-transparent w-full p-2 rounded"
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
                  setBrc20State({
                    ...brc20State,
                    mintCount: Number(e.target.value),
                  });
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
                setBrc20State({
                  ...brc20State,
                  mintCount: cnt,
                });
              }}
              className={`text-[14px] bg-transparent outline-none p-2 ml-3s w-[98px] border rounded-lg border-[#767676] text-left`}
              value={mintCount.toString()}
            />
          </div>
        </div>
      </div>
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
        <button
          disabled={disableConfirmButton()}
          onClick={() => handleConfirmClicked()}
          className={`${
            disableConfirmButton()
              ? "bg-gray-600"
              : "cursor-pointer bg-gradient-to-r"
          } overflow-auto w-[45%] border-none  from-[#4FC0FF] to-[#C23FFF] rounded-2xl border-2 m-2 md:flex-grow p-3`}
        >
          Confirm
        </button>
      </div>
      <Brc20InscConfirmDialog
        isOpenBuy={confirmDialogShow}
        setIsOpenBuy={setConfirmDialogShow}
        handleBuyOkClick={handleConfirmOkClicked}
        brc20State={brc20State}
      />
    </div>
  );
};

export default InscribingBrc20;
