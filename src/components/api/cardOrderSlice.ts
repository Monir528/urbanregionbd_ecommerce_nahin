
/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState=[]

const cardOrderSlice= createSlice({
    name:'cardOrder',
    initialState,
    reducers:{
        addCard:(state,action)=>{
            state[action.payload.id]= state.push(action.payload.details)
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
export const {addCard, reduceOrder, removeOrder, resetOrder}= cardOrderSlice.actions
export default cardOrderSlice.reducer