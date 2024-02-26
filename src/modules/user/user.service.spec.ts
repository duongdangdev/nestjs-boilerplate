import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MONGODB_DUPLICATE_ERROR_CODE } from '@src/common/packages/mongoose';
import { I18nService } from 'nestjs-i18n';
import { MockMongoRepository } from 'test/__mock__/base/mongo.repository';
import { mockUserDto } from 'test/__mock__/user.mock';
import { UserResultType } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: I18nService,
          useValue: {
            t: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: MockMongoRepository,
        },
      ],
    }).compile();

    userService = app.get<UserService>(UserService);
    userRepository = app.get<UserRepository>(UserRepository);
  });

  describe('CreateUser', () => {
    it('should create successfully', async () => {
      const spy = jest
        .spyOn(userRepository, 'create')
        .mockResolvedValueOnce(mockUserDto as UserResultType);

      const user = await userService.create(mockUserDto);

      expect(spy).toHaveBeenCalled();
      expect(user.email).toEqual(mockUserDto.email);
    });

    it('should throw conflict error due to email exists', async () => {
      const spy = jest
        .spyOn(userRepository, 'create')
        .mockRejectedValueOnce({ code: MONGODB_DUPLICATE_ERROR_CODE });

      try {
        await userService.create(mockUserDto);
      } catch (error) {
        expect(spy).toHaveBeenCalled();
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });

  describe('GetUser', () => {
    it('should return successfully', async () => {
      const spy = jest
        .spyOn(userRepository, 'findByIdOrFail')
        .mockResolvedValueOnce(mockUserDto as UserResultType);

      await userService.get('1');

      expect(spy).toHaveBeenCalled();
    });

    it('should throw not found error', async () => {
      const spy = jest
        .spyOn(userRepository, 'findByIdOrFail')
        .mockRejectedValueOnce(new NotFoundException());
      try {
        await userService.get('abc');
      } catch (error) {
        expect(spy).toHaveBeenCalled();
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('ListUser', () => {
    it('should return successfully', async () => {
      const spy = jest.spyOn(userRepository, 'paginate').mockResolvedValue({
        data: [mockUserDto as UserResultType],
        meta: { page: 1, perPage: 1, total: 1, totalPages: 1 },
      });

      const response = await userService.paginate({ page: 1, perPage: 10 });

      expect(spy).toHaveBeenCalled();
      expect(response.data.length).toEqual(1);
    });
  });
});
