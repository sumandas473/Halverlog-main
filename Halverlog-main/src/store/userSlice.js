import { createSlice } from "@reduxjs/toolkit";

const initialState={
    users:[],
}
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        getUsers:(state,action)=>{
            state.users=action.payload.data;
        },
    }

})

export const {getUsers}=userSlice.actions;
export default userSlice.reducer;