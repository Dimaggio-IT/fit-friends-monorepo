import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/data-access';
import { UserModule } from '@project/user';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductFactory } from './product.factory';

@Module({
  imports: [
    PrismaClientModule,
    UserModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    ProductFactory,
  ],
  exports: [ProductService],
})

export class ProductModule { }
