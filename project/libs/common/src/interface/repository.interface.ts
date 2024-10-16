import { Entity } from '../base/entity';

export interface Repository<T extends Entity> {
  findById(id: T['id']): Promise<T | null>;
  save(entity: T): Promise<T>;
  update(entity: T): Promise<T | null>;
  deleteById(id: T['id']): Promise<void>;
}
