import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { DEFAULT_PER_PAGE } from '../consts';

export class BasePaginationRequest {
  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  @IsOptional()
  perPage = DEFAULT_PER_PAGE;

  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  @IsOptional()
  page = 1;
}

class BasePaginationMeta {
  @ApiProperty()
  page: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  total: number;
}

export abstract class BasePaginationResponse<T> {
  abstract data: T[];

  @ApiProperty({ type: BasePaginationMeta })
  meta: BasePaginationMeta;
}
