import { Module } from '@nestjs/common';
import { GameController } from './controllers/game.controller';
import { GameService } from '../domain/game.service';
import { GameRepository } from '../infrastructure/repositories/game.repository';
import { PrismaService } from '@@prisma/prisma.service';
import { PageModule } from '@@src/game-builder/page/application/page.module';
import { CreateGameUsecase } from './usecases/create-game.usecase';
import { ChatGPT } from '@@src/common/infrastructure/external/chat-gpt/chatgpt';

@Module({
  imports: [PageModule],
  controllers: [GameController],
  providers: [
    CreateGameUsecase,
    GameService,
    {
      provide: 'ChatGPT',
      useClass: ChatGPT,
    },
    {
      provide: 'IGameService',
      useClass: GameService,
    },
    {
      provide: 'IGameRepository',
      useClass: GameRepository,
    },
    PrismaService,
  ],
  exports: [GameService],
})
export class GameModule {}
