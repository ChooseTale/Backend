import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPageService } from '../../domain/ports/input/page.service.interface';
import { IGameService } from '@@src/game-builder/game/domain/ports/input/game.service.interface';

@Injectable()
export class DeletePageUseCase {
  constructor(
    @Inject('IPageService') private pageService: IPageService,
    @Inject('IGameService') private gameService: IGameService,
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

    await this.pageService.delete(pageId);

    return {
      message: 'success',
    };
  }
}
