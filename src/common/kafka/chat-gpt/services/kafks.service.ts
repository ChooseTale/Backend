import { ChatGPT } from '@@src/common/chat-gpt/chatgpt';
import { AppGateGateway } from '@@src/common/socketio/gate/chat-gpt.gateway';
import { Injectable } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';
import { IChatGPTKafkaPort } from '../port/input/chat-gpt.service.interface';
import { ProduceRecommendChoicesInputType } from '../type/produce-recommend-choices.input.type';

@Injectable()
export class KafkaService implements IChatGPTKafkaPort {
  constructor(
    private readonly chatGpt: ChatGPT,
    private readonly appGate: AppGateGateway,
  ) {}

  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'chat-gpt-client',
    connectionTimeout: 3000, // 연결 시도 시간
  });

  private producer: Producer;
  private chatgptConsumer: Consumer;

  async onModuleInit() {
    this.producer = this.kafka.producer();
    this.chatgptConsumer = this.kafka.consumer({ groupId: 'chat-gpt-group' });

    await this.producer.connect();
    await this.chatgptConsumer.connect();

    await this.chatgptConsumer.subscribe({
      topic: 'recommend-choices',
      fromBeginning: true,
    });

    this.chatgptConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (!message.value) return;

        try {
          switch (topic) {
            case 'recommend-choices':
              // messgeValue의 타입 지정
              const messageValue = JSON.parse(
                message.value.toString(),
              ) as ProduceRecommendChoicesInputType;

              // message의 타입 확인
              if (typeof messageValue !== 'object') return;
              if (!messageValue.abridgement) return;
              if (!messageValue.choices) return;

              const result = await this.chatGpt.getRecommandedChoices(
                messageValue.abridgement,
                messageValue.choices,
              );

              this.appGate.emitMessage(1, 'recommend-choices', result);
              // socket으로 결과값 전달
              // offset 커밋
              await this.chatgptConsumer.commitOffsets([
                {
                  topic: 'recommend-choices',
                  partition: partition,
                  offset: message.offset,
                },
              ]);
          }
        } catch (error) {
          this.appGate.emitException(1, 'recommend-choices', {
            message: error.message,
          });
        }
      },
    });
  }

  async produceRecommendChoices(message: ProduceRecommendChoicesInputType) {
    await this.producer.send({
      topic: 'recommend-choices',
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.chatgptConsumer.disconnect();
  }
}
