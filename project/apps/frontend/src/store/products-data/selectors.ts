import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../common';
import { TState } from '../../common';

const selectProducts = (state: Pick<TState, NameSpace.Products>) => state[NameSpace.Products].products;

const selectIsProductsLoading = (state: Pick<TState, NameSpace.Products>) => state[NameSpace.Products].isProductsLoading;

const selectIsEmptyProducts = (state: Pick<TState, NameSpace.Products>) => !state[NameSpace.Products].products.length;

export {
  selectIsProductsLoading,
  selectIsEmptyProducts,
  selectProducts
};
