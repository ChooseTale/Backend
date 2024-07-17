import { Module } from '@nestjs/common';
import { ChoiceController } from './controllers/choice.controller';
import { CreateChoiceUseCase } from './usecases/create-choice.usecase';
import { PrismaService } from '@@prisma/prisma.service';
import { ChoiceService } from '../domain/choice.service';
import { ChoiceRepository } from '../infrastructure/repositories/choice.repository';
import { GameModule } from '@@src/game-builder/game/application/controllers/game.module';
import { PageModule } from '@@src/game-builder/page/application/page.module';

@Module({
  imports: [GameModule, PageModule],
  controllers: [ChoiceController],
  providers: [
    CreateChoiceUseCase,
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
})
export class ChoiceModule {}
