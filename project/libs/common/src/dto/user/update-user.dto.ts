import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';

import { AmountOfCalories, DescriptionLength, LoginLength, UserErrorMessage } from './user-dto.constant';
import { UserLevel, UserLocation, UserRole, UserSex } from '../../enum/user.enum';
import { WorkoutType } from '../../enum/shared.enum';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User\'s avatar',
    example: 'avatar.png',
  })
  @IsOptional()
  @IsString()
  public avatar?: string;

  @ApiProperty({
    description: 'User\'s description',
    example: 'Обожаю тягать железо и учить этому других',
    minLength: DescriptionLength.Min,
    maxLength: DescriptionLength.Max,
  })
  @IsString()
  @IsOptional()
  @Length(DescriptionLength.Min, DescriptionLength.Max, {
    message: UserErrorMessage.DescriptionLengthNotValid,
  })
  public description?: string;

  @ApiProperty({
    description: 'User\'s location',
    example: 'Спортивная',
  })
  @IsEnum(UserLocation)
  @IsString()
  @IsOptional()
  public location?: UserLocation;

  @ApiProperty({
    description: 'User\'s background image',
    example: 'avatar.png',
  })
  @IsOptional()
  @IsString()
  public backgroundImage?: string;

  @ApiProperty({
    description: 'User\'s sex',
    enum: UserSex,
    example: 'мужской',
  })
  @IsEnum(UserSex)
  @IsString()
  @IsOptional()
  public sex?: UserSex;

  @ApiProperty({
    description: 'User\'s birthday',
    example: '1989-01-01 21:00:00'
  })
  @IsString()
  @IsOptional()
  public birthday?: string;

  @ApiProperty({
    description: 'User\'s login name',
    example: 'Keks Ivanov',
    minLength: LoginLength.Min,
    maxLength: LoginLength.Max,
  })
  @IsString()
  @IsOptional()
  @MinLength(LoginLength.Min)
  @MaxLength(LoginLength.Max)
  @Matches(/[a-zа-яё\s]+/i)
  public login?: string;

  @ApiProperty({
    description: 'User level',
    example: 'Любитель',
    enum: UserLevel,
  })
  @IsEnum(UserLevel)
  @IsOptional()
  public level?: UserLevel;

  @ApiProperty({
    description: 'User role',
    example: 'тренер',
    enum: UserRole,
  })
  @IsOptional()
  @IsEnum(UserRole)
  public role?: UserRole;

  @ApiProperty({
    description: 'Training type',
    example: 'йога',
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(3)
  @IsOptional()
  @IsEnum(WorkoutType, { each: true })
  public trainingType?: WorkoutType[];

  @ApiProperty({
    description: 'Время для тренировки',
    example: '30-50 мин',
  })
  @IsString()
  @IsOptional()
  timeForTraining?: string;

  @ApiProperty({
    description: 'Калории для сброса',
    example: '1000',
  })
  @IsNumber()
  @IsOptional()
  @MinLength(AmountOfCalories.Min)
  @MaxLength(AmountOfCalories.Max)
  caloriesToReset?: number;

  @ApiProperty({
    description: 'Калории для сброса за день',
    example: '1000',
  })
  @IsNumber()
  @IsOptional()
  @MinLength(AmountOfCalories.Min)
  @MaxLength(AmountOfCalories.Max)
  caloriesToResetPerDay?: number;

  @ApiProperty({
    description: 'Флаг готовности пользователя к приглашениям на тренировку',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  isReadyToTrain?: boolean;
}
