import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'the uniq user\'s ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'user\'s email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'user\'s login',
    example: 'Keks Ivanov'
  })
  @Expose()
  public login: string;

  @ApiProperty({
    description: 'user\'s access token',
    example: ''
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'user\'s refresh token',
    example: ''
  })
  @Expose()
  public refreshToken: string;
}
