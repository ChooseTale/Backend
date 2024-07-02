import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from '../../services/game-builder/game/game.service';
import { GameRepository } from '../../infrastructure/repositories/game.repository';
import { PrismaService } from '@@prisma/prisma.service';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [
    GameService,

    {
      provide: 'IGameRepository',
      useClass: GameRepository,
    },
    PrismaService,
  ],
})
export class GameModule {}
