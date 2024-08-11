import { ChatGPT } from '@@src/common/infrastructure/external/chat-gpt/chatgpt';
import { AppGateGateway } from '@@src/common/socketio/app-gate/app-gate.gateway';
import { Injectable } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService {
  constructor(
    private readonly chatGpt: ChatGPT,
    private readonly appGate: AppGateGateway,
  ) {}

  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'chat-gpt-client',
  });

  private producer: Producer;
  private chatgptConsumer: Consumer;

  async onModuleInit() {
    this.producer = this.kafka.producer();
    this.chatgptConsumer = this.kafka.consumer({ groupId: 'my-group' });

    await this.producer.connect();
    await this.chatgptConsumer.connect();

    await this.chatgptConsumer.subscribe({
      topic: 'recommend-choices',
      fromBeginning: true,
    });

    this.chatgptConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (!message.value) return;

        switch (topic) {
          case 'recommend-choices':
            // message의 타입 확인
            const messageValue = JSON.parse(message.value.toString());
            if (typeof messageValue !== 'object') return;
            if (!messageValue.abridgement) return;
            if (!messageValue.choices) return;

            const result = await this.chatGpt.getRecommandedChoices(
              messageValue.abridgement,
              messageValue.choices,
            );
            console.log('sendMessage');
            this.appGate.emitMessage(1, 'recommend-choices', result);
          // socket으로 결과값 전달
        }
      },
    });
  }

  async produceMessage(
    topic: string,
    message: {
      abridgement: string;
      choices: {
        title: string;
        description: string;
      }[];
    },
  ) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.chatgptConsumer.disconnect();
  }
}
