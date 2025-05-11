"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerState {
  name: string;
  phone: string;
  address: string;
  division: string;
  paymentMethod: string;
  selectedGateway: string; // 'bkash' or 'cod'
}

const initialState: CustomerState = {
  name: "",
  phone: "",
  address: "",
  division: "osd", // Default value
  paymentMethod: "cod", // Default value
  selectedGateway: "cod", // Default value
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomerName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setCustomerPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setCustomerAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setCustomerDivision: (state, action: PayloadAction<string>) => {
      state.division = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    setSelectedGateway: (state, action: PayloadAction<string>) => {
      state.selectedGateway = action.payload;
    },
    resetCustomerInfo: (state) => {
      Object.assign(state, initialState);
    },
    updateCustomerInfo: (state, action: PayloadAction<Partial<CustomerState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  setCustomerName,
  setCustomerPhone,
  setSelectedGateway,
  setCustomerAddress,
  setCustomerDivision,
  setPaymentMethod,
  resetCustomerInfo,
  updateCustomerInfo,
} = customerSlice.actions;

export default customerSlice.reducer;
