import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CreateUserDto } from './dtos';
import { comparePassword, hashPassword } from './password.helper';
import { User } from './user.entity';
import { USER_STATUS } from '@src/common/consts';

@Injectable()
export class UserService {
  listUser: User[] = [];

  constructor(private readonly i18n: I18nService) {}

  list() {
    return this.listUser;
  }

  get(id: number) {
    const user = this.listUser.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(this.i18n.t('user.NotFound'));
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const emailExists = this.listUser.find((user) => user.email === dto.email);

    if (emailExists) {
      throw new ConflictException(this.i18n.t('user.EmailExists'));
    }

    const user: User = {
      ...dto,
      id: this.listUser.length + 1,
      password: await hashPassword(dto.password),
      status: USER_STATUS.ACTIVE,
    };

    this.listUser.push(user);

    return user;
  }

  async validateUserCredential(email: string, password: string) {
    const user = this.listUser.find((user) => user.email === email);

    if (!user) {
      throw new NotFoundException(this.i18n.t('auth.InvalidEmailOrPassword'));
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new NotFoundException(this.i18n.t('auth.InvalidEmailOrPassword'));
    }

    return user;
  }
}
