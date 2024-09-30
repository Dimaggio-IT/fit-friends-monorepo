import { PrismaClientService } from '@project/data-access';
import { Entity } from '../base/entity';
import { Repository } from '../interface/repository.interface';
import { StorableEntity } from '../interface/storable-entity.interface';
import { EntityFactory } from '../interface/entity-factory.interface';

export abstract class BasePostgresRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
  DocumentType = ReturnType<T['toPOJO']>
> implements Repository<T> {

  constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly client: PrismaClientService,
  ) { }

  protected createEntityFromDocument(document: DocumentType): T {
    return this.entityFactory.create(document as ReturnType<T['toPOJO']>);
  }

  public async save(entity: T): Promise<T> {
    throw new Error('Not implemented');
  }

  public async findById(id: T['id']): Promise<T | null> {
    throw new Error('Not implemented');
  }

  public async update(entity: T): Promise<T | null> {
    throw new Error('Not implemented');
  }

  public async deleteById(id: T['id']): Promise<void> {
    throw new Error('Not implemented');
  }
}
