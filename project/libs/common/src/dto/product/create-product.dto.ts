import {
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  DescriptionLength,
  NameLength,
} from './product.constant';
import { Transform } from 'class-transformer';
import { TrainingSex } from '../../enum/product.enum';
import { ProductType } from '../../enum/shared.enum';
import { UserLevel } from '../../enum/user.enum';

export class CreateProductDto {
  public rating?: number;

  @IsString()
  @MinLength(NameLength.Min)
  @MaxLength(NameLength.Max)
  public name: string;

  @IsString()
  public backgroundImage: string;

  @IsString()
  @IsEnum(UserLevel)
  public userLevel: UserLevel;

  @IsString()
  @IsEnum(ProductType)
  public type: ProductType;

  @IsString()
  public duration: string;

  @Transform(({ value }) => +value)
  public price: number;

  @Transform(({ value }) => +value)
  public amountOfCalories: number;

  @IsString()
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  public description: string;

  @IsString()
  @IsEnum(TrainingSex)
  public sex: TrainingSex;

  @IsString()
  public video: string;

  @IsString()
  public coach: string;

  @Transform(({ value }) => !!value)
  public isSpecial: boolean;
}
