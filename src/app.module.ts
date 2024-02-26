import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
} from 'nestjs-i18n';
import { LoggerModule } from 'nestjs-pino';
import path from 'path';
import { UserModule } from './modules/user/user.module';
import { APP_CONFIG, DATABASE_CONFIG } from './configs';
import { HealthModule } from './modules/health/health.module';
import { SharedModule } from './modules/shared/shared.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        redact: ['req.headers.authorization'],
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: APP_CONFIG.fallbackLanguage,
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        new HeaderResolver([APP_CONFIG.languageResolverField]),
        AcceptLanguageResolver,
      ],
      typesOutputPath: path.join(
        __dirname,
        '../types/i18n-auto-generated-type.d.ts',
      ),
    }),
    // When deploy multi-replicas, use Redis for storage, https://github.com/kkoomen/nestjs-throttler-storage-redis
    ThrottlerModule.forRoot(),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    MongooseModule.forRoot(DATABASE_CONFIG.uri),
    SharedModule,
    HealthModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
