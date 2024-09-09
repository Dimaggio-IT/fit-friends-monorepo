import { Module } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserFactory } from './user.factory';
import { PrismaClientModule } from '@project/data-access';
// import { AuthenticationModule } from '@project/authentication';

@Module({
  imports: [PrismaClientModule],
  providers: [
    UserRepository,
    UserFactory
  ],
  exports: [UserRepository, UserFactory],
})
export class UserModule { }
