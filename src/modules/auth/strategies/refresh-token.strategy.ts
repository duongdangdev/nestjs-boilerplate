import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { APP_CONFIG } from '@src/configs';
import { UserService } from '@src/modules/user/user.service';
import { RefreshTokenPayload } from '../auth.types';
import { IUserContext, USER_STATUS } from '@src/common/consts';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor(readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: APP_CONFIG.refreshTokenSecretKey,
    });
  }

  async validate(payload: RefreshTokenPayload): Promise<IUserContext> {
    const user = await this.userService.get(payload.sub);

    if (user.status !== USER_STATUS.ACTIVE) {
      throw new ForbiddenException();
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
    };
  }
}
