import { IPageService } from '@@src/game-builder/page/domain/ports/input/page.service.interface';
import { IChatGPTPagePort } from '@@src/game-builder/page/domain/ports/output/chatgpt/chatgpt.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGameService } from '../../domain/ports/input/game.service.interface';
import { IImageService } from '@@src/game-builder/images/domain/port/input/image.service.interface';
import { Genres } from '@prisma/client';

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

  async execute(body: { title: string; description: string; genre: Genres }) {
    const image = await this.chatGPT.getThumbnailImage(
      body.title,
      body.description,
      body.genre,
    );

    if (image === '') {
      throw new BadRequestException('이미지 생성에 실패했습니다.');
    }

    return {
      url: image,
    };
  }
}
