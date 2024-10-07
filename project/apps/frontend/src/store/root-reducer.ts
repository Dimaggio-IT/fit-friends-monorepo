import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../common';
import { productData, productsData } from '.';
import { userProcess } from '.';
import { usersData } from '.';
import { userData } from '.';

const rootReducer = combineReducers({
  [NameSpace.Product]: productData.reducer,
  [NameSpace.Products]: productsData.reducer,
  [NameSpace.UserProcess]: userProcess.reducer,
  [NameSpace.User]: userData.reducer,
  [NameSpace.Users]: usersData.reducer,
});

export { rootReducer };
