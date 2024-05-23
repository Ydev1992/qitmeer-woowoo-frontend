/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Brc20Token {
  token: string;
  deployTime: Number;
  inscriptionId: string;
  inscriptionNumber: Number;
  totalSupply: Number;
  mintAmount: Number;
  transactionCount: Number;
  holder: Number;
  mintRate: Number;
}

interface InscriptionState {
  brc20Tokens: Array<Brc20Token>;
}

const initialState: InscriptionState = { brc20Tokens: [] };

export const fetchBrc20Tokens = createAsyncThunk<
  Brc20Token[],
  void,
  { rejectValue: string }
>("incscription/fetchBrc20Tokens", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Brc20Token[]>("/api/brc20-Tokens");
    return response.data;
  } catch (err) {
    return rejectWithValue("Failed to fetch brc20Tokens");
  }
});

export const inscriptionSlice = createSlice({
  name: "inscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchBrc20Tokens.fulfilled,
      (state: any, action: PayloadAction<Brc20Token[]>) => {
        state.brc20Tokens = action.payload;
      }
    );
  },
});

export default inscriptionSlice.reducer;
