import {
  bsc,
  mainnet,
  arbitrum,
  polygon,
  avalanche,
  fantom,
  cronos,
  bscTestnet,
  goerli,
} from "wagmi/chains";

const qitmeer = {
  id: 813,
  name: "Qitmeer",
  network: "qitmeer",
  nativeCurrency: {
    decimals: 18,
    name: "MEER",
    symbol: "MEER",
  },
  rpcUrls: {
    // public: { http: ["https://qng.rpc.qitmeer.io"] },
    // default: { http: ["https://qng.rpc.qitmeer.io"] },
    public: { http: ["https://rpc.dimai.ai"] },
    default: { http: ["https://rpc.dimai.ai"] },
  },
  blockExplorers: {
    etherscan: { name: "Meerscan", url: "https://qng.qitmeer.io/" },
    default: { name: "Meerscan", url: "https://qng.qitmeer.io/" },
  },
  contracts: {},
};

const qitmeer_testnet = {
  id: 8131,
  name: "Qitmeer",
  network: "qitmeer",
  nativeCurrency: {
    decimals: 18,
    name: "MEER",
    symbol: "MEER",
  },
  rpcUrls: {
    public: { http: ["https://testnet-qng.rpc.qitmeer.io"] },
    default: { http: ["https://testnet-qng.rpc.qitmeer.io"] },
  },
  blockExplorers: {
    etherscan: { name: "Meerscan", url: "https://testnet-qng.qitmeer.io/" },
    default: { name: "Meerscan", url: "https://testnet-qng.qitmeer.io/" },
  },
  contracts: {},
};
export const SupportedChains = [
  bsc,
  mainnet,
  arbitrum,
  polygon,
  avalanche,
  fantom,
  cronos,
  bscTestnet,
  goerli,
  qitmeer,
  qitmeer_testnet,
];

export const CHAIN_ICONS: any = {
  1: "/images/networks/eth.svg",
  56: "/images/networks/bsc.png",
};

export const SUPPORTED_CHAIN_IDS: any = [813, 8131];
