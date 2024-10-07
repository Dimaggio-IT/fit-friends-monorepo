import { NameSpace } from '../../common';
import { TState } from '../../common';
import { AuthorizationStatus } from '../../common';

const selectAuthStatus = (state: Pick<TState, NameSpace.UserProcess>): AuthorizationStatus => state[NameSpace.UserProcess].authorizationStatus;

const selectIsAuthStatus = (state: Pick<TState, NameSpace.UserProcess>): boolean => state[NameSpace.UserProcess].authorizationStatus !== AuthorizationStatus.NoAuth;

// const selectUserAuthData = (state: Pick<TState, NameSpace.User>): TAuthResponse | null => state[NameSpace.User].user;

export { selectAuthStatus, selectIsAuthStatus };
