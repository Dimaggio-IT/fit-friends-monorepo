import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../common';
import { Comment, IProductRdo } from '@project/common';
import { getAsyncProduct } from './api-actions';

type TProductData = {
  isProductLoading: boolean;
  product: IProductRdo | null;
  comments: Comment[];
  commentRequestStatus: RequestStatus;
};

const initialState: TProductData = {
  isProductLoading: false,
  product: null,
  comments: [],
  commentRequestStatus: RequestStatus.Idle,
};

const productData = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    assignEmptyProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAsyncProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getAsyncProduct.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.product = action.payload;
      })
      .addCase(getAsyncProduct.rejected, (state) => {
        state.isProductLoading = false;
      });
  }
});

const { assignEmptyProduct } = productData.actions;

export {
  productData,
  assignEmptyProduct,
  type TProductData
};
