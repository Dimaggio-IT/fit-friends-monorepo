import { Module } from '@nestjs/common';

import { UserRepository } from './shop-user.repository';
import { UserFactory } from './shop-user.factory';
import { PrismaClientModule } from '@project/shared/models';

@Module({
  imports: [PrismaClientModule],
  providers: [UserRepository, UserFactory],
  exports: [UserRepository, UserFactory],
})
export class UserModule { }
