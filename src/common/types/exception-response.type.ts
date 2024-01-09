import { HttpStatus } from '@nestjs/common';

export interface IExceptionResponse {
  statusCode: HttpStatus;
  error: string;
  message: string | string[];
}
