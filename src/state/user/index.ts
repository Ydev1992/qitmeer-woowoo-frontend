/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserCollectionBalance,
  fetchETHBalance,
  fetchUserInfo,
  fetchCreatedCollections,
  getListedCollectionNFTs,
  getUserNFTs,
  getTransactionHistory,
} from "./fetchUserBalance";

const initialState = {
  ownedCollections: {},
  balance: 0,
  info: {},
  createdCollections: [],
  listedCollections: {},
  transactionHistory: [],
};

export const fetchUserInfoAsync =
  (account: string | undefined, jwtToken?: string) => async (dispatch: any) => {
    const data = await fetchUserInfo(account, jwtToken);
    dispatch(setUserInfo(data));
  };

export const fetchUserCollectionBalanceAsync =
  (account: string | undefined, chainId = 813) =>
  async (dispatch: any) => {
    const collections = await fetchUserCollectionBalance(account, chainId);
    dispatch(setUserOwnedCollections({ chainId, collections }));
  };

export const fetchUserOwnedNFTsAsync =
  (address: string, account: string | undefined, chainId = 813) =>
  async (dispatch: any) => {
    const nfts = await getUserNFTs(address, account, chainId);
    dispatch(setUserOwnedNFTs({ address, nfts }));
  };

export const fetchETHBalanceAsync =
  (account: string | undefined, chainId = 813) =>
  async (dispatch: any) => {
    const balance = await fetchETHBalance(account, chainId);
    dispatch(setETHBalance({ chainId, balance }));
  };

export const fetchUserCreatedCollectionsAsync =
  (account: string | undefined, chainId = 813) =>
  async (dispatch: any) => {
    const collections = await fetchCreatedCollections(account, chainId);
    dispatch(setCreatedCollections({ chainId, collections }));
  };

export const fetchUserListedCollectionsAsync =
  (account: string, chainId = 813) =>
  async (dispatch: any) => {
    const collections = await getListedCollectionNFTs(account, chainId);
    dispatch(setUserListedCollection(collections));
  };

export const fetchUserTransactionHistoryAsync =
  (account: string, chainid = 813) =>
  async (dispatch: any) => {
    const history = await getTransactionHistory(account.toLowerCase(), chainid);
    dispatch(setTransactionHistory(history));
  };

export const userNFTBalanceSlice = createSlice({
  name: "user-nft-balance",
  initialState,
  reducers: {
    setUserInfo: (state: any, action) => {
      state.info = action.payload;
    },
    setETHBalance: (state: any, action) => {
      state.balance = action.payload.balance;
    },
    setUserOwnedNFTs: (state: any, action) => {
      const { address, nfts } = action.payload;
      state.ownedCollections[address] = { ...state.ownedCollections[address], nfts };
    },
    setUserOwnedCollections: (state: any, action) => {
      const { chainId, collections } = action.payload;
      Object.keys(collections).map((key: any) => {
        state.ownedCollections[key] = {
          ...(state.ownedCollections[key] ?? {}),
          ...collections[key],
        };
      });
    },
    setCreatedCollections: (state: any, action) => {
      const { collections } = action.payload;
      Object.keys(collections).map((key: any) => {
        state.createdCollections[key] = {
          ...(state.createdCollections[key] ?? {}),
          ...collections[key],
        };
      });
    },
    setDefaultValue: (state: any) => {
      state = initialState;
    },
    setUserListedCollection: (state: any, action) => {
      action.payload.map((nft: any) => {
        if (!state.listedCollections) state.listedCollections = new Object();
        state.listedCollections[nft.contractAddress.toLowerCase()] = {
          ...state.listedCollections[nft.contractAddress.toLowerCase()],
          ...nft,
        };
      });
    },
    setTransactionHistory: (state: any, action) => {
      state.transactionHistory = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setUserOwnedNFTs,
  setETHBalance,
  setDefaultValue,
  setCreatedCollections,
  setUserInfo,
  setUserListedCollection,
  setUserOwnedCollections,
  setTransactionHistory,
} = userNFTBalanceSlice.actions;
export default userNFTBalanceSlice.reducer;
