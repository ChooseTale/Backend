import { Module, forwardRef } from '@nestjs/common';
import { GameController } from './controllers/game.controller';
import { GameService } from '../domain/game.service';
import { GameRepository } from '../infrastructure/repositories/game.repository';
import { PrismaService } from '@@prisma/prisma.service';
import { PageModule } from '@@src/game-builder/page/application/page.module';
import { CreateGameUsecase } from './usecases/create-game.usecase';
import { GetAllGameUsecase } from './usecases/get-all.usecase';
import { ChoiceModule } from '@@src/game-builder/choice/applications/choice.module';
import { GetDataUsecase } from './usecases/get-data.usecase';
import { GetRecommandImageUseCase } from './usecases/get-recommand-image.usecase';
import { ChatGPT } from '@@src/common/infrastructure/external/chat-gpt/chatgpt';

@Module({
  imports: [forwardRef(() => PageModule), forwardRef(() => ChoiceModule)],
  controllers: [GameController],
  providers: [
    CreateGameUsecase,
    GetAllGameUsecase,
    GetDataUsecase,
    GetRecommandImageUseCase,

    GameService,
    {
      provide: 'IChatGPTPagePort',
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
  exports: [
    {
      provide: 'IGameService',
      useClass: GameService,
    },
  ],
})
export class GameModule {}
