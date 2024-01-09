import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_CONFIG } from '@src/configs';

describe('UserService', () => {
  const userCtx = {
    id: 1,
    email: 'user.gmail.com',
    firstName: 'donald',
    lastName: 'trump',
    gender: 'male',
    password: '123456',
  };

  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: APP_CONFIG.accessTokenSecretKey,
          signOptions: { expiresIn: APP_CONFIG.accessTokenExpireIn },
        }),
      ],
      providers: [AuthService, TokenService],
    }).compile();

    authService = app.get<AuthService>(AuthService);
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
