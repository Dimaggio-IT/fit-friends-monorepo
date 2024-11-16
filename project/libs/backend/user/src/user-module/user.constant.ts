import { SortUserBy, SortDirection } from '@project/common';

export const USER_DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const USER_DEFAULT_PAGE_COUNT = 1;
export const USER_DEFAULT_COUNT_LIMIT = 50;
export const USER_DEFAULT_SEARCH_COUNT_LIMIT = 50;
export const USER_DEFAULT_SORT_BY = SortUserBy.Login;

export const UserError = {
  Delete: 'The user is not deleted',
  NotFound: 'The user is not found',
  EmptyList: 'User\'s list is empty',
  IncorrectQuery: 'An incorrect request was received',
} as const;

export enum UserInfo {
  Search = 'Search result by query',
  Add = 'User is added',
  Remove = 'User removed',
  Update = 'User updated',
  ShowAll = 'All users',
  Show = 'User by id',
}
