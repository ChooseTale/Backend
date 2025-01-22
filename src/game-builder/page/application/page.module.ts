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

import { ImageService } from '@@src/game-builder/images/domain/image.service';
import { ImageModule } from '@@src/game-builder/images/image.module';
import { MulterModule } from '@nestjs/platform-express';
import config from '@@src/config';
import multer from 'multer';

@Module({
  imports: [
    forwardRef(() => GameModule),
    forwardRef(() => ChoiceModule),
    KafkaModule,
    ImageModule,
    MulterModule.register({
      dest: config.files.userImage.dest,
      storage: multer.diskStorage({
        destination: config.files.userImage.dest,
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
              '-' +
              uniqueSuffix +
              '.' +
              file.mimetype.split('/')[1],
          );
        },
      }),
    }),
  ],
  controllers: [PageController],
  providers: [
    CreatePageUsecase,
    UpdatePageUsecase,
    DeletePageUseCase,
    GetRecommentChoiceUsecase,
    GetPageUseCase,
    ImageService,
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
