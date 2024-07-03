import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from '../../services/game-builder/game/game.service';
import { GameRepository } from '../../infrastructure/repositories/game.repository';
import { PrismaService } from '@@prisma/prisma.service';
import { PageModule } from '@@src/novel-game/page/page.module';
import { CreateGameUsecase } from '../usecases/create-game.usecase';

@Module({
  imports: [PageModule],
  controllers: [GameController],
  providers: [
    CreateGameUsecase,
    GameService,

    {
      provide: 'IGameRepository',
      useClass: GameRepository,
    },
    PrismaService,
  ],
})
export class GameModule {}
