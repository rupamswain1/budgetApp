//implement createSelector as well

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAuth from "../api/userAuth";
import Cookies from "js-cookie";
interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async(userName:string,{rejectWithValue})=>{
        console.log("inside loginUser",userName)
        const {responseData, apiFailed, apiSuccess} = await userAuth({userName})
        console.log({responseData})
        if(responseData && apiSuccess && responseData?.token){
            return responseData as string;
        }
        return rejectWithValue("api failed")
    }
)

const authSlice = createSlice({
    name:"auth",
    initialState:{
        token: Cookies.get("session_id") || null,
        loading: false,
        error:null
    } as AuthState,
    reducers:{
        logout:(state) =>{
            state.token = null;
            Cookies.remove("session_id");
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.token = action.payload
        })
        .addCase(loginUser.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;