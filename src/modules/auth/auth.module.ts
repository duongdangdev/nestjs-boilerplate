import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_CONFIG } from '@src/configs';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthControllerV1 } from './auth.v1.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { LocalStrategy } from './strategies/local.strategy';
import { TokenService } from './token.service';

@Module({
  imports: [
    JwtModule.register({
      secret: APP_CONFIG.accessTokenSecretKey,
      signOptions: { expiresIn: APP_CONFIG.accessTokenExpireIn },
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    TokenService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  controllers: [AuthControllerV1],
})
export class AuthModule {}
