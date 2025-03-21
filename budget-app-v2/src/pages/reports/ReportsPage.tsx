import { PageSection, PostLoginLayout, BreakupChart, Table } from '$components';
import { useSelector } from 'react-redux';
import './reports.style.scss';
import { RootState } from 'store/store';
import { Expenses } from '$interfaces';
import { ColDef } from 'ag-grid-community';
import { useMemo } from 'react';
const ReportsPage = () => {
  const { expenses } = useSelector((state: RootState) => state.expense);

  const columnDefinition: ColDef<Expenses>[] = useMemo(
    () => [
      {
        headerName: 'Date',
        field: 'date',
        sortable: true,
        filter: true,
        width: 100,
      },
      {
        headerName: 'Item',
        field: 'itemName',
        sortable: true,
        filter: true,
        width: 100,
      },
      {
        headerName: 'Price',
        field: 'price',
        sortable: true,
        filter: true,
        width: 100,
      },
      {
        headerName: 'Paid By',
        field: 'paidBy',
        sortable: true,
        filter: true,
        width: 100,
      },
      {
        headerName: 'Category',
        field: 'category',
        sortable: true,
        filter: true,
        width: 100,
      },
      {
        headerName: 'Payment Method',
        field: 'paymentMethod',
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
    <div className="reports-container">
      <PostLoginLayout title="Reports">
        <>
          <PageSection>
            <div className="reports-charts">
              <BreakupChart data={expenses} />
            </div>
          </PageSection>
          <PageSection>
            <div className="reports-expense">
              <Table columnDefs={columnDefinition} rowData={expenses} />
            </div>
          </PageSection>
        </>
      </PostLoginLayout>
    </div>
  );
};

export default ReportsPage;
