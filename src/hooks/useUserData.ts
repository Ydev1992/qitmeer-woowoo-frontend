import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import useRefresh from "./useRefresh";
import { useWeb3React } from "contexts/wagmi";
import { useAccount } from "wagmi";

import {
  fetchETHBalanceAsync,
  fetchUserCollectionBalanceAsync,
  fetchUserCreatedCollectionsAsync,
  fetchUserInfoAsync,
  fetchUserListedCollectionsAsync,
  fetchUserOwnedNFTsAsync,
  fetchUserTransactionHistoryAsync,
  setDefaultValue,
} from "state/user";
import { isAddress } from "ethers/lib/utils.js";
import { useUserOwnedNFTsByCollection } from "state/hooks";
import { SUPPORTED_CHAIN_IDS } from "config/constants/networks";
import { ProjectContext } from "contexts/ProjectContext";

export const useUserFetchData = () => {
  const dispatch: any = useDispatch();
  const { jwtToken } = useContext(ProjectContext);
  function fetchInfos(account: `0x${string}`, chainId: number) {
    dispatch(fetchUserInfoAsync(account, jwtToken));
    dispatch(fetchUserCollectionBalanceAsync(account, chainId));
    dispatch(fetchETHBalanceAsync(account, chainId));
    dispatch(fetchUserCreatedCollectionsAsync(account, chainId));
    dispatch(fetchUserListedCollectionsAsync(account as string, chainId));
    dispatch(fetchUserTransactionHistoryAsync(account));
  }
  return { fetchInfos };
};
export const useUserData = () => {
  const dispatch: any = useDispatch();
  const { chainId } = useWeb3React();
  const { address: account } = useAccount();
  // const account = "0x4edC7a04441de91Ef8783c996267d57d87B85543";

  const { fastRefresh } = useRefresh();
  const { fetchInfos } = useUserFetchData();

  useEffect(() => {
    if (
      !account ||
      !isAddress(account as `0x${string}`) ||
      !SUPPORTED_CHAIN_IDS.includes(chainId)
    ) {
      dispatch(setDefaultValue());
      return;
    }
    fetchInfos(account, chainId as number);
  }, [fastRefresh, dispatch, account, chainId]);
};

export const useFetchUserOwnedNFTsByCollection = (address: any) => {
  const nfts = useUserOwnedNFTsByCollection(address);
  const dispatch: any = useDispatch();
  const { chainId } = useWeb3React();
  const { address: account } = useAccount();
  // const account = "0x4edC7a04441de91Ef8783c996267d57d87B85543";

  const { fastRefresh } = useRefresh();

  useEffect(() => {
    if (
      !isAddress(account as `0x${string}`) ||
      !isAddress(address) ||
      !SUPPORTED_CHAIN_IDS.includes(chainId)
    )
      return;
    dispatch(fetchUserOwnedNFTsAsync(address, account, chainId));
  }, [fastRefresh, dispatch, account, chainId, address]);
  return nfts;
};
