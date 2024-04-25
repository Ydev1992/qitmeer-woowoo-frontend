import { ConfirmSVG, CopySVG } from "assets/svgs";
import { useTranslation } from "react-i18next";
import { getEllipsis, isAddress } from "utils/functions";
import { useState } from "react";
import { getChainName } from "config/chains";

export default function Detail({ nftInfo }: any) {
  const { t } = useTranslation();
  const details = [
    { name: t("createNFT.Network"), data: getChainName(nftInfo.chainId), isCopy: false },
    { name: t("nftDetail.Contract address"), data: isAddress(nftInfo.address), isCopy: true },
    { name: t("nftDetail.Token ID"), data: nftInfo.tokenId, isCopy: false },
    { name: t("nftDetail.Token standard"), data: "ERC-721", isCopy: false },
    { name: t("nftDetail.Owner"), data: nftInfo.owner?.wallet, isCopy: true },
    { name: t("nftDetail.Creator"), data: nftInfo.creator?.wallet, isCopy: true },
  ];
  const [isCopied, setIsCopied] = useState(new Array(6).fill(false));

  const onCopyAddress = (address: string, index: number) => {
    const temp: any = [...isCopied];
    temp[index] = true;
    setIsCopied(temp);
    setTimeout(() => {
      const temp: any = [...isCopied];
      temp[index] = false;
      setIsCopied(temp);
    }, 1000);
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="w-full">
      <div className="text-2xl font-semibold">Details</div>
      {details.map((data, i) => {
        return (
          <div className="flex justify-between items-center mt-6 text-sm" key={i}>
            <div className="text-[#C4C4C4]">{data.name}</div>
            <div className="flex items-center">
              <div>{data.isCopy ? getEllipsis(data.data) : data.data}</div>
              {data.isCopy ? (
                <div
                  className={`ml-1 cursor-pointer ${isCopied[i] ? "text-success" : ""}`}
                  onClick={() => onCopyAddress(data.data, i)}
                >
                  {isCopied[i] ? ConfirmSVG : CopySVG}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
