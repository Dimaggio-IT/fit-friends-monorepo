import { SortProductBy, SortDirection } from '@project/common';

export const PRODUCT_DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const PRODUCT_DEFAULT_PAGE_COUNT = 1;
export const PRODUCT_DEFAULT_COUNT_LIMIT = 50;
export const PRODUCT_DEFAULT_SEARCH_COUNT_LIMIT = 50;
export const PRODUCT_DEFAULT_SORT_BY = SortProductBy.Date;

export const ProductError = {
  Delete: 'The product is not deleted',
  ProductNotFound: 'The product is not found',
  EmptyList: 'Product list is empty',
} as const;

export enum ProductInfo {
  Search = 'Search result by query',
  Add = 'Product is added',
  Remove = 'Product removed',
  Update = 'Product updated',
  ShowAll = 'All Products',
  Show = 'Product by id',
}
