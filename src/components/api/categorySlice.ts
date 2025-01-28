import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state,action) => {
        state.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addCategory } = categorySlice.actions
 
export default categorySlice.reducer