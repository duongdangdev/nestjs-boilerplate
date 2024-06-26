import { HttpStatus, INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import {
  HttpExceptionFilter,
  InternalErrorExceptionFilter,
} from './common/filters';
import { TimeoutInterceptor } from './common/interceptors';
import { IExceptionResponse } from './common/types';
import { APP_CONFIG, NodeEnv } from './configs';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Nestjs boilerplate')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.use(helmet());

  app.enableCors({
    origin: APP_CONFIG.origin,
  });

  app.setGlobalPrefix('api', { exclude: ['health'] });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const logger = app.get(Logger);

  app.useLogger(logger);

  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  app.useGlobalFilters(
    new InternalErrorExceptionFilter(logger),
    new HttpExceptionFilter(),
    new I18nValidationExceptionFilter({
      detailedErrors: false,
      responseBodyFormatter(host, exc, formattedErrors) {
        return (<IExceptionResponse>{
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: formattedErrors,
        }) as any;
      },
    }),
  );

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new TimeoutInterceptor(reflector));

  if (APP_CONFIG.nodeEnv !== NodeEnv.PRODUCTION) {
    setupSwagger(app);
  }

  await app.listen(APP_CONFIG.port, () =>
    console.log('Server is listening at port', APP_CONFIG.port),
  );
}

bootstrap();
