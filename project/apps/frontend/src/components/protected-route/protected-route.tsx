import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectAuthStatus } from '../../store';

type TProtectedRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
};

function ProtectedRoute(props: TProtectedRouteProps): JSX.Element {
  const { restrictedFor, redirectTo, children } = props;
  const authStatus = useAppSelector(selectAuthStatus);

  return authStatus === restrictedFor ? <Navigate to={redirectTo} /> : children;
}

export { ProtectedRoute };
