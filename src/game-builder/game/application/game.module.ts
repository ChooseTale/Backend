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
import { MulterModule } from '@nestjs/platform-express';
import config from '@@src/config';
import { ImageModule } from '@@src/common/images/image.module';
import { UploadImagesUseCase } from './usecases/upload-images.usecase';

@Module({
  imports: [
    forwardRef(() => PageModule),
    forwardRef(() => ChoiceModule),
    MulterModule.register({
      dest: config.files.gameThumnailImage.dest,
    }),
    ImageModule,
  ],
  controllers: [GameController],
  providers: [
    CreateGameUsecase,
    GetAllGameUsecase,
    GetDataUsecase,
    UploadImagesUseCase,
    GameService,
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
