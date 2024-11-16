import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayNotEmpty, IsAlphanumeric, IsArray, IsBoolean, IsEmail, IsEnum, IsNumber, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';

import { AchievementLength, AmountOfCalories, AuthenticationValidateMessage, DescriptionLength, LoginLength, PasswordLength, UserErrorMessage } from './user-dto.constant';
import { UserLevel, UserLocation, UserRole, UserSex } from '../../enum/user.enum';
import { WorkoutType } from '../../enum/shared.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Аватар пользователя',
    example: 'avatar.png',
  })
  @IsOptional()
  @IsString()
  public avatar?: string;

  @ApiProperty({
    description: 'Описание пользователя',
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
    description: 'Расположение пользователя (метро)',
    example: 'Спортивная',
    required: true,
  })
  @IsEnum(UserLocation)
  @IsString()
  public location!: UserLocation;

  @ApiProperty({
    description: 'Фоновая картинка для карточки пользователя',
    example: 'avatar.png',
  })
  @IsOptional()
  @IsString()
  public backgroundImage?: string;

  @ApiProperty({
    description: 'Пол пользователя',
    enum: UserSex,
    example: 'мужской',
    required: true,
  })
  @IsEnum(UserSex)
  @IsString()
  public sex!: UserSex;

  @ApiProperty({
    description: 'День рождения пользователя',
    example: '1989-01-01 21:00:00',
    required: true,
  })
  @IsString()
  public birthday!: string;

  @ApiProperty({
    description: 'Логин пользователя',
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
    description: 'Электронный адрес пользователя',
    example: 'user@user.ru',
    required: true,
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email!: string;

  @ApiProperty({
    description: 'Уровень подготовки пользователя',
    example: 'любитель',
    enum: UserLevel,
    required: true,
  })
  @IsEnum(UserLevel)
  public level!: UserLevel;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'тренер',
    enum: UserRole,
    required: true,
  })
  @IsEnum(UserRole)
  public role!: UserRole;

  @ApiProperty({
    description: 'Тип тренировки',
    example: 'йога',
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(3)
  @IsEnum(WorkoutType, { each: true })
  public trainingType!: WorkoutType[];

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'a123456bc',
    required: true,
  })
  @IsString()
  @IsAlphanumeric()
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  public password!: string;

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

  @ApiProperty({
    description: 'Флаг готовности проводить индивидуальные тренировки.',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  isPersonalTraining?: boolean;

  @ApiProperty({
    description: 'Текст с описанием заслуг тренера',
    example: 'Keks Ivanov',
    minLength: AchievementLength.Min,
    maxLength: AchievementLength.Max,
  })
  @IsString()
  @IsOptional()
  @MinLength(AchievementLength.Min)
  @MaxLength(AchievementLength.Max)
  public achievement?: string;

  @ApiProperty({
    description: 'Сертификаты тренера',
    example: '[\'cert.pdf\']',
  })
  @IsArray()
  @IsOptional()
  public certificate?: string[];
}
