import { PickType } from '@nestjs/swagger';
import { UserResponse } from '@src/modules/user/dtos';

export class AuthMeResponse extends PickType(UserResponse, [
  'id',
  'email',
  'firstName',
  'lastName',
  'gender',
]) {}
