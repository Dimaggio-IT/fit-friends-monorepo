import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayNotEmpty, IsAlphanumeric, IsArray, IsEmail, IsEnum, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';

import { AuthenticationValidateMessage, DescriptionLength, LoginLength, PasswordLength, UserErrorMessage } from './user-dto.constant';
import { UserLevel, UserLocation, UserRole, UserSex } from '../../enum/user.enum';
import { WorkoutType } from '../../enum/shared.enum';

export class CreateUserDto {
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
    required: true,
  })
  @IsEnum(UserLocation)
  @IsString()
  public location!: UserLocation;

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
    required: true,
  })
  @IsEnum(UserSex)
  @IsString()
  public sex!: UserSex;

  @ApiProperty({
    description: 'User\'s birthday',
    example: '1989-01-01 21:00:00',
    required: true,
  })
  @IsString()
  public birthday!: string;

  @ApiProperty({
    description: 'User\'s login name',
    example: 'Keks Ivanov',
    required: true,
    minLength: LoginLength.Min,
    maxLength: LoginLength.Max,
  })
  @IsString()
  @MinLength(LoginLength.Min)
  @MaxLength(LoginLength.Max)
  @Matches(/[a-zа-яё\s]+/i)
  public login!: string;

  @ApiProperty({
    description: 'User\'s unique address',
    example: 'user@user.ru',
    required: true,
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email!: string;

  @ApiProperty({
    description: 'User level',
    example: 'любитель',
    enum: UserLevel,
    required: true,
  })
  @IsEnum(UserLevel)
  public level!: UserLevel;

  @ApiProperty({
    description: 'User role',
    example: 'тренер',
    enum: UserRole,
    required: true,
  })
  @IsEnum(UserRole)
  public role!: UserRole;

  @ApiProperty({
    description: 'Training type',
    example: 'йога',
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(3)
  @IsEnum(WorkoutType, { each: true })
  public trainingType!: WorkoutType[];

  @ApiProperty({
    description: 'User\'s password',
    example: 'a123456bc',
    required: true,
  })
  @IsString()
  @IsAlphanumeric()
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  public password!: string;
}
