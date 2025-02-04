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
import { ChatGPT } from '@@src/common/chat-gpt/chatgpt';

import { MulterModule } from '@nestjs/platform-express';
import config from '@@src/config';
import { ImageModule } from '@@src/game-builder/images/image.module';
import { UploadImagesUseCase } from './usecases/upload-images.usecase';
import { DeleteGameUseCase } from './usecases/delete-game.usecase';
import { UpdateGameUseCase } from './usecases/update-game.usecase';
import multer from 'multer';
import { PublishGameUsecase } from './usecases/publish.usecase';

@Module({
  imports: [
    forwardRef(() => PageModule),
    forwardRef(() => ChoiceModule),
    MulterModule.register({
      dest: config.files.gameThumnailImage.dest,
      storage: multer.diskStorage({
        destination: config.files.gameThumnailImage.dest,
        filename: (req, file, cb) => {
          console.log(file);
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
    ImageModule,
  ],
  controllers: [GameController],
  providers: [
    CreateGameUsecase,
    GetAllGameUsecase,
    GetDataUsecase,
    GetRecommandImageUseCase,
    UploadImagesUseCase,
    UpdateGameUseCase,
    DeleteGameUseCase,
    PublishGameUsecase,

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
