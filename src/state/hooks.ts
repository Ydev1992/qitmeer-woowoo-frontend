import { useSelector } from "react-redux";

export const useUserOwnedCollections = () =>
  useSelector((state: any) => state.user.ownedCollections);

export const useUserListedCollections = () =>
  useSelector((state: any) => state.user.listedCollections);

export const useUserOwnedNFTsByCollection = (address: string) =>
  useSelector((state: any) => state.user.ownedCollections[address]?.nfts ?? []);

export const useUserListedNFTsByCollection = (address: string) =>
  useSelector((state: any) => state.user.listedCollections[address]?.nfts ?? []);

export const useUserETHBalance = () => useSelector((state: any) => state.user.balance);

export const useUserInfo = () => useSelector((state: any) => state.user.info);

export const useUserCreatedCollections = () =>
  useSelector((state: any) => state.user.createdCollections);

export const useUserTransactionHistory = () =>
  useSelector((state: any) => state.user.transactionHistory);

//Market Hook
export const useMarketPlaceListings = () =>
  useSelector((state: any) =>
    Object.keys(state.marketplace.listings).map((key) => state.marketplace.listings[key])
  );

export const useMarketPlaceAuctions = () =>
  useSelector((state: any) =>
    Object.keys(state.marketplace.auctions).map((key) => state.marketplace.auctions[key])
  );

export const useNFTData = (chainId: any, address: any, tokenId: any) =>
  useSelector((state: any) => {
    if (state.marketplace.nfts[chainId] && state.marketplace.nfts[chainId][address])
      return state.marketplace.nfts[chainId][address][tokenId];
    return undefined;
  });

export const useNFTDatas = (chainId: any, address: any, tokenIds: any) =>
  useSelector((state: any) =>
    address && state.marketplace.nfts[chainId] && state.marketplace.nfts[chainId][address]
      ? tokenIds.map((tokenId: number) => state.marketplace.nfts[chainId][address][tokenId])
      : []
  );

export const useBidData = (auctionId: number) =>
  useSelector((state: any) => state.marketplace.auctions[auctionId]?.bids ?? []);

export const useViewCount = (type: string) =>
  useSelector((state: any) => state.marketplace.viewCount[type]);
