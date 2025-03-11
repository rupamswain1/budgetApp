import { Expenses } from "./expenses";

export interface AddExpenseResponse{
    success:boolean;
    recordsAdded:number;
    updatedRecords:Expenses[],
    totalExpenseAmount:number
}