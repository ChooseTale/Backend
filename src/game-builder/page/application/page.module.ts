import { Module, forwardRef } from '@nestjs/common';
import { PageController } from './controllers/page.controller';
import { PageService } from '../domain/page.service';
import { PageRepository } from '../infrastructure/repositories/page.repository';
import { PrismaService } from '@@prisma/prisma.service';
import { CreatePageUsecase } from './usecases/create-page.usecase';
import { ChatGPT } from '@@src/common/infrastructure/external/chat-gpt/chatgpt';
import { UpdatePageUsecase } from './usecases/update-page.usecase';
import { GameModule } from '@@src/game-builder/game/application/game.module';
import { DeletePageUseCase } from './usecases/delete-page.usecase';
import { GetRecommentChoiceUsecase } from './usecases/get-recomment-choice.usecase';
import { ChoiceModule } from '@@src/game-builder/choice/applications/choice.module';

@Module({
  imports: [forwardRef(() => GameModule), forwardRef(() => ChoiceModule)],
  controllers: [PageController],
  providers: [
    CreatePageUsecase,
    UpdatePageUsecase,
    DeletePageUseCase,
    GetRecommentChoiceUsecase,
    {
      provide: 'IPageService',
      useClass: PageService,
    },
    {
      provide: 'IPageRepository',
      useClass: PageRepository,
    },
    {
      provide: 'IChatGPTPagePort',
      useClass: ChatGPT,
    },
    PrismaService,
  ],
  exports: [{ provide: 'IPageService', useClass: PageService }],
})
export class PageModule {}
