import { Module } from '@nestjs/common';
import { IntroController } from './controllers/intro.controller';
import { GetIntroDataComponent } from '../domain/components/get-intro-data.component';

import { UserRepositoryModule } from '@@src/common/infrastructure/user/user.repository.module';
import { GameRepositoryModule } from '@@src/common/infrastructure/game/game.repository.module';
import { PlayGameRepositoryModule } from '@@src/common/infrastructure/play-game/play-game.repository.module';
import { PageRepositoryModule } from '@@src/common/infrastructure/page/page.repository.module';
import { ImageRepositoryModule } from '@@src/common/infrastructure/image/image.repository.module';
import { GetIntroScreenUsecase } from '../domain/usecases/get-intro-screen.usecase';
import { UserChoiceModule } from '@@src/common/infrastructure/user-choice/user-choice.module';

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
    {
      provide: 'GetIntroDataComponent',
      useClass: GetIntroDataComponent,
    },
  ],
})
export class IntroModule {}
