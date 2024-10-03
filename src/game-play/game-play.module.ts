import { Module } from '@nestjs/common';
import { IntroModule } from './intro/applications/intro.module';
import { ResultModule } from './result/applications/result.module';
import { PlayModule } from './play/applications/play.module';
import { RouterModule } from '@nestjs/core';
import { ListModule } from './list/applications/list.module';

@Module({
  imports: [
    IntroModule,
    PlayModule,
    ResultModule,
    ListModule,

    RouterModule.register([
      {
        path: 'game-play',
        children: [IntroModule, PlayModule, ResultModule, ListModule],
      },
    ]),
  ],
  exports: [IntroModule, PlayModule, ResultModule],
})
export class GamePlayModule {}
