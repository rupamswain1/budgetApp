import { Budget, ExpenseState } from "$interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAddExpenses from "../api/useAddExpenses";
import { RootState } from "./store";
import { useAddBudget, useGetBudget } from "../api/useBudget";
import { useGetExpenses } from "../api/useGetExpenses";

export const addExpenses = createAsyncThunk(
  "expense/addExpenses",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const { responseData, apiFailed, apiSuccess } = await useAddExpenses(
        state?.expense?.newExpenses
      );
      console.log({ apiFailed, data: responseData?.success });
      if (apiFailed || !responseData?.success) {
        return thunkApi.rejectWithValue("Add Expenses Failed");
      }
      return { responseData, apiFailed, apiSuccess };
    } catch (error) {
      return thunkApi.rejectWithValue("Add Expenses Failed" + error);
    }
  }
);

export const getExpenses = createAsyncThunk(
  "expense/getExpenses",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const { currentMonth, currentYear } = state.expense;
      const { responseData, apiFailed, apiSuccess } = await useGetExpenses({
        month: currentMonth,
        year: currentYear,
      });
      if (apiFailed || !responseData?.expenses) {
        return thunkApi.rejectWithValue("Get Expenses Failed");
      }
      return { responseData, apiFailed, apiSuccess };
    } catch (error) {
      return thunkApi.rejectWithValue("Get Expenses Failed" + error);
    }
  }
);

export const addBudget = createAsyncThunk(
  "expense/addBudget",
  async ({ budget, date }: Budget, thunkApi) => {
    try {
      console.log("budget::", budget);
      const { responseData, apiFailed, apiSuccess } = await useAddBudget({
        date,
        budget,
      });
      if (apiFailed || !responseData?.success) {
        return thunkApi.rejectWithValue("Add Budget Failed");
      }
      return { responseData, apiFailed, apiSuccess, budget };
    } catch (error) {
      return thunkApi.rejectWithValue("Add Budget Failed" + error);
    }
  }
);

export const getBudget = createAsyncThunk(
  "expense/getBudget",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const { currentMonth, currentYear } = state.expense;
      const { responseData, apiFailed, apiSuccess } = await useGetBudget({
        month: currentMonth,
        year: currentYear,
      });
      if (apiFailed || !responseData?.budget) {
        return thunkApi.rejectWithValue("Get Budget Failed");
      }
      return { responseData, apiFailed, apiSuccess };
    } catch (error) {
      return thunkApi.rejectWithValue("Get Budget Failed" + error);
    }
  }
);

const expenseSclice = createSlice({
  name: "expense",
  initialState: {
    newExpenses: [],
    expenses: [],
    todaysExpenses: null,
    lastTenExpenses: null,
    budget: 0,
    remainingBudget: 0,
    currentDate: new Date().getDate(),
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
    isLoading: false,
    error: false,
  } as ExpenseState,
  reducers: {
    addNewExpense: (state, action) => {
      const isExpenseAvailable = state.newExpenses.find(
        (expense) => expense.id === action?.payload?.id
      );
      if (isExpenseAvailable) {
        const newExpenses = state.newExpenses.map((expenses) =>
          expenses.id === action.payload.id ? action.payload : expenses
        );
        state.newExpenses = newExpenses;
      } else {
        state.newExpenses = [...state.newExpenses, action.payload];
      }
    },
    deleteNewExpense: (state, action) => {
      console.log({ action });
      state.newExpenses = state.newExpenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExpenses.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(addExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newExpenses = [];
        const { updatedRecords, totalExpenseAmount } =
          action.payload.responseData;
        state.expenses = state.expenses.concat(updatedRecords);
        if (state.todaysExpenses) {
          state.todaysExpenses = {
            expenses: state.todaysExpenses.expenses.concat(updatedRecords),
            total: parseFloat(
              (state.todaysExpenses.total + totalExpenseAmount).toFixed(2)
            ),
          };
        } else {
          state.todaysExpenses = {
            expenses: updatedRecords,
            total: parseFloat(totalExpenseAmount?.toFixed(2)),
          };
        }
        state.remainingBudget = parseFloat(
          (state.remainingBudget - totalExpenseAmount).toFixed(2)
        );
      })
      .addCase(addExpenses.rejected, (state, action) => {
        console.log("rejected block", action);
        state.isLoading = false;
        state.error = true;
      })
      .addCase(getExpenses.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        const { expenses, totalExpenseAmount } = action.payload.responseData;
        state.expenses = expenses;
        state.remainingBudget = parseFloat(
          (state.budget - totalExpenseAmount).toFixed(2)
        );
        let todaysTotal = 0;
        const todaysExpense = expenses.filter((exp) => {
          if (exp.date.split("-")[2] === state.currentDate.toString()) {
            todaysTotal = todaysTotal + (exp.price ?? 0);
            return true;
          }
          return false;
        });
        state.todaysExpenses = {
          expenses: todaysExpense,
          total: todaysTotal,
        };
        let lastTenTotal = 0;
        let count = 0;
        const lastTenExpense = [];
        lasttenLoop: for (const exp of expenses) {
          if (
            parseInt(exp.date.split("-")[2]) < state.currentDate &&
            count < 10
          ) {
            lastTenTotal = lastTenTotal + (exp.price ?? 0);
            count++;
            lastTenExpense.push(exp);
          }
          if (count >= 10) {
            break lasttenLoop;
          }
        }
        state.lastTenExpenses = {
          expenses:lastTenExpense,
          total:lastTenTotal
        }
      })
      .addCase(getExpenses.rejected, (state, action) => {
        console.log("rejected block", action);
        state.isLoading = false;
        state.error = true;
      })
      .addCase(addBudget.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log({ action });
        state.budget = action.payload.budget ?? 0;
      })
      .addCase(addBudget.rejected, (state, action) => {
        console.log("rejected block", action);
        state.isLoading = false;
        state.error = true;
      })
      .addCase(getBudget.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budget = parseFloat(
          action.payload.responseData.budget.amount.toFixed(2)
        );
      })
      .addCase(getBudget.rejected, (state, action) => {
        console.log("rejected block", action);
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const { addNewExpense, deleteNewExpense } = expenseSclice.actions;
export default expenseSclice.reducer;
