import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from '@@prisma/prisma.service';
import { UserModule } from './api/controllers/user/user.module';
import { GameController } from './api/controllers/novel-game/game/game.controller';
import { GameModule } from './api/controllers/novel-game/game/game.module';
import { PageModule } from './api/controllers/novel-game/page/page.module';

import { ChoiceModule } from './api/controllers/novel-game/choice/choice.module';

@Module({
  imports: [UserModule, GameModule, PageModule, ChoiceModule],
  controllers: [AppController, GameController],
  providers: [PrismaService],
})
export class AppModule {}
