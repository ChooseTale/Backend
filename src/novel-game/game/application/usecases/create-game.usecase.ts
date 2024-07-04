import { PageService } from '@@src/novel-game/page/services/page.service';
import { GameService } from '../../services/game-builder/game/game.service';
import {
  CreateGameReqDto,
  CreateGameResDto,
} from '../controllers/dto/create-game.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@@prisma/prisma.service';

@Injectable()
export class CreateGameUsecase {
  constructor(
    private readonly gameService: GameService,
    private readonly pageService: PageService,
    private readonly prismaService: PrismaService,
  ) {}

  async excute(
    userId: number,
    createGameReqDto: CreateGameReqDto,
  ): Promise<CreateGameResDto> {
    return await this.prismaService.$transaction(async (transaction) => {
      const newGame = await this.gameService.create(
        userId,
        createGameReqDto.title,
        transaction,
      );
      const newPage = await this.pageService.create(
        newGame.id,
        {
          content: createGameReqDto.pageOneContent,
        },
        transaction,
      );
      return {
        id: newGame.id,
        page: {
          id: newPage.id,
          abridgement: newPage.abridgement,
          content: newPage.content,
        },
      };
    });
  }
}
