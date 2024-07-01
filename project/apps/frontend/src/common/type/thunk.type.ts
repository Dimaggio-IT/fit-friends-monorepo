import { AxiosInstance } from 'axios';
import { TAppDispatch, TState } from '../../common';

type TThunkApiConfig = {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
  rejectValue: Error;
};

export { type TThunkApiConfig };
