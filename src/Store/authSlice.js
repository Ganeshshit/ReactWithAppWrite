import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    useerData:null
}

const authSlice= createSlice({

    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.useerData=action.payload.useerData;
        },
        logout:(state)=>{
            state.status=false,
            state.useerData=null
        }
    }
})



export const {login,logout}=authSlice.actions;

export default authSlice.reducer;