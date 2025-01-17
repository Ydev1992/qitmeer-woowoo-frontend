import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faInfoCircle,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import Button from "components/Button";
import ExitInscribingPopupDialog from "./components/ExitInscribingPopupDialog";

import { toast } from "react-toastify";
import Notification from "components/Notification";

const salesList = [
  { price: 1000, id: "#50284184" },
  { price: 300, id: "#20284184" },
  { price: 210, id: "#90284184" },
  { price: 5021, id: "#80284184" },
  { price: 211, id: "#70284184" },
  { price: 1000, id: "#50284184" },
  { price: 300, id: "#20284184" },
  { price: 210, id: "#90284184" },
  { price: 5021, id: "#80284184" },
  { price: 211, id: "#70284184" },
];

const ListForSale = () => {
  const navigate = useNavigate();
  const [hasRecords, sethasRecords] = useState<boolean>(false);

  const [isOpenExitModal, setIsOpenExitModal] = useState<boolean>(false);

  const handleExitOkClick = () => {
    setIsOpenExitModal(false);
    navigate(-1);
  };

  const handleInscribeTransfer = () => {};

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
        <div className="max-w-[1240px] z-10 mx-auto flex flex-col gap-16">
          <div className="cursor-pointer  z-20">
            <button
              onClick={() => {
                setIsOpenExitModal(true);
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
                List for sale
              </p>
            </button>
          </div>
          <div className="sm:py-0 py-5 md:flex grid md:justify-between w-full px-7 h-auto md:h-[96px] bg-white bg-opacity-10 rounded-xl">
            <div className="md:w-[623px] sm:flex grid">
              <div className="flex">
                <img
                  className="m-auto w-[80px] h-[80px] sm:w-[50px] sm:h-[50px] mr-3 bg-gray-700 p-2 inline float-left rounded-full text-indigo-500"
                  src="/images/inscription/hero1.png"
                />
                <div className="m-auto">
                  <p className="font-Mont text-[20px] text-white">Loli</p>
                  <p className="font-Mont text-[14px] text-white">
                    Floor price: 2.25 sats
                  </p>
                  <p className="font-Mont text-[14px] text-white">
                    Recent sale: 0 sats
                  </p>
                </div>
              </div>
              <div className="w-0 h-[55.5px] m-auto hidden sm:block border border-[#434343]"></div>
              <div className="m-auto font-mont">
                <p className="text-white text-[20px]">0 / 0</p>
                <div className="text-white text-[14px]">
                  <span className="m-auto">Transferable</span>
                  <FontAwesomeIcon icon={faInfoCircle} className="m-auto" />
                </div>
              </div>
              <div className="w-0 h-[55.5px] m-auto hidden sm:block border border-[#434343]"></div>
              <div className="m-auto font-mont">
                <p className="text-white text-[20px]">0</p>
                <div className="text-white text-[14px]">
                  <span className="m-auto">Available</span>
                  <FontAwesomeIcon icon={faInfoCircle} className="m-auto" />
                </div>
              </div>
            </div>
            <div className="my-auto">
              <Button
                type={"primary"}
                border={"2px"}
                className="h-fit m-auto"
                itemClassName="p-[8px_24px] bg-transparent w-[calc(100%-4px)] text-lg"
                onClick={() => {
                  navigate("/quickPricing");
                }}
              >
                Inscribe transfer
              </Button>
            </div>
          </div>

          {salesList.length ? (
            <div className="w-full flex flex-wrap z-20">
              <div className="w-[179px] m-1 h-[157px] flex rounded-lg bg-white bg-opacity-[15%]">
                <div
                  className="m-auto text-center cursor-pointer"
                  onClick={() => {
                    handleInscribeTransfer();
                  }}
                >
                  <p className="text-white font-bold text-[30px]">+</p>
                  <p className="font-Mont text-[14px] text-[#C4C4C4]">去铭刻</p>
                </div>
              </div>

              {salesList.map((salesItem) => {
                return (
                  <div className="w-[179px] m-1 text-center flex flex-col h-[157px] rounded-lg bg-white bg-opacity-[15%]">
                    <p className="flex mt-5 mx-auto">
                      <img
                        src="images/cryptoImage.png"
                        className="w-[24px] my-auto h-[24px]"
                      ></img>
                      <span className="text-white font-Mont my-auto text-[20px]">
                        {salesItem.price}
                      </span>
                    </p>
                    <div className="h-0 w-[80%] mx-auto my-3 border border-[#333333]"></div>
                    <p className="text-white font-Mont text-[16px]">
                      {salesItem.id}
                    </p>
                    <input type="checkbox" className="my-3" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full h-[555px] flex">
              <div className="m-auto w-auto text-center">
                <p className="text-[24px]">🧐</p>
                <p className="font-mont text-[14px] text-[#C4c4c4]">
                  No records found
                </p>
                <button className="overflow-auto border-none bg-gradient-to-r from-blue-500 to-pink-400 rounded-2xl border-2 m-2 cursor-pointer  md:flex-grow p-3">
                  Inscription transfer
                </button>
              </div>
            </div>
          )}
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
              onClick={() => {}}
            >
              List for sale
            </button>
          </div>
        </div>
      </div>
      <ExitInscribingPopupDialog
        isOpenBuy={isOpenExitModal}
        setIsOpenBuy={setIsOpenExitModal}
        handleBuyOkClick={handleExitOkClick}
      />
    </>
  );
};

export default ListForSale;
