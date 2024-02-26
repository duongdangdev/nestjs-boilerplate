import { Injectable } from '@nestjs/common';
import { MongooseBaseRepository } from '@src/common/packages/mongoose';
import { I18nService } from 'nestjs-i18n';
import { User, UserModel } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository extends MongooseBaseRepository<User> {
  constructor(
    @InjectModel(User.name) readonly model: UserModel,
    private readonly i18n: I18nService,
  ) {
    super();
    this.notFoundErrorMessage = this.i18n.t('user.NotFound');
  }
}
