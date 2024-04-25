import { useEffect, useState } from "react";
import useRefresh from "./useRefresh";
import { useAccount } from "wagmi";
import { useWeb3React } from "contexts/wagmi";
import { getCollectionContract, getErc20TokenContract } from "utils/contracts";
import { ethers } from "ethers";
import { isAddress } from "utils/functions";

export const useNFTAllowance = (address: any, to: any) => {
  const { fastRefresh } = useRefresh();
  const { address: account } = useAccount();
  const { chainId } = useWeb3React();

  const [allowance, setAllowance] = useState(false);

  async function fetchAllowance() {
    try {
      if (!account) return;
      const nftContract = getCollectionContract(address, null, chainId);
      const allowance = await nftContract.isApprovedForAll(account, to);
      setAllowance(allowance);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchAllowance();
  }, [address, fastRefresh, account, chainId]);
  return { allowance, fetchAllowance };
};

export const useTokenAllowance = (address: any, to: any) => {
  const { fastRefresh } = useRefresh();
  const { address: account } = useAccount();
  const { chainId } = useWeb3React();

  const [allowance, setAllowance] = useState(ethers.utils.parseEther("0"));

  async function fetchAllowance() {
    try {
      if (!account) return;
      const isNative = address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
      if (!account || !isAddress(address) || isNative) return false;
      const tokenContract = getErc20TokenContract(address, null, chainId);
      const allowance = await tokenContract.allowance(account, to);
      setAllowance(allowance);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchAllowance();
  }, [address, fastRefresh, account, chainId]);
  return { allowance, fetchAllowance };
};
