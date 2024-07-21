import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPageService } from '../../domain/ports/input/page.service.interface';
import {
  UpdatePageReqDto,
  UpdatePageResDto,
} from '../controllers/dto/update-page.dto';
import { IGameService } from '@@src/game-builder/game/domain/ports/input/game.service.interface';

@Injectable()
export class UpdatePageUsecase {
  constructor(
    @Inject('IPageService') private readonly pageService: IPageService,
    @Inject('IGameService') private readonly gameService: IGameService,
  ) {}

  async excute(
    gameId: number,
    pageId: number,
    body: UpdatePageReqDto,
  ): Promise<UpdatePageResDto> {
    const game = await this.gameService.getById(gameId);
    if (!game) {
      throw new NotFoundException('게임을 찾을 수 없습니다.');
    }
    const updatedPage = await this.pageService.update(pageId, body);
    return {
      id: updatedPage.id,
      abridgement: updatedPage.abridgement,
      isEnding: updatedPage.isEnding,
      content: updatedPage.content,
    };
  }
}
