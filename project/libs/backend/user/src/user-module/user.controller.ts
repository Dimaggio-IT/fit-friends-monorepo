import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';

import { fillDto } from '@project/common';

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
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException(UserError.NotFound);
    }

    return user.toPOJO();
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
  @Patch('/:id')
  public async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(id, dto);

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
