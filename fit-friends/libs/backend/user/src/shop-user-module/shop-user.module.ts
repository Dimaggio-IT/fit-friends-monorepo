import { Module } from '@nestjs/common';

import { ShopUserRepository } from './shop-user.repository';
import { ShopUserFactory } from './shop-user.factory';
import { PrismaClientModule } from '@project/shared/models';

@Module({
  imports: [PrismaClientModule],
  providers: [ShopUserRepository, ShopUserFactory],
  exports: [ShopUserRepository, ShopUserFactory],
})
export class ShopUserModule { }
