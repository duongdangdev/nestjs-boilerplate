import { IUserContext } from '@src/common/consts';

export class AccessTokenPayload {
  sub: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;

  static from(userCtx: IUserContext) {
    return {
      sub: userCtx.id,
      email: userCtx.email,
      firstName: userCtx.firstName,
      lastName: userCtx.lastName,
      gender: userCtx.gender,
    } as AccessTokenPayload;
  }
}

export class RefreshTokenPayload extends AccessTokenPayload {}
