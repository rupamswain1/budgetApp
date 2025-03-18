import { Budget, Expenses, ExpenseState } from "$interfaces";
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

const getTodaysExpenseAndTotal = (expenses:Expenses[],currentDate:number) =>{
  let total = 0;
  const todaysExpense = expenses.filter((exp) => {
    if (exp.date.split("-")[2] === currentDate.toString()) {
      total = total + (exp.price ?? 0);
      return true;
    }
    return false;
  });
  return {todaysExpense,total}
}

const getLast10ExpenseAndTotal = (expenses:Expenses[], currentDate:number) =>{
  let total = 0;
  const last10 = [];
  let count = 0;
  lasttenLoop: for (const exp of expenses) {
    if (
      parseInt(exp.date.split("-")[2]) < currentDate &&
      count < 10
    ) {
      total = total + (exp.price ?? 0);
      count++;
      last10.push(exp);
    }
    if (count >= 10) {
      break lasttenLoop;
    }
  }
  return {last10, total}
}

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
      const newExp = {...action.payload, price: parseFloat(action.payload.price)}
      if (isExpenseAvailable) {
        const newExpenses = state.newExpenses.map((expenses) =>
          expenses.id === action.payload.id ? newExp : expenses
        );
        state.newExpenses = newExpenses;
      } else {
        state.newExpenses = [...state.newExpenses, newExp];
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
        console.log({action})
        state.expenses = updatedRecords.concat(state.expenses);
        const {todaysExpense, total} = getTodaysExpenseAndTotal(updatedRecords,state.currentDate)
        if (state.todaysExpenses) {
          state.todaysExpenses = {
            expenses: todaysExpense.concat(state.todaysExpenses.expenses),
            total: parseFloat(
              (state.todaysExpenses.total + total).toFixed(2)
            ),
          };
        } else {
          state.todaysExpenses = {
            expenses: todaysExpense,
            total: parseFloat(total?.toFixed(2)),
          };
        }
        const {last10, total : lastTotal} = getLast10ExpenseAndTotal(state.expenses,state.currentDate);
        state.lastTenExpenses = {
          expenses : last10,
          total: lastTotal
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
        const {last10, total} = getLast10ExpenseAndTotal(expenses,state.currentDate)
        state.lastTenExpenses = {
          expenses:last10,
          total:total
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
