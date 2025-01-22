import { Inject, NotFoundException } from '@nestjs/common';
import { IPageService } from '../../domain/ports/input/page.service.interface';
import { IChoiceService } from '@@src/game-builder/choice/domain/port/input/choice.service.interface';
import { GetPageResDto } from '../controllers/dto/get-page.dto';
import {
  getImagePath,
  getImagePathOrNull,
} from '@@src/common/components/images/get-path.component';

export class GetPageUseCase {
  constructor(
    @Inject('IPageService') private pageService: IPageService,
    @Inject('IChoiceService') private choiceService: IChoiceService,
  ) {}

  async execute(gameId: number, pageId: number): Promise<GetPageResDto> {
    const page = await this.pageService.getOneById(pageId);
    if (!page) {
      throw new NotFoundException('Page not found');
    }

    if (page.gameId !== gameId) {
      throw new NotFoundException('Page not found');
    }

    const choices = await this.choiceService.getAllByFromPageId(pageId);

    return {
      id: page.id,
      gameId: page.gameId,
      title: page.title,
      contents: page.contents,
      isEnding: page.isEnding,
      choices: choices.map((choice) => ({
        id: choice.id,
        text: choice.description,
        nextPageId: choice.childPageId,
      })),
      backgroundImage: {
        url: getImagePathOrNull(page.backgroundImage?.url ?? undefined),
      },
    };
  }
}
