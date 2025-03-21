import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  [key: string]: number;
}

const initialState: OrderState = {};

const orderProductSlice = createSlice({
  name: 'orderProduct',
  initialState,
  reducers: {
    addToOrder: (state, action: PayloadAction<{ id: string; count: number }>) => {
      state[action.payload.id] = action.payload.count;
    },
    reduceOrder: (state, action: PayloadAction<{ id: string; count: number }>) => {
      state[action.payload.id] = action.payload.count;
    },
    removeOrder: (state, action: PayloadAction<{ id: string }>) => {
      delete state[action.payload.id];
    },
    resetOrder: () => initialState,
  }
});

export const { addToOrder, reduceOrder, removeOrder, resetOrder } = orderProductSlice.actions;
export default orderProductSlice.reducer;