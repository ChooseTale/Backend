import { Module } from '@nestjs/common';
import { MyPageController } from './my-page.controller';
import { GetContinuedGameUsecase } from '../domain/usecases/get-continued-game.usecase';
import { GameRepositoryModule } from '@@src/common/infrastructure/repositories/game/game.repository.module';
import { GetContinuedGameListComponent } from '../components/get-list.component';

@Module({
  imports: [GameRepositoryModule],
  controllers: [MyPageController],
  providers: [
    GetContinuedGameUsecase,
    {
      provide: 'GetContinuedGameListComponent',
      useClass: GetContinuedGameListComponent,
    },
  ],
})
export class MyPageModule {}
