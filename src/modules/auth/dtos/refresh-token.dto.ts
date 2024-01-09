import { ApiProperty } from '@nestjs/swagger';
import { _IsNotEmpty, _IsString } from '@src/validator';
import { LoginResponse } from './login.dto';

export class RefreshTokenRequest {
  @ApiProperty()
  @_IsString()
  @_IsNotEmpty()
  refreshToken: string;
}

export class RefreshTokenResponse extends LoginResponse {}
