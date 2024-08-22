import { UserEntity } from './user.entity';
import { BasePostgresRepository, PaginationResult, SortDirection } from '@project/common';
import { UserFactory } from './user.factory';
import { AuthUser } from '@project/common';
import { PrismaClientService } from '@project/data-access';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { USER_DEFAULT_COUNT_LIMIT } from './user.constant';
import { UserQuery } from './query/user.query';

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, AuthUser> {
  constructor(
    entityFactory: UserFactory,
    override readonly client: PrismaClientService,
  ) {
    super(entityFactory, client)
  }

  private calculatePageCount(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  private async getEntryCount(where: Prisma.UserWhereInput): Promise<number> {
    return this.client.user.count({ where });
  }

  public override async save(entity: UserEntity): Promise<UserEntity> {
    const record = await this.client.user.create({
      data: {
        ...entity.toPOJO(),
      }
    });

    entity.id = record.id;

    return entity;
  }

  public override async update(entity: UserEntity): Promise<UserEntity | null> {
    const record = await this.client.user.update({
      where: { id: entity.id },
      data: {
        ...entity.toPOJO(),
      }
    });

    return this.createEntityFromDocument(record as UserEntity);
  }

  public override async findById(id: string): Promise<UserEntity | null> {
    const document = await this.client.user.findFirst({
      where: {
        id,
      }
    });

    if (!document) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document as UserEntity);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.client.user.findFirst({
      where: {
        email,
      }
    });

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(document as UserEntity);
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.user.delete({
      where: {
        id
      }
    });
  }

  public async findByQuery(query?: UserQuery): Promise<PaginationResult<UserEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit ?? USER_DEFAULT_COUNT_LIMIT;
    const where: Prisma.UserWhereInput = {};
    const orderBy: Prisma.UserOrderByWithRelationInput = {};

    // sorting
    if (query?.sortBy && query?.sortDirection && query.sortBy === 'login') {
      orderBy.login = query.sortDirection;
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

    const [records, userCount] = await Promise.all([
      this.client.user.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.getEntryCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record as AuthUser)),
      currentPage: query?.page ?? 1,
      totalPages: this.calculatePageCount(userCount, take),
      itemsPerPage: take,
      totalItems: userCount,
    }
  }
}
