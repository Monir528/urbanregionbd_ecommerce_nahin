import { apiSlice } from "../api/apiSlice"

const initialState={}

export const orderStatusSlice= apiSlice({
    name:"orderStatus",
    initialState,
    reducers:{
        changeStatus:(state,action)=>{
            state[action.payload.id].status=action.payload.status
        }
    }
})

export const {changeStatus}= orderStatusSlice.actions
export default orderStatusSlice.reducer