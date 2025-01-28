import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  value:{}
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
      state.value={}
    },
  },
})

// Action creators are generated for each case reducer function
export const { popUpClose, popUpToggle, popUpOpen } = popUpSlice.actions
export default popUpSlice.reducer