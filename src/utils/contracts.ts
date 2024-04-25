import { ethers } from "ethers";
import { simpleRpcProvider } from "../config/chains";
import { COLLECTION_FACTORY, MARKETPLACE_ADDR, MULTICALL_ADDR } from "../config/contracts";

import MultiCallABI from "../config/abis/MultiCallABI.json";
import ERC20ABI from "../config/abis/ERC20ABI.json";
import CollectionFactoryABI from "../config/abis/CollectionFactoryABI.json";
import QitmeerNFTABI from "../config/abis/QitmeerNFTABI.json";
import MarketplaceABI from "../config/abis/MarketPlaceABI.json";

export const getContract = (abi: any, address: any, signer: any, chainId: any) => {
  const signerOrProvider = signer ?? simpleRpcProvider(chainId);
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getErc20TokenContract = (address: any, signer: any, chainId = 1) => {
  return getContract(ERC20ABI, address, signer, chainId);
};

export const getMulticallContract = (signer: any, chainId = 1) => {
  return getContract(MultiCallABI, MULTICALL_ADDR[chainId], signer, chainId);
};

export const getCollectionFactoryContract = (signer: any, chainId = 1) => {
  return getContract(CollectionFactoryABI, COLLECTION_FACTORY[chainId], signer, chainId);
};

export const getCollectionContract = (address: string, signer: any, chainId = 1) => {
  return getContract(QitmeerNFTABI, address, signer, chainId);
};

export const getMarketplaceContract = (signer: any, chainId = 1) => {
  return getContract(MarketplaceABI, MARKETPLACE_ADDR[chainId], signer, chainId);
};

export const multicall = async (abi: any, calls: any, chainId = 1) => {
  const itf = new ethers.utils.Interface(abi);
  const multi = getMulticallContract(null, chainId);
  const calldata = calls.map((call: any) => [
    call.address.toLowerCase(),
    itf.encodeFunctionData(call.name, call.params),
  ]);

  const { returnData } = await multi.aggregate(calldata);
  const res = returnData.map((call: any, i: any) => itf.decodeFunctionResult(calls[i].name, call));

  return res;
};
