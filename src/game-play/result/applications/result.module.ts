import { Module } from '@nestjs/common';
import { ResultController } from './controllers/result.controller';
import { GameResultComponent } from '../components/result.component';
import { GetResultScreenUsecase } from '../domain/usecases/get-result-screen.usecase';
import { PlayGameRepositoryModule } from '@@src/common/infrastructure/repositories/play-game/play-game.repository.module';
import { PageRepositoryModule } from '@@src/common/infrastructure/repositories/page/page.repository.module';

import { UserChoiceRepositoryModule } from '@@src/common/infrastructure/repositories/user-choice/user-choice.module';
import { ChoicePageRepositoryModule } from '@@src/common/infrastructure/repositories/choice-page/choice-page.module';

@Module({
  imports: [
    PlayGameRepositoryModule,
    PageRepositoryModule,
    ChoicePageRepositoryModule,
    UserChoiceRepositoryModule,
  ],
  providers: [GameResultComponent, GetResultScreenUsecase],
  controllers: [ResultController],
})
export class ResultModule {}
