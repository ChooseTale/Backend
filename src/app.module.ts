import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from '@@prisma/prisma.service';

import { GameModule } from './game-builder/game/application/game.module';
import { PageModule } from './game-builder/page/application/page.module';

import { ChoiceModule } from './game-builder/choice/applications/choice.module';
import { AppGateGateway } from './common/socketio/app-gate/app-gate.gateway';
import { KafkaModule } from './common/kafka/chat-gpt/kafka.module';

@Module({
  imports: [GameModule, PageModule, ChoiceModule, KafkaModule],
  controllers: [AppController],
  providers: [PrismaService, AppGateGateway],
})
export class AppModule {}
