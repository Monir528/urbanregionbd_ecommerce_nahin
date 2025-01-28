import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  value:""
}

export const sizeModalSlice = createSlice({
  name: 'sizeModal',
  initialState,
  reducers: {
    sizeModalClose: (state) => {
      state.isOpen = false
      state.value=""
    },
    sizeModalOpen: (state, action) => {
      state.isOpen = true
      state.value= action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { sizeModalClose, sizeModalOpen } = sizeModalSlice.actions
export default sizeModalSlice.reducer