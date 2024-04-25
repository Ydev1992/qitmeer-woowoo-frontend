import { CHAIN_ICONS } from "config/constants/networks";
import { EXPLORER_LOGO, EXPLORER_URLS } from "config/networks";
import { getAddress } from "ethers/lib/utils.js";

export function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getEllipsis = (address: string, left = 6, right = 4) => {
  if (!address) return;
  return address.slice(0, left) + "..." + address.substring(address.length - right);
};

export const getChainLogo = (chainId: number) =>
  CHAIN_ICONS[chainId] ?? "/images/networks/unkown.png";

export const formatIPFSString = (url: any) => {
  let _url = url;
  if (!url) return "";
  if (url.includes("ipfs://")) _url = "https://maverickbl.mypinata.cloud/ipfs/" + _url.replace("ipfs://", "");
  else if (url.includes("https://ipfs.io/ipfs/"))
    _url = "https://maverickbl.mypinata.cloud/ipfs/" + _url.replace("https://ipfs.io/ipfs/", "");
  else if (url.includes("ipfs://ipfs/"))
    _url = "https://maverickbl.mypinata.cloud/ipfs/" + _url.replace("ipfs://ipfs/", "");
  return _url;
};

export function isAddress(value: any): string {
  try {
    return getAddress(value);
  } catch {
    return "";
  }
}

export function getBlockExplorerLink(
  data: string | number,
  type: "transaction" | "token" | "address" | "block" | "countdown" | "nft",
  tokenId = 0,
  chainId = 813
): string {
  switch (type) {
    case "transaction": {
      return `${EXPLORER_URLS[chainId]}/tx/${data}`;
    }
    case "token": {
      return `${EXPLORER_URLS[chainId]}/token/${data}`;
    }
    case "block": {
      return `${EXPLORER_URLS[chainId]}/block/${data}`;
    }
    case "countdown": {
      return `${EXPLORER_URLS[chainId]}/block/countdown/${data}`;
    }
    case "nft": {
      return `${EXPLORER_URLS[chainId]}/token/${data}/instance/${tokenId}`;
    }
    default: {
      return `${EXPLORER_URLS[chainId]}/address/${data}`;
    }
  }
}

export const BigNumberFormat = (str: any, decimals = 2) => {
  if (!str) return (0).toFixed(decimals);
  const length = Math.floor(Math.log10(str));
  if (Number(str) >= 1000000000000000)
    return `${numberWithCommas((str / Math.pow(10, length)).toFixed(decimals))}e+${length - 12}T`;
  else if (Number(str) >= 1000000000000)
    return `${numberWithCommas((str / 1000000000000).toFixed(decimals))}T`;
  else if (Number(str) >= 1000000000)
    return `${numberWithCommas((str / 1000000000).toFixed(decimals))}B`;
  else if (Number(str) >= 1000000) return `${numberWithCommas((str / 1000000).toFixed(decimals))}M`;
  else if (Number(str) >= 1000) return `${numberWithCommas((str / 1000).toFixed(decimals))}K`;
  else return `${numberWithCommas(str.toFixed(decimals))}`;
};

export const getExplorerLogo = (chainId: number) =>
  EXPLORER_LOGO[chainId] ?? "/images/networks/unkown.png";

export const priceFormat = (str: any) => {
  const strlist = Number(str).toFixed(14).split(".");
  let c = 0;
  let value = "";
  if (strlist.length > 1) {
    while (strlist[1][c++] === "0");
    const temp = strlist[1].slice(0, c + 4);
    value = strlist[1].substring(temp.length - 5, temp.length - 1);
  }
  return { count: c - 1, value };
};
