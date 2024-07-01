import { createAsyncThunk } from '@reduxjs/toolkit';
import { replaceURI } from '../../common';
import { TThunkApiConfig } from '../../common';
import { Product } from '@project/common';
import { APIRoute, NameSpace } from '../../common';
import { TProductId } from '../../common';

const getAsyncProduct = createAsyncThunk<Product, TProductId, TThunkApiConfig>(
  `${NameSpace.Product}/fetchProduct`,
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

// const getAsyncComments = createAsyncThunk<TComments, TOfferId, TThunkApiConfig>(
//   `${NameSpace.Data}/fetchComments`,
//   async (productId, { extra: api }) => {
//     try {
//       const route = replaceURI(APIRoute.Review, productId);
//       const { data } = await api.get<TComments>(route);
//       return data;
//     } catch (error) {
//       throw new Error();
//     }
//   },
// );

// const postAsyncComment = createAsyncThunk<TComment, TCommentData, TThunkApiConfig>(
//   `${NameSpace.Data}/fetchComment`,
//   async ({ id: productId, rating, comment }, { extra: api }) => {
//     try {
//       const route = replaceURI(APIRoute.Review, productId);
//       const { data } = await api.post<TComment>(route, { rating, comment });
//       return data;
//     } catch (error) {
//       throw new Error();
//     }
//   },
// );

export { getAsyncProduct };
