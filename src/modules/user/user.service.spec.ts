import { Test, TestingModule } from '@nestjs/testing';
import { I18nService } from 'nestjs-i18n';
import { UserService } from './user.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import {
  USER_WRONG_EMAIL,
  USER_WRONG_PASSWORD,
  mockUserDto,
} from 'test/mock/data/user.mock';

describe('UserService', () => {
  let userService: UserService;

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
      ],
    }).compile();

    userService = app.get<UserService>(UserService);

    userService.listUser = [];
  });

  describe('CreateUser', () => {
    it('should create successfully', async () => {
      const user = await userService.create(mockUserDto);

      expect(user.email).toEqual(mockUserDto.email);
    });

    it('should throw conflict error due to email exists', async () => {
      try {
        await userService.create(mockUserDto);

        await userService.create(mockUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });

  describe('GetUser', () => {
    it('should return successfully', async () => {
      const user = await userService.create(mockUserDto);

      const response = userService.get(user.id);

      expect(response.id).toEqual(user.id);
    });

    it('should throw not found error', async () => {
      try {
        await userService.get(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('ListUser', () => {
    it('should return successfully', async () => {
      await userService.create(mockUserDto);

      const response = userService.list();

      expect(response.length).toEqual(1);
    });
  });

  describe('validateUserCredential', () => {
    it('should return successfully', async () => {
      await userService.create(mockUserDto);

      const response = await userService.validateUserCredential(
        mockUserDto.email,
        mockUserDto.password,
      );

      expect(response.email).toEqual(mockUserDto.email);
    });

    it('should throw not found exception', async () => {
      await userService.create(mockUserDto);

      try {
        await userService.validateUserCredential(
          USER_WRONG_EMAIL,
          mockUserDto.password,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw not found exception', async () => {
      await userService.create(mockUserDto);

      try {
        await userService.validateUserCredential(
          mockUserDto.email,
          USER_WRONG_PASSWORD,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
