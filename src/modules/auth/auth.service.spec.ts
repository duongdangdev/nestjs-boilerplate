import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_CONFIG } from '@src/configs';
import { UserService } from '../user/user.service';
import { mockUserDto, mockUserService } from 'test/__mock__/user.mock';
import { UserResultType } from '../user/user.entity';

describe('UserService', () => {
  const userCtx = {
    id: '1',
    email: 'user.gmail.com',
    firstName: 'donald',
    lastName: 'trump',
    gender: 'male',
    password: '123456',
  };

  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: APP_CONFIG.accessTokenSecretKey,
          signOptions: { expiresIn: APP_CONFIG.accessTokenExpireIn },
        }),
      ],
      providers: [
        AuthService,
        TokenService,
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    authService = app.get<AuthService>(AuthService);
    userService = app.get<UserService>(UserService);
  });

  describe('SignUp', () => {
    it('should signup successfully', async () => {
      const spy = jest
        .spyOn(userService, 'create')
        .mockResolvedValue(mockUserDto as UserResultType);

      await authService.signUp(mockUserDto);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Login', () => {
    it('should login successfully', async () => {
      const response = await authService.login(userCtx);

      expect(response.accessToken).toBeDefined();
      expect(response.refreshToken).toBeDefined();
    });
  });

  describe('RefreshToken', () => {
    it('should return successfully', async () => {
      const response = await authService.refreshToken(userCtx);

      expect(response.accessToken).toBeDefined();
      expect(response.refreshToken).toBeDefined();
    });
  });

  describe('Me', () => {
    it('should return successfully', async () => {
      const response = await authService.me(userCtx);

      expect(response.id).toEqual(userCtx.id);
    });
  });
});
