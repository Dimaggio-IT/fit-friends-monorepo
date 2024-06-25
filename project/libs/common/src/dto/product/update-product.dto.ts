import {
  // IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DescriptionLength, NameLength } from './product.constant';
import { Transform } from 'class-transformer';

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

  // @IsOptional()
  // @IsEnum(GuitarType)
  // public type?: string;

  // @IsOptional()
  // @IsEnum(StringCount)
  // @Transform(({ value }) => +value)
  // public stringCount?: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  public price?: number;
}
