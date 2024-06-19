import { SortBy, SortDirection } from '@project/shared/core';

export const PRODUCT_DEFAULT_SORT_DIRECTION = SortDirection.Asc;
export const PRODUCT_DEFAULT_PAGE_COUNT = 1;
export const PRODUCT_DEFAULT_COUNT_LIMIT = 7;
export const PRODUCT_DEFAULT_SEARCH_COUNT_LIMIT = 7;
export const PRODUCT_DEFAULT_SORT_BY = SortBy.Date;

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

export enum NameLength {
  Min = 10,
  Max = 100,
}

export enum DescriptionLength {
  Min = 20,
  Max = 1024,
}

export enum ArticleLength {
  Min = 5,
  Max = 40,
}

export enum PriceLength {
  Min = 100,
  Max = 1_000_000,
}
