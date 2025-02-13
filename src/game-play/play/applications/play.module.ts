import { Module } from '@nestjs/common';
import { PlayController } from './controllers/play.controller';
import { GetPlayGameScreenUsecase } from '../domain/usecases/get-play-game-screen.usecase';
import { GetPageDataComponent } from '../components/get-page-data.component';
import { IntroModule } from '@@src/game-play/intro/applications/intro.module';
import { PageRepositoryModule } from '@@src/common/infrastructure/repositories/page/page.repository.module';

import { ChooseChoiceUsecase } from '../domain/usecases/choose-choice.usecase';
import { ChooseChoiceComponent } from '../components/choose-choice.component';
import { UserChoiceRepositoryModule } from '@@src/common/infrastructure/repositories/user-choice/user-choice.module';
import { ChoicePageRepositoryModule } from '@@src/common/infrastructure/repositories/choice-page/choice-page.module';
import { PlayGameRepositoryModule } from '@@src/common/infrastructure/repositories/play-game/play-game.repository.module';
import { PageImageRepository } from '@@src/game-builder/page/infrastructure/repositories/page-image.repository';
import { PrismaService } from '@@prisma/prisma.service';
import { EndPlayUsecase } from '../domain/usecases/end-play.usecase';

@Module({
  imports: [
    IntroModule,
    PageRepositoryModule,
    ChoicePageRepositoryModule,
    UserChoiceRepositoryModule,
    PlayGameRepositoryModule,
  ],
  controllers: [PlayController],
  providers: [
    GetPlayGameScreenUsecase,
    ChooseChoiceUsecase,
    EndPlayUsecase,
    PrismaService,
    {
      provide: 'PageImageRepository',
      useClass: PageImageRepository,
    },
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
