import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../common';
import { ProtectedRoute } from '../components';
import {
  NotFoundPage,
  LoginPage,
  IntroPage,
  MainPage,
  ProductPage,
  RegisterPage,
} from '../pages';
import { CatalogPage } from '../pages/catalog-page/catalog-page';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute
            restrictedFor={AuthorizationStatus.NoAuth}
            redirectTo={AppRoute.Intro}
          >
            <MainPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={`${AppRoute.Product}`}
        element={
          <ProtectedRoute
            restrictedFor={AuthorizationStatus.Auth}
            redirectTo={AppRoute.Main}
          >
            <ProductPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={AppRoute.Login}
        element={
          <ProtectedRoute
            restrictedFor={AuthorizationStatus.Auth}
            redirectTo={AppRoute.Main}
          >
            <LoginPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={AppRoute.Register}
        element={
          <ProtectedRoute
            restrictedFor={AuthorizationStatus.Auth}
            redirectTo={AppRoute.Main}
          >
            <RegisterPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={AppRoute.Intro}
        element={
          <ProtectedRoute
            restrictedFor={AuthorizationStatus.Auth}
            redirectTo={AppRoute.Main}
          >
            <IntroPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={AppRoute.Catalog}
        element={
          <ProtectedRoute
            restrictedFor={AuthorizationStatus.NoAuth}
            redirectTo={AppRoute.Intro}
          >
            <CatalogPage />
          </ProtectedRoute>
        }
      />

      <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
    </Routes>
  );
}

export { App };
