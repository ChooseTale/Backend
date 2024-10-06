import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { GetListUsecase } from '../domain/usecases/get-list.usecase';
import { PageNationComponent } from '../components/page-nation.component';
import { GameRepositoryModule } from '@@src/common/infrastructure/repositories/game/game.repository.module';

@Module({
  imports: [GameRepositoryModule],
  controllers: [ListController],
  providers: [
    GetListUsecase,
    {
      provide: 'PageNationComponent',
      useClass: PageNationComponent,
    },
  ],
})
export class ListModule {}
