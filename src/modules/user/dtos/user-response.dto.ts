import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  @AutoMap()
  id: number;

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
  gender: string;
}
