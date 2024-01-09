import { MapInterceptor } from '@automapper/nestjs';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '@src/common/decorators';
import { UserResponse } from './dtos/user-response.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller({
  version: '1',
  path: 'users',
})
@ApiTags('users.v1')
export class UserControllerV1 {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    type: UserResponse,
    isArray: true,
  })
  @Auth()
  @UseInterceptors(MapInterceptor(User, UserResponse, { isArray: true }))
  listUser() {
    return this.userService.list();
  }

  @ApiOkResponse({
    type: UserResponse,
  })
  @Get(':id')
  @Auth()
  @UseInterceptors(MapInterceptor(User, UserResponse))
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.get(id);
  }
}
