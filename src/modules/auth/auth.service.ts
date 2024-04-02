import { Injectable } from '@nestjs/common';
import { IUserContext } from '@src/common/consts';
import { TokenService } from './token.service';
import { AccessTokenPayload, RefreshTokenPayload } from './auth.types';
import { UserService } from '../user/user.service';
import { CreateUserRequest } from '../user/dtos';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    readonly userService: UserService,
  ) {}

  async signUp(dto: CreateUserRequest) {
    await this.userService.create(dto);

    return { success: true };
  }

  async login(userCtx: IUserContext) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.createAccessToken(AccessTokenPayload.from(userCtx)),
      this.tokenService.createRefreshToken(RefreshTokenPayload.from(userCtx)),
    ]);

    return { accessToken, refreshToken };
  }

  async refreshToken(userCtx: IUserContext) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.createAccessToken(AccessTokenPayload.from(userCtx)),
      this.tokenService.createRefreshToken(RefreshTokenPayload.from(userCtx)),
    ]);

    return { accessToken, refreshToken };
  }

  me(userCtx: IUserContext) {
    return userCtx;
  }

  changePassword() {
    //
  }

  forgotPassword() {
    //
  }

  resetPassword() {
    //
  }
}
