import React, { useState } from "react";
import BRCCard from "./BRCCard";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import Notification from "components/Notification";

import ConfirmPopupDialog from "../components/ConfirmPopupDialog";
import BuyPopupDialog from "../components/BuyPopupDialog";

const brcTokens = [
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
  { id: "#62114778", name: "64, 000 loli", price: 0.001 },
];

export default function BRCCardList() {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenBuy, setIsOpenBuy] = useState<boolean>(false);

  const handleBuyClick = () => {
    setIsOpen(true);
  };
  const handleConfirmClick = () => {
    setIsOpen(false);
    setIsOpenBuy(true);
  };

  const handleBuyOkClick = () => {
    setIsOpenBuy(false);
    toast(
      <Notification
        type={"success"}
        msg={"BRC-20 token has been purchased successfully."}
      />
    );
  };

  const node: any = useRef();
  const dispatch: any = useDispatch();

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = node.current;
    if (scrollTop + clientHeight >= scrollHeight - 50 && scrollHeight > 50) {
      console.log("reached bottom hook in scroll component");
    }
  }, [node]);

  useEffect(() => {
    if (node.current) {
      node.current.addEventListener("scroll", handleScroll);
      return () => node.current?.removeEventListener("scroll", handleScroll);
    }
  }, [node, handleScroll]);

  return (
    <div>
      <div
        className={`flex flex-wrap pt-4 w-[calc(100%+16px)] -ml-2  rounded-[12px] bg-transparent`}
        ref={node}
      >
        {brcTokens.map((brcToken: any, i: number) => {
          return (
            <div
              key={i}
              className="mx-2 xl:md:sm:w-[calc(100%/6-16px)] md:sm:w-[calc(100%/4-16px)] sm:w-[calc(100%/3-16px)] w-[calc(100%-16px)]"
            >
              <BRCCard brcToken={brcToken} handleBuyClick={handleBuyClick} />
            </div>
          );
        })}
      </div>
      {/* {paginatedNFTs.length !== nfts.length ? (
        <div className="mt-8 mx-auto max-w-[300px] w-full">
          <Button
            type={"primary"}
            border="1px"
            className="flex-1 font-semibold text-xl h-12 w-full"
            itemClassName="p-[6px_12px] w-[calc(100%-2px)] tracking-normal relative"
            onClick={() => setCurPage(curPage + 1)}
          >
            {t("actions.Load More")}
          </Button>
        </div>
      ) : (
        ""
      )} */}

      <ConfirmPopupDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleConfirmClick={handleConfirmClick}
      />

      <BuyPopupDialog
        isOpenBuy={isOpenBuy}
        setIsOpenBuy={setIsOpenBuy}
        handleBuyOkClick={handleBuyOkClick}
      />
    </div>
  );
}
