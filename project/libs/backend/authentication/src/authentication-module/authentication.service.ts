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
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  UserRepository,
  UserEntity,
  UserFactory,
} from '@project/user';
import { IToken, IUser } from '@project/common';
import { createJWTPayload } from '@project/common';
import { CreateUserDto } from '@project/common';
import { LoginUserDto } from '@project/common';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_OR_PASSWORD_WRONG,
} from './authentication.constant';
import { ChangePasswordUserDto } from '@project/common';
import { compare } from 'bcrypt';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  public async signUp(dto: CreateUserDto): Promise<UserEntity> {
    const userExists = await this.userRepository
      .findByEmail(dto.email);

    if (userExists) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = UserFactory.createFromDto(dto);
    await userEntity.setPassword(dto.password);

    await this.userRepository.save(userEntity);

    return userEntity;
  }

  public async logOut(userId: string) {
    const user = await this.getUserById(userId);

    this.updateTokens(user, { accessToken: '', refreshToken: '' });
  }

  public async logIn(userId: string): Promise<IToken> {
    const user = await this.getUserById(userId);

    const authTokensList = await this.getTokens(user);
    this.updateTokens(user, authTokensList);

    return authTokensList;
  }

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_OR_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    const isValidUser = (typeof user !== "undefined" && user);

    if (!isValidUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  public async changePassword(dto: ChangePasswordUserDto): Promise<UserEntity | null> {
    const { password, newPassword, id } = dto;
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await user.comparePassword(password)) {
      throw new BadRequestException(AUTH_USER_OR_PASSWORD_WRONG);
    }

    const userEntity = await user.setPassword(newPassword);

    return this.userRepository.update(userEntity);
  }

  public async getTokens(user: IUser): Promise<IToken> {
    const tokenPayload = createJWTPayload(user);

    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          tokenPayload,
          {
            secret: this.configService.get<string>('jwt.accessTokenSecret'),
            expiresIn: this.configService.get<string>('jwt.accessTokenExpiresIn'),
          },
        ),
        this.jwtService.signAsync(
          tokenPayload,
          {
            secret: this.configService.get<string>('jwt.refreshTokenSecret'),
            expiresIn: this.configService.get<string>('jwt.refreshTokenExpiresIn'),
          },
        ),
      ]);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error: unknown) {

      if (error instanceof Error) {
        this.logger.error('[Tokens generation error]: ' + error.message);
      }

      throw new HttpException('Ошибка при создании токенов.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  public async refreshTokens(userId: string, refreshToken: string): Promise<IToken> {
    const user = await this.getUserById(userId);
    const isValidUser = (typeof user !== "undefined" && user);

    if (!isValidUser)
      throw new ForbiddenException('Access Denied: The user with the required ID was not found');

    if (!user.refreshToken)
      throw new ForbiddenException('refreshToken is missing from the database');

    const isRefreshTokenEqual = refreshToken === user.refreshToken;
    if (!isRefreshTokenEqual)
      throw new ForbiddenException('Access Denied: The tokens do not match each other');

    const authTokensList = await this.getTokens(user);
    await this.updateTokens(user, { accessToken: authTokensList.accessToken, refreshToken: authTokensList.refreshToken });

    return authTokensList;
  }

  public async updateTokens(user: UserEntity, { accessToken, refreshToken }: IToken): Promise<void> {
    user.refreshToken = refreshToken;
    user.accessToken = accessToken;

    await this.userRepository.update(user);
  }

  public async compareToken(refreshToken: string, userToken: string): Promise<boolean> {
    return compare(refreshToken, userToken);
  }
}
