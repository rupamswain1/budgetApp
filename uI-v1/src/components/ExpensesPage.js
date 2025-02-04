import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifySessionBudget } from '../utils/verifyBudget';
import Loader from './Loader';
import AddExpensesForm from './AddExpenseForm';
import ExpensesTable from './ExpensesTable';
import { Button, Modal, Table } from 'react-bootstrap';

const ExpensesPage = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const userName = useRef('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Validate budget
    userName.current = sessionStorage.getItem('userName');

    const storedBudget = JSON.parse(sessionStorage.getItem('budget'));
    if (!storedBudget || !verifySessionBudget(storedBudget)) {
      sessionStorage.removeItem('budget');
      navigate('/budget');
      return;
    }
    setBudget(storedBudget);

    // Fetch expenses data
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const now = new Date();
      const currentMonth = now.getMonth() + 1; // JavaScript months are 0-based
      const currentYear = now.getFullYear();
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbwCeHG0lORn8skSqZpjoVMLaPCt4URsS1DfSG1COoAqO0UhVGB-qjOjzLbK19Y7Vv4b1A/exec?action=getExpenses&month=${currentMonth}&year=${currentYear}&user=${userName.current}`,
        {
          redirect: 'follow',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setExpenses(data.expenses);
        setTotalExpenseAmount(data.totalExpenseAmount);
        setLoading(false);
      } else {
        alert('Expense fetching failed');
        setLoading(false);
      }
    } catch (error) {
      alert('Expense fetching failed');
      setLoading(false);
    }
  };

  if (!budget) return null; // Avoid rendering until budget is validated

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div className="amountContainer">
        <div
          style={{
            fontSize: '1rem',
            marginBottom: '0.5rem',
            color: budget.amount - totalExpenseAmount >= 0 ? 'green' : 'red',
          }}
        >
          Available Budget:{' '}
          <span
            style={{
              fontWeight: 'bold',
            }}
          >
            ₹{budget.amount - totalExpenseAmount}
          </span>
        </div>
        {/* Total Expense Section */}
        <div style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
          Total Expenses:{' '}
          <span
            style={{
              fontWeight: 'bold',
            }}
          >
            ₹{totalExpenseAmount}
          </span>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ExpensesTable expenses={expenses} />

          {showAddForm && (
            <AddExpensesForm
              userName={userName.current}
              setLoading={setLoading}
              setShowAddForm={setShowAddForm}
              fetchExpenses={fetchExpenses}
            />
          )}
        </>
      )}
      {/* Add Button */}
      <button
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#007BFF',
          color: 'white',
          fontSize: '24px',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={() => setShowAddForm(true)}
      >
        +
      </button>
    </div>
    // <>
    //   <div style={{ padding: '16px' }}>
    //     {/* Budget Section */}
    //     <div
    //       style={{
    //         fontSize: '1.5rem',
    //         fontWeight: 'bold',
    //         marginBottom: '1rem',
    //         color: budget.amount - totalExpenseAmount >= 0 ? 'green' : 'red',
    //       }}
    //     >
    //       Available Budget: ₹{budget.amount - totalExpenseAmount}
    //     </div>

    //     {/* Total Expense Section */}
    //     <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
    //       Total Expenses: ₹{totalExpenseAmount}
    //     </div>

    //     {/* Expenses List */}
    //     <ExpensesTable expenses={expenses} />

    //     {/* Add Button */}
    //     <button
    //       style={{
    //         position: 'fixed',
    //         bottom: '16px',
    //         right: '16px',
    //         width: '60px',
    //         height: '60px',
    //         borderRadius: '50%',
    //         backgroundColor: '#007BFF',
    //         color: 'white',
    //         fontSize: '24px',
    //         border: 'none',
    //         cursor: 'pointer',
    //       }}
    //       onClick={() => setShowAddForm(true)}
    //     >
    //       +
    //     </button>

    //     {/* Add Expense Form */}
    //     {showAddForm && (
    //       <AddExpensesForm
    //         userName={userName.current}
    //         setLoading={setLoading}
    //         setShowAddForm={setShowAddForm}
    //         fetchExpenses={fetchExpenses}
    //       />
    //     )}
    //   </div>
    // </>
  );
};

export default ExpensesPage;
