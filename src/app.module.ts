import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from '@@prisma/prisma.service';

import { GameModule } from './novel-game/game/application/controllers/game.module';
import { PageModule } from './novel-game/page/page.module';

import { ChoiceModule } from './novel-game/choice/choice.module';

@Module({
  imports: [GameModule, PageModule, ChoiceModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
