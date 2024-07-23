import { Module, forwardRef } from '@nestjs/common';
import { ChoiceController } from './controllers/choice.controller';
import { CreateChoiceUseCase } from './usecases/create-choice.usecase';
import { PrismaService } from '@@prisma/prisma.service';
import { ChoiceService } from '../domain/choice.service';
import { ChoiceRepository } from '../infrastructure/repositories/choice.repository';
import { GameModule } from '@@src/game-builder/game/application/game.module';
import { PageModule } from '@@src/game-builder/page/application/page.module';
import { UpdateChoiceUseCase } from './usecases/update-choice.usecase';

@Module({
  imports: [forwardRef(() => GameModule), forwardRef(() => PageModule)],
  controllers: [ChoiceController],
  providers: [
    CreateChoiceUseCase,
    UpdateChoiceUseCase,
    PrismaService,
    {
      provide: 'IChoiceService',
      useClass: ChoiceService,
    },

    {
      provide: 'choiceRepositoryInterface',
      useClass: ChoiceRepository,
    },
  ],
  exports: [
    {
      provide: 'IChoiceService',
      useClass: ChoiceService,
    },
  ],
})
export class ChoiceModule {}
