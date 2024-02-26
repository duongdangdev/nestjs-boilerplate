import { MapInterceptor } from '@automapper/nestjs';
import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '@src/common/decorators';
import { UserResponse } from './dtos/user-response.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { MapListInterceptor } from '@src/common/interceptors/map-list.interceptor';
import { BasePaginationRequest } from '@src/common/dtos';
import { ParseObjectIdPipe } from '@src/common/packages/mongoose/pipes';

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
  @UseInterceptors(MapListInterceptor(User, UserResponse))
  paginate(@Query() query: BasePaginationRequest) {
    return this.userService.paginate(query);
  }

  @Get(':id')
  @ApiOkResponse({
    type: UserResponse,
  })
  @Auth()
  @UseInterceptors(MapInterceptor(User, UserResponse))
  get(@Param('id', ParseObjectIdPipe) id: string) {
    return this.userService.get(id);
  }
}
