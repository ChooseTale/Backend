import { Inject, NotFoundException } from '@nestjs/common';
import { IPageService } from '../../domain/ports/input/page.service.interface';
import { IChoiceService } from '@@src/game-builder/choice/domain/port/input/choice.service.interface';

export class GetPageUseCase {
  constructor(
    @Inject('IPageService') private pageService: IPageService,
    @Inject('IChoiceService') private choiceService: IChoiceService,
  ) {}

  async execute(gameId: number, pageId: number) {
    const page = await this.pageService.getOneById(pageId);
    if (!page) {
      throw new NotFoundException('Page not found');
    }

    if (page.gameId !== gameId) {
      throw new NotFoundException('Page not found');
    }
    console.log(page);

    const choices = await this.choiceService.getAllByFromPageId(pageId);

    console.log(choices);
    return page;
  }
}
