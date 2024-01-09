import { ApiProperty } from '@nestjs/swagger';
import { _IsNotEmpty, _IsString } from '@src/validator';
import { IsEmail } from 'class-validator';

export class LoginRequest {
  @ApiProperty()
  @IsEmail()
  @_IsNotEmpty()
  email: string;

  @ApiProperty()
  @_IsString()
  @_IsNotEmpty()
  password: string;
}

export class LoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
