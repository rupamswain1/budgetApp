//implement createSelector as well

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAuth from '../api/userAuth';
import Cookies from 'js-cookie';
import { RootState } from './store';
import { addExpenses } from './expensesReducer';
interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  locked: boolean;
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { userName, password }: { userName: string; password: string },
    { rejectWithValue, dispatch, getState }
  ) => {
    console.log('inside loginUser', userName);
    const { responseData, apiSuccess } = await userAuth({ userName, password });
    console.log({ responseData });
    if (responseData && apiSuccess && responseData?.token) {
      //below code is to submit the expenses added from login page
      const state = getState() as RootState;
      const newExpenses = state.expense.newExpenses;
      if (newExpenses.length > 0) {
        await dispatch(addExpenses());
      }
      return responseData as string;
    }
    if (responseData?.locked) {
      return rejectWithValue({
        locked: true,
        message:
          'User Locked due to multiple Invalid attempts, Please contact admin',
      });
    }
    return rejectWithValue('User Name or Password Incorrect');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('session_id') || null,
    loading: false,
    error: null,
    locked: false,
  } as AuthState,
  reducers: {
    logout: (state) => {
      state.token = null;
      Cookies.remove('session_id');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.locked = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log({ action });
        // @ts-ignore
        if (action.payload?.locked) {
          state.locked = true;
          // @ts-ignore
          state.error = action.payload.message;
        } else {
          state.error = action.payload as string;
        }
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
