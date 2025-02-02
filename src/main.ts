import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from '@@config/index';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './common/guard/jwt.guard';
import session from 'express-session';
import { AllExceptionsFilter } from './common/middleware/exceptions/execption-handller';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import { SwaggerModule } from '@nestjs/swagger';
import fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 클래스 변환을 활성화
    }),
  );

  app.use(
    session({
      secret: config.auth.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: config.auth.sessionMaxAge,
      },
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({
    origin: config.allowCorsList,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  if (process.env.NODE_ENV === 'development') {
    const swaggerDocument = JSON.parse(
      fs.readFileSync('./nestia/swagger.json', 'utf8'),
    );

    SwaggerModule.setup('api-docs', app, swaggerDocument);
  }

  if (process.env.NODE_ENV === 'production') {
    app.useGlobalGuards(new JwtAuthGuard());
  }

  await app.listen(config.port);
}
bootstrap();
