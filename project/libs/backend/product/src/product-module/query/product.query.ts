import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

import { SortProductBy, SortDirection } from '@project/common';

import {
  PRODUCT_DEFAULT_COUNT_LIMIT,
  PRODUCT_DEFAULT_SORT_DIRECTION,
  PRODUCT_DEFAULT_PAGE_COUNT,
  PRODUCT_DEFAULT_SORT_BY,
} from '../product.constant';
import { ApiProperty } from '@nestjs/swagger';


export class ProductQuery {
  @ApiProperty({
    description: 'Limit',
    example: 50,
  })
  @Transform(({ value }) => +value || PRODUCT_DEFAULT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = PRODUCT_DEFAULT_COUNT_LIMIT;

  @ApiProperty({
    description: 'Sort by',
    example: 'date',
  })
  @IsIn(Object.values(SortProductBy))
  @IsOptional()
  public sortBy?: SortProductBy = PRODUCT_DEFAULT_SORT_BY;

  @ApiProperty({
    description: 'Sort direction',
    example: 'desc',
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = PRODUCT_DEFAULT_SORT_DIRECTION;

  @ApiProperty({
    description: 'Page',
    example: 1,
  })
  @Transform(({ value }) => +value || PRODUCT_DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = PRODUCT_DEFAULT_PAGE_COUNT;
}
