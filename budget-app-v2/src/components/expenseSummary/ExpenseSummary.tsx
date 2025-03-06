import { Button, H1, Table } from "$components";
import { ITEM_TYPES, NewExpense } from "$interfaces";
import { useMemo } from "react";
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import "./expenseSummary.style.scss";
ModuleRegistry.registerModules([AllCommunityModule]);
interface ExpensesSummaryProps {
  expenses: NewExpense[];
}

const ExpenseSummary: React.FC<ExpensesSummaryProps> = ({ expenses }) => {
  const columnDefinition: ColDef<NewExpense>[] = useMemo(
    () => [
      {
        headerName: "Date",
        field: "date",
        sortable: true,
        filter: true,
        width: 100,
        // flex: 2,
      },
      {
        headerName: "Item",
        field: "itemName",
        sortable: true,
        filter: true,
        width: 100,
        // flex: 2,
      },
      {
        headerName: "Price",
        field: "price",
        sortable: true,
        filter: true,
        width: 100,
        // flex: 2,
      },
      {
        headerName: "Category",
        field: "category",
        sortable: true,
        filter: true,
        width: 100,
        // flex: 1,
      },
      {
        headerName: "Payment Method",
        field: "paymentMethod",
        sortable: true,
        filter: true,
        width: 100,
        // flex: 1,
      },
      {
        headerName: "Actions",
        width: 80,
        cellRenderer: () => (
          <div className="action-btn-grid">
            <button>
              <FiEdit2 size={15}/>
            </button>
            <button>
              <MdOutlineDelete size={15}/>
            </button>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <div className="expense-container expense-summary">
      <H1 text="Expense Summary" type="primary" className="expense-header" />
      <div
        className="table-container"
        style={{ height: `${expenses.length * 6.5 + 9.5}%` }}
      >
        <Table rowData={expenses} columnDefs={columnDefinition} />
      </div>
      <div className="btns">
        <Button
          name="Add More"
          type={ITEM_TYPES.SECONDARY}
          onClick={() => {}}
        />
        <Button name="Next" type={ITEM_TYPES.PRIMARY} onClick={() => {}} />
      </div>
    </div>
  );
};

export default ExpenseSummary;
