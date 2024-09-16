import { Module } from '@nestjs/common';
import { ResultController } from './controllers/result.controller';

@Module({
  controllers: [ResultController],
})
export class ResultModule {}
