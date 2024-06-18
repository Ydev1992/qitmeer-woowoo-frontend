import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import TextState from "../Interfaces/TextState";

import TextInscConfirmDialog from "../components/TextInscConfirmDialog";

interface MyComponentProps {
  textState: TextState;
  setTextState: (textState: TextState) => void;
}

const InscribingText: React.FC<MyComponentProps> = ({
  textState,
  setTextState,
}) => {
  const { t } = useTranslation();

  const [singleText, setSingleText] = useState<string>("");
  const [bulkText, setBulkText] = useState<string>("");

  const { mode, text } = textState;
  const [confirmDialogShow, setConfirmDialogShow] = useState<boolean>(false);

  const handleConfirmClicked = () => {
    setConfirmDialogShow(true);
  };

  const handleConfirmOkClicked = () => {
    setConfirmDialogShow(false);
  };

  const disableConfirmButton = () => {
    if (text === undefined || text === "") return true;
    return false;
  };

  return (
    <>
      <div className="">
        <div className="text-[#A0A0A0] my-3 text-[14px]">
          Enter your text below and choose between bulk or single option. For
          the single option, we will inscribe exactly as entered. For the bulk
          option, each line will be inscribed separately.
        </div>
        <div className="my-7">
          <span
            className="mr-5 cursor-pointer"
            onClick={() => {
              setTextState({ ...textState, mode: "Single" });
            }}
          >
            <input
              type="checkbox"
              checked={mode === "Single"}
              onChange={(e) => {}}
              className="mr-1"
            />
            <span
              className={mode === "Single" ? "text-white" : " text-gray-400"}
            >
              Single
            </span>
          </span>
          <span
            className="mr-3 cursor-pointer"
            onClick={() => {
              setTextState({ ...textState, mode: "Bulk" });
            }}
          >
            <input
              type="checkbox"
              checked={mode === "Bulk"}
              onChange={(e) => {}}
              className="mr-1"
            />
            <span className={mode === "Bulk" ? "text-white" : " text-gray-400"}>
              Bulk
            </span>
          </span>
        </div>
        <div>
          <textarea
            onChange={(e) => {
              let xx = e.target.value;
              if (mode === "Single") {
                setSingleText(xx);
              } else {
                setBulkText(xx);
              }
              setTextState({ ...textState, text: xx });
            }}
            rows={24}
            value={mode === "Single" ? singleText : bulkText}
            className="border-2 text-[#A0A0A0] p-3 rounded-lg bg-transparent outline-none border-[#434343] w-full min-h-[244px] max-h-[244px]"
          ></textarea>
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
        <TextInscConfirmDialog
          isOpenBuy={confirmDialogShow}
          setIsOpenBuy={setConfirmDialogShow}
          handleBuyOkClick={handleConfirmOkClicked}
          textState={textState}
        />
      </div>
    </>
  );
};

export default InscribingText;
