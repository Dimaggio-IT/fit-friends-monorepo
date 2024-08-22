import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto, PaginationResult, UpdateUserDto } from '@project/common';

import { UserQuery } from './query/user.query';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  public async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const newUser = UserFactory.createFromDto(dto);
    await this.userRepository.save(newUser);

    return newUser;
  }

  public async deleteUserById(id: string): Promise<void> {
    const foundUser = await this.getUserById(id);

    if (foundUser) {
      await this.userRepository.deleteById(id);
    } else {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  public async getUserById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  public async getUsersByQuery(query?: UserQuery): Promise<PaginationResult<UserEntity>> {
    return this.userRepository.findByQuery(query);
  }

  public async updateUser(id: string, dto: UpdateUserDto): Promise<UserEntity | null> {
    const foundUser = await this.userRepository.findById(id);

    if (!foundUser) {
      throw new NotFoundException(`You can't update the user with ID ${id}`);
    }

    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && foundUser[key as keyof UserEntity] !== value) {
        (foundUser as unknown as Record<string, unknown>)[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return foundUser;
    }

    return this.userRepository.update(foundUser);
  }
}
