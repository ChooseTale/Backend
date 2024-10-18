import { Module } from '@nestjs/common';
import { GameBuilderMyPageController } from './game-builder-my-page.controller';

@Module({
  controllers: [GameBuilderMyPageController],
})
export class GameBuilderMyPageModule {}
