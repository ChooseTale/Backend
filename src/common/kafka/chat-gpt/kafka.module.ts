import { Module } from '@nestjs/common';
import { KafkaService } from './services/kafks.service';
import { ChatGPT } from '@@src/common/chat-gpt/chatgpt';
import { AppGateGateway } from '@@src/common/socketio/gate/chat-gpt.gateway';

@Module({
  providers: [KafkaService, ChatGPT, AppGateGateway],
  exports: [KafkaService],
})
export class KafkaModule {}
