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
    description: 'Page',
    example: 1,
  })
  @Transform(({ value }) => +value || PRODUCT_DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = PRODUCT_DEFAULT_PAGE_COUNT;

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
    description: 'Floor price',
    example: 1000,
  })
  @Transform(({ value }) => +value)
  @IsOptional()
  public minPrice: number;

  @ApiProperty({
    description: 'Ceiling price',
    example: 5000,
  })
  @Transform(({ value }) => +value)
  @IsOptional()
  public maxPrice: number;

  @ApiProperty({
    description: 'minimum calories',
    example: 1000,
  })
  @Transform(({ value }) => +value)
  @IsOptional()
  public minCalories: number;

  @ApiProperty({
    description: 'maximum calories',
    example: 5000,
  })
  @Transform(({ value }) => +value)
  @IsOptional()
  public maxCalories: number;

  @ApiProperty({
    description: 'training duration',
    example: '10 - 30 мин',
  })
  @Transform(({ value }) => +value)
  @IsOptional()
  public duration: number;

  @ApiProperty({
    description: 'the level of training',
    example: 'профессионал',
  })
  @IsOptional()
  public userLevel: string;

  @ApiProperty({
    description: 'the types of fitness',
    example: 'йога',
  })
  @IsOptional()
  public type: string;
}
