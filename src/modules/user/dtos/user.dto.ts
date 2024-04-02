import { AutoMap } from '@automapper/classes';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { BasePaginationResponse } from '@src/common/dtos';
import { User } from '../user.entity';

export class UserResponse extends PickType(User, [
  'id',
  'email',
  'firstName',
  'lastName',
  'gender',
]) {
  @AutoMap()
  id: string;

  @AutoMap()
  email: string;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @ApiProperty()
  fullName: string;

  @AutoMap()
  gender: string;
}

export class PaginateUserResponse extends BasePaginationResponse<UserResponse> {
  @ApiProperty({ type: UserResponse, isArray: true })
  data: UserResponse[];
}
