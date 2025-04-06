import { Module } from '@nestjs/common';
import { MyPageController } from './my-page.controller';
import { GetContinuedGameUsecase } from '../domain/usecases/get-continued-game.usecase';
import { GameRepositoryModule } from '@@src/common/infrastructure/repositories/game/game.repository.module';
import { GetGameListComponent } from '../components/get-list.component';
import { PlayGameRepositoryModule } from '@@src/common/infrastructure/repositories/play-game/play-game.repository.module';
import { GetEndedGameListUsecase } from '../domain/usecases/get-ended-game-list.usecase';
import { GetEndedGroupGameListUsecase } from '../domain/usecases/get-ended-group-game-list.usecase';

@Module({
  imports: [GameRepositoryModule, PlayGameRepositoryModule],
  controllers: [MyPageController],
  providers: [
    GetContinuedGameUsecase,
    GetEndedGameListUsecase,
    GetEndedGroupGameListUsecase,
    {
      provide: 'GetGameListComponent',
      useClass: GetGameListComponent,
    },
  ],
})
export class MyPageModule {}
