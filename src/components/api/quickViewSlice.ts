import { createSlice } from '@reduxjs/toolkit'
import {Product} from "@/types/product";

interface PopUpSlice {
  open: boolean;
  value: Product;
}

const initialState: PopUpSlice  = {
  open: false,
  value: {} as Product
}

export const popUpSlice = createSlice({
  name: 'quickView',
  initialState,
  reducers: {
    popUpClose: (state) => {
      state.open = false
    },
    popUpOpen: (state,action) => {
      // console.log(action.payload);
      state.open = true
      state.value= action.payload
    },
    popUpToggle: (state) => {
      state.open = !state.open
      state.value={} as Product
    },
  },
})

// Action creators are generated for each case reducer function
export const { popUpClose, popUpToggle, popUpOpen } = popUpSlice.actions
export default popUpSlice.reducer