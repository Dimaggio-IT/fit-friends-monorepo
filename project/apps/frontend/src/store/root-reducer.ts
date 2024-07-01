import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../common';
import { productData, productsData } from '.';
import { userProcess } from '.';

const rootReducer = combineReducers({
  [NameSpace.Product]: productData.reducer,
  [NameSpace.Products]: productsData.reducer,
  [NameSpace.User]: userProcess.reducer,
});

export { rootReducer };
