import { Type } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

export class MongooseSchemaFactory {
  static create<TClass = any>(
    target: Type<TClass>,
    { softDelete, leanVirtuals } = {
      softDelete: false,
      leanVirtuals: true,
    },
  ): mongoose.Schema<TClass> {
    const schema = SchemaFactory.createForClass(target);

    if (leanVirtuals) {
      schema.plugin(mongooseLeanVirtuals);
    }

    if (softDelete) {
      schema.plugin(MongooseDelete, { overrideMethods: true });
    }

    return schema;
  }
}
