import { Injectable } from '@nestjs/common';

import { EntityFactory, Product } from '@project/shared/core';

import { ShopProductEntity } from './shop-product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ShopProductFactory implements EntityFactory<ShopProductEntity> {
  public create(entityPlainData: Product): ShopProductEntity {
    return new ShopProductEntity(entityPlainData);
  }

  public static createFromPostDto(dto: CreateProductDto): ShopProductEntity {
    return new ShopProductEntity(dto);
  }
}
