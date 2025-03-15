import { Expenses } from "./expenses";

export interface AddExpenseResponse {
  success: boolean;
  recordsAdded: number;
  updatedRecords: Expenses[];
  totalExpenseAmount: number;
}

export interface GetExpensesResponse {
  expenses: Expenses[];
  totalExpenseAmount: number;
}

export interface AddBudgetResponse {
  success: boolean;
}

export interface GetBudgetResponse {
  budget: {
    date: string;
    amount: number;
    createdBy: string;
    createdOn: string;
  };
}

export interface FetchUtilResult<T> {
  apiFailed: boolean;
  apiSuccess: boolean;
  responseData: T | null;
}
