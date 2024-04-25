import { XMarkSVG } from "assets/svgs";
import { SkeletonComponent } from "components/SkeletonComponent";
import StyledImage from "components/StyledImage";
import { tokens } from "config/tokens";
import { ProjectContext } from "contexts/ProjectContext";
import { ethers } from "ethers";
import useNFTInfo from "hooks/useNFTInfo";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { shortenString } from "utils";

export default function RecordNFTCard({
  nft,
  setCategoryOpen,
}: {
  nft: any;
  setCategoryOpen: any;
}) {
  const nftInfo = useNFTInfo(nft.chainId, nft.address, nft.tokenId);

  let currency: any = Object.keys(tokens[nft.chainId]).find(
    (key) => tokens[nft.chainId][key].address.toLowerCase() === nft.currency
  );
  currency = tokens[nft.chainId][currency];

  const navigate = useNavigate();
  const { onRecords } = useContext(ProjectContext);

  const node: any = useRef();
  return (
    <div
      className="p-[2px_8px] cursor-pointer transition w-[calc(100%+16px)] -ml-2 cursor-pointer"
      onClick={(e) => {
        if (node.current && !node.current.contains(e.target)) {
          navigate(`/nft/813/${nft.address}/${nft.tokenId}`);
          setCategoryOpen(false);
        }
      }}
    >
      <div className="flex items-center justify-between hover:bg-[#b9b9b924] rounded-lg px-2">
        <div className="flex items-center justify-between flex-1">
          <div className="flex items-center">
            <div className="w-10 h-10">
              <div className="w-full aspect-square rounded-lg overflow-hidden flex justify-center items-center [&>span]:w-full [&>span]:h-full">
                {!nftInfo ? (
                  <SkeletonComponent className="!w-full !max-w-full !h-full flex" />
                ) : (
                  <StyledImage src={nftInfo.image} alt={""} className="rounded-lg" />
                )}
              </div>
            </div>
            <div className="font-medium py-3 ml-2 text-base">
              {!nftInfo ? (
                <SkeletonComponent className="!w-[100px] !max-w-[100px]" />
              ) : (
                shortenString(nftInfo.name, 20)
              )}
            </div>
          </div>
          {currency ? (
            <div className="flex items-center text-white font-semibold text-base">
              {nft.currency !== ethers.constants.AddressZero
                ? `${(nft.floorPrice / Math.pow(10, currency.decimals)).toFixed(2)} ${
                    currency.symbol
                  }`
                : "Not Listed"}
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className="[&>svg]:w-4 p-1 [&>svg]:h-4 rounded-full bg-[#b9b9b934]"
          ref={node}
          onClick={() =>
            onRecords({ chainId: nft.chainId, tokenId: nft.tokenId, address: nft.address }, 2)
          }
        >
          {XMarkSVG}
        </div>
      </div>
    </div>
  );
}
