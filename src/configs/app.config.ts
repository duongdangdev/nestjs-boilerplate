import { ONE_SECOND_IN_MILLISECOND } from '@src/common/consts';
import { Transform, plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  validate,
} from 'class-validator';

export enum NODE_ENV {
  DEVELOPMENT = 'development',
  TEST = 'test',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

class Config {
  @IsEnum(NODE_ENV)
  nodeEnv: NODE_ENV = NODE_ENV.DEVELOPMENT;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return +value;
  })
  port: number;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return +value;
  })
  requestTimeout: number;

  @IsString()
  @IsNotEmpty()
  timezone: string;

  @IsString()
  @IsNotEmpty()
  fallbackLanguage: string;

  @IsString()
  @IsNotEmpty()
  languageResolverField: string;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    return +value;
  })
  @IsNotEmpty()
  passwordSaltRounds: number;

  @IsString()
  @IsNotEmpty()
  accessTokenSecretKey: string;

  @IsString()
  @IsNotEmpty()
  accessTokenExpireIn: string;

  @IsString()
  @IsNotEmpty()
  refreshTokenSecretKey: string;

  @IsString()
  @IsNotEmpty()
  refreshTokenExpireIn: string;
}

export const APP_CONFIG = Object.freeze(
  plainToClass(Config, {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.APP_PORT || 3000,
    origin: process.env.APP_ORIGIN || '*',
    requestTimeout:
      process.env.APP_REQUEST_TIMEOUT || 10 * ONE_SECOND_IN_MILLISECOND,
    timezone: process.env.APP_TIMEZONE || 'Asia/Ho_Chi_Minh',

    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
    languageResolverField:
      process.env.APP_LANGUAGE_RESOLVER_FIELD || 'x-locale',

    passwordSaltRounds: process.env.APP_PASSWORD_SALT_ROUND || 12,

    accessTokenSecretKey: process.env.APP_ACCESS_TOKEN_SECRET_KEY,
    accessTokenExpireIn: process.env.APP_ACCESS_TOKEN_EXPIRE_IN,
    refreshTokenSecretKey: process.env.APP_ACCESS_TOKEN_SECRET_KEY,
    refreshTokenExpireIn: process.env.APP_ACCESS_TOKEN_EXPIRE_IN,
  }),
);

validate(APP_CONFIG).then((errors) => {
  if (errors?.length) {
    console.error(errors);
    throw errors;
  }
});
