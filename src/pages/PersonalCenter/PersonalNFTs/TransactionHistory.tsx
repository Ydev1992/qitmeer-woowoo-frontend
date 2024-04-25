import Button from "components/Button";
import TransactionCard from "./TransactionCard";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function TransactionHistory({ history }: { history: any }) {
  const [curPage, setCurPage] = useState(0);
  const paginatedNFTs = history.slice(0, (curPage + 1) * 8);
  const { t } = useTranslation();

  return (
    <>
      <div className="backdrop-blur md:bg-[#FFFFFF1A] bg-transparent rounded-lg md:px-5 px-0 mb-20">
        <div className="justify-between text-lg py-6 text-[#858585] md:flex hidden">
          <div className="w-[130px]">{t("history.Tx Hash")}</div>
          <div className="w-[64px] text-center">{t("history.NFT")}</div>
          <div className="w-[100px] text-center">{t("history.Price")}</div>
          <div className="w-[190px] text-center">{t("history.Date")}</div>
          <div className="w-[140px] text-right">{t("history.Status")}</div>
        </div>
        {paginatedNFTs.map((data: any, i: number) => {
          return <TransactionCard key={i} data={data} />;
        })}
      </div>
      {paginatedNFTs.length !== history.length ? (
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
      )}
    </>
  );
}
