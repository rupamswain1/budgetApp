import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authReducer';
import expenseReducer from './expensesReducer';
export const store = configureStore({
    reducer:{
        auth:authReducer,
        expense:expenseReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;