import { AutoMap } from '@automapper/classes';
import { USER_STATUS } from '@src/common/consts';

export class User {
  @AutoMap()
  id: number;

  @AutoMap()
  email: string;

  password: string;

  status: USER_STATUS;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  gender: string;
}
