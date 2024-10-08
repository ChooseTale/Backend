import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from '@@prisma/prisma.service';

import { GameModule } from './game-builder/game/application/game.module';
import { PageModule } from './game-builder/page/application/page.module';

import { ChoiceModule } from './game-builder/choice/applications/choice.module';
import { AppGateGateway } from './common/socketio/gate/chat-gpt.gateway';
import { KafkaModule } from './common/kafka/chat-gpt/kafka.module';
import { GamePlayModule } from './game-play/game-play.module';
import { JwtService } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'), // 파일이 저장된 디렉토리
      serveRoot: '/uploads', // 클라이언트가 접근할 URL 경로
    }),
    GameModule,
    GamePlayModule,
    PageModule,
    ChoiceModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppGateGateway, JwtService],
})
export class AppModule {}
