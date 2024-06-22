import { configureChains, createClient } from "wagmi";
import memoize from "lodash/memoize";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { LedgerConnector } from "wagmi/connectors/ledger";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { SafeConnector } from "wagmi/connectors/safe";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { mainnet, BinanceWalletConnector } from "../contexts/wagmi";
import { SupportedChains } from "config/constants/networks";

export const { provider, webSocketProvider, chains } = configureChains(
  SupportedChains,
  [
    jsonRpcProvider({
      rpc: (chain) => {
        switch (chain.id) {
          case mainnet.id:
            return { http: "https://cloudflare-eth.com" };
          default:
            return { http: chain.rpcUrls.default.http[0] };
        }
      },
    }),
  ]
);

export const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "Woowow",
        appLogoUrl: `/api/logo.png`,
      },
    }),
    new BinanceWalletConnector({ chains }),
    new WalletConnectLegacyConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new LedgerConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: (detectedName) =>
          `Injected (${
            typeof detectedName === "string"
              ? detectedName
              : detectedName.join(", ")
          })`,
        shimDisconnect: true,
        getProvider: () => {
          console.log("getProvider");
          if (typeof window === "undefined") return undefined;

          const isOkxWallet = (ethereum: any) => !!ethereum?.isOkxWallet;

          if (isOkxWallet(window.ethereum)) return window.ethereum as any;

          if (window.ethereum?.providers)
            return window.ethereum.providers.find(isOkxWallet);
          return window["okxwallet" as any];
        },
      },
    }),
    new SafeConnector({
      chains,
      options: {
        allowedDomains: [/https:\/\/app.safe.global$/],
        debug: false,
      },
    }),
  ],
});

export const CHAIN_IDS = chains.map((c) => c.id);

export const isChainSupported = memoize((chainId: any) =>
  CHAIN_IDS.includes(chainId)
);
export const isChainTestnet = memoize(
  (chainId: number) =>
    (chains as any).find((c: any) => c.id === chainId)?.["testnet"]
);
