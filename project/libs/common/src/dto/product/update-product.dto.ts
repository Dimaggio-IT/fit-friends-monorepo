import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Min,
  Max
} from 'class-validator';
import { ArticleLength, DescriptionLength, NameLength, PriceLength } from '../shop-product.constant';
import { Transform } from 'class-transformer';
import { GuitarType, StringCount } from '@project/shared/core';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(NameLength.Min)
  @MaxLength(NameLength.Max)
  public name?: string;

  @IsOptional()
  @IsString()
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  public description?: string;

  @IsOptional()
  @IsString()
  public photo?: string;

  @IsOptional()
  @IsEnum(GuitarType)
  public type?: string;

  @IsOptional()
  @IsString()
  @MinLength(ArticleLength.Min)
  @MaxLength(ArticleLength.Max)
  public article?: string;

  @IsOptional()
  @IsEnum(StringCount)
  @Transform(({ value }) => +value)
  public stringCount?: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  @Min(PriceLength.Min)
  @Max(PriceLength.Max)
  public price?: number;
}
