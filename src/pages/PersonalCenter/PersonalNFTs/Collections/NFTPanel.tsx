import LoadingText from "components/LoadingText";
import NFTList from "components/NFTList";
import { tokens } from "config/tokens";
import { ethers } from "ethers";
import { useMarketPlaceAuctions, useMarketPlaceListings } from "state/hooks";

export default function NFTPanel({ nfts, count }: { nfts: any; count?: number }) {
  const listings = useMarketPlaceListings();
  const auctions = useMarketPlaceAuctions();
  const wrappedNFTs = nfts.map((nft: any) => {
    const isExisting = [...listings, ...auctions].find(
      (listing: any) =>
        listing.assetContract &&
        listing.assetContract.toLowerCase() === nft.address &&
        Number(listing.tokenId) === Number(nft.tokenId)
    );

    return (
      isExisting ?? {
        type: "none",
        address: nft.address,
        floorPrice: 0,
        currency: tokens[813].meer.address.toLowerCase(),
        chainId: 813,
        tokenId: nft.tokenId,
        id: 0,
      }
    );
  });
  return nfts.length ? (
    <div>
      <NFTList nfts={wrappedNFTs} type={"personal"} />
    </div>
  ) : count ? (
    <div className="text-xl">
      <LoadingText text={"Loading NFTs"} />
    </div>
  ) : (
    <div className="w-full h-[68px] backdrop-blur bg-[#FFFFFF1A] rounded-lg flex justify-center items-center">
      <div className="mr-4 text-[#C4C4C4]">You don't have any NFTs yet! 🤔</div>
      <a
        className="gradient-text w-fit underline font-semibold relative before:absolute before:w-full before:h-[1px] before:bg-black before:bottom-1 before:bg-[linear-gradient(130deg,#4FC0FF_0%,#C23FFF_100%)]"
        href={"/"}
      >
        Go Marketplace
      </a>
    </div>
  );
}
