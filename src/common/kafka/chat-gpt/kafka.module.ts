import { Module } from '@nestjs/common';
import { KafkaService } from './services/kafks.service';
import { ChatGPT } from '@@src/common/chat-gpt/chatgpt';
import { AppGateGateway } from '@@src/common/socketio/gate/chat-gpt.gateway';

@Module({
  providers: [
    {
      provide: 'IKafkaService',
      useClass: KafkaService,
    },
    ChatGPT,
    AppGateGateway,
  ],
  exports: [
    {
      provide: 'IKafkaService',
      useClass: KafkaService,
    },
  ],
})
export class KafkaModule {}
