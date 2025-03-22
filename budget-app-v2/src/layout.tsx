import { ROUTES } from '$constants';
import { Homepage, LoginPage, ReportsPage, Setting } from '$pages';
import { ProtectedRoute } from '$routes';
import { Route, Routes } from 'react-router';

const Layout = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.HOME} element={<Homepage />} />
          <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
          <Route path={ROUTES.SETTINGS} element={<Setting />} />
        </Route>
      </Routes>
    </>
  );
};

export default Layout;
