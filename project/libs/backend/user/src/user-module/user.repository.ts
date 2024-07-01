import { UserEntity } from './user.entity';
import { BasePostgresRepository } from '@project/common';
import { UserFactory } from './user.factory';
import { AuthUser } from '@project/common';
import { PrismaClientService } from '@project/data-access';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, AuthUser> {
  constructor(
    entityFactory: UserFactory,
    override readonly client: PrismaClientService,
  ) {
    super(entityFactory, client)
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
}
