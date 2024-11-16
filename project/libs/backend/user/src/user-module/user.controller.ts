import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { fillDto, RequestWithTokenPayload } from '@project/common';

import { UserService } from './user.service';
import { UserQuery } from './query/user.query';
import { UpdateUserDto } from '@project/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserError, UserInfo } from './user.constant';
import { UserRdo } from './rdo/user.rdo';
import { UserWithPaginationRdo } from './rdo/user-with-pagination.rdo';
import { JwtAccessGuard } from '@project/common';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserInfo.Show,
  })
  @UseGuards(JwtAccessGuard)
  @Get('/user')
  public async show(@Req() { user: payload }: RequestWithTokenPayload) {
    if (!payload?.sub) {
      throw new BadRequestException(UserError.IncorrectQuery);
    }

    const user = await this.userService.getUserById(payload.sub);

    if (!user) {
      throw new NotFoundException(UserError.NotFound);
    }


    return fillDto(UserRdo, user.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserInfo.ShowAll,
  })
  @Get('/')
  public async index(@Query() query: UserQuery) {
    const usersWithPagination = await this.userService.getUsersByQuery(query);
    const result = {
      ...usersWithPagination,
      entities: usersWithPagination.entities.map((user) => user.toPOJO()),
    }

    return fillDto(UserWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserInfo.Update,
  })
  @UseGuards(JwtAccessGuard)
  @Patch('/user')
  public async update(@Req() { user: payload }: RequestWithTokenPayload, @Body() dto: UpdateUserDto) {
    if (!payload?.sub) {
      throw new BadRequestException(UserError.IncorrectQuery);
    }
    const updatedUser = await this.userService.updateUser(payload.sub, dto);

    if (!updatedUser) {
      throw new NotFoundException(UserError.NotFound);
    }

    return fillDto(UserRdo, updatedUser.toPOJO());
  }

  // TODO: доделать Notifications для отображения в компоненте <Header />
  // @UseGuards(JwtAuthGuard)
  // @Get('/')
  // public async showNotifications(@Req() { user: payload }: IRequestWithTokenPayload) {
  //   const notify = await this.notifyService.getNotify(payload.email);
  //   return fillObject(NotifyRdo, notify);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete('/:id')
  // public async deleteNotification(@Param('id') id: number) {
  //   await this.notifyService.deleteNotify(id);
  // }
}
