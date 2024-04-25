import { SkeletonComponent } from "components/SkeletonComponent";
import StyledImage from "components/StyledImage";
import useNFTInfo from "hooks/useNFTInfo";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getBlockExplorerLink, getEllipsis } from "utils/functions";

export default function TransactionCard({ data }: { data: any }) {
  const nftInfo: any = useNFTInfo(813, data.address, data.tokenId);
  const { t } = useTranslation();

  return (
    <>
      <div className="md:flex hidden justify-between text-lg py-3 border-t border-[#565656] items-center">
        <div className="w-[130px]">
          <a
            className="gradient-text font-semibold relative before:absolute before:w-full before:h-[1px] before:bg-black before:bottom-1 before:bg-[linear-gradient(130deg,#4FC0FF_0%,#C23FFF_100%)]"
            target={"_blank"}
            href={getBlockExplorerLink(data.txHash, "transaction")}
          >
            {getEllipsis(data.txHash, 4, 6)}
          </a>
        </div>
        <div className="w-[64px] flex justify-center">
          <Link className="font-semibold relative" to={`/nft/813/${data.address}/${data.tokenId}`}>
            <div className="w-16 h-16">
              {nftInfo ? (
                <StyledImage src={nftInfo.image} className="rounded-lg" />
              ) : (
                <SkeletonComponent className="w-full h-full rounded-lg" />
              )}
            </div>
          </Link>
        </div>
        <div className="w-[100px] flex justify-center whitespace-nowrap">
          {data.amount.value} {data.amount.currency.symbol}
        </div>
        <div className="text-[#656565] w-[190px] text-center whitespace-nowrap">{data.date}</div>
        <div className={`w-[140px] flex justify-end`}>{t(data.status)}</div>
      </div>

      <div className="backdrop-blur bg-[#FFFFFF1A] rounded-lg xs:p-6 p-[24px_12px] mb-2 md:hidden block">
        <div className="flex justify-between text-xl items-center">
          <Link
            to={`/nft/813/${data.address}/${data.tokenId}`}
            className="gradient-text font-semibold relative"
          >
            <div className="w-16 h-16">
              {nftInfo ? (
                <StyledImage src={nftInfo.image} className="rounded-lg" />
              ) : (
                <SkeletonComponent className="w-full h-full rounded-lg" />
              )}
            </div>
          </Link>
          <a
            className="gradient-text font-semibold relative before:absolute before:w-full before:h-[1px] before:bg-black before:bottom-1 before:bg-[linear-gradient(130deg,#4FC0FF_0%,#C23FFF_100%)]"
            target="_blank"
            href={getBlockExplorerLink(data.txHash, "transaction")}
          >
            {getEllipsis(data.txHash, 4, 6)}
          </a>
        </div>

        <div className="flex justify-between mt-3 xs:flex-row flex-col">
          <div>
            Price: {data.amount.value} {data.amount.currency.symbol}
          </div>
          <div>Date: {data.date}</div>
        </div>

        <div className="mt-1">Status: {t(data.status)}</div>
      </div>
    </>
  );
}
