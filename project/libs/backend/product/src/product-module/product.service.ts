/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException } from '@nestjs/common';

import { IProduct, PaginationResult } from '@project/common';

import { ProductRepository } from './product.repository';
import { CreateProductDto } from '@project/common';
import { ProductEntity } from './product.entity';
import { ProductQuery } from './query/product.query';
import { UpdateProductDto } from '@project/common';
import { ProductFactory } from './product.factory';
import { UserService } from '@project/user';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly userService: UserService,
  ) { }

  public async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
    const newProduct = ProductFactory.createFromPostDto(dto);
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

  public async getProductById(id: string): Promise<IProduct | null> {
    const productEntity = await this.productRepository.findById(id);
    let result;

    if (productEntity) {
      const user = await this.userService.getUserById(id);
      result = {
        ...productEntity.toPOJO(),
        coachName: user?.login ?? '',
        coachAvatar: user?.avatar ?? '',
      };
    } else {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return result;
  }

  public async getProductsByQuery(query?: ProductQuery): Promise<PaginationResult<ProductEntity>> {
    return this.productRepository.findByQuery(query);
  }

  public async updateProduct(id: string, dto: UpdateProductDto): Promise<ProductEntity | null> {
    const existingProduct = await this.productRepository.findById(id);

    if (!existingProduct) {
      throw new NotFoundException(`You can't update product with ID ${id}`);
    }

    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existingProduct[key as keyof ProductEntity] !== value) {
        (existingProduct as any)[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return existingProduct;
    }

    return this.productRepository.update(existingProduct);
  }
}
