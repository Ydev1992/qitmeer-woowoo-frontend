/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Brc20Token {
  slug: string;
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
  token: string;
  precision: Number;
  deployAddress: string;
  txId: string;
  deployHeight: Number;
  low25h: Number;
  state: string;
  tokenType: string;
  msg: string;
  BTCPrice: Number;

  priceAbnormal: [];
  inscriptionId: string;
  inscriptionNumber: Number;
  mintRate: Number;
  logoUrl: string;
  floorPrice: Number;
  inscriptionNumRange: string;
  isBrc20: Boolean;
  totalVolume: Number;

  oneDayRate: Number;
  sevenDaysRate: Number;
  thirtyDaysRate: Number;
}

interface InscriptionDataType {
  amount: Number;
  inscriptionId: string;
  isBrc20: boolean;
  listingTime: Number;
  listingUrl: string;
  orderId: Number;
  ownerAddress: string;
  price: Number;
  slug: string;
  unitPrice: Number;

  //inscription Number 2024-07-03 11:20 am
  inscriptionNumber: Number,
  location: String,
  token: String,
  state: String,
  msg: String,
  tokenType: String,
  actionType: String,
  logoUrl: String,
  txId: String,
  blockHeight: Number,
  contentSize: Number,
  time: String

}

interface InscriptionState {
  brc20Tokens: Array<Brc20Token>;
  inscriptionData: Array<InscriptionDataType>;
}

const initialState: InscriptionState = { brc20Tokens: [], inscriptionData: [] };

export const fetchBrc20Tokens = createAsyncThunk<
  Brc20Token[],
  string,
  { rejectValue: string }
>("incscription/fetchBrc20Tokens", async (searchTerm, { rejectWithValue }) => {
  try {
    const response = await axios.get<Brc20Token[]>(
      `/api/brc20-Tokens/searchTokens?search=${searchTerm}&page=1&limit=2`
    );
    return response.data;
  } catch (err) {
    return rejectWithValue("Failed to fetch brc20Tokens");
  }
});

export const fetchInscriptionData = createAsyncThunk<
  InscriptionDataType[],
  string,
  { rejectValue: string }
>(
  "incscription/fetchInscriptionData",
  async (tokenSlug, { rejectWithValue }) => {
    try {
      const response = await axios.get<InscriptionDataType[]>(
        `/api/brc20-Tokens/getInscriptionData/${tokenSlug}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch brc20Tokens");
    }
  }
);

export const inscriptionSlice = createSlice({
  name: "inscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchBrc20Tokens.fulfilled,
      (state: any, action: PayloadAction<Brc20Token[]>) => {
        state.brc20Tokens = action.payload.map((eachToken, index) => {
          return {
            ...eachToken,
          };
        });
      }
    );
    builder.addCase(
      fetchInscriptionData.fulfilled,
      (state: any, action: PayloadAction<InscriptionDataType[]>) => {
        state.inscriptionData = action.payload;
      }
    );
  },
});

export default inscriptionSlice.reducer;
