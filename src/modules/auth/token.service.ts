import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { APP_CONFIG } from '@src/configs';
import { AccessTokenPayload, RefreshTokenPayload } from './auth.types';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  createAccessToken(payload: AccessTokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: APP_CONFIG.accessTokenSecretKey,
      expiresIn: APP_CONFIG.accessTokenExpireIn,
    });
  }

  createRefreshToken(payload: RefreshTokenPayload) {
    return this.jwtService.signAsync(payload, {
      secret: APP_CONFIG.refreshTokenSecretKey,
      expiresIn: APP_CONFIG.refreshTokenExpireIn,
    });
  }

  verifyAccessToken(token: string) {
    return this.jwtService.verifyAsync<AccessTokenPayload>(token, {
      secret: APP_CONFIG.accessTokenSecretKey,
    });
  }

  verifyRefreshToken(token: string) {
    return this.jwtService.verifyAsync<RefreshTokenPayload>(token, {
      secret: APP_CONFIG.refreshTokenSecretKey,
    });
  }
}
