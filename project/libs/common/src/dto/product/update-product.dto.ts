import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DescriptionLength, NameLength } from './product.constant';
import { Transform } from 'class-transformer';
import { UserLevel } from '../../enum/user.enum';
import { ProductType } from '../../enum/shared.enum';
import { TrainingSex } from '../../enum/product.enum';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(NameLength.Min)
  @MaxLength(NameLength.Max)
  public name?: string;

  @IsOptional()
  @IsString()
  public backgroundImage?: string;

  @IsOptional()
  @IsString()
  @IsEnum(UserLevel)
  public userLevel?: UserLevel;

  @IsOptional()
  @IsString()
  @IsEnum(ProductType)
  public type?: ProductType;

  @IsOptional()
  @IsString()
  public duration?: string;

  @IsOptional()
  @Transform(({ value }) => +value)
  public price?: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  public amountOfCalories?: number;

  @IsOptional()
  @IsString()
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  public description?: string;

  @IsOptional()
  @IsString()
  @IsEnum(TrainingSex)
  public sex?: TrainingSex;

  @IsOptional()
  @IsString()
  public video?: string;

  @IsOptional()
  @IsString()
  public coach?: string;

  @IsOptional()
  @Transform(({ value }) => !!value)
  public isSpecial?: boolean;
}
