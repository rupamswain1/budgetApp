import { EXPENSES_CATEGORY, PAYMENT_METHOD } from "$constants";

export interface ExpenseState {
  newExpenses: NewExpense[];
  expenses: Expenses[];
  todaysExpenses: ExpenseDisplay | null;
  lastTenExpenses: ExpenseDisplay | null;
  budget: number;
  remainingBudget: number;
  currentDate: number;
  currentMonth: number;
  currentYear: number;
  isLoading: boolean;
  error: boolean;
}

export interface NewExpense {
  id: number | string;
  date: string;
  item: string;
  price: number | null;
  category: EXPENSES_CATEGORY;
  paymentMethod: PAYMENT_METHOD;
}

export interface Expenses extends NewExpense {
  paidBy: string;
  createdBy: string;
}

export interface ExpenseDisplay {
  expenses: Expenses[];
  total: number;
}

export enum screenNames {
  ADD,
  SUMMARY,
  LOGIN,
}
