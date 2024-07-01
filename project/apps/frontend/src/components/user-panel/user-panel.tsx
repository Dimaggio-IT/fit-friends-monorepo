import { memo, useCallback } from 'react';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  deleteAsyncAuth,
  selectAuthStatus,
  selectFavoritesCount,
  selectUserAuthData,
} from '../../store';
import { UserAuth } from './user-auth/user-auth';
import { UserNotAuth } from './user-not-auth/user-not-auth';

const UserAuthMemo = memo(UserAuth);

function UserPanel(): JSX.Element {
  const authStatus = useAppSelector(selectAuthStatus);
  const userData = useAppSelector(selectUserAuthData);
  const quantityFavorite = useAppSelector(selectFavoritesCount);
  const dispatch = useAppDispatch();

  const handleSignOut = useCallback(() => {
    dispatch(deleteAsyncAuth());
  }, [dispatch]);

  return authStatus === AuthorizationStatus.Auth ? (
    <UserAuthMemo
      onSignOut={handleSignOut}
      userData={userData}
      quantityFavorite={quantityFavorite}
    />
  ) : (
    <UserNotAuth />
  );
}

export { UserPanel };
