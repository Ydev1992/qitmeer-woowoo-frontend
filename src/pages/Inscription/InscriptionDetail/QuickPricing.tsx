import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faInfoCircle,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import Button from "components/Button";
import InscribingConfirmDialog from "./components/InscribingConfirmDialog";

import { toast } from "react-toastify";
import Notification from "components/Notification";

const QuickPricing = () => {
  const navigate = useNavigate();
  const [hasRecords, sethasRecords] = useState<boolean>(false);

  const [isOpenInscribeConfirmModal, setIsOpenInscribeConfirmModal] =
    useState<boolean>(false);

  const handleBottomListClicked = () => {
    setIsOpenInscribeConfirmModal(true);
  };

  return (
    <>
      <div className="relative px-3 pt-[80px] z-0 pb-[80px]  overflow-hidden">
        <img
          src={"/images/home/vectors/1.png"}
          alt={""}
          className="absolute top-0 left-0 z-0"
        />
        <img
          src={"/images/home/vectors/2.png"}
          alt={""}
          className="absolute top-[267px] z-0 left-0"
        />
        <img
          src={"/images/home/vectors/3.png"}
          alt={""}
          className="absolute top-[1357px] z-0 left-0"
        />
        <img
          src={"/images/home/vectors/4.png"}
          alt={""}
          className="absolute top-[2184px] z-0 left-0"
        />
        <div className="max-w-[1240px] z-10 mx-auto flex flex-col gap-7">
          <div className="cursor-pointer z-20">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="flex z-20 justify-between"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                size="2x"
                className="m-auto"
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="font-Mont text-white text-[26px] m-auto font-semibold">
                List details
              </p>
            </button>
          </div>
          <div className="w-[556px] z-20 text-white font-Mont">
            <h2 className="text-[24px] my-3">Quick pricing</h2>
            <div className="flex my-7 h-[74px]">
              <div className="rounded-lg mr-3 flex flex-col py-3 px-5 bg-white bg-opacity-[15%]">
                <p className="text-[#C4C4C4] text-[14px m-auto]">Floor price</p>
                <p className="text-white text-[16px] m-auto">33 sats/BTC</p>
              </div>
              <div className="rounded-lg py-3 px-5 flex flex-col bg-white bg-opacity-[15%]">
                <p className="text-[#C4C4C4] text-[14px] m-auto">
                  Latest transaction price
                </p>
                <p className="text-white text-[16px] m-auto">32.99 sats/BTC</p>
              </div>
            </div>
            <div className="w-full my-7 flex justify-between rounded-lg px-[24px] py-[12px] bg-white bg-opacity-[15%]">
              <div className="flex ">
                <img
                  src="images/cryptoImage.png"
                  className="w-[40px] h-[40px] m-auto"
                ></img>
                <div className="m-auto">
                  <p className="text-white text-[20px]">1,000 BTC</p>
                  <p className="text-[#A0A0A0] text-[16px]">#50284184</p>
                </div>
              </div>
              <img
                src="images/inscription/trash.png"
                className="w-[24px] h-[24px] cursor-pointer my-auto"
              ></img>
            </div>
            <div className="my-7">
              <p className="text-[14px] text-white">设置价格</p>
              <div className="flex my-1 justify-between p-3 w-full border border-[#767676] rounded-lg">
                <input
                  type="text"
                  className="w-[70%] outline-none bg-transparent"
                />
                <p className="text-[14px] text-white">sats/dddd</p>
              </div>
              <p className="text-[14px] text-[#D9D9D9]">$0</p>
            </div>

            <div className="my-7">
              <p className="text-[14px] text-white">总价</p>
              <div className="flex my-1 justify-between p-3 w-full border border-[#767676] rounded-lg">
                <input
                  type="text"
                  className="w-[70%] outline-none bg-transparent"
                />
                <p className="text-[14px] text-white">BTC</p>
              </div>
              <p className="text-[14px] text-[#D9D9D9]">$0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white w-full h-[92px] flex bg-opacity-10  sticky bottom-0">
        <div className="max-w-[1240px] w-full m-auto z-10 flex justify-between">
          <div className="flex">
            <div className="m-auto mr-3 bg-white flex rounded-full w-[36px] h-[36px]  bg-opacity-30">
              <FontAwesomeIcon className="m-auto" icon={faHome} />
            </div>
            <div className="font-mont m-auto">
              <p className="text-[14px] text-[#C4C4C4]">
                Service fee
                <button className="text-[12px] overflow-auto border-none bg-gradient-to-r from-blue-500 to-pink-400 rounded-md border-2 m-1 px-1 cursor-pointer">
                  Free
                </button>
              </p>
              <p className="text-[20px] text-white">
                0 BTC <span className="text-[#C4C4C4] text-[14px]">$0</span>
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="text-right font-mont">
              <p className="text-[#C4C4C4] text-[14px]">Your profits</p>
              <div className="flex">
                <img
                  src="images/cryptoImage.png"
                  className="w-[24px] h-[24px]"
                />
                <p className="text-[20px] text-white">
                  0 BTC <span className="text-[14px] text-[#C4C4C4]">$0</span>
                </p>
              </div>
            </div>
            <button
              className="text-white rounded-[41px] m-2 cursor-pointer md:flex-grow
                  bg-gradient-to-r border-pink-300 border-opacity-70 from-blue-500 to-pink-500 font-semibold py-2 px-4"
              onClick={() => {
                handleBottomListClicked();
              }}
            >
              List
            </button>
          </div>
        </div>
      </div>
      <InscribingConfirmDialog
        isOpenBuy={isOpenInscribeConfirmModal}
        setIsOpenBuy={setIsOpenInscribeConfirmModal}
        handleBuyOkClick={handleBottomListClicked}
      />
    </>
  );
};

export default QuickPricing;
