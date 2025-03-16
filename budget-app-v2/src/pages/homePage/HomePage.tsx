import {
  Card,
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
import { useLayoutEffect, useMemo } from "react";
import { getBudget, getExpenses } from "../../store/expensesReducer";
import "./hompage.scss";
import { REMAINING_BUDGET_CHART } from "$constants";
import { HOME } from "$constants";
import { ColDef } from "ag-grid-community";
import { NewExpense } from "$interfaces";
const HomePage = () => {
  const { isLoading, error, budget, remainingBudget, todaysExpenses, lastTenExpenses } = useSelector(
    (state: RootState) => state.expense
  );
  const dispatch = useDispatch<AppDispatch>();
  useLayoutEffect(() => {
    dispatch(getBudget());
    dispatch(getExpenses());
  }, []);
  const remainingBudgetChartData = useMemo(() => {
    return [
      { ...REMAINING_BUDGET_CHART.REMAINING_BUDGET, value: remainingBudget },
      {
        ...REMAINING_BUDGET_CHART.EXPENSES,
        value: parseFloat((budget - remainingBudget).toFixed(2)),
      },
    ];
  }, [remainingBudget, budget]);

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

  return (
    <>
      {isLoading && <Loader />}
      {budget ? (
        <PostLoginLayout title={HOME.TITLE}>
          <PageSection>
            <>
              <Card title={HOME.CHART_TITLE} amount={remainingBudget}>
                <PieChart data={remainingBudgetChartData} />
              </Card>
              <Card title={HOME.TODAY_EXPENSE} amount={todaysExpenses?.total} enableScroll>
                <Table columnDefs={columnDefinition} rowData={todaysExpenses?.expenses}/>
              </Card>
              <Card title={HOME.LAST_TEN} amount={lastTenExpenses?.total} enableScroll>
              <Table columnDefs={columnDefinition} rowData={lastTenExpenses?.expenses}/>
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
