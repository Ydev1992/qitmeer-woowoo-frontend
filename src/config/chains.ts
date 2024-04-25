import { ethers } from "ethers";
import { sample } from "lodash";

export const SUPPORTED_CHAINS: any = [1, 56, 813, 42161];
export const RPC_ENDPOINT: any = {
  42161: ["https://arbitrum.blockpi.network/v1/rpc/public"],
  97: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
  // 813: ["https://qng.rpc.qitmeer.io"],
  813: ["https://rpc.dimai.ai"],
  8131: ["https://testnet-qng.rpc.qitmeer.io"],
};

const CHAIN_NAMES: any = {
  1: "Ethereum",
  56: "Binance",
  813: "Qitmeer",
  8131: "Qitmeer",
  42161: "Arbitrum",
};

const CHAIN_LOGO: any = {
  1: "/images/networks/eth.svg",
  56: "/images/networks/bsc.png",
  42161: "/images/networks/arbitrum.svg",
};

const SCAN_LOGO: any = {
  1: "/icons/etherscan.png",
  56: "/icons/bscscan.png",
};

const EXPLORER_URL: any = {
  1: "https://etherscan.io",
  56: "https://bscscan.com",
  813: "https://qng.qitmeer.io",
  8131: "https://testnet-qng.qitmeer.io",
  42161: "https://arbiscan.io",
};

export const EXPLORER_API_URL: any = {
  1: "https://api.etherscan.io/api",
  56: "https://api.bscscan.com/api",
  813: "https://qng.qitmeer.io/api",
  8131: "https://testnet-qng.qitmeer.io/api",
};

export const EXPLORER_API_KEYS: any = {
  1: "47I5RB52NG9GZ95TEA38EXNKCAT4DMV5RX",
  56: "HQ1F33DXXJGEF74NKMDNI7P8ASS4BHIJND",
};

export const getExplorerLogo = (chainId: number) => SCAN_LOGO[chainId] ?? "";
export const getChainName = (chainId: number) => CHAIN_NAMES[chainId] ?? "";
export const getChainLogo = (chainId: number) =>
  CHAIN_LOGO[chainId] ?? "/images/networks/unknown.png";

export const getExplorerLink = (chainId: any, type: any, addressOrHash: any) => {
  const explorerUrl = EXPLORER_URL[chainId];
  switch (type) {
    case "address":
      return `${explorerUrl}/address/${addressOrHash}`;
    case "token":
      return `${explorerUrl}/token/${addressOrHash}`;
    case "transaction":
      return `${explorerUrl}/tx/${addressOrHash}`;
    default:
      return explorerUrl;
  }
};

export const simpleRpcProvider = (chainId: any) =>
  new ethers.providers.JsonRpcProvider(sample(RPC_ENDPOINT[chainId || 56]));
