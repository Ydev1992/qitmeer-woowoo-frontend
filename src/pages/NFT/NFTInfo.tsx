import Button from "components/Button";
import { SkeletonComponent } from "components/SkeletonComponent";
import { useTranslation } from "react-i18next";
import { shortenString } from "utils";
import { getEllipsis } from "utils/functions";

export default function NFTInfo({ nftInfo }: any) {
  const { t } = useTranslation();
  return (
    <div className="leading-[1.0]  overflow-hidden text-ellipsis whitespace-nowrap">
      <div className="flex justify-between items-center sm:flex-row flex-col-reverse">
        <div className="sm:mt-0 mt-4 sm:text-left text-center flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
          <div className="text-[32px] font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
            {!nftInfo || !nftInfo.name ? (
              <SkeletonComponent className="!max-w-[100px] !w-[100px]" />
            ) : (
              shortenString(nftInfo.name, 20)
            )}
          </div>
          <div className="text-[#C4C4C4] mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {!nftInfo || !nftInfo.collectionName ? (
              <SkeletonComponent className="!max-w-[200px] !w-[200px]" />
            ) : (
              nftInfo.collectionName
            )}
          </div>
        </div>
        <div className="sm:w-fit w-full flex flex-col items-end sm:ml-4 ml-0">
          <div className="text-[#C4C4C4]">{t("nft.Created by")}</div>
          <div className="mt-3 gradient-text font-bold">
            {!nftInfo || !nftInfo.creator ? (
              <SkeletonComponent className="!max-w-[100px] !w-[100px]" />
            ) : (
              nftInfo.creator.nickname ?? getEllipsis(nftInfo.creator.wallet)
            )}
          </div>
        </div>
      </div>
      <div className="flex sm:mt-4 mt-8 flex sm:justify-start justify-center flex-wrap">
        {nftInfo &&
          nftInfo.attributes &&
          nftInfo.attributes
            .filter((data: any) => data)
            .map((data: any, i: number) => {
              return (
                <Button
                  key={i}
                  type={"category"}
                  className="!text-xs !p-2 !rounded-lg mr-3 whitespace-nowrap mb-2"
                >
                  <div className="text-left">
                    <div>{data.trait_type}</div>
                    <div className="text-lg">{data.value}</div>
                  </div>
                </Button>
              );
            })}
      </div>
      <div className="leading-[1.6] text-[#C4C4C4] whitespace-normal break-all">
        {!nftInfo || !nftInfo.description ? (
          <SkeletonComponent className="!max-w-full w-full" count={3} />
        ) : (
          nftInfo.description
        )}
      </div>
    </div>
  );
}
