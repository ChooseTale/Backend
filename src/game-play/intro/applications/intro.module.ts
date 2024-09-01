import { Module } from '@nestjs/common';
import { IntroController } from './controllers/intro.controller';

@Module({
  controllers: [IntroController],
})
export class IntroModule {}
