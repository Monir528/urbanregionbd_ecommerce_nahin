/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState={}

const orderProductSlice= createSlice({
    name:'orderProduct',
    initialState,
    reducers:{
        addToOrder:(state,action)=>{
            state[action.payload.id]= action.payload.count
        },
        reduceOrder:(state,action)=>{
            state[action.payload.id]= action.payload.count
        },
        removeOrder:(state,action)=>{
            delete state[action.payload.id]
            return state
        },
        resetOrder:(state)=>{
            state={}
        }
    }
})
export const {addToOrder, reduceOrder, removeOrder, resetOrder}= orderProductSlice.actions
export default orderProductSlice.reducer