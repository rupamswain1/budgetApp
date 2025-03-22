import { Loader, NavBar } from '$components';
import { ROUTES } from '$constants';
import { useAuthValidation } from '$hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';
import { getBudget, getExpenses } from '../store/expensesReducer';
import { AppDispatch, RootState } from 'store/store';

const ProtectedRoute: React.FC = () => {
  const { isUserLoggedIn } = useAuthValidation();
  const location = useLocation();
  const pathName = location.pathname;
  const { budget, expenses, isLoading } = useSelector(
    (state: RootState) => state.expense
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (isUserLoggedIn) {
      if (!budget || budget <= 0 || !expenses || expenses.length < 1) {
        dispatch(getBudget());
        dispatch(getExpenses());
      }
    }
  }, []);

  if (!isUserLoggedIn && !(pathName === ROUTES.LOGIN)) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  if (pathName === ROUTES.LOGIN && isUserLoggedIn) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />;
  }

  return (
    <>
      {isLoading && <Loader />}
      <Outlet />
      {location.pathname !== ROUTES.LOGIN && <NavBar />}
    </>
  ); // Render protected content
};

export default ProtectedRoute;
