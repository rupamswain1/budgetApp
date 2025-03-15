import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './authReducer';
import expenseReducer from './expensesReducer';
import sessionStorage from "redux-persist/lib/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";

const persistConfig = {
    key:"root",
    storage:sessionStorage,
}

const rootReducer = combineReducers({
    auth:authReducer,
    expense:expenseReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
    devTools: process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;