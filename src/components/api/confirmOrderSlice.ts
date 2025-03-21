import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  [key: string]: {
    status: string;
  };
}

const initialState: OrderState = {};

export const orderStatusSlice = createSlice({
  name: "orderStatus",
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<{ id: string; status: string }>) => {
      state[action.payload.id].status = action.payload.status;
    }
  }
});

export const { changeStatus } = orderStatusSlice.actions;
export default orderStatusSlice.reducer;