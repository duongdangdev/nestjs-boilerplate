import { Module } from '@nestjs/common';
import { UserControllerV1 } from './user.v1.controller';
import { UserService } from './user.service';
import { UserProfile } from './user.profile';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserRepository, UserService, UserProfile],
  controllers: [UserControllerV1],
  exports: [UserService],
})
export class UserModule {}
