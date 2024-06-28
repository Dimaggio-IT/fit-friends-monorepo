import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PaginationResult, Product, SortDirection } from '@project/shared/core';
import { BasePostgresRepository } from '@project/shared/data-access';
import { PrismaClientService } from '@project/shared/models';

import { ProductEntity } from './product.entity';
import { ProductFactory } from './product.factory';
import { ProductQuery } from './query/product.query';

@Injectable()
export class ProductRepository extends BasePostgresRepository<ProductEntity, Product> {
  constructor(
    entityFactory: ProductFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client)
  }

  private calculateProductPageCount(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async getProductCount(where: Prisma.ProductWhereInput): Promise<number> {
    return this.client.product.count({ where });
  }

  public async save(entity: ProductEntity): Promise<ProductEntity> {
    const record = await this.client.product.create({
      data: {
        ...entity.toPOJO()
      },
    });

    entity.id = record.id;

    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.product.delete({
      where: {
        id
      }
    });
  }

  public async findById(id: string): Promise<ProductEntity> {
    const document = await this.client.product.findFirst({
      where: {
        id,
      }
    });

    if (!document) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async update(entity: ProductEntity): Promise<ProductEntity> {
    const record = await this.client.product.update({
      where: { id: entity.id },
      data: {
        ...entity.toPOJO()
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async findByQuery(query?: ProductQuery): Promise<PaginationResult<ProductEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.ProductWhereInput = {};
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};

    // sorting
    if (query?.sortBy && query?.sortDirection && query.sortBy === 'price') {
      orderBy.price = query.sortDirection;
    } else if (query?.sortBy && query?.sortDirection && query.sortBy === 'date') {
      orderBy.createdAt = query.sortDirection;
    } else {
      orderBy.createdAt = SortDirection.Asc;
    }

    // filtering
    if (query?.type) {
      where.type = query.type;
    } else if (query?.string) {
      where.stringCount = query.string;
    }

    const [records, productCount] = await Promise.all([
      this.client.product.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.getProductCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculateProductPageCount(productCount, take),
      itemsPerPage: take,
      totalItems: productCount,
    }
  }
}
