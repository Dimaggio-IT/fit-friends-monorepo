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
import { CabinetPage } from '../pages/cabinet-page/cabinet-page';
import { FriendsPage } from '../pages/friends-page/friends-page';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  getAsyncProducts,
  getAsyncUser,
  getAsyncUsers,
  selectAuthStatus,
} from '../store';
import { useEffect } from 'react';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(getAsyncUser());
    }
  }, [authStatus, dispatch]);

  useEffect(() => {
    // TODO: подгрузить с бэка у пользователя: тренировки, каталог, покупки, друзей
    // TODO: подгрузить с бэка у тренера: тренировки, друзей, заказы
    // пока подгрузка всех тренировок юзеров
    dispatch(getAsyncProducts());
    dispatch(getAsyncUsers());
  }, [dispatch]);

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
        path={`${AppRoute.Product}/:id`}
        element={
          <ProtectedRoute
            restrictedFor={AuthorizationStatus.NoAuth}
            redirectTo={AppRoute.Intro}
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

      <Route
        path={AppRoute.Cabinet}
        element={
          <ProtectedRoute
            restrictedFor={AuthorizationStatus.NoAuth}
            redirectTo={AppRoute.Intro}
          >
            <CabinetPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={AppRoute.Friends}
        element={
          <ProtectedRoute
            restrictedFor={AuthorizationStatus.NoAuth}
            redirectTo={AppRoute.Intro}
          >
            <FriendsPage />
          </ProtectedRoute>
        }
      />

      <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
    </Routes>
  );
}

export { App };
