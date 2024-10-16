import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisteredUserRdo {
  @ApiProperty({
    description: 'the unique user\'s ID',
    example: '90118eb1-5dc8-4864-8c98-751b05469da5'
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
}
