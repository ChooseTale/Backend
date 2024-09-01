import { Module } from '@nestjs/common';
import { PlayController } from './controllers/play.controller';

@Module({
  controllers: [PlayController],
})
export class PlayModule {}
