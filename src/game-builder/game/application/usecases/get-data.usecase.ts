import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IGameService } from '../../domain/ports/input/game.service.interface';
import { IPageService } from '@@src/game-builder/page/domain/ports/input/page.service.interface';
import { IChoiceService } from '@@src/game-builder/choice/domain/port/input/choice.service.interface';
import { PrismaService } from '@@prisma/prisma.service';
import { toGetDataRes } from './mapper/to-get-data-res.mapper';
import { GetDataGameResDto } from '../controllers/dto/get-data-game.dto';

@Injectable()
export class GetDataUsecase {
  constructor(
    @Inject('IGameService') private readonly gameService: IGameService,
    @Inject('IPageService') private readonly pageService: IPageService,
    @Inject('IChoiceService') private readonly choiceService: IChoiceService,
    private readonly prismaService: PrismaService,
  ) {}

  async execute(gameId: number): Promise<GetDataGameResDto> {
    const game = await this.gameService.getById(gameId);
    const pages = await this.pageService.getAllByGameId(gameId);
    const choices = await this.choiceService.getAllByPageIds(
      pages.map((page) => page.id),
    );

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return toGetDataRes(game, pages, choices);
  }
}
