/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Brc20Token {
  symbol: string;
  tokenInscriptionId: string;
  protocolType: string;
  totalSupply: Number;
  mintAmount: Number;
  deployTime: Number;
  holder: Number;
  transactionCount: Number;
  circulatingSupply: Number;
  mintBitwork: string;
  limitPerMint: Number;
  runesSymbol: string;
  tokenContractAddress: string;
  lastPrice: Number;
  maxSupply: Number;
  volume24h: Number;
  marketCap: Number;
  high24h: Number;
  low25h: Number;
  priceAbnormal: [];
  inscriptionId: string;
  inscriptionNumber: Number;
  mintRate: Number;
  logoUrl: string;
}

interface InscBrc20State {
  isDeployed: boolean;
  mintedRate: number;
}

const initialState: InscBrc20State = { isDeployed: false, mintedRate: 0 };

export const fetchExistanceOfToken = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>(
  "inscBrc20/fetchExistanceOfToken",
  async (tokenTicker, { rejectWithValue }) => {
    try {
      const response = await axios.get<boolean>(
        `/api/inscBrc20/tokenDeployed/${tokenTicker}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch brc20Tokens");
    }
  }
);

export const fetchMintRateOfToken = createAsyncThunk<
  number,
  string,
  { rejectValue: string }
>(
  "inscBrc20/fetchMintRateOfToken",
  async (tokenTicker, { rejectWithValue }) => {
    try {
      const response = await axios.get<number>(
        `/api/inscBrc20/getMintrateOfToken/${tokenTicker}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch brc20Tokens");
    }
  }
);

export const inscBrc20Slice = createSlice({
  name: "inscBrc20",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchExistanceOfToken.fulfilled,
      (state: any, action: PayloadAction<boolean>) => {
        state.isDeployed = action.payload;
      }
    );
    builder.addCase(
      fetchMintRateOfToken.fulfilled,
      (state: any, action: PayloadAction<number>) => {
        state.mintedRate = action.payload;
      }
    );
  },
});

export default inscBrc20Slice.reducer;
