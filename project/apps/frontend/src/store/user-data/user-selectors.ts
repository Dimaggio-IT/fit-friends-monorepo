import { IUserRdo } from '@project/common';
import { NameSpace } from '../../common';
import { TState } from '../../common';

const selectUser = (state: Pick<TState, NameSpace.User>): IUserRdo | null => state[NameSpace.User].user;

const selectIsUserLoading = (state: Pick<TState, NameSpace.User>) => state[NameSpace.User].isUserDataBeingUploaded;

export {
  selectUser,
  selectIsUserLoading,
};
