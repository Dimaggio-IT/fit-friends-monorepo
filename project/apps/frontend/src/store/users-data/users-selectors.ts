import { INotificationRdo, IUserRdo } from '@project/common';
import { NameSpace } from '../../common';
import { TState } from '../../common';

const selectUsers = (state: Pick<TState, NameSpace.Users>): IUserRdo[] => state[NameSpace.Users].users;

const selectIsUsersLoading = (state: Pick<TState, NameSpace.Users>) => state[NameSpace.Users].isUsersDataBeingUploaded;

const selectIsEmptyUsers = (state: Pick<TState, NameSpace.Users>) => !state[NameSpace.Users].users.length;

export const selectNotifications = (state: Pick<TState, NameSpace.Users>): INotificationRdo[] =>
  state[NameSpace.Users].notifications;

export {
  selectUsers,
  selectIsUsersLoading,
  selectIsEmptyUsers,
};
