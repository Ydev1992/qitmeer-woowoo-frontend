import React, { useState } from "react";
import "./ConfirmPopupDialog.css";
import { ConfirmSVG, CopySVG, LinkSVG } from "assets/svgs";
import { useDispatch } from "react-redux";



interface InscriptionDataType {
  amount: Number;
  inscriptionId: string;
  isBrc20: boolean;
  listingTime: Number;
  listingUrl: string;
  orderId: Number;
  ownerAddress: string;
  price: Number;
  slug: string;
  unitPrice: Number;

  inscriptionNumber: Number,
  location: String,
  token: String,
  state: String,
  msg: String,
  tokenType: String,
  actionType: String,
  logoUrl: String,
  txId: String,
  blockHeight: Number,
  contentSize: Number,
  time: String

}


interface ConfirmPopupProps {
  isOpenBuy: boolean;
  setIsOpenBuy: React.Dispatch<React.SetStateAction<boolean>>;
  handleBuyOkClick: () => void;

  inscriptionDatum: InscriptionDataType;
  tokenDecimal: Number;
  BTCPrice: Number;
  logoUrl: String;
}



const BuyPopupDialog: React.FC<ConfirmPopupProps> = (props) => {

  const { isOpenBuy, setIsOpenBuy, handleBuyOkClick } = props;
  const [isCopied, setIsCopied] = useState(false);


  const { inscriptionDatum } = props;

  const [currentSelectedFeeType, setCurrentSelectedFeeType] = useState<Number>(1);
  const [customFeeAmount, setCustomFeeAmount] = useState<Number>(10);

  const { logoUrl, tokenDecimal, BTCPrice } = props;

  const myRoundByk = (x: Number, k: number) => {
    return Math.round(Math.pow(10, k) * Number(x)) / Math.pow(10, k);
  };

  const handleFeeSelected = (type: Number) => {
    setCurrentSelectedFeeType(type);
  }

  const onCopyAddress = (address: string) => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    navigator.clipboard.writeText(address);
  };

  return (
    isOpenBuy && (
      <div className="relative  flex items-center justify-center min-h-screen">
        <div className="overlay bg-opacity-10 backdrop-blur-sm">
          <div className="dialog overflow-y-scroll relative font-Mont w-[600px] border-white border-2 rounded-lg bg-black text-white">
            <h2 className=" text-2xl font-semibold mb-4">Buy now</h2>
            <button
              onClick={() => setIsOpenBuy(false)}
              className="text-4xl absolute right-5 top-3"
            >
              &times;
            </button>

            <div className="flex justify-between mb-6 mt-6">
              <div className="flex">
                <img
                  src={logoUrl.toString()}
                  alt="Image"
                  className="w-1/5 md:w-1/4 lg:w-1/5 xl:w-1/6 rounded-full bg-gray-700"
                />
                <div className="ml-4 w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6">
                  <p className="text-3xl text-white">{inscriptionDatum.amount.toString()} {inscriptionDatum.slug}</p>
                  <p>#{inscriptionDatum.inscriptionNumber.toString()}</p>
                </div>
              </div>
              <div className="w-[60%] ">
                <p className="font-medium text-sm">
                  Unit price:{myRoundByk((Number(inscriptionDatum.unitPrice)*1e8), 3).toString()} sats
                  /{inscriptionDatum.slug} ${myRoundByk(Number(inscriptionDatum.unitPrice)*Number(BTCPrice), 5).toString()}
                </p>
                <div className="flex items-center justify-between text-lg text-[#C4C4C4]">
                  <div>From: {isCopied ? "Copied" : inscriptionDatum.ownerAddress.slice(0, 5) + "..." + inscriptionDatum.ownerAddress.slice(-5)}</div>
                  <div
                    className="w-5 flex justify-center cursor-pointer"
                    onClick={() => onCopyAddress(inscriptionDatum.ownerAddress)}
                  >
                    {isCopied ? ConfirmSVG : CopySVG}
                  </div>
                </div>
              </div>
            </div>
            <h2>Fees</h2>
            <div className="flex justify-between mt-2 mb-2">
              <p className="text-gray-400">Service fee</p>
              <p className="text-[#4FC0FF]">Free</p>
            </div>
            <div className="font-Mont">
              <div className="flex justify-between">
                <h2>Network fee</h2>
                <p>13,770 sats &asymp; $7.51</p>
              </div>
              <div className="flex flex-wrap my-3">
                <div onClick={() => {handleFeeSelected(1)}} className={`p-2 ${currentSelectedFeeType == 1 ? "border border-white" : ""} cursor-pointer text-center rounded-lg bg-white/20 m-2 mx-2 xl:md:sm:w-[calc(100%/4-16px)] md:sm:w-[calc(100%/4-16px)] sm:w-[calc(100%/2-16px)] w-[calc(100%/2-16px)] h-[150px]`}>
                  <p>
                    <img
                      className="w-[20%] m-auto"
                      src="/icons/bicycle.png"
                      alt="bicycle"
                    />
                  </p>
                  <p className="text-white text-lg font-semibold">Slow</p>
                  <p className="text-gray-400">45 sats/vB</p>
                  <p className="text-gray-400">$6.26</p>
                </div>

                <div onClick={() => {handleFeeSelected(2)}}  className={`p-2 ${currentSelectedFeeType == 2 ? "border border-white" : ""} cursor-pointer text-center rounded-lg bg-white/20 m-2 mx-2 xl:md:sm:w-[calc(100%/4-16px)] md:sm:w-[calc(100%/4-16px)] sm:w-[calc(100%/2-16px)] w-[calc(100%/2-16px)] h-[150px]`}>
                  <p>
                    <img
                      className="w-[20%] m-auto"
                      src="/icons/car.png"
                      alt="bicycle"
                    />
                  </p>
                  <p className="text-white text-lg font-semibold">Standard</p>
                  <p className="text-gray-400">45 sats/vB</p>
                  <p className="text-gray-400">$6.26</p>
                </div>

                <div onClick={() => {handleFeeSelected(3)}}  className={`p-2 ${currentSelectedFeeType == 3 ? "border border-white" : ""} cursor-pointer text-center rounded-lg bg-white/20 m-2 mx-2 xl:md:sm:w-[calc(100%/4-16px)] md:sm:w-[calc(100%/4-16px)] sm:w-[calc(100%/2-16px)] w-[calc(100%/2-16px)] h-[150px]`}>
                  <p>
                    <img
                      className="w-[20%] m-auto"
                      src="/icons/rocket.png"
                      alt="bicycle"
                    />
                  </p>
                  <p className="text-white text-lg font-semibold">Fast</p>
                  <p className="text-gray-400">45 sats/vB</p>
                  <p className="text-gray-400">$6.26</p>
                </div>

                <div onClick={() => {handleFeeSelected(4)}}  className={`p-2 ${currentSelectedFeeType == 4 ? "border border-white" : ""} cursor-pointer text-center rounded-lg bg-white/20 m-2 mx-2 xl:md:sm:w-[calc(100%/4-16px)] md:sm:w-[calc(100%/4-16px)] sm:w-[calc(100%/2-16px)] w-[calc(100%/2-16px)] h-[150px]`}>
                  <p>
                    <img
                      className="w-[20%] m-auto"
                      src="/icons/setting.png"
                      alt="bicycle"
                    />
                  </p>
                  <p className="text-white text-lg font-semibold">Custom</p>
                  <p className="text-gray-400">{customFeeAmount.toString()} sats/vB</p>
                  <p className="text-gray-400">${myRoundByk(Number(customFeeAmount)*1e-8*Number(BTCPrice), 4)}</p>
                </div>
              </div>

              {currentSelectedFeeType === 4 && <div className="my-3">
                <p>Set a custom network fee</p>
                <input className="mt-1 w-full bg-transparent rounded-lg bg-opacity-50 outline-none border border-white p-2" type="number" onChange={(e) => {
                  if(Number(e.target.value) > 0)
                    setCustomFeeAmount(Number(e.target.value));
                  else
                    setCustomFeeAmount(0);
                }} value={customFeeAmount.toString()} />
              </div>}

              <hr className="my-5" />

              <div className="flex justify-between">
                <p>Total price</p>
                <div className="text-right">
                  <div className="flex">
                    <img width={30} src="images/networks/bsc.png" />
                    <p>{myRoundByk(inscriptionDatum.price, 6)} BTC</p>
                  </div>
                  <p className="text-gray-500">$ {myRoundByk(Number(inscriptionDatum.price) * Number(BTCPrice), 6)}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <p>Available balance</p>
              <div className="flex justify-between">
                <p className="font-semibold text-red-600 mr-5">0 BTC</p>
                <a className="text-gradient ml-5" href="#">
                  Swap
                </a>
                <a className="text-gradient ml-3" href="#">
                  Add funds
                </a>
              </div>
            </div>
            <div className="flex w-full text-right justify-between">
              <div></div>
              <div className="flex w-[40%]">
                <button
                  className="border-2 text-white border-gray-300 rounded-lg m-2 cursor-pointer md:flex-grow
                hover:bg-gray-600py-2 px-4"
                  onClick={() => {
                    setIsOpenBuy(false);
                  }}
                >
                  Cancel
                </button>

                <button
                  className="text-white rounded-lg m-2 cursor-pointer md:flex-grow
                bg-gradient-to-r border-pink-300 border-opacity-70 from-blue-500 to-pink-500 font-semibold py-2 px-4"
                  onClick={() => {
                    handleBuyOkClick();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default BuyPopupDialog;
