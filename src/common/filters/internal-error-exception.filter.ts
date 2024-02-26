import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Logger } from 'nestjs-pino';
import { IExceptionResponse } from '../types';

@Catch()
export class InternalErrorExceptionFilter implements ExceptionFilter {
  constructor(readonly logger: Logger) {}

  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(error);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    } as IExceptionResponse);
  }
}
