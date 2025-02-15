import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartCondition:false,
  searchCondition:false,
  modalCondition:false,
  errorCondition: false,
  formCondition: false
}

export const cartHandler = createSlice({
  name: 'cartHandler',
  initialState,
  reducers: {
    // orderFrom Condition
    orderFormOpen: (state) => {
        state.formCondition= true
    },
    orderFormClose: (state) => {
        state.formCondition= false
    },
    orderFormToggle: (state) => {
        state.formCondition= !state.formCondition
    },
    
    handleOpen: (state) => {
        state.cartCondition= true
    },
    handleClose: (state) => {
        state.cartCondition= false
    },
    handleToggle: (state) => {
        state.cartCondition= !state.cartCondition
    },
    // search condition 
    searchOpen: (state) => {
        state.searchCondition= true
    },
    searchClose: (state) => {
        state.searchCondition= false
    },
    searchToggle: (state) => {
        state.searchCondition= !state.searchCondition
    },
    // modal condition 
    modalOpen: (state) => {
        state.modalCondition= true
    },
    modalClose: (state) => {
        state.modalCondition= false
    },
    modalToggle: (state) => {
        state.modalCondition= !state.modalCondition
    },
    // error modal 
    errorModalOpen: (state) => {
        state.errorCondition= true
    },
    errorModalClose: (state) => {
        state.errorCondition= false
    },
    errorModalToggle: (state) => {
        state.errorCondition= !state.modalCondition
    },
  },
})

// Action creators are generated for each case reducer function
export const { handleClose,errorModalClose, errorModalOpen, handleOpen, handleToggle, searchOpen, searchClose, searchToggle, modalClose, modalOpen, modalToggle, orderFormClose, orderFormOpen, orderFormToggle } = cartHandler.actions

export default cartHandler.reducer