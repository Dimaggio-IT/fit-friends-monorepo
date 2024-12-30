import { Module } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserFactory } from './user.factory';
import { PrismaClientModule } from '@project/data-access';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaClientModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserFactory
  ],
  exports: [
    UserRepository,
    UserFactory,
    UserService],
})

export class UserModule { }
