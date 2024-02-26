import { Dictionary, Mapper, ModelIdentifier } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  mixin,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { BasePaginationResponse } from '../dtos';

export const MapListInterceptor = <
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
>(
  from: ModelIdentifier<TSource>,
  to: ModelIdentifier<TDestination>,
) => {
  class MixinMapInterceptor implements NestInterceptor {
    constructor(@InjectMapper() readonly mapper: Mapper) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((response: BasePaginationResponse<any>) => {
          response.data = response.data.map((data) =>
            this.mapper.map(data, from, to),
          );

          return response;
        }),
      );
    }
  }

  return mixin(MixinMapInterceptor);
};
