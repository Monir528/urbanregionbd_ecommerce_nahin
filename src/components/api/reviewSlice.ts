import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    totalCount: (state,action) => {
      state.value= action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { totalCount } = reviewSlice.actions
export default reviewSlice.reducer