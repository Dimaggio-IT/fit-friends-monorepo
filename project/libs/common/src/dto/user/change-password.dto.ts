import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { PasswordLength } from './user-dto.constant';

export class ChangePasswordUserDto {
  @ApiProperty({
    description: 'current user password',
    example: '123456'
  })
  @IsString()
  public password: string;

  @ApiProperty({
    description: 'new user password',
    example: '123456'
  })
  @IsString()
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  public newPassword: string;

  @ApiProperty({
    description: 'User\'s email',
    example: 'test@test.test'
  })
  public email: string;

  @ApiProperty({
    description: 'User\'s id',
    example: '59004ff1-e82e-464e-8bcf-81e748c47bc9'
  })
  public id: string;
}
