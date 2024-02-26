import { Schema } from '@nestjs/mongoose';
import { SchemaOptions } from 'mongoose';

export const MongooseSchema = (options?: SchemaOptions) =>
  Schema(
    Object.assign(
      {
        strict: true,
        timestamps: true,
        toJSON: {
          virtuals: true,
        },
        toObject: {
          virtuals: true,
        },
      } as SchemaOptions,
      options,
    ),
  );
