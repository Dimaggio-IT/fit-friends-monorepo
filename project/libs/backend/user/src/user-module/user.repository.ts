import { UserEntity } from './user.entity';
import { BasePostgresRepository } from '@project/shared/data-access';
import { UserFactory } from './user.factory';
import { AuthUser } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/models';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, AuthUser> {
  constructor(
    entityFactory: UserFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client)
  }

  public async save(entity: UserEntity): Promise<UserEntity> {
    const record = await this.client.user.create({
      data: {
        ...entity.toPOJO(),
      }
    });

    entity.id = record.id;

    return entity;
  }

  public async update(entity: UserEntity): Promise<UserEntity> {
    const record = await this.client.user.update({
      where: { id: entity.id },
      data: {
        ...entity.toPOJO(),
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async findById(id: string): Promise<UserEntity> {
    const document = await this.client.user.findFirst({
      where: {
        id,
      }
    });

    if (!document) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }


  public async findByEmail(email: string): Promise<UserEntity> {
    const document = await this.client.user.findFirst({
      where: {
        email,
      }
    });
    return this.createEntityFromDocument(document);
  }
}
