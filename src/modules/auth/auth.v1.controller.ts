import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { IUserContext } from '@src/common/consts';
import { Auth, UserContext } from '@src/common/decorators';
import { AppThrottlerGuard } from '@src/common/guards';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse, RefreshTokenResponse } from './dtos';
import { AuthMeResponse } from './dtos/me.dto';
import { AuthLoginGuard, RefreshTokenGuard } from './guards';
import { CreateUserDto } from '../user/dtos';

@Controller({
  version: '1',
  path: 'auth',
})
@ApiTags('auth.v1')
export class AuthControllerV1 {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiBody({ type: CreateUserDto })
  @Throttle({
    default: { limit: 10, ttl: 60000 },
  })
  @UseGuards(AppThrottlerGuard)
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  @ApiOkResponse({ type: LoginResponse })
  @ApiBody({ type: LoginRequest })
  @Throttle({
    default: { limit: 10, ttl: 60000 },
  })
  @UseGuards(AppThrottlerGuard)
  @UseGuards(AuthLoginGuard)
  login(@UserContext() userCtx: IUserContext) {
    return this.authService.login(userCtx);
  }

  @Post('refresh-token')
  @ApiOkResponse({ type: RefreshTokenResponse })
  @Throttle({
    default: { limit: 1, ttl: 60000 },
  })
  @UseGuards(AppThrottlerGuard)
  @UseGuards(RefreshTokenGuard)
  refreshToken(@UserContext() userCtx: IUserContext) {
    return this.authService.refreshToken(userCtx);
  }

  @Get('me')
  @ApiOkResponse({ type: AuthMeResponse })
  @Auth()
  me(@UserContext() userCtx: IUserContext) {
    console.log(userCtx);
    return this.authService.me(userCtx);
  }
}
