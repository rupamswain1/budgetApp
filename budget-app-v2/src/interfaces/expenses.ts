import { EXPENSES_CATEGORY, PAYMENT_METHOD } from "$constants";

export interface ExpenseState{
    newExpenses: NewExpense[];
    expenses:Expenses[];
    budget:number;
    remainingBudget:number;
    currentDate:number
    currentMonth:number;
    currentYear:number;
}

export interface NewExpense{
    id:number;
    date:Date;
    itemName:string;
    price: number;
    category : EXPENSES_CATEGORY;
    paymentMethod: PAYMENT_METHOD;
}

export interface Expenses extends NewExpense{
    paidBy:string;
    createdBy:string;
}
