import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResult } from '@project/shared/core';

import { ShopProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { ShopProductEntity } from './product.entity';
import { CatalogQuery } from './query/product.query';
import { UpdateProductDto } from './dto/update-product.dto';
import { ShopProductFactory } from './product.factory';

@Injectable()
export class ShopProductService {
  constructor(
    private readonly productRepository: ShopProductRepository,
  ) { }

  public async createProduct(dto: CreateProductDto): Promise<ShopProductEntity> {
    const newProduct = ShopProductFactory.createFromPostDto(dto);
    await this.productRepository.save(newProduct);

    return newProduct;
  }

  public async deleteProductById(id: string): Promise<void> {
    const product = await this.getProductById(id);

    if (product) {
      await this.productRepository.deleteById(id);
    } else {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  public async getProductById(id: string): Promise<ShopProductEntity> {
    return this.productRepository.findById(id);
  }

  public async getProductsByQuery(query?: CatalogQuery): Promise<PaginationResult<ShopProductEntity>> {
    return this.productRepository.findByQuery(query);
  }

  public async updateProduct(id: string, dto: UpdateProductDto): Promise<ShopProductEntity> {
    const existingProduct = await this.productRepository.findById(id);

    if (!existingProduct) {
      throw new NotFoundException(`You can't update product with ID ${id}`);
    }

    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existingProduct[key] !== value) {
        existingProduct[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return existingProduct;
    }

    return this.productRepository.update(existingProduct);
  }
}
