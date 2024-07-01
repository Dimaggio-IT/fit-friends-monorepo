import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@project/common';
import { TThunkApiConfig } from '../../common';
import { APIRoute, NameSpace } from '../../common';

const getAsyncProducts = createAsyncThunk<Product[], undefined, TThunkApiConfig>(
  `${NameSpace.Products}/fetchProducts`,
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<Product[]>(APIRoute.Products);
      return data;
    } catch (error) {
      throw new Error();
    }
  },
);

export { getAsyncProducts };
