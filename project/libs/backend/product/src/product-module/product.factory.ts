import { Injectable } from '@nestjs/common';

import { EntityFactory, IProduct } from '@project/common';

import { ProductEntity } from './product.entity';
import { CreateProductDto } from '@project/common';

@Injectable()
export class ProductFactory implements EntityFactory<ProductEntity> {
  public create(entityPlainData: IProduct): ProductEntity {
    return new ProductEntity(entityPlainData);
  }

  public static createFromPostDto(dto: CreateProductDto): ProductEntity {
    return new ProductEntity({ ...dto, rating: 0 });
  }
}
