import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import {
  UserRepository,
  UserEntity,
  UserFactory,
} from '@fit-friends/user';
import { Token, User } from '@fit-friends/common';
import { createJWTPayload } from '@fit-friends/common';

import { CreateUserDto } from '@fit-friends/common';
import { LoginUserDto } from '@fit-friends/common';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG
} from './authentication.constant';
import { ChangePasswordUserDto } from '@fit-friends/common';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  public async register(dto: CreateUserDto): Promise<UserEntity> {
    const existUser = await this.userRepository
      .findByEmail(dto.email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = UserFactory.createFromDto(dto);
    await userEntity.setPassword(dto.password);

    await this.userRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  public async changePassword(dto: ChangePasswordUserDto): Promise<UserEntity> {
    const { password, newPassword, id } = dto;
    const user = await this.userRepository.findById(id);

    if (!await user.comparePassword(password)) {
      throw new BadRequestException(AUTH_USER_PASSWORD_WRONG);
    }

    const userEntity = await user.setPassword(newPassword);

    return this.userRepository.update(userEntity);
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      return { accessToken };
    } catch (error: unknown) {

      if (error instanceof Error) {
        this.logger.error('[Token generation error]: ' + error.message);
      }

      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }
}
