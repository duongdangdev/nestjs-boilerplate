import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { APP_CONFIG } from '@src/configs';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { TIMEOUT_KEY } from '../decorators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const timeoutNumber =
      this.reflector.getAllAndOverride<number>(TIMEOUT_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || APP_CONFIG.requestTimeout;

    return next.handle().pipe(
      timeout(timeoutNumber),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () => new RequestTimeoutException('Request Timeout'),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
