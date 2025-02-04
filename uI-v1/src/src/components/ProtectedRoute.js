import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isValidUser } from '../utils/validateUser';
import Loader from './Loader';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUser = async () => {
      const userName = sessionStorage.getItem('userName');
      //   const userValidationResult =
      if (!userName || (userName && !(await isValidUser(userName)))) {
        userName && sessionStorage.removeItem('userName');
        setLoading(false);
        navigate('/'); // Redirect to home if userName is invalid
      }
      setLoading(false);
    };
    checkUser();
  }, [navigate]);

  return <>{loading ? <Loader /> : <Outlet />}</>;
};

export default ProtectedRoute;
