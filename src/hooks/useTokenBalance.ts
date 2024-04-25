import { useEffect, useState } from "react";
import useRefresh from "./useRefresh";
import { getErc20TokenContract, getMulticallContract } from "utils/contracts";
import { isAddress } from "utils/functions";
import { NATIVE_ADDRESS } from "config/constants";

export const useTokenBalance = (account: string, address: string, chainId: number) => {
  const { fastRefresh } = useRefresh();

  const [balance, setBalance] = useState("0");

  async function fetchBalance() {
    try {
      if (!isAddress(address) || !isAddress(account)) return;
      if (address.toLowerCase() === NATIVE_ADDRESS.toLowerCase()) {
        const multicallContract = getMulticallContract(null, chainId);
        const ethBalance = await multicallContract.getEthBalance(account);
        setBalance(ethBalance.toString());
      } else {
        const tokenContract = getErc20TokenContract(address, null, chainId);
        const balance = await tokenContract.balanceOf(account);
        setBalance(balance.toString());
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchBalance();
  }, [address, fastRefresh, account, chainId]);
  return { balance, fetchBalance };
};
