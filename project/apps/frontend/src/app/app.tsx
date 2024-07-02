import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../common';
// import { ProtectedRoute } from '../components';
import {
  NotFoundPage,
  LoginPage,
  IntroPage,
  MainPage,
  ProductPage,
  RegisterPage,
} from '../pages';

function App(): JSX.Element {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path={`${AppRoute.Product}`} element={<ProductPage />} />
      <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route path={AppRoute.Register} element={<RegisterPage />} />
    </Routes>
  );
}

export { App };
