import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PaginationResult, Product, SortDirection } from '@project/common';
import { BasePostgresRepository } from '@project/common';
import { PrismaClientService } from '@project/data-access';

import { ProductEntity } from './product.entity';
import { ProductFactory } from './product.factory';
import { ProductQuery } from './query/product.query';
import { PRODUCT_DEFAULT_COUNT_LIMIT } from './product.constant';

@Injectable()
export class ProductRepository extends BasePostgresRepository<ProductEntity, Product> {
  constructor(
    entityFactory: ProductFactory,
    override readonly client: PrismaClientService,
  ) {
    super(entityFactory, client)
  }

  private calculateProductPageCount(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async getProductCount(where: Prisma.ProductWhereInput): Promise<number> {
    return this.client.product.count({ where });
  }

  public override async save(entity: ProductEntity): Promise<ProductEntity> {
    const record = await this.client.product.create({
      data: {
        ...entity.toPOJO()
      },
    });

    entity.id = record.id;

    return entity;
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.product.delete({
      where: {
        id
      }
    });
  }

  public override async findById(id: string): Promise<ProductEntity | null> {
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

  public override async update(entity: ProductEntity): Promise<ProductEntity | null> {
    const record = await this.client.product.update({
      where: { id: entity.id },
      data: {
        ...entity.toPOJO()
      }
    });

    if(!record) {
      throw new NotFoundException(`Product with id ${entity.id} not found.`);
    }

    return this.createEntityFromDocument(record);
  }

  public async findByQuery(query?: ProductQuery): Promise<PaginationResult<ProductEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit ?? PRODUCT_DEFAULT_COUNT_LIMIT;
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
    // if (query?.type) {
    //   where.type = query.type;
    // } else if (query?.string) {
    //   where.stringCount = query.string;
    // }

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
      entities: records.map((record) => this.createEntityFromDocument(record as Product)),
      currentPage: query?.page ?? 1,
      totalPages: this.calculateProductPageCount(productCount, take),
      itemsPerPage: take,
      totalItems: productCount,
    }
  }
}
