import { Module } from '@nestjs/common';
import { PlayController } from './controllers/play.controller';
import { GetPlayGameScreenUsecase } from '../domain/usecases/get-play-game-screen.usecase';
import { GetPageDataComponent } from '../components/get-page-data.component';
import { IntroModule } from '@@src/game-play/intro/applications/intro.module';
import { PageRepositoryModule } from '@@src/common/infrastructure/repositories/page/page.repository.module';
import { PageChoiceRepositoryModule } from '@@src/common/infrastructure/repositories/page-choices/page-choice.repository.module';

@Module({
  imports: [IntroModule, PageRepositoryModule, PageChoiceRepositoryModule],
  controllers: [PlayController],
  providers: [
    GetPlayGameScreenUsecase,

    {
      provide: 'GetPageDataComponent',
      useClass: GetPageDataComponent,
    },
  ],
})
export class PlayModule {}
