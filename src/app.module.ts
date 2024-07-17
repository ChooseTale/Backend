import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from '@@prisma/prisma.service';

import { GameModule } from './game-builder/game/application/controllers/game.module';
import { PageModule } from './game-builder/page/page.module';

import { ChoiceModule } from './game-builder/choice/applications/choice.module';

@Module({
  imports: [GameModule, PageModule, ChoiceModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
