import { EXPENSES_CATEGORY, PAYMENT_METHOD } from "$constants";

interface ExpenseState{
    newExpenses: newExpense[];
    expenses:Expenses[];
    budget:number;
    remainingBudget:number;
    currentMonth:number;
    currentYear:number
}

interface newExpense{
    date:Date;
    itemName:string;
    price: number;
    category : EXPENSES_CATEGORY;
    paymentMethod: PAYMENT_METHOD
}

interface Expenses extends newExpense{
    id:number;
    paidBy:string;
    createdBy:string;
}