import { UserRdo } from '@project/common';
import { NameSpace } from '../../common';
import { TState } from '../../common';

const selectUsers = (state: Pick<TState, NameSpace.Users>): UserRdo[] => state[NameSpace.Users].users;

const selectIsUsersLoading = (state: Pick<TState, NameSpace.Users>) => state[NameSpace.Users].isUsersLoading;

const selectIsEmptyUsers = (state: Pick<TState, NameSpace.Users>) => !state[NameSpace.Users].users.length;

export {
  selectUsers,
  selectIsUsersLoading,
  selectIsEmptyUsers,
};
