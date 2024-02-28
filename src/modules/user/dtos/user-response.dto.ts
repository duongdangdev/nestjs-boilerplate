import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BasePaginationResponse } from '@src/common/dtos';

export class UserResponse {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  email: string;

  @ApiProperty()
  @AutoMap()
  firstName: string;

  @ApiProperty()
  @AutoMap()
  lastName: string;

  @ApiProperty()
  @AutoMap()
  fullName: string;

  @ApiProperty()
  @AutoMap()
  gender: string;
}

export class PaginateUserResponse extends BasePaginationResponse<UserResponse> {
  @ApiProperty({ type: UserResponse, isArray: true })
  data: UserResponse[];
}
