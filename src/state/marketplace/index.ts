/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from "@reduxjs/toolkit";
import { fetchListings, getAuctions, getBidInfo, getNFTInfo } from "./fetchMarketPlaceInfo";
import { DEFAULT_VIEW_COUNT } from "config/constants";

const initialState = {
  listings: {},
  auctions: {},
  nfts: {},
  collections: {},
  viewCount: {
    personal: DEFAULT_VIEW_COUNT,
    home: DEFAULT_VIEW_COUNT,
  },
};

export const fetchListingsAsync =
  (chainId = 813) =>
  async (dispatch: any) => {
    const data = await fetchListings(chainId);
    dispatch(setListings(data));
  };

export const fetchAuctionsAsync =
  (chainId = 813) =>
  async (dispatch: any) => {
    const data = await getAuctions(chainId);
    dispatch(setAuctions(data));
  };

export const fetchNFTInfoAsync =
  (address: string, tokenId: number, chainId = 813) =>
  async (dispatch: any) => {
    const data = await getNFTInfo(address, tokenId, chainId);
    if (!data) return;
    dispatch(setNFT(data));
  };

export const fetchBidInfoAsync =
  (auctionId: number, chainId = 813) =>
  async (dispatch: any) => {
    const bids = await getBidInfo(auctionId, chainId);
    dispatch(setBids({ auctionId, bids }));
  };

export const updateViewCountAsync = (type: string, count: number) => (dispatch: any) => {
  dispatch(updateViewCount({ type, count }));
};

export const marketplaceInfoSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setListings: (state: any, action) => {
      state.listings = {};
      action.payload.map((listing: any) => {
        if (!state.listings[listing.listingId]) state.listings[listing.listingId] = {};
        state.listings[listing.listingId] = { ...state.listings[listing.listingId], ...listing };
      });
    },
    setAuctions: (state: any, action) => {
      state.auctions = {};
      Object.keys(state.auctions).map((key, i) => {
        const bids = state.auctions[key].bids;
        state.auctions[key] = { bids };
      });
      action.payload.map((auction: any) => {
        if (!state.auctions[auction.auctionId]) state.auctions[auction.auctionId] = {};
        state.auctions[auction.auctionId] = { ...state.auctions[auction.auctionId], ...auction };
      });
    },
    setBids: (state: any, action) => {
      const { auctionId, bids } = action.payload;
      state.auctions[auctionId] = { ...state.auctions[auctionId], bids };
    },
    setNFT: (state: any, action) => {
      const nft = action.payload;
      const { chainId, address, tokenId } = nft;
      if (!state.nfts[chainId]) state.nfts[chainId] = {};
      if (!state.nfts[chainId][address]) state.nfts[chainId][address] = {};
      state.nfts[chainId][address][tokenId] = nft;
    },
    updateViewCount: (state: any, action) => {
      const { type, count } = action.payload;
      state.viewCount[type] = count;
    },
  },
  extraReducers: (builder) => {},
});

export const { setListings, setNFT, setAuctions, setBids, updateViewCount } =
  marketplaceInfoSlice.actions;
export default marketplaceInfoSlice.reducer;
