import { Module, forwardRef } from '@nestjs/common';
import { PageController } from './controllers/page.controller';
import { PageService } from '../domain/page.service';
import { PageRepository } from '../infrastructure/repositories/page.repository';
import { PrismaService } from '@@prisma/prisma.service';
import { CreatePageUsecase } from './usecases/create-page.usecase';
import { ChatGPT } from '@@src/common/chat-gpt/chatgpt';
import { UpdatePageUsecase } from './usecases/update-page.usecase';
import { GameModule } from '@@src/game-builder/game/application/game.module';
import { DeletePageUseCase } from './usecases/delete-page.usecase';
import { GetRecommentChoiceUsecase } from './usecases/get-recomment-choice.usecase';
import { ChoiceModule } from '@@src/game-builder/choice/applications/choice.module';

import { AppGateGateway } from '@@src/common/socketio/gate/chat-gpt.gateway';
import { KafkaModule } from '@@src/common/kafka/chat-gpt/kafka.module';
import { ChoiceRepository } from '@@src/game-builder/choice/infrastructure/repositories/choice.repository';
import { GetPageUseCase } from './usecases/get-page.usecase';

@Module({
  imports: [
    forwardRef(() => GameModule),
    forwardRef(() => ChoiceModule),
    KafkaModule,
  ],
  controllers: [PageController],
  providers: [
    CreatePageUsecase,
    UpdatePageUsecase,
    DeletePageUseCase,
    GetRecommentChoiceUsecase,
    GetPageUseCase,
    ChatGPT,
    AppGateGateway,
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
    {
      provide: 'IChoicePageRepository',
      useClass: ChoiceRepository,
    },
    PrismaService,
  ],
  exports: [{ provide: 'IPageService', useClass: PageService }],
})
export class PageModule {}
