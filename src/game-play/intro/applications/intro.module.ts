import { Module } from '@nestjs/common';
import { IntroController } from './controllers/intro.controller';
import { GetIntroDataComponent } from '../domain/components/get-intro-data.component';

import { UserRepositoryModule } from '@@src/common/infrastructure/repositories/user/user.repository.module';
import { GameRepositoryModule } from '@@src/common/infrastructure/repositories/game/game.repository.module';
import { PlayGameRepositoryModule } from '@@src/common/infrastructure/repositories/play-game/play-game.repository.module';
import { PageRepositoryModule } from '@@src/common/infrastructure/repositories/page/page.repository.module';
import { ImageRepositoryModule } from '@@src/common/infrastructure/repositories/image/image.repository.module';
import { GetIntroScreenUsecase } from '../domain/usecases/get-intro-screen.usecase';
import { UserChoiceModule } from '@@src/common/infrastructure/repositories/user-choice/user-choice.module';
import { FirstStartGameUsecase } from '../domain/usecases/first-start-game.usecase';
import { StartGameComponent } from '../domain/components/start-game.component';

@Module({
  imports: [
    UserRepositoryModule,
    GameRepositoryModule,
    PlayGameRepositoryModule,
    PageRepositoryModule,
    ImageRepositoryModule,
    UserChoiceModule,
  ],
  controllers: [IntroController],
  providers: [
    GetIntroScreenUsecase,
    FirstStartGameUsecase,
    {
      provide: 'GetIntroDataComponent',
      useClass: GetIntroDataComponent,
    },
    {
      provide: 'StartGameComponent',
      useClass: StartGameComponent,
    },
  ],
  exports: [
    {
      provide: 'GetIntroDataComponent',
      useClass: GetIntroDataComponent,
    },
  ],
})
export class IntroModule {}
