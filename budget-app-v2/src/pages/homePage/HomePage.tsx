import {
  Card,
  ErrorCard,
  Loader,
  PageSection,
  PieChart,
  PostLoginLayout,
  Table,
} from "$components";
import { useSelector, useDispatch } from "react-redux";
import AddBudget from "../addBudget/Addbudget";
import "./hompage.scss";
import type { RootState, AppDispatch } from "store/store";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { getBudget, getExpenses } from "../../store/expensesReducer";
import "./hompage.scss";
import { REMAINING_BUDGET_CHART } from "$constants";
import { HOME } from "$constants";
import { ColDef } from "ag-grid-community";
import { Expenses } from "$interfaces";
const HomePage = () => {
  const {
    isLoading,
    error,
    budget,
    remainingBudget,
    todaysExpenses,
    lastTenExpenses,
    expenses,
  } = useSelector((state: RootState) => state.expense);
  const [retry, setRetry] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  useLayoutEffect(() => {
    console.log("runnn");
    if (!budget || budget <= 0 || !expenses || expenses.length < 1) {
      dispatch(getBudget());
      dispatch(getExpenses());
    }
  }, [retry]);
  const remainingBudgetChartData = useMemo(() => {
    return [
      { ...REMAINING_BUDGET_CHART.REMAINING_BUDGET, value: remainingBudget },
      {
        ...REMAINING_BUDGET_CHART.EXPENSES,
        value: parseFloat((budget - remainingBudget).toFixed(2)),
      },
    ];
  }, [remainingBudget, budget]);

  const columnDefinition: ColDef<Expenses>[] = useMemo(
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
        field: "itemName",
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
        headerName: "Paid By",
        field: "paidBy",
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
      // {
      //   headerName: "Actions",
      //   width: 80,
      //   cellRenderer: ({ data }: { data: NewExpense }) => (
      //     <div className="action-btn-grid">
      //       <button onClick={() => handleEdit(data)}>
      //         <FiEdit2 size={15} />
      //       </button>
      //       <button onClick={() => dispatch(deleteNewExpense(data.id))}>
      //         <MdOutlineDelete size={15} />
      //       </button>
      //     </div>
      //   ),
      // },
    ],
    []
  );

  const handleRetry = useCallback(() => {
    setRetry((prev) => prev + 1);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorCard
          text="Unable to fetch Budget and Expenses"
          retryFunction={handleRetry}
        />
      ) : budget ? (
        <PostLoginLayout title={HOME.TITLE}>
          <PageSection>
            <>
              <Card title={HOME.CHART_TITLE} amount={remainingBudget}>
                <PieChart data={remainingBudgetChartData} />
              </Card>
              <Card
                title={HOME.TODAY_EXPENSE}
                amount={todaysExpenses?.total}
                enableScroll
              >
                <Table
                  columnDefs={columnDefinition}
                  rowData={todaysExpenses?.expenses ?? []}
                />
              </Card>
              <Card
                title={HOME.LAST_TEN}
                amount={lastTenExpenses?.total}
                enableScroll
              >
                <Table
                  columnDefs={columnDefinition}
                  rowData={lastTenExpenses?.expenses ?? []}
                />
              </Card>
            </>
          </PageSection>
        </PostLoginLayout>
      ) : (
        <AddBudget />
      )}
    </>
  );
};

export default HomePage;
