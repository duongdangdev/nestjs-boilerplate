import { Module } from '@nestjs/common';
import { UserControllerV1 } from './user.v1.controller';
import { UserService } from './user.service';
import { UserProfile } from './user.profile';

@Module({
  providers: [UserService, UserProfile],
  controllers: [UserControllerV1],
  exports: [UserService],
})
export class UserModule {}
