import { ROUTES } from "$constants";
import { useAuthValidation } from "$hooks";
import { Navigate, Outlet, useLocation } from "react-router";


const ProtectedRoute: React.FC = () => {
  const { isUserLoggedIn } = useAuthValidation();
  const location = useLocation();
  const pathName = location.pathname;
  console.log({pathName, isUserLoggedIn})
  if (!isUserLoggedIn && !(pathName === ROUTES.LOGIN)) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  if(pathName === ROUTES.LOGIN && isUserLoggedIn){
    return <Navigate to={ROUTES.HOME} state={{from:location}} replace/>
  }

  return <Outlet />; // Render protected content
};

export default ProtectedRoute;