import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

import { AuthenticationValidateMessage, LoginLength, PasswordLength } from './user-dto.constant';
import { UserLocation, UserSex } from '../../enum/user.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'User\'s unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User\'s login name',
    example: 'Keks Ivanov',
  })
  @IsString()
  @MinLength(LoginLength.Min)
  @MaxLength(LoginLength.Max)
  public login: string;

  @ApiProperty({
    description: 'User\'s password',
    example: '123456'
  })
  @IsString()
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  public password: string;

  @ApiProperty({
    description: 'User\'s location',
    example: 'Спортивная'
  })
  @IsEnum(UserLocation)
  @IsString()
  public location: UserLocation;

  @ApiProperty({
    description: 'User\'s sex',
    example: 'мужской'
  })
  @IsEnum(UserSex)
  @IsString()
  public sex: UserSex;


  @ApiProperty({
    description: 'User\'s birthday',
    example: '1989-01-01 21:00:00'
  })
  @IsString()
  public birthday: string;
}
