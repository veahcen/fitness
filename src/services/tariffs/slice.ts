import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";
import { ICard } from "../../types/types";

export interface IinitialState {
  cards: ICard[],
  isLoadindStatus: boolean
}

export const initialState: IinitialState = {
  cards: [],
  isLoadindStatus: false
}

export const fetchCards = createAsyncThunk(
    'fitness/fetchCards',
    async (): Promise<ICard[]> => {
        const {request} = useHttp();
        return await request("https://t-pay.iqfit.app/subscribe/list-test") as ICard[];
    }
);

export const fitnessSlice = createSlice({
  name: 'fitness',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, state => {state.isLoadindStatus = true})
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.isLoadindStatus = false;
        state.cards = action.payload.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          isPopular: item.isPopular,
          isDiscount: item.isDiscount
        }));
      })
      .addCase(fetchCards.rejected, state => {state.isLoadindStatus = false})
  }
})

const {reducer} = fitnessSlice;

export default reducer;