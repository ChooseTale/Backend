import { IPageService } from '@@src/game-builder/page/domain/ports/input/page.service.interface';
import { IChatGPTPagePort } from '@@src/game-builder/page/domain/ports/output/chatgpt/chatgpt.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGameService } from '../../domain/ports/input/game.service.interface';
import { IImageService } from '@@src/game-builder/images/domain/port/input/image.service.interface';

@Injectable()
export class GetRecommandImageUseCase {
  constructor(
    @Inject('IChatGPTPagePort')
    private readonly chatGPT: IChatGPTPagePort,
    @Inject('IGameService')
    private readonly gameService: IGameService,
    @Inject('IPageService')
    private readonly pagePort: IPageService,
    @Inject('IImageService')
    private readonly imageService: IImageService,
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
      startingPage.title,
      startingPage.content,
      game.genre,
    );

    if (image === '') {
      throw new BadRequestException('이미지 생성에 실패했습니다.');
    }

    const newImage = await this.imageService.uploadImageForGameThumbnail(
      gameId,
      [{ url: image }],
    );

    if (newImage.length > 1) {
      throw new Error('Too many images');
    }

    return {
      imageId: newImage[0].id,
      url: newImage[0].url,
    };
  }
}
