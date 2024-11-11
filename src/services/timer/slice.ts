import { createSlice } from "@reduxjs/toolkit";

export interface IinitialState {
  time: number
}

export const initialState: IinitialState = {
  time: 1
}


export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    initalTime: (state, action) => {
      state.time = action.payload;
    },
    decrTime: (state) => {
      state.time = state.time - 1;
    }
  }
})

const {actions, reducer} = timerSlice;

export const {
  initalTime,
  decrTime
} = actions;

export default reducer;