import { createSlice } from "@reduxjs/toolkit";
import {CartItem} from "@/types/cart";

const initialState: CartItem[] =[]

const cardOrderSlice= createSlice({
    name:'cardOrder',
    initialState,
    reducers:{
        addCard:(state,action)=>{
            state.push(action.payload.details)
        },
        reduceOrder:(state,action)=>{
            const index = state.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state[index].cartQuantity = action.payload.count
            }
        },
        removeOrder:(state,action)=>{
            delete state[action.payload.id]
            return state
        },
        resetOrder:()=>{
            // state={};
        }
    }
})
export const {addCard, reduceOrder, removeOrder, resetOrder}= cardOrderSlice.actions
export default cardOrderSlice.reducer