
import { ExpenseState } from "$interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAddExpenses from "../api/useAddExpenses";

export const addExpenses = createAsyncThunk(
    "expense/addExpenses",
    async(_,thunkApi)=>{
       
        const { responseData, apiFailed, apiSuccess} = await useAddExpenses(thunkApi.getState()?.expense?.newExpenses);
        console.log( {responseData, apiFailed, apiSuccess});
    }
)

const expenseSclice = createSlice({
    name:"expense",
    initialState:{
        newExpenses:[],
        expenses:[],
        budget:0,
        remainingBudget:0,
        currentDate:new Date().getDate(),
        currentMonth: new Date().getMonth()+1,
        currentYear: new Date().getFullYear()
    } as ExpenseState,
    reducers:{
        addNewExpense:(state, action)=>{
           const isExpenseAvailable = state.newExpenses.find((expense)=>expense.id===action?.payload?.id)
           if(isExpenseAvailable){
                const newExpenses = state.newExpenses.map((expenses)=>expenses.id===action.payload.id?action.payload:expenses)
                state.newExpenses = newExpenses;
            }
           else{
                state.newExpenses = [...state.newExpenses,action.payload]
           }
        },
        deleteNewExpense:(state, action)=>{
            console.log({action})
            state.newExpenses = state.newExpenses.filter((expense)=>expense.id!==action.payload);
        },
    }
})

export const { addNewExpense, deleteNewExpense } = expenseSclice.actions;
export default expenseSclice.reducer;