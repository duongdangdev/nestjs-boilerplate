import { AutoMap } from '@automapper/classes';
import { Prop } from '@nestjs/mongoose';
import { USER_STATUS } from '@src/common/consts';
import {
  BaseMongoEntity,
  MongooseResultType,
  MongooseSchema,
  MongooseSchemaFactory,
} from '@src/common/packages/mongoose';
import { Model } from 'mongoose';

@MongooseSchema()
export class User extends BaseMongoEntity {
  @AutoMap()
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  status: USER_STATUS;

  @AutoMap()
  @Prop()
  firstName: string;

  @AutoMap()
  @Prop()
  lastName: string;

  @AutoMap()
  @Prop()
  gender: string;

  @AutoMap()
  fullName?: string;
}

export const UserSchema = MongooseSchemaFactory.create(User);

UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export type UserResultType = User & MongooseResultType;

export type UserModel = Model<User>;
