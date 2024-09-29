import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPageService } from '../../domain/ports/input/page.service.interface';
import { IGameService } from '@@src/game-builder/game/domain/ports/input/game.service.interface';
import { IChoiceService } from '@@src/game-builder/choice/domain/port/input/choice.service.interface';

@Injectable()
export class DeletePageUseCase {
  constructor(
    @Inject('IPageService') private pageService: IPageService,
    @Inject('IGameService') private gameService: IGameService,
    @Inject('IChoiceService') private choiceService: IChoiceService,
  ) {}

  async execute(gameId: number, pageId: number, userId?: number) {
    const game = await this.gameService.getById(gameId);
    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const page = await this.pageService.getOneById(pageId);
    if (!page) {
      throw new NotFoundException('Page not found');
    }
    page.checkIsStarting();

    await this.pageService.delete(pageId);

    // 연결된 선택지들도 삭제처리
    const fromPageChoices = await this.choiceService.getAllByFromPageId(pageId);
    const toPageChoices = await this.choiceService.getAllByToPageId(pageId);
    await Promise.all([
      toPageChoices.map((choice) => {
        choice.setChildPageId(null);
        return this.choiceService.update(choice.id, choice);
      }),
      fromPageChoices.map((choice) => {
        return this.choiceService.delete(choice.id);
      }),
    ]);

    return {
      message: 'success',
    };
  }
}
