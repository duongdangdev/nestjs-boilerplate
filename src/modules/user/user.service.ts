import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_STATUS } from '@src/common/consts';
import { MONGODB_DUPLICATE_ERROR_CODE } from '@src/common/packages/mongoose';
import { I18nService } from 'nestjs-i18n';
import { CreateUserDto } from './dtos';
import { comparePassword, hashPassword } from './password.helper';
import { UserRepository } from './user.repository';
import { BasePaginationRequest } from '@src/common/dtos';

@Injectable()
export class UserService {
  constructor(
    private readonly i18n: I18nService,
    private readonly userRepository: UserRepository,
  ) {}

  paginate({ page, perPage }: BasePaginationRequest) {
    return this.userRepository.paginate({}, { page, perPage });
  }

  get(id: string) {
    return this.userRepository.findByIdOrFail(id);
  }

  async create(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create({
        ...dto,
        password: await hashPassword(dto.password),
        status: USER_STATUS.ACTIVE,
      });

      return user;
    } catch (error) {
      if (error.code === MONGODB_DUPLICATE_ERROR_CODE) {
        throw new ConflictException(this.i18n.t('user.EmailExists'));
      }

      throw error;
    }
  }

  async validateUserCredential(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });

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
