import { Module } from '@nestjs/common';
import { ChoiceController } from './controllers/choice.controller';
import { CreateChoiceUseCase } from './usecases/create-choice.usecase';
import { PrismaService } from '@@prisma/prisma.service';
import { ChoiceService } from '../services/choice.service';
import { ChoiceRepository } from '../infrastructure/repositories/choice.repository';
import { GameModule } from '@@src/novel-game/game/application/controllers/game.module';

@Module({
  imports: [GameModule],
  controllers: [ChoiceController],
  providers: [
    CreateChoiceUseCase,
    PrismaService,
    ChoiceService,
    {
      provide: 'choiceRepositoryInterface',
      useClass: ChoiceRepository,
    },
  ],
})
export class ChoiceModule {}
