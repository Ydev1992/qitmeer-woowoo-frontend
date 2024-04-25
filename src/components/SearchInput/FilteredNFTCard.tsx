import { SkeletonComponent } from "components/SkeletonComponent";
import StyledImage from "components/StyledImage";
import { tokens } from "config/tokens";
import { ethers } from "ethers";
import useNFTInfo from "hooks/useNFTInfo";
import { Link } from "react-router-dom";
import { shortenString } from "utils";

export default function FilteredNFTCard({
  nft,
  setCategoryOpen,
  criteria,
}: {
  nft: any;
  setCategoryOpen: any;
  criteria: string;
}) {
  const nftInfo = useNFTInfo(nft.chainId, nft.address, nft.tokenId);

  let currency: any = Object.keys(tokens[nft.chainId]).find(
    (key) => tokens[nft.chainId][key].address.toLowerCase() === nft.currency
  );
  currency = tokens[nft.chainId][currency];

  return !nftInfo || nftInfo?.name.toLowerCase().includes(criteria.toLowerCase()) ? (
    <Link
      className="p-[2px_8px] cursor-pointer transition  w-[calc(100%+16px)] -ml-2"
      to={`/nft/813/${nft.address}/${nft.tokenId}`}
      onClick={() => setCategoryOpen(false)}
    >
      <div className="flex items-center justify-between hover:bg-[#b9b9b924] rounded-lg px-2">
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
    </Link>
  ) : (
    ""
  );
}
