import { IChoiceService } from '@@src/game-builder/choice/domain/port/input/choice.service.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPageService } from '../../domain/ports/input/page.service.interface';
import { IChatGPTPagePort } from '../../domain/ports/output/chatgpt/chatgpt.interface';

import { IChatGPTKafkaPort } from '@@src/common/kafka/chat-gpt/port/input/chat-gpt.service.interface';

@Injectable()
export class GetRecommentChoiceUsecase {
  constructor(
    @Inject('IChatGPTPagePort') private readonly chatGPT: IChatGPTPagePort,
    @Inject('IPageService') private readonly pageService: IPageService,
    @Inject('IChoiceService') private readonly choiceService: IChoiceService,
    @Inject('IKafkaService') private readonly kafkaService: IChatGPTKafkaPort,
  ) {}

  async execute(pageId: number): Promise<any[] | []> {
    const page = await this.pageService.getOneById(pageId);
    const choices = await this.choiceService.getAllByFromPageId(pageId);
    if (!page) {
      throw new NotFoundException('Page not found');
    }
    const abridgement = page.abridgement;

    await this.kafkaService.produceRecommendChoices({
      abridgement,
      choices: choices.map((choice) => {
        return { title: choice.title, description: choice.description };
      }),
    });

    return [];
    // return await this.chatGPT.getRecommandedChoices(
    //   abridgement,
    //   choices.map((choice) => {
    //     return { title: choice.title, description: choice.description };
    //   }),
    // );
  }
}
