import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IPageService } from '../../domain/ports/input/page.service.interface';
import {
  UpdatePageReqDto,
  UpdatePageResDto,
} from '../controllers/dto/update-page.dto';
import { IGameService } from '@@src/game-builder/game/domain/ports/input/game.service.interface';
import { IChoiceService } from '@@src/game-builder/choice/domain/port/input/choice.service.interface';
import { IImageService } from '@@src/game-builder/images/domain/port/input/image.service.interface';

@Injectable()
export class UpdatePageUsecase {
  constructor(
    @Inject('IPageService') private readonly pageService: IPageService,
    @Inject('IGameService') private readonly gameService: IGameService,
    @Inject('IChoiceService') private readonly choiceService: IChoiceService,
    @Inject('IImageService') private readonly imageService: IImageService,
  ) {}

  async excute(
    gameId: number,
    pageId: number,
    body: UpdatePageReqDto,
    file: Express.Multer.File,
  ): Promise<UpdatePageResDto> {
    const game = await this.gameService.getById(gameId);
    if (!game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }

    let backgroundImageId: number | null = null;

    if (file) {
      const uploadedImages = await this.imageService.uploadImageForPage({
        url: `/${file.path}`,
      });
      backgroundImageId = uploadedImages.id;
    }
    const updatedPage = await this.pageService.update(
      pageId,
      body,
      backgroundImageId,
    );
    return {
      id: updatedPage.id,
      title: updatedPage.title,
      isEnding: updatedPage.isEnding,
      contents: updatedPage.contents,
    } as any;
  }
}
