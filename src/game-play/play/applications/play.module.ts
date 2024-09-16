import { Module } from '@nestjs/common';
import { PlayController } from './controllers/play.controller';
import { GetPlayGameScreenUsecase } from '../domain/usecases/get-play-game-screen.usecase';
import { GetPageDataComponent } from '../components/get-page-data.component';
import { IntroModule } from '@@src/game-play/intro/applications/intro.module';
import { PageRepositoryModule } from '@@src/common/infrastructure/repositories/page/page.repository.module';
import { PageChoiceRepositoryModule } from '@@src/common/infrastructure/repositories/page-choices/page-choice.repository.module';
import { ChooseChoiceUsecase } from '../domain/usecases/choose-choice.usecase';
import { ChooseChoiceComponent } from '../components/choose-choice.component';
import { UserChoiceModule } from '@@src/common/infrastructure/repositories/user-choice/user-choice.module';

@Module({
  imports: [
    IntroModule,
    PageRepositoryModule,
    PageChoiceRepositoryModule,
    UserChoiceModule,
  ],
  controllers: [PlayController],
  providers: [
    GetPlayGameScreenUsecase,
    ChooseChoiceUsecase,

    {
      provide: 'GetPageDataComponent',
      useClass: GetPageDataComponent,
    },
    {
      provide: 'ChooseChoiceComponent',
      useClass: ChooseChoiceComponent,
    },
  ],
})
export class PlayModule {}
