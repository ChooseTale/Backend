import { Module } from '@nestjs/common';
import { GameBuilderMyPageController } from './game-builder-my-page.controller';
import { GetMyBuildedGameUsecase } from '../domain/usecases/get-my-builded-game.usecase';
import { GameRepositoryModule } from '@@src/common/infrastructure/repositories/game/game.repository.module';
import { GetGameListComponent } from '@@src/my-page/game-play/components/get-list.component';
import { PlayGameRepositoryModule } from '@@src/common/infrastructure/repositories/play-game/play-game.repository.module';
import { GetPlayGameResultUsecase } from '../domain/usecases/get-play-game-result.usecase';
import { ResultComponent } from '../components/result.component';
import { ChoicePageRepositoryModule } from '@@src/common/infrastructure/repositories/choice-page/choice-page.module';
import { UserChoiceRepositoryModule } from '@@src/common/infrastructure/repositories/user-choice/user-choice.module';
import { PageRepositoryModule } from '@@src/common/infrastructure/repositories/page/page.repository.module';
import { IsMyGameGuard } from '@@src/game-builder/guard/is-my-game.guard';
import { PrismaService } from '@@prisma/prisma.service';

@Module({
  imports: [
    GameRepositoryModule,
    PlayGameRepositoryModule,
    ChoicePageRepositoryModule,
    UserChoiceRepositoryModule,
    PageRepositoryModule,
  ],
  controllers: [GameBuilderMyPageController],
  providers: [
    GetMyBuildedGameUsecase,
    GetPlayGameResultUsecase,

    {
      provide: 'GetGameListComponent',
      useClass: GetGameListComponent,
    },
    {
      provide: 'ResultComponent',
      useClass: ResultComponent,
    },
    PrismaService,
  ],
})
export class GameBuilderMyPageModule {}
