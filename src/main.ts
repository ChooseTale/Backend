import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from '@@config/index';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './common/guard/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: config.allowCorsList,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  app.useGlobalGuards(new JwtAuthGuard());
  await app.listen(config.port);
}
bootstrap();
