import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProductRdo } from '@project/common';
import { TThunkApiConfig } from '../../common';
import { APIRoute, NameSpace } from '../../common';

type TProductsWithPagination = {
  entities: IProductRdo[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
};

const getAsyncProducts = createAsyncThunk<IProductRdo[], undefined, TThunkApiConfig>(
  `${NameSpace.Products}/fetchProducts`,
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<TProductsWithPagination>(APIRoute.Products);
      return data.entities;
    } catch (error) {
      throw new Error();
    }
  },
);

export { getAsyncProducts };
