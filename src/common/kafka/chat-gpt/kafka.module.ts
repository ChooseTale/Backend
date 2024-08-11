import { Module } from '@nestjs/common';
import { KafkaService } from './services/kafks.service';
import { ChatGPT } from '@@src/common/infrastructure/external/chat-gpt/chatgpt';
import { AppGateGateway } from '@@src/common/socketio/app-gate/app-gate.gateway';

@Module({
  providers: [KafkaService, ChatGPT, AppGateGateway],
  exports: [KafkaService],
})
export class KafkaModule {}
