import { ApiProperty } from '@nestjs/swagger';
import { _IsNotEmpty, _IsString } from '@src/validator';
import { IsEmail } from 'class-validator';

export class CreateUserRequest {
  @ApiProperty()
  @IsEmail()
  @_IsNotEmpty()
  email: string;

  @ApiProperty()
  @_IsString()
  @_IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @_IsString()
  @_IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @_IsString()
  @_IsNotEmpty()
  password: string;

  @ApiProperty()
  @_IsString()
  @_IsNotEmpty()
  gender: string;
}
