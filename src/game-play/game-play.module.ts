import { Module } from '@nestjs/common';
import { IntroModule } from './intro/applications/intro.module';
import { ResultModule } from './result/applications/result.module';
import { PlayModule } from './play/applications/play.module';

@Module({
  imports: [IntroModule, PlayModule, ResultModule],
  exports: [IntroModule, PlayModule, ResultModule],
})
export class GamePlayModule {}
