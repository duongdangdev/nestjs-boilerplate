import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { APP_CONFIG } from '@src/configs';
import { AccessTokenPayload } from '../auth.types';
import { IUserContext } from '@src/common/consts';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: APP_CONFIG.accessTokenSecretKey,
    });
  }

  async validate(payload: AccessTokenPayload): Promise<IUserContext> {
    return {
      id: payload.sub,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      gender: payload.gender,
    };
  }
}
