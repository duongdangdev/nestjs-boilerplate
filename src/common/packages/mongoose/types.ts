import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, {
  Document,
  ObjectId,
  RootQuerySelector,
  Types,
} from 'mongoose';
import mongodb from 'mongodb';
import MongooseDelete from 'mongoose-delete';

// eslint-disable-next-line @typescript-eslint/ban-types
export type MongooseModel<
  T extends Omit<mongoose.Document, 'delete'>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  QueryHelpers = {},
> = MongooseDelete.SoftDeleteModel<T, QueryHelpers>;

export type MongooseResultType = Document & Required<{ _id: ObjectId }>;

export class BaseMongoEntity {
  @ApiProperty()
  @AutoMap()
  id?: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}

export class BaseMongoEntityWithSoftDelete extends BaseMongoEntity {
  deleted?: boolean;

  deletedAt?: Date;

  deletedBy?: string | Types.ObjectId;
}

export type FilterQuery<T> = {
  [P in keyof T]?: mongodb.Condition<
    [Extract<T[P], mongodb.ObjectId>] extends [never] ? T[P] : T[P] | string
  >;
} & RootQuerySelector<T>;
