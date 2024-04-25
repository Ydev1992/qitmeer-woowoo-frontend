import Button from "components/Button";
import AuctionNFTCard from "components/NFTCard/AuctionNFTCard";
import ListingNFTCard from "components/NFTCard/ListingNFTCard";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useViewCount } from "state/hooks";
import { updateViewCountAsync } from "state/marketplace";

export default function NFTList({ nfts, type }: { nfts: any; type: string }) {
  const { t } = useTranslation();
  const viewCount = useViewCount(type);
  const paginatedNFTs = nfts.slice(0, viewCount);

  const node: any = useRef();
  const dispatch: any = useDispatch();

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = node.current;
    if (scrollTop + clientHeight >= scrollHeight - 50 && scrollHeight > 50) {
      console.log("reached bottom hook in scroll component");
      dispatch(updateViewCountAsync(type, viewCount + 12));
    }
  }, [node, viewCount, type]);

  useEffect(() => {
    if (node.current) {
      node.current.addEventListener("scroll", handleScroll);
      return () => node.current?.removeEventListener("scroll", handleScroll);
    }
  }, [node, handleScroll]);

  return (
    <div>
      <div
        className={`flex flex-wrap w-[calc(100%+16px)] -ml-2 max-h-[1000px] overflow-y-scroll yellowScroll ${
          paginatedNFTs.length ? "pt-2" : ""
        } rounded-[12px] bg-[#FFFFFF1A] backdrop-blur`}
        ref={node}
      >
        {paginatedNFTs.map((data: any, i: number) => {
          return (
            <div
              key={i}
              className="mx-2 xl:md:sm:w-[calc(25%-16px)] md:sm:w-[calc(100%/3-16px)] sm:w-[calc(50%-16px)] w-[calc(100%-16px)]"
            >
              {data.type === "auction" ? (
                <AuctionNFTCard nft={data} />
              ) : (
                <ListingNFTCard nft={data} />
              )}
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
    </div>
  );
}
