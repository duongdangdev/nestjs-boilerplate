import { NotFoundException } from '@nestjs/common';
import { calcSkipPaginate, createPaginateResponse } from '@src/common/utils';
import mongodb from 'mongodb';
import {
  AggregateOptions,
  ClientSessionOptions,
  CreateOptions,
  InsertManyOptions,
  Model,
  MongooseQueryOptions,
  PipelineStage,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import MongooseDelete, { SoftDeleteModel } from 'mongoose-delete';
import { FilterQuery, MongooseResultType } from './types';

export abstract class MongooseBaseRepository<TRawDocType> {
  abstract readonly model: Model<TRawDocType>;
  notFoundErrorMessage = 'Entity not found';

  findById(id: string) {
    return this.model.findById(id);
  }

  async findByIdOrFail(id: string) {
    const doc = await this.model.findById(id);

    if (!doc) {
      this.throwNotFoundError();
    }

    return doc;
  }

  findOne(
    filter: FilterQuery<TRawDocType>,
    options?: QueryOptions<TRawDocType>,
  ) {
    return this.model.findOne(filter, null, options);
  }

  async findOneOrFail(
    filter: FilterQuery<TRawDocType>,
    options?: QueryOptions<TRawDocType>,
  ) {
    const doc = this.findOne(filter, options);

    if (!doc) {
      this.throwNotFoundError();
    }

    return doc;
  }

  find(filter: FilterQuery<TRawDocType>, options?: QueryOptions<TRawDocType>) {
    return this.model.find(filter, null, options);
  }

  count(filter: FilterQuery<TRawDocType>) {
    return this.model.countDocuments(filter);
  }

  async paginate(
    filter: FilterQuery<TRawDocType>,
    { page, perPage }: { page: number; perPage: number },
    options?: QueryOptions<TRawDocType>,
  ) {
    const [data, total] = await Promise.all([
      this.find(filter, options)
        .skip(calcSkipPaginate(page, perPage))
        .limit(perPage),
      this.count(filter),
    ]);

    return createPaginateResponse({ data, total, page, perPage });
  }

  // To run in a transaction, use insertMany
  create(doc: TRawDocType, options?: Omit<CreateOptions, 'session'>) {
    return this.model.create(doc, options) as Promise<
      TRawDocType & MongooseResultType
    >;
  }

  insertMany(
    docs: TRawDocType[],
    options?: InsertManyOptions & { lean: true },
  ) {
    return this.model.insertMany(docs, options);
  }

  findOneAndUpdate(
    filter: FilterQuery<TRawDocType>,
    update: UpdateQuery<TRawDocType>,
    options?: QueryOptions<TRawDocType>,
  ) {
    return this.model.findOneAndUpdate(filter, update, options);
  }

  updateOne(
    filter: FilterQuery<TRawDocType>,
    update?: UpdateWithAggregationPipeline | UpdateQuery<TRawDocType>,
    options?: mongodb.UpdateOptions,
  ) {
    return this.model.updateOne(filter, update, options);
  }

  updateMany(
    filter: FilterQuery<TRawDocType>,
    update?: UpdateWithAggregationPipeline | UpdateQuery<TRawDocType>,
    options?: mongodb.UpdateOptions,
  ) {
    return this.model.updateMany(filter, update, options);
  }

  findOneAndDelete(
    filter: FilterQuery<TRawDocType>,
    options?: QueryOptions<TRawDocType>,
  ) {
    return this.model.findOneAndDelete(filter, options);
  }

  deleteOne(
    filter: FilterQuery<TRawDocType>,
    options?: mongodb.DeleteOptions &
      Omit<MongooseQueryOptions<TRawDocType>, 'lean' | 'timestamps'>,
  ) {
    return this.model.deleteOne(filter, options);
  }

  deleteMany(
    filter: FilterQuery<TRawDocType>,
    options?: mongodb.DeleteOptions &
      Omit<MongooseQueryOptions<TRawDocType>, 'lean' | 'timestamps'>,
  ) {
    return this.model.deleteMany(filter, options);
  }

  softDelete(filter: FilterQuery<TRawDocType>, deletedBy?: any) {
    if (
      !(
        typeof (
          this.model as unknown as SoftDeleteModel<
            TRawDocType & MongooseDelete.SoftDeleteDocument
          >
        ).delete === 'function'
      )
    ) {
      throw new Error('Soft Delete plugins is not declared for this model');
    }

    return (
      this.model as unknown as SoftDeleteModel<
        TRawDocType & MongooseDelete.SoftDeleteDocument
      >
    ).delete(filter, deletedBy);
  }

  restore(filter: FilterQuery<TRawDocType>) {
    if (
      !(
        typeof (
          this.model as unknown as SoftDeleteModel<
            TRawDocType & MongooseDelete.SoftDeleteDocument
          >
        ).restore === 'function'
      )
    ) {
      throw new Error('Soft Delete plugins is not declared for this model');
    }

    return (
      this.model as unknown as SoftDeleteModel<
        TRawDocType & MongooseDelete.SoftDeleteDocument
      >
    ).restore(filter);
  }

  startSession(options?: ClientSessionOptions) {
    return this.model.startSession(options);
  }

  aggregate(pipeline?: PipelineStage[], options?: AggregateOptions) {
    return this.model.aggregate(pipeline, options);
  }

  private throwNotFoundError() {
    throw new NotFoundException(this.notFoundErrorMessage);
  }
}
