import { NFTStorage } from "nft.storage";

export const NFT_STORAGE = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJjZjJGRjJFRDhDZEQ4NDVkNTlhNEIyMzE1YjEwQWQ3QTk2ZGEzZDMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NDE1NzY2OTg4NywibmFtZSI6ImZvckRpbWFpIn0.Qv_T-31CrNwl5OcxPbmMu58Vjy1BVW183-k9TQYOOWU",
});

export const COLLECTION_FACTORY_GRAPH_URL: Record<number, string> = {
  813: "https://api.biibot.com/subgraphs/name/nft-trading-platform/collectionclonefactory",
  // 813: "https://subgraph.woowow.io/meer/subgraphs/name/nft-trading-platform/collectionclonefactory",
  8131: "https://subgraph.woowow.io/meertest/subgraphs/name/nft-trading-platform/collectionclonefactory",
};
export const MARKETPLACE_GRAPH_URL: Record<number, string> = {
  813: "https://api.biibot.com/subgraphs/name/nft-trading-platform/marketplace",
  // 813: "https://subgraph.woowow.io/meer/subgraphs/name/nft-trading-platform/marketplace",
  8131: "https://subgraph.woowow.io/meertest/subgraphs/name/nft-trading-platform/marketplace",
};

export const GAS_MULTIPLE = 2;

export const NATIVE_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export const CHART_PERIOD_RESOLUTION: any = {
  0: {
    period: 86400,
    resolution: 10,
  },
  1: {
    period: 86400 * 7,
    resolution: 60,
  },
  2: {
    period: 86400 * 30,
    resolution: 240,
  },
  3: {
    period: 86400 * 365,
    resolution: 1440,
  },
  4: {
    period: 86400 * 10000,
    resolution: 1440,
  },
};

export const DEFAULT_VIEW_COUNT = 12;
