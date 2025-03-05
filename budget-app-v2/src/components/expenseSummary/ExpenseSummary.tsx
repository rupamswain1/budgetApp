import { H1 } from "$components";
import { NewExpense } from "$interfaces";
import { useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  createTheme,
} from "ag-grid-community";
import "./expenseSummary.style.scss";
ModuleRegistry.registerModules([AllCommunityModule]);
interface ExpensesSummaryProps {
  expenses: NewExpense[];
}

const ExpenseSummary: React.FC<ExpensesSummaryProps> = ({ expenses }) => {
  const columnDefinition = useMemo(
    () => [
      {
        headerName: "Date",
        field: "date",
        sortable: true,
        filter: true,
        flex: 2,
      },
      {
        headerName: "Item",
        field: "itemName",
        sortable: true,
        filter: true,
        flex: 2,
      },
      {
        headerName: "Price",
        field: "price",
        sortable: true,
        filter: true,
        flex: 2,
      },
      {
        headerName: "Category",
        field: "category",
        sortable: true,
        filter: true,
        flex: 1,
      },
      {
        headerName: "Payment Method",
        field: "paymentMethod",
        sortable: true,
        filter: true,
        flex: 1,
      },
    ],
    []
  );
  return (
    <div
      className="expense-container"
      style={{ height: `${expenses.length * 5 + 9.5}%` }}
    >
      <H1 text="Expense Summary" type="primary" className="expense-header" />
      <AgGridReact
        className="expense-grid"
        rowData={expenses}
        columnDefs={columnDefinition}
      />
      {/* Add more button */}
      {/* next button */}
    </div>
  );
};

export default ExpenseSummary;
