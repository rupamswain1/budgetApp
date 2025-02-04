import React, { useState, useEffect, useRef } from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { isValidUser } from './utils/validateUser';
import Loader from './components/Loader';
import Login from './components/Login';
import BudgetPage from './components/BudgetPage';
import ExpensesPage from './components/ExpensesPage';

const HomePage = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();
  // Check session storage on component mount
  useEffect(() => {
    const savedUserName = sessionStorage.getItem('userName');
    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  useEffect(() => {
    validateUser();
  }, [userName]);

  const validateUser = async () => {
    if (userName.trim()) {
      setLoading(true); // Show loader

      if (await isValidUser(userName)) {
        sessionStorage.setItem('userName', userName);
        setLoading(false); // Hide loader
        navigate('/budget');
      } else {
        setLoading(false); // Hide loader
        alert('Something went wrong, Please contact the adinistrator');
      }
    }
  };

  return (
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
      {loading ? (
        // Loader Element
        <Loader />
      ) : (
        <Login setUserName={setUserName} />
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
