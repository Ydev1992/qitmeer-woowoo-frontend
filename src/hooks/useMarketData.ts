import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useRefresh from "./useRefresh";
import { useWeb3React } from "contexts/wagmi";
import { fetchAuctionsAsync, fetchBidInfoAsync, fetchListingsAsync } from "state/marketplace";
import { useBidData } from "state/hooks";

export const useMarketFetchData = () => {
  const dispatch: any = useDispatch();
  function fetchInfos(chainId: number) {
    dispatch(fetchAuctionsAsync(chainId));
    dispatch(fetchListingsAsync(chainId));
  }
  return { fetchInfos };
};

export const useMarketData = () => {
  const { fetchInfos } = useMarketFetchData();
  const { chainId } = useWeb3React();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    fetchInfos(chainId as number);
  }, [chainId, fastRefresh]);
  return { fetchInfos };
};

export const useFetchBidInfo = (auctionId: number) => {
  const info = useBidData(auctionId);
  const { fastRefresh } = useRefresh();
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(fetchBidInfoAsync(auctionId));
  }, [fastRefresh]);
  return info;
};
