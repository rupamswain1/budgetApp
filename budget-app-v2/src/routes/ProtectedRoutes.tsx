import { ROUTES } from "$constants";
import { useAuthValidation } from "$hooks";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { RootState } from "store/store";

const ProtectedRoute: React.FC = () => {
  const { isUserLoggedIn } = useAuthValidation();
  const location = useLocation();
  const pathName = location.pathname;
  const { isLoading } = useSelector((state: RootState) => state.expense);
  const { loading } = useSelector((state: RootState) => state.auth);
  if (!isUserLoggedIn && !(pathName === ROUTES.LOGIN)) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  if (pathName === ROUTES.LOGIN && isUserLoggedIn && !isLoading && !loading) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />;
  }

  return <Outlet />; // Render protected content
};

export default ProtectedRoute;
