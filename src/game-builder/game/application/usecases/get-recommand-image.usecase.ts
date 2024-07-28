import { IPageService } from '@@src/game-builder/page/domain/ports/input/page.service.interface';
import { IChatGPTPagePort } from '@@src/game-builder/page/domain/ports/output/chatgpt/chatgpt.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IGameService } from '../../domain/ports/input/game.service.interface';

@Injectable()
export class GetRecommandImageUseCase {
  constructor(
    @Inject('IChatGPTPagePort')
    private readonly chatGPT: IChatGPTPagePort,
    @Inject('IGameService')
    private readonly gameService: IGameService,
    @Inject('IPageService')
    private readonly pagePort: IPageService,
  ) {}

  async execute(gameId: number) {
    const game = await this.gameService.getById(gameId);
    const startingPage = await this.pagePort.getStartingPage(gameId);
    if (!game) {
      throw new Error('Game not found');
    }
    if (!startingPage) {
      throw new Error('Starting page not found');
    }
    const image = await this.chatGPT.getThumbnailImage(
      startingPage.abridgement,
      startingPage.content,
      game.genre,
    );
    return image;
  }
}
