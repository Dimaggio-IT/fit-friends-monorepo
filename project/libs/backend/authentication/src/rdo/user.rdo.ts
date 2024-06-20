import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'the uniq user\'s ID',
    example: '13'
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
    description: 'user\'s registration date (ISO format)',
    example: '1984-03-27'
  })
  @Expose()
  public registrationDate: string;
}
