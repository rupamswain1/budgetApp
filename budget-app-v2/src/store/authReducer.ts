//implement createSelector as well

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAuth from "api/userAuth";
import Cookies from "js-cookie";
interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async(userName:string,{rejectWithValue})=>{
        const {responseData} = await userAuth({userName})
        if(responseData){
            return responseData;
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
    //complete builder part
})