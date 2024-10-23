import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from '@@config/index';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './common/guard/jwt.guard';
import session from 'express-session';
import { AllExceptionsFilter } from './common/middleware/exceptions/execption-handller';

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
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({
    origin: config.allowCorsList,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  if (process.env.NODE_ENV === 'production') {
    app.useGlobalGuards(new JwtAuthGuard());
  }

  await app.listen(config.port);
}
bootstrap();
