import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

import { SortUserBy, SortDirection } from '@project/common';

import {
  USER_DEFAULT_COUNT_LIMIT,
  USER_DEFAULT_SORT_DIRECTION,
  USER_DEFAULT_PAGE_COUNT,
  USER_DEFAULT_SORT_BY,
} from '../user.constant';
import { ApiProperty } from '@nestjs/swagger';


export class UserQuery {
  @ApiProperty({
    description: 'Limit',
    example: 50,
  })
  @Transform(({ value }) => +value || USER_DEFAULT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = USER_DEFAULT_COUNT_LIMIT;

  @ApiProperty({
    description: 'Sort by',
    example: 'login',
  })
  @IsIn(Object.values(SortUserBy))
  @IsOptional()
  public sortBy?: SortUserBy = USER_DEFAULT_SORT_BY;

  @ApiProperty({
    description: 'Sort direction',
    example: 'desc',
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = USER_DEFAULT_SORT_DIRECTION;

  @ApiProperty({
    description: 'Page',
    example: 1,
  })
  @Transform(({ value }) => +value || USER_DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = USER_DEFAULT_PAGE_COUNT;
}
