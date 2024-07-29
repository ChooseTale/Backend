import { IChoiceService } from '@@src/game-builder/choice/domain/port/input/choice.service.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPageService } from '../../domain/ports/input/page.service.interface';
import { IChatGPTPagePort } from '../../domain/ports/output/chatgpt/chatgpt.interface';

@Injectable()
export class GetRecommentChoiceUsecase {
  constructor(
    @Inject('IChatGPTPagePort') private readonly chatGPT: IChatGPTPagePort,
    @Inject('IPageService') private readonly pageService: IPageService,
    @Inject('IChoiceService') private readonly choiceService: IChoiceService,
  ) {}

  async execute(pageId: number): Promise<any[] | []> {
    const page = await this.pageService.getOneById(pageId);
    const choices = await this.choiceService.getAllByPageId(pageId);
    if (!page) {
      throw new NotFoundException('Page not found');
    }
    const abridgement = page.abridgement;
    return await this.chatGPT.getRecommandedChoices(
      abridgement,
      choices.map((choice) => {
        return { title: choice.title, description: choice.description };
      }),
    );
  }
}
