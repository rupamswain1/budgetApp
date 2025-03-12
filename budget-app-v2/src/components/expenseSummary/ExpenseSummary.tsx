import { useDispatch } from "react-redux";
import { deleteNewExpense } from "../../store/expensesReducer";
import { Button, H1, Table } from "$components";
import { ITEM_TYPES, NewExpense, screenNames } from "$interfaces";
import { useMemo } from "react";
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import "./expenseSummary.style.scss";
import { EXPORT_SUMMARY } from "$constants";
ModuleRegistry.registerModules([AllCommunityModule]);
interface ExpensesSummaryProps {
  expenses: NewExpense[];
  handleExpenseEdit: (
    screenName: screenNames,
    expenseData: NewExpense | null
  ) => void;
  showError?:boolean
}

const ExpenseSummary: React.FC<ExpensesSummaryProps> = ({
  expenses,
  handleExpenseEdit,
  showError
}) => {
  const dispatch = useDispatch();
  const handleEdit = (data: NewExpense) => {
    handleExpenseEdit(screenNames.ADD, data);
  };

  const columnDefinition: ColDef<NewExpense>[] = useMemo(
    () => [
      {
        headerName: "Date",
        field: "date",
        sortable: true,
        filter: true,
        width: 100,
      },
      {
        headerName: "Item",
        field: "item",
        sortable: true,
        filter: true,
        width: 100,
      },
      {
        headerName: "Price",
        field: "price",
        sortable: true,
        filter: true,
        width: 100,
      },
      {
        headerName: "Category",
        field: "category",
        sortable: true,
        filter: true,
        width: 100,
      },
      {
        headerName: "Payment Method",
        field: "paymentMethod",
        sortable: true,
        filter: true,
        width: 100,
      },
      {
        headerName: "Actions",
        width: 80,
        cellRenderer: ({ data }: { data: NewExpense }) => (
          <div className="action-btn-grid">
            <button onClick={() => handleEdit(data)}>
              <FiEdit2 size={15} />
            </button>
            <button onClick={() => dispatch(deleteNewExpense(data.id))}>
              <MdOutlineDelete size={15} />
            </button>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <div className="expense-container expense-summary">
      <H1 text={EXPORT_SUMMARY.TITLE} type="primary" className="expense-header" />
      <div
        className="table-container"
        style={{ height: `${expenses.length * 6.5 + 9.5}%` }}
      >
        <Table rowData={expenses} columnDefs={columnDefinition} />
      </div>
      {showError && <div className="error">
        {EXPORT_SUMMARY.ERROR_MESSAGE}
      </div>}
      <div className="btns">
        <Button
          name={EXPORT_SUMMARY.ADD_MORE_BTN}
          type={ITEM_TYPES.SECONDARY}
          onClick={() => handleExpenseEdit(screenNames.ADD, null)}
        />
        <Button
          name={EXPORT_SUMMARY.SUBMIT}
          type={ITEM_TYPES.PRIMARY}
          onClick={() => handleExpenseEdit(screenNames.LOGIN, null)}
        />
      </div>
    </div>
  );
};

export default ExpenseSummary;
