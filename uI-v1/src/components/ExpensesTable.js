import { Table } from 'react-bootstrap';

const ExpensesTable = ({ expenses }) => {
  return (
    <div className="tableContainer">
      <Table className="table">
        <thead className="tableHead">
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Price (₹)</th>
            <th>Date</th>
            <th>Paid By</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {expenses.map((expense, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{expense.itemName}</td>
                <td>{expense.price}</td>
                <td>{expense.date}</td>
                <td>{expense.paidBy}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpensesTable;
