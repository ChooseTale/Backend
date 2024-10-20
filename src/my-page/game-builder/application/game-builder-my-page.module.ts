import { Module } from '@nestjs/common';
import { GameBuilderMyPageController } from './game-builder-my-page.controller';
import { GetMyBuildedGameUsecase } from '../domain/usecases/get-my-builded-game.usecase';
import { GameRepositoryModule } from '@@src/common/infrastructure/repositories/game/game.repository.module';
import { GetGameListComponent } from '@@src/my-page/game-play/components/get-list.component';
import { PlayGameRepositoryModule } from '@@src/common/infrastructure/repositories/play-game/play-game.repository.module';

@Module({
  imports: [GameRepositoryModule, PlayGameRepositoryModule],
  controllers: [GameBuilderMyPageController],
  providers: [
    GetMyBuildedGameUsecase,
    {
      provide: 'GetGameListComponent',
      useClass: GetGameListComponent,
    },
  ],
})
export class GameBuilderMyPageModule {}
