import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state,action) => {
        state.push(action.payload)
    },

  },
})

// Action creators are generated for each case reducer function
export const { addProduct } = productSlice.actions
 
export default productSlice.reducer