import { Injectable } from '@nestjs/common';

import { EntityFactory, Product } from '@project/common';

import { ProductEntity } from './product.entity';
import { CreateProductDto } from '@project/common';

@Injectable()
export class ShopProductFactory implements EntityFactory<ProductEntity> {
  public create(entityPlainData: Product): ProductEntity {
    return new ProductEntity(entityPlainData);
  }

  public static createFromPostDto(dto: CreateProductDto): ProductEntity {
    return new ProductEntity(dto);
  }
}
