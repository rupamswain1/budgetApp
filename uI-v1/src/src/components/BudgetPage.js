import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { verifySessionBudget } from '../utils/verifyBudget';

const BudgetPage = () => {
  const [showForm, setShowForm] = useState(false); // Controls visibility of the form
  const [date, setDate] = useState(''); // Date input for budget
  const [amount, setAmount] = useState(''); // Amount input for budget
  const [loading, setLoading] = useState(true); // Loader state
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBudget();
  }, [navigate]);
  const fetchBudget = async () => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // JavaScript months are 0-based
    const currentYear = now.getFullYear();
    const userName = sessionStorage.getItem('userName');
    userName && setUserName(userName);
    const storedBudget = JSON.parse(sessionStorage.getItem('budget'));
    if (verifySessionBudget(storedBudget)) {
      navigate('/expenses');
    } else {
      getBudgetData(currentMonth, currentYear, userName);
    }
  };

  const getBudgetData = async (currentMonth, currentYear, userName) => {
    try {
      // Fetch budget from the API
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbwCeHG0lORn8skSqZpjoVMLaPCt4URsS1DfSG1COoAqO0UhVGB-qjOjzLbK19Y7Vv4b1A/exec?action=getBudget&month=${currentMonth}&year=${currentYear}&user=${userName}`,
        {
          redirect: 'follow',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
        }
      );
      const data = await response.json();

      if (data?.budget && data?.budget?.amount) {
        sessionStorage.setItem('budget', JSON.stringify(data.budget));
        setLoading(false);
        navigate('/expenses');
      } else {
        setShowForm(true); // Show form if no valid budget exists
        setLoading(false);
      }
    } catch (error) {
      setShowForm(true); // Show form on error
      setLoading(false);
    }
  };

  const postBudget = async (amount, date) => {
    const response = await fetch(
      `https://script.google.com/macros/s/AKfycbwCeHG0lORn8skSqZpjoVMLaPCt4URsS1DfSG1COoAqO0UhVGB-qjOjzLbK19Y7Vv4b1A/exec?action=addBudget&user=${userName}`,
      {
        method: 'POST',

        redirect: 'follow',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          date,
          budget: amount,
        }),
      }
    );
    const responseData = await response.json();

    return responseData?.success;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !amount) {
      alert('Please fill in both the date and amount.');
      return;
    }
    setLoading(true);
    setShowForm(false);
    const isPosted = await postBudget(amount, date);

    if (isPosted) {
      sessionStorage.setItem(
        'budget',
        JSON.stringify({
          date,
          budget: amount,
        })
      );
      setShowForm(false);
      navigate('/expenses');
    } else {
      setLoading(false);
      setShowForm(true);
      alert('Unable to create Budget');
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f8f9fa',
          }}
        >
          {showForm && (
            <form
              onSubmit={handleSubmit}
              style={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
                Enter Budget
              </h2>
              <div style={{ marginBottom: '15px' }}>
                <label
                  htmlFor="date"
                  style={{ display: 'block', marginBottom: '5px' }}
                >
                  Date:
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label
                  htmlFor="amount"
                  style={{ display: 'block', marginBottom: '5px' }}
                >
                  Amount:
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                Save Budget
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default BudgetPage;
