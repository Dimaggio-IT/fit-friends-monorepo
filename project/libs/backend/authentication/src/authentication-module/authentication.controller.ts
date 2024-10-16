import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto, JwtRefreshGuard } from '@project/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '@project/common';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { RegisteredUserRdo } from '../rdo/registered-user.rdo';
import { AuthenticationResponseMessage } from './authentication.constant';
import { JwtAccessGuard } from '@project/common';
import { LocalAuthGuard } from '@project/common';
import { IRequestWithUser } from './request-with-user.interface';
import { RequestWithTokenPayload } from './request-with-token-payload.interface';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  @Post('register')
  public async signUp(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.signUp(dto);

    return fillDto(RegisteredUserRdo, { ...newUser.toPOJO() });
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async signIn(@Req() { user }: IRequestWithUser) {
    if (!user || !user.id)
      throw new BadRequestException('Bad request');

    const { accessToken, refreshToken } = await this.authService.logIn(user.id);

    return fillDto(LoggedUserRdo, { ...user.toPOJO(), accessToken, refreshToken });
  }

  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: AuthenticationResponseMessage.UserLogout,
  })
  @Post('logout')
  async logout(@Req() { user: payload }: RequestWithTokenPayload) {
    if (!payload || !payload.sub)
      throw new BadRequestException('Bad request');
    return this.authService.logOut(payload.sub);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserChecked,
  })
  @HttpCode(200)
  @UseGuards(JwtAccessGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @ApiResponse({
    type: RegisteredUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @UseGuards(JwtAccessGuard)
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUserById(id);
    return existUser.toPOJO();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  public async refreshTokens(@Req() { user: payload }: RequestWithTokenPayload) {
    if (!payload || !payload.refreshToken || !payload.sub)
      throw new BadRequestException('Bad request');
    return this.authService.refreshTokens(payload.sub, payload.refreshToken);
  }
}
