import {
  CreateGameReqDto,
  CreateGameResDto,
} from '../controllers/dto/create-game.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@@prisma/prisma.service';
import { IPageService } from '@@src/game-builder/page/domain/ports/input/page.service.interface';
import { IGameService } from '../../domain/ports/input/game.service.interface';

@Injectable()
export class CreateGameUsecase {
  constructor(
    @Inject('IGameService') private readonly gameService: IGameService,
    @Inject('IPageService') private readonly pageService: IPageService,

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
        true,
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
