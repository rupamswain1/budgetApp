import { useState } from 'react';

const AddExpensesForm = ({
  userName,
  setLoading,
  setShowAddForm,
  fetchExpenses,
}) => {
  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split('T')[0], // Default to current date
    item: '',
    price: '',
    paidBy: userName || '',
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbwCeHG0lORn8skSqZpjoVMLaPCt4URsS1DfSG1COoAqO0UhVGB-qjOjzLbK19Y7Vv4b1A/exec?action=addExpense&user=${userName}`,
        {
          method: 'POST',

          redirect: 'follow',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(newExpense),
        }
      );

      if (response.ok) {
        setShowAddForm(false);
        fetchExpenses(); // Refresh the expense list
      } else {
        alert('Sorry!! Expense could not be added');
        setLoading(false);
      }
    } catch (error) {
      alert('Something Went wrong');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        border: '1px solid grey',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h3>Add Expense</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddExpense();
        }}
      >
        <div style={{ marginBottom: '8px' }}>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleFormChange}
            className="input"
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label>Item Name:</label>
          <input
            type="text"
            name="item"
            value={newExpense.item}
            onChange={handleFormChange}
            className="input"
            autoComplete="off"
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={newExpense.price}
            onChange={handleFormChange}
            className="input"
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label>Paid By:</label>
          <input
            type="text"
            name="paidBy"
            value={newExpense.paidBy}
            onChange={handleFormChange}
            className="input"
          />
        </div>
        <button type="submit" className="primaryBtn">
          Add Expense
        </button>
        <button
          type="button"
          className="secondaryBtn mt-1"
          onClick={() => {
            setShowAddForm(false);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
export default AddExpensesForm;
