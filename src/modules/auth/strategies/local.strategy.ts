import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { isEmail } from 'class-validator';
import { isString } from 'lodash';
import { I18nService } from 'nestjs-i18n';
import { Strategy } from 'passport-local';
import { UserService } from '@src/modules/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    readonly i18n: I18nService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    if (!email || !isEmail(email)) {
      throw new BadRequestException(this.i18n.t('auth.InvalidEmailOrPassword'));
    }

    if (!password || !isString(password)) {
      throw new BadRequestException(this.i18n.t('auth.InvalidEmailOrPassword'));
    }

    const user = await this.userService.validateUserCredential(email, password);

    return user;
  }
}
