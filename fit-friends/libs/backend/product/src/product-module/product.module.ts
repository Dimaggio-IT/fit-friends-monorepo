import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/models';

import { ShopProductController } from './product.controller';
import { ShopProductService } from './product.service';
import { ShopProductRepository } from './product.repository';
import { ShopProductFactory } from './product.factory';

@Module({
  imports: [
    PrismaClientModule,
  ],
  controllers: [ShopProductController],
  providers: [
    ShopProductService,
    ShopProductRepository,
    ShopProductFactory,
  ],
  exports: [ShopProductService],
})
export class ShopProductModule { }
