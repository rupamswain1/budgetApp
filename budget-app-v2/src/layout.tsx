import { NavBar } from "$components";
import { ROUTES } from "$constants";
import { Homepage, LoginPage } from "$pages";
import { ProtectedRoute } from "$routes";
import { Route, Routes, useLocation } from "react-router";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.LOGIN}element={<LoginPage />} />
          <Route path={ROUTES.HOME} element={<Homepage />} />
        </Route>
      </Routes>
      {location.pathname !== ROUTES.LOGIN && <NavBar />}
    </>
  );
};

export default Layout;
