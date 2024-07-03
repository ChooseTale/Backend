import { PageService } from '@@src/novel-game/page/services/page.service';
import { GameService } from '../../services/game-builder/game/game.service';
import {
  CreateGameReqDto,
  CreateGameResDto,
} from '../controllers/dto/create-game.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateGameUsecase {
  constructor(
    private readonly gameService: GameService,
    private readonly pageService: PageService,
  ) {}

  async excute(
    userId: number,
    createGameReqDto: CreateGameReqDto,
  ): Promise<CreateGameResDto> {
    const newGame = await this.gameService.create(
      userId,
      createGameReqDto.title,
    );
    const newPage = await this.pageService.create(newGame.id, {
      content: createGameReqDto.pageOneContent,
    });
    return {
      id: newGame.id,
      page: {
        id: newPage.id,
        abridgement: newPage.abridgement,
        content: newPage.content,
      },
    };
  }
}
