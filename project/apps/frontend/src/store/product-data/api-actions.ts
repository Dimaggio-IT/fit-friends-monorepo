import { createAsyncThunk } from '@reduxjs/toolkit';
import { replaceURI } from '../../common';
import { TThunkApiConfig } from '../../common';
import { IProductRdo } from '@project/common';
import { APIRoute, NameSpace } from '../../common';
import { TProductId } from '../../common';

const getAsyncProduct = createAsyncThunk<IProductRdo, TProductId, TThunkApiConfig>(
  `${NameSpace.Product}/getProduct`,
  async (productId, { extra: api }) => {
    try {
      const route = replaceURI({ uri: APIRoute.Product, productId });

      if (!route) {
        return null;
      }

      const { data } = await (api as any).get(route);
      return data;
    } catch (error) {
      throw new Error();
    }
  },
);

export { getAsyncProduct };
